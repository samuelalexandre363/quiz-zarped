"use strict";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ALLOWED_FIELDS = [
  "nome",
  "telefone",
  "instagram",
  "faturamento_mensal",
  "score",
  "nivel",
  "respostas",
  "origem",
  "interesse",
  "idempotencyKey"
];

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readPayload(body) {
  if (body && typeof body === "object" && !Buffer.isBuffer(body)) return body;
  if (typeof body !== "string" || body.length > 64 * 1024) return null;
  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
}

function validateAndPick(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "Envie um objeto JSON válido." };
  }

  const payload = Object.fromEntries(ALLOWED_FIELDS
    .filter((key) => Object.hasOwn(input, key))
    .map((key) => [key, input[key]]));

  payload.nome = String(payload.nome ?? "").trim();
  payload.telefone = String(payload.telefone ?? "");
  payload.instagram = String(payload.instagram ?? "").trim();
  payload.faturamento_mensal = String(payload.faturamento_mensal ?? "").trim();
  payload.nivel = String(payload.nivel ?? "").trim();
  payload.origem = String(payload.origem ?? "").trim();
  payload.interesse = String(payload.interesse ?? "").trim();

  if (payload.nome.length < 2 || payload.nome.length > 120) return { error: "Informe um nome válido." };
  if (!/^\d{10,13}$/.test(payload.telefone)) return { error: "Informe um telefone válido com DDD." };
  if (payload.instagram.length < 2 || payload.instagram.length > 100) return { error: "Informe o Instagram da empresa." };
  if (payload.faturamento_mensal.length > 120) return { error: "Faixa de faturamento inválida." };
  if (!Number.isInteger(payload.score) || payload.score < 0 || payload.score > 100) return { error: "Score inválido." };
  if (!payload.nivel || payload.nivel.length > 80) return { error: "Nível do diagnóstico inválido." };
  if (!payload.respostas || typeof payload.respostas !== "object" || Array.isArray(payload.respostas)) return { error: "Respostas do diagnóstico inválidas." };
  if (payload.origem !== "quiz-zarped" || payload.interesse !== "Caça-Gargalo") return { error: "Origem ou interesse inválido." };
  if (!UUID_PATTERN.test(String(payload.idempotencyKey ?? ""))) return { error: "Chave de envio inválida." };

  return { payload };
}

module.exports = async function leads(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { ok: false, error: "Método não permitido." });
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  const webhookSecret = process.env.LEADS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) {
    return sendJson(res, 503, { ok: false, error: "A integração de leads ainda não está configurada." });
  }

  const { payload, error } = validateAndPick(readPayload(req.body));
  if (error) return sendJson(res, 400, { ok: false, error });

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": webhookSecret,
        "x-idempotency-key": payload.idempotencyKey
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000)
    });

    const raw = await upstream.text();
    let body;
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = { ok: false, error: "O webhook retornou uma resposta inválida." };
    }

    res.statusCode = upstream.status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.end(JSON.stringify(body));
  } catch {
    return sendJson(res, 502, { ok: false, error: "Não foi possível conectar ao serviço de leads." });
  }
};

module.exports.validateAndPick = validateAndPick;
