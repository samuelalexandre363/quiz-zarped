const test = require("node:test");
const assert = require("node:assert/strict");
const leads = require("../api/leads.js");

function responseRecorder() {
  return {
    statusCode: 200,
    headers: {},
    body: "",
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    end(value) { this.body = value || ""; }
  };
}

const samplePayload = {
  nome: "Lead de teste",
  telefone: "5511999999999",
  instagram: "@empresa_teste",
  faturamento_mensal: "De R$ 30 mil a R$ 50 mil por mês",
  score: 72,
  nivel: "Crescimento",
  respostas: { faturamento: "De R$ 30 mil a R$ 50 mil por mês", instagram: "Posto com regularidade" },
  origem: "quiz-zarped",
  interesse: "Caça-Gargalo",
  idempotencyKey: "a0b1c2d3-e4f5-4a67-8b90-123456789abc"
};

test("encaminha os campos do quiz e o segredo apenas no servidor", async () => {
  const oldFetch = global.fetch;
  const oldUrl = process.env.LEADS_WEBHOOK_URL;
  const oldSecret = process.env.LEADS_WEBHOOK_SECRET;
  process.env.LEADS_WEBHOOK_URL = "https://example.test/webhook/lead";
  process.env.LEADS_WEBHOOK_SECRET = "test-only-secret";

  let sent;
  global.fetch = async (url, options) => {
    sent = { url, options };
    return { status: 202, text: async () => JSON.stringify({ ok: true, id: "test-row" }) };
  };

  try {
    const res = responseRecorder();
    await leads({ method: "POST", body: samplePayload }, res);
    assert.equal(res.statusCode, 202);
    assert.deepEqual(JSON.parse(res.body), { ok: true, id: "test-row" });
    assert.equal(sent.url, process.env.LEADS_WEBHOOK_URL);
    assert.equal(sent.options.headers["x-webhook-secret"], "test-only-secret");
    assert.equal(sent.options.headers["x-idempotency-key"], samplePayload.idempotencyKey);
    assert.deepEqual(JSON.parse(sent.options.body), samplePayload);
    assert.equal(res.body.includes("test-only-secret"), false);
  } finally {
    global.fetch = oldFetch;
    if (oldUrl === undefined) delete process.env.LEADS_WEBHOOK_URL;
    else process.env.LEADS_WEBHOOK_URL = oldUrl;
    if (oldSecret === undefined) delete process.env.LEADS_WEBHOOK_SECRET;
    else process.env.LEADS_WEBHOOK_SECRET = oldSecret;
  }
});

test("recusa métodos diferentes de POST sem chamar o webhook", async () => {
  const oldFetch = global.fetch;
  let called = false;
  global.fetch = async () => { called = true; throw new Error("não deveria encaminhar"); };
  try {
    const res = responseRecorder();
    await leads({ method: "GET" }, res);
    assert.equal(res.statusCode, 405);
    assert.equal(res.headers.allow, "POST");
    assert.deepEqual(JSON.parse(res.body), { ok: false, error: "Método não permitido." });
    assert.equal(called, false);
  } finally {
    global.fetch = oldFetch;
  }
});

test("preserva resposta de duplicidade do webhook", async () => {
  const oldFetch = global.fetch;
  const oldUrl = process.env.LEADS_WEBHOOK_URL;
  const oldSecret = process.env.LEADS_WEBHOOK_SECRET;
  process.env.LEADS_WEBHOOK_URL = "https://example.test/webhook/lead";
  process.env.LEADS_WEBHOOK_SECRET = "test-only-secret";
  global.fetch = async () => ({ status: 200, text: async () => JSON.stringify({ ok: true, duplicate: true }) });

  try {
    const res = responseRecorder();
    await leads({ method: "POST", body: samplePayload }, res);
    assert.equal(res.statusCode, 200);
    assert.deepEqual(JSON.parse(res.body), { ok: true, duplicate: true });
  } finally {
    global.fetch = oldFetch;
    if (oldUrl === undefined) delete process.env.LEADS_WEBHOOK_URL;
    else process.env.LEADS_WEBHOOK_URL = oldUrl;
    if (oldSecret === undefined) delete process.env.LEADS_WEBHOOK_SECRET;
    else process.env.LEADS_WEBHOOK_SECRET = oldSecret;
  }
});
