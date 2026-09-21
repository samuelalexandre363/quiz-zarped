# Quiz Zarped — diagnóstico de crescimento

Projeto estático e independente, adaptado do fluxo do diagnóstico Montagna fornecido pelo usuário. Identidade visual extraída do projeto `zarped-raiox`: arquivos originais `zarped.css` e `premium.css`, fontes Degular locais, símbolo, cores, grade, cartões e animações dos botões. As extensões do quiz ficam em `css/quiz.css`.

Abra `index.html` diretamente ou execute `python -m http.server 8877` nesta pasta. Não exige instalação ou build.

Fluxo: apresentação → 10 perguntas → captura de nome, telefone e Instagram → envio protegido do diagnóstico → score, dimensões, pontos fortes, atenção e três ações → download de relatório TXT. O navegador envia os dados apenas para `/api/leads`; essa função encaminha o JSON ao webhook com a chave secreta guardada no servidor. O webhook grava o lead na tabela Baserow “Leads Caça Gargalo” (ID 543), sem acionar a notificação da Evolution usada pelo formulário do site principal.

## Integração de leads

Configure na Vercel, para produção e preview, as variáveis `LEADS_WEBHOOK_URL` e `LEADS_WEBHOOK_SECRET`. A URL já está em `.env.example`; o segredo precisa ser o mesmo configurado no servidor do webhook e nunca deve receber o prefixo `NEXT_PUBLIC_` nem ser incluído em arquivos públicos. Para executar localmente com `vercel dev`, crie `.env.local` com essas duas variáveis. Não use o servidor estático simples para testar o envio: ele não executa funções serverless.

O payload inclui nome, telefone, Instagram da empresa, faturamento mensal, score, nível, respostas às 10 perguntas, origem, interesse e uma chave de idempotência UUID. A tabela 543 tem colunas próprias para os campos principais; as respostas completas são salvas em `Respostas` como JSON.

## Pontuação

O faturamento qualifica o perfil do lead, sem alterar o score. As demais perguntas usam os pesos da metodologia: Presença digital (15), Aquisição e tráfego (25), Processo comercial (30), Google e presença local (15) e Gestão e métricas (15), totalizando 100. Faixas: 0–39 inicial, 40–59 desenvolvimento, 60–79 crescimento, 80–100 estruturado. Dimensões com pelo menos 70% são pontos fortes; abaixo de 50%, pontos de atenção. As três menores recebem prioridade; empates seguem a ordem das dimensões. O contexto de faturamento ajusta a leitura e a recomendação final.

As perguntas não exigem canal específico, investimento em mídia, loja física ou equipe. O resultado é um autodiagnóstico, não uma auditoria do mercado.

## Verificação

Execute `node --test tests/scoring.test.cjs tests/leads-api.test.cjs` para validar pontuação, encaminhamento server-side, ocultação do segredo e respostas de duplicidade. `node --check js/quiz.js`, `node --check api/leads.js` e `node --check ../webhook-leads/src/server.js` verificam sintaxe.
