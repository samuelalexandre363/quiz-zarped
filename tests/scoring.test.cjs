const {test}=require('node:test');
const assert=require('node:assert/strict');
const {calculate,createReportNarrative,QUESTIONS,PILLARS}=require('../js/quiz.js');

test('perguntas novas e pesos máximos fecham em 100 pontos',()=>{
  assert.equal(QUESTIONS.length,10);
  assert.deepEqual(QUESTIONS.map(q=>q.title),[
    'Qual o faturamento médio mensal do seu negócio hoje?',
    'Como está a presença da sua empresa no Instagram?',
    'A sua empresa hoje tem site ou catálogo digital de produtos/serviços?',
    'A sua empresa investe em anúncios (Meta Ads / Google Ads)?',
    'Quantos leads/contatos a tua empresa hoje recebe por mês através de anúncios e redes sociais?',
    'Qual a velocidade média de resposta a um novo interessado em teus produtos/serviços?',
    'Existe um processo de follow-up com quem não comprou na hora?',
    'Como a sua empresa controla os atendimentos e a equipe comercial?',
    'O Google Meu Negócio da sua empresa está completo e atualizado?',
    'Vocês acompanham métricas como CAC, ROAS e taxa de conversão?'
  ]);
  assert.deepEqual(PILLARS.map(p=>p.max),[15,25,30,15,15]);
  const high=calculate([5,3,3,3,4,3,3,3,3,3]);
  assert.equal(high.total,100);assert.equal(high.perfect,true);assert.equal(high.weaknesses.length,0);
});

test('faturamento qualifica o perfil sem alterar o score',()=>{
  const low=calculate([0,0,0,0,0,0,0,0,0,0]);
  const high=calculate([5,0,0,0,0,0,0,0,0,0]);
  assert.equal(low.total,0);assert.equal(high.total,0);assert.equal(low.profile.short,'fase inicial');assert.equal(high.profile.short,'operação em escala');
});

test('prioriza menores dimensões e calcula barras por peso próprio',()=>{
  const result=calculate([2,3,3,0,0,2,2,1,3,3]);
  assert.equal(result.total,64);assert.deepEqual(result.actions.map(item=>item.i),[1,0,3]);
  assert.equal(result.scores[0],15);assert.equal(result.scores[1],0);assert.equal(result.scores[2],19);
});

test('faixas de maturidade e respostas incompletas',()=>{
  for(const answers of [[0,0,0,0,0,0,0,0,0,0],[5,3,3,3,4,3,3,3,3,3]]){
    const result=calculate(answers);assert.ok(result.total>=0&&result.total<=100);
    assert.equal(result.level,result.total<40?'Estrutura Inicial':result.total<60?'Em Desenvolvimento':result.total<80?'Em Crescimento':'Operação Estruturada');
  }
  for(const answers of [[],Array(10).fill(null),[5,3,3,3,5,3,3,3,3,3],[0,0,0,0,0,0,0,0,0,4]])assert.throws(()=>calculate(answers));
});

test('relatório traduz os gargalos a partir das respostas reais',()=>{
  const noDigital=[0,0,0,3,4,3,3,3,3,3];
  const report=createReportNarrative(calculate(noDigital),noDigital);
  assert.match(report.pillars[0].weak,/Instagram está parado/i);
  assert.match(report.priority.copy,/Instagram parado/i);

  const slowSales=[5,3,3,3,4,0,0,0,3,3];
  const salesReport=createReportNarrative(calculate(slowSales),slowSales);
  assert.equal(salesReport.priority.title,'A demora no primeiro retorno está esfriando oportunidades');
  assert.match(salesReport.pillars[2].action,/mesmo dia/i);
});
