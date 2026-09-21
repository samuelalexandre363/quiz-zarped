'use strict';

const PILLARS = [
  {name:'Presença Digital', max:15, strong:'Sua presença digital transmite profissionalismo e ajuda o cliente a confiar na empresa antes mesmo de entrar em contato.', weak:'Sua presença digital ainda pode estar deixando a empresa invisível para quem pesquisa antes de comprar.', action:'Atualize o Instagram e o site ou catálogo com oferta, diferenciais, provas e um próximo passo claro.', optimize:'Teste duas formas de apresentar a oferta e acompanhe qual gera mais conversas ou pedidos.'},
  {name:'Aquisição e Tráfego', max:25, strong:'Sua empresa já cria um fluxo de oportunidades por anúncios e canais digitais, com espaço para repetir o que funciona.', weak:'A empresa ainda depende de ações irregulares ou pouco mensuradas para gerar oportunidades.', action:'Escolha o canal mais promissor, defina uma rotina de captação por 30 dias e registre a origem de cada contato.', optimize:'Compare custo, esforço e qualidade dos leads por canal e concentre o próximo teste no melhor retorno.'},
  {name:'Processo Comercial', max:30, strong:'Seu processo comercial é rápido e organizado, reduzindo perdas por demora ou falta de acompanhamento.', weak:'A operação pode estar perdendo vendas por demora, falta de follow-up ou pouca visibilidade sobre os atendimentos.', action:'Defina prazo de resposta, responsável e próximos passos para cada oportunidade. Crie um follow-up compatível com seu ciclo de compra.', optimize:'Meça a conversão entre contato, proposta e venda e corrija o ponto onde mais oportunidades se perdem.'},
  {name:'Google e Presença Local', max:15, strong:'Seu Google Meu Negócio está bem cuidado e ajuda a empresa a aparecer para quem busca uma solução na sua região.', weak:'Um perfil local incompleto pode fazer a empresa perder pessoas que já estão procurando o que você oferece.', action:'Complete o Google Meu Negócio com fotos, horários, serviços, contatos e respostas às avaliações.', optimize:'Publique atualizações e acompanhe visualizações, rotas, ligações ou contatos gerados pelo perfil.'},
  {name:'Gestão e Métricas', max:15, strong:'Você já acompanha métricas-chave, o que permite tomar decisões com dados em vez de achismo.', weak:'Sem métricas regulares, fica difícil saber onde o investimento e o esforço estão gerando retorno.', action:'Acompanhe semanalmente leads, vendas, conversão e custos. Registre uma decisão a partir desses números.', optimize:'Relacione CAC, ROAS e conversão à rentabilidade e transforme um aprendizado em um experimento com meta e prazo.'}
];

const QUESTIONS = [
  {id:'faturamento', pillar:null, title:'Qual o faturamento médio mensal do seu negócio hoje?', options:['Abaixo de R$ 30 mil por mês','De R$ 30 mil a R$ 50 mil por mês','De R$ 50 mil a R$ 100 mil por mês','De R$ 100 mil a R$ 250 mil por mês','De R$ 250 mil a R$ 500 mil por mês','Acima de R$ 500 mil por mês'], points:[0,0,0,0,0,0]},
  {id:'instagram', pillar:0, title:'Como está a presença da sua empresa no Instagram?', options:['Quase não uso, conta parada','Posto de vez em quando, sem planejamento','Posto com regularidade, mas sem estratégia clara','Posto com regularidade e conteúdo planejado'], points:[0,3,5,8]},
  {id:'site', pillar:0, title:'A sua empresa hoje tem site ou catálogo digital de produtos/serviços?', options:['Não tenho','Só uso a rede social como "site"','Tenho um site simples/institucional','Tenho site com catálogo de produtos/serviços atualizado'], points:[0,2,5,7]},
  {id:'ads', pillar:1, title:'A sua empresa investe em anúncios (Meta Ads / Google Ads)?', options:['Não invisto em nenhuma plataforma','Invisto em uma delas, de forma esporádica','Invisto em uma delas, de forma consistente','Invisto nas duas, de forma consistente'], points:[0,5,10,16]},
  {id:'volume_leads', pillar:1, title:'Quantos leads/contatos a tua empresa hoje recebe por mês através de anúncios e redes sociais?', options:['Não sei dizer / não recebo','Até 150 por mês','De 151 a 300 por mês','De 301 a 500 por mês','Mais de 500 por mês'], points:[0,2,4,6,9]},
  {id:'velocidade', pillar:2, title:'Qual a velocidade média de resposta a um novo interessado em teus produtos/serviços?', options:['Mais de 1 dia','Ainda no mesmo dia','Em até 1 hora','Em até 15 minutos'], points:[0,4,7,10]},
  {id:'followup', pillar:2, title:'Existe um processo de follow-up com quem não comprou na hora?', options:['Não fazemos follow-up','Às vezes, sem processo definido','Sim, mas de forma manual','Sim, processo estruturado e sistemático'], points:[0,4,7,10]},
  {id:'crm_equipe', pillar:2, title:'Como a sua empresa controla os atendimentos e a equipe comercial?', options:['Sem controle e sem equipe dedicada às vendas','Uso planilha e/ou 1 pessoa cuida das vendas','Uso CRM, mas equipe pequena ou sem dedicação total','Uso CRM e tenho equipe comercial estruturada'], points:[0,5,7,10]},
  {id:'gmn', pillar:3, title:'O Google Meu Negócio da sua empresa está completo e atualizado?', options:['Não tenho perfil / não sei','Tenho, mas está desatualizado','Tenho e atualizo parcialmente','Completo: fotos, horários e respondo avaliações'], points:[0,5,10,15]},
  {id:'metricas', pillar:4, title:'Vocês acompanham métricas como CAC, ROAS e taxa de conversão?', options:['Não acompanho nada disso','Só olho o faturamento no fim do mês','Acompanho vendas e alguns números soltos','Acompanho CAC, ROAS e conversão regularmente'], points:[0,5,10,15]}
];

const QUIZ_STAGES = ['Demanda','Presença','Atendimento','Conversão','Controle'];

const REVENUE_PROFILES = [
  {label:'Operação em fase inicial', short:'fase inicial', context:'Com uma operação em fase inicial, o maior ganho costuma vir de uma base simples, clara e repetível.'},
  {label:'Operação enxuta', short:'operação enxuta', context:'Em uma operação enxuta, consistência e prioridade ajudam a transformar cada esforço em oportunidade.'},
  {label:'Negócio em tração', short:'negócio em tração', context:'Em um negócio em tração, organizar aquisição e vendas ajuda o crescimento a não depender de improviso.'},
  {label:'Negócio em expansão', short:'negócio em expansão', context:'Em um negócio em expansão, processos e métricas dão previsibilidade para o próximo ciclo.'},
  {label:'Operação em escala', short:'operação em escala', context:'Em uma operação em escala, integração entre canais, equipe e indicadores protege a margem e a experiência.'},
  {label:'Operação em escala', short:'operação em escala', context:'Em uma operação em escala, integração entre canais, equipe e indicadores protege a margem e a experiência.'}
];

function revenueProfile(index){return REVENUE_PROFILES[index] || REVENUE_PROFILES[0];}

const ANSWER_INDEX=Object.fromEntries(QUESTIONS.map((question,index)=>[question.id,index]));
function answerAt(answers,id){return answers[ANSWER_INDEX[id]];}

function createPillarNarratives(answers){
  const instagram=answerAt(answers,'instagram'),site=answerAt(answers,'site');
  const ads=answerAt(answers,'ads'),leads=answerAt(answers,'volume_leads');
  const response=answerAt(answers,'velocidade'),followup=answerAt(answers,'followup'),crm=answerAt(answers,'crm_equipe');
  const google=answerAt(answers,'gmn'),metrics=answerAt(answers,'metricas');

  const digital={
    focus:'transformar a presença digital em uma vitrine que gera confiança e conversa',
    strong:instagram===3&&site===3
      ?'Você mantém o Instagram com conteúdo planejado e também tem um site ou catálogo atualizado. Essa combinação dá segurança para quem pesquisa antes de pedir orçamento ou comprar.'
      :instagram===3
        ?'O Instagram já tem uma cadência planejada. Isso cria presença recorrente e é uma boa base para conduzir mais pessoas até a oferta.'
        :'O site ou catálogo atualizado já ajuda o interessado a entender o que a empresa oferece antes de entrar em contato.',
    weak:instagram===0&&site===0
      ?'Hoje a empresa está sem uma vitrine digital consistente: o Instagram está parado e não existe site ou catálogo para apoiar a decisão de quem chega até você.'
      :instagram===0
        ?'Com o Instagram parado, a empresa perde recorrência, prova e lembrança justamente onde muitos clientes pesquisam antes de comprar.'
        :site===0
          ?'Sem site ou catálogo, a pessoa interessada não encontra uma apresentação organizada da oferta depois de chegar pelo Instagram ou indicação.'
          :'A presença já existe, mas ainda sem uma jornada clara entre conteúdo, oferta e contato.',
    action:instagram<=1&&site<=1
      ?'Reative o Instagram com uma sequência simples de oferta, prova e bastidores; em paralelo, publique um catálogo enxuto com serviços ou produtos, diferenciais e botão de contato.'
      :instagram<=1
        ?'Defina uma rotina semanal para o Instagram com três temas: o que você vende, provas de resultado e bastidores. Todo post deve apontar para um próximo passo claro.'
        :site<=1
          ?'Crie um catálogo ou página objetiva com oferta, faixas de preço quando fizer sentido, provas e contato direto para não depender apenas das redes sociais.'
          :'Organize os conteúdos e o catálogo ao redor das principais dúvidas comerciais para reduzir atrito antes do primeiro contato.',
    optimize:'Teste quais conteúdos e páginas mais geram conversa ou pedido de orçamento. Mantenha os formatos vencedores e atualize as informações que mais influenciam a decisão.',
    priority:instagram===0&&site===0
      ?{title:'A empresa ainda não tem uma vitrine digital que sustente a venda',copy:'Com o Instagram parado e sem site ou catálogo, quem descobre sua empresa tem pouca informação para confiar e avançar. Antes de buscar mais alcance, construa uma apresentação simples, atualizada e fácil de converter.'}
      :instagram===0
        ?{title:'O Instagram parado está reduzindo a lembrança e a confiança na empresa',copy:'Sem uma presença recorrente, a empresa desaparece da rotina de quem ainda está avaliando opções. Uma cadência simples de conteúdo, prova e oferta já melhora a percepção e abre mais conversas.'}
        :{title:'A jornada entre interesse e oferta ainda está incompleta',copy:'O canal de descoberta não está levando o interessado para uma página ou catálogo que responda dúvidas e facilite o contato. Conectar conteúdo, oferta e próximo passo reduz essa perda.'}
  };

  const acquisition={
    focus:'criar uma entrada de oportunidades mais previsível',
    strong:ads===3&&leads>=3
      ?'Você investe de forma consistente em Meta e Google e já recebe um volume relevante de contatos. Há uma base real para escalar com controle de qualidade e custo.'
      :ads>=2&&leads>=2
        ?'A empresa já investe com consistência e recebe contatos todos os meses. O próximo ganho vem de separar os canais e repetir o que traz oportunidade qualificada.'
        :'Já existe um canal de aquisição em funcionamento. Com rastreio da origem e qualidade dos contatos, ele pode ficar mais previsível.',
    weak:ads===0&&leads===0
      ?'Hoje não há investimento em anúncios e o volume de contatos de redes sociais não está claro. Isso faz a geração de demanda depender de ações pontuais ou indicação.'
      :ads===0
        ?'Sem mídia paga, a empresa fica mais dependente do alcance orgânico e de indicações para criar novas oportunidades.'
        :leads===0
          ?'Mesmo com algum investimento, a origem e o volume de contatos ainda não estão claros. Sem esse dado, fica difícil decidir onde colocar o próximo real.'
          :'A captação acontece, mas ainda não na frequência ou no volume que permite prever o próximo ciclo comercial.',
    action:ads===0&&leads===0
      ?'Escolha um canal de captação para testar por 30 dias, com uma oferta clara e um orçamento controlado. Registre cada contato para saber se o teste está criando demanda de verdade.'
      :ads===0
        ?'Teste uma campanha de Meta Ads ou Google Ads focada em uma oferta e um público específico. Comece pequeno, acompanhe os contatos gerados e ajuste semanalmente.'
        :leads===0
          ?'Passe a registrar canal, campanha e volume de cada lead. Em duas semanas, você já consegue enxergar quais anúncios ou conteúdos estão trazendo oportunidade real.'
          :'Defina uma meta mensal de leads por canal e reveja anúncios, criativos e oferta toda semana para aumentar o volume sem perder qualidade.',
    optimize:'Compare custo, origem e taxa de avanço dos leads por canal. Direcione a próxima rodada de verba para o canal que entrega conversas mais qualificadas, não apenas mais volume.',
    priority:ads===0&&leads===0
      ?{title:'A geração de demanda ainda não é previsível',copy:'Sem mídia ativa e sem clareza sobre os contatos recebidos, a empresa não controla a entrada de novas oportunidades. O primeiro passo é validar uma oferta e um canal de aquisição mensurável.'}
      :leads===0
        ?{title:'A empresa ainda não enxerga o volume e a origem dos próprios leads',copy:'Há esforço de aquisição, mas não há visibilidade suficiente para saber o que está trazendo contato ou desperdiçando verba. Organizar essa leitura vem antes de aumentar investimento.'}
        :{title:'A captação precisa ganhar consistência para sustentar o comercial',copy:'Quando os contatos chegam de forma irregular, o faturamento fica mais dependente de picos. Uma rotina de aquisição com meta, canal e acompanhamento cria mais previsibilidade.'}
  };

  const sales={
    focus:'evitar que oportunidades esfriarem entre o primeiro contato e a venda',
    strong:response===3&&followup===3&&crm===3
      ?'O atendimento responde em até 15 minutos, tem follow-up estruturado e usa CRM com equipe comercial. Essa é uma base madura para proteger oportunidades e aprender com cada etapa.'
      :response>=2&&followup>=2&&crm>=2
        ?'A empresa já responde com agilidade, acompanha interessados e tem algum controle comercial. Há uma boa estrutura para melhorar conversão com rotina e indicadores.'
        :response>=2
          ?'A velocidade de resposta já está em uma faixa competitiva. Preservar esse tempo de retorno ajuda a impedir que o interessado esfrie.'
          :'Já existe algum processo comercial em funcionamento; o ganho agora é torná-lo mais visível e repetível.',
    weak:response===0
      ?'A primeira resposta leva mais de um dia. Nesse intervalo, o interessado pode comparar alternativas, perder urgência ou simplesmente desistir.'
      :followup===0
        ?'Quem não compra na hora não recebe follow-up. Isso deixa oportunidades que já demonstraram interesse saírem do radar sem uma segunda chance.'
        :crm===0
          ?'Sem controle dos atendimentos e sem equipe dedicada, fica difícil saber quem está esperando retorno, quem recebeu proposta e onde as vendas travam.'
          :'O processo comercial existe, mas ainda depende demais de memória, esforço individual ou ações manuais.',
    action:response===0
      ?'Crie um combinado simples: todo novo contato recebe uma primeira resposta no mesmo dia, com responsável definido e mensagem inicial pronta para agilizar o atendimento.'
      :followup===0
        ?'Monte uma sequência curta de follow-up para quem não fechou: retorno no mesmo dia, lembrete em 48 horas e mensagem final com uma nova razão para avançar.'
        :crm===0
          ?'Centralize os atendimentos em uma planilha ou CRM simples com etapa, responsável, próxima ação e data de retorno. O objetivo é ninguém ficar sem acompanhamento.'
          :'Padronize as etapas do atendimento e transforme o que hoje é manual em uma rotina que a equipe consiga repetir todos os dias.',
    optimize:'Meça semanalmente quantos contatos viram proposta e quantas propostas viram venda. Use o ponto com maior queda para ajustar mensagens, prazo de retorno ou follow-up.',
    priority:response===0
      ?{title:'A demora no primeiro retorno está esfriando oportunidades',copy:'Responder depois de um dia abre espaço para o interessado avançar com outra empresa. Reduzir esse tempo é uma ação direta para proteger a demanda que já chegou até você.'}
      :followup===0
        ?{title:'Oportunidades sem follow-up estão ficando pelo caminho',copy:'O interessado que não compra na primeira conversa ainda pode estar avaliando opções. Sem uma cadência de retorno, a empresa perde vendas que já estavam próximas do comercial.'}
        :crm===0
          ?{title:'A operação comercial ainda não tem visibilidade sobre cada oportunidade',copy:'Sem um controle central, os contatos dependem da memória e da disponibilidade de cada pessoa. Organizar a jornada comercial deixa claro quem precisa de retorno e onde a venda trava.'}
          :{title:'O processo comercial ainda precisa ficar mais repetível',copy:'A base existe, mas precisa de cadência, responsáveis e leitura das etapas para converter com mais consistência.'}
  };

  const local={
    focus:'aparecer bem para quem já procura uma solução na região',
    strong:google===3
      ?'O Google Meu Negócio está completo, atualizado e recebe respostas às avaliações. Isso facilita ser encontrado e transmite confiança para uma procura local.'
      :'O perfil no Google já recebe atenção e pode virar um ponto de entrada cada vez mais forte para buscas locais.',
    weak:google===0
      ?'A empresa não tem um perfil local configurado ou não sabe como ele está. Isso pode tirar visibilidade de pessoas que já estão procurando exatamente o que você oferece.'
      :google===1
        ?'O perfil do Google existe, mas está desatualizado. Informações antigas, fotos fracas ou avaliações sem resposta reduzem confiança antes do primeiro contato.'
        :'O perfil está parcialmente atualizado, mas ainda pode ganhar força com informações completas, fotos e respostas consistentes.',
    action:google===0
      ?'Crie ou reivindique o Perfil da Empresa no Google e complete nome, categoria, telefone, horário, área atendida, serviços e fotos reais antes de divulgar o link.'
      :google===1
        ?'Faça uma revisão completa do perfil: horários, telefone, descrição, serviços, fotos e avaliações. Comece respondendo as avaliações mais recentes.'
        :'Complete os itens que faltam e defina uma rotina mensal para subir fotos, revisar informações e responder avaliações.',
    optimize:'Acompanhe visualizações, ligações, rotas e mensagens do perfil. Use os serviços mais buscados e as dúvidas das avaliações para atualizar fotos e descrições.',
    priority:google===0
      ?{title:'A empresa está pouco visível para quem busca uma solução perto dela',copy:'Sem um Perfil da Empresa no Google completo, buscas locais podem terminar em concorrentes que simplesmente estão mais fáceis de encontrar e avaliar.'}
      :{title:'A presença local ainda não transmite todo o potencial da empresa',copy:'O perfil no Google é uma etapa decisiva para quem já tem intenção de compra. Mantê-lo atualizado reduz dúvida e facilita o primeiro contato.'}
  };

  const management={
    focus:'usar números para decidir onde investir e o que corrigir',
    strong:metrics===3
      ?'Você acompanha CAC, ROAS e conversão com regularidade. Isso cria uma boa base para ajustar investimento e crescimento a partir de evidências.'
      :'A empresa já observa alguns números comerciais, o que é um ponto de partida para decisões mais consistentes.',
    weak:metrics===0
      ?'Hoje não há acompanhamento de CAC, ROAS ou conversão. Sem esses números, fica difícil separar crescimento saudável de esforço que só aumenta trabalho ou custo.'
      :metrics===1
        ?'Olhar apenas o faturamento no fim do mês mostra o resultado, mas não explica onde a oportunidade foi criada, perdida ou ficou cara demais.'
        :'Vendas e alguns números já são acompanhados, mas ainda falta conectar aquisição, custo e conversão para decidir com segurança.',
    action:metrics<=1
      ?'Comece por um painel semanal com quatro números: contatos recebidos, vendas, taxa de conversão e custo de aquisição. Escolha uma decisão prática a partir dele toda semana.'
      :'Conecte os números que já acompanha: origem do lead, custo, proposta e venda. Assim você consegue enxergar qual canal traz resultado de verdade.',
    optimize:'Relacione CAC, ROAS e conversão à rentabilidade por canal. A cada ciclo, escolha um experimento com meta, prazo e critério claro de continuidade.',
    priority:metrics<=1
      ?{title:'As decisões de crescimento ainda acontecem sem visibilidade do retorno',copy:'Faturamento sozinho não mostra quanto custa gerar uma venda ou onde o processo está vazando. Uma rotina curta de métricas permite corrigir antes que o esforço se transforme em desperdício.'}
      :{title:'Os números ainda podem orientar melhor as prioridades comerciais',copy:'Você já acompanha parte da operação. Conectar custo, origem e conversão mostra onde vale acelerar e onde é hora de ajustar.'}
  };

  return [digital,acquisition,sales,local,management];
}

function createReportNarrative(result,answers){
  const pillars=createPillarNarratives(answers);
  const best=result.scores.map((score,i)=>({i,pct:score/PILLARS[i].max})).sort((a,b)=>b.pct-a.pct||a.i-b.i)[0];
  const bottleneck=pillars[result.bottleneck.i];
  const tone=result.total<40
    ?'O maior retorno agora vem de organizar o essencial antes de tentar acelerar.'
    :result.total<60
      ?'A base já existe, mas precisa ganhar rotina para o crescimento não depender de esforço pontual.'
      :result.total<80
        ?'A empresa já tem fundamentos relevantes; o próximo ganho está em fechar os vazamentos que ainda limitam a conversão.'
        :'A operação está bem estruturada. O foco agora é proteger a consistência e otimizar o que já funciona.';
  return {
    pillars,
    summary:`Pelo faturamento informado, sua empresa está em ${result.profile.short}. ${tone} Hoje, a prioridade é ${bottleneck.focus}.`,
    strengthFallback:`Ainda não há uma dimensão consolidada. O ponto mais avançado hoje é ${PILLARS[best.i].name}; fortaleça essa base para ela virar uma vantagem consistente.`,
    weaknessFallback:`Nenhuma dimensão ficou em faixa crítica. O menor resultado está em ${PILLARS[result.bottleneck.i].name}; manter atenção em ${bottleneck.focus} ajuda a proteger o avanço da operação.`,
    priority:bottleneck.priority
  };
}

function calculate(answers){
  if(!Array.isArray(answers) || answers.length!==QUESTIONS.length || !answers.every((value,i)=>Number.isInteger(value)&&value>=0&&value<QUESTIONS[i].options.length)) throw new Error('Responda todas as perguntas.');
  const scores=PILLARS.map(()=>0);
  QUESTIONS.forEach((question,i)=>{if(question.pillar!==null)scores[question.pillar]+=question.points[answers[i]];});
  const total=scores.reduce((sum,score)=>sum+score,0);
  const level=total<40?'Estrutura Inicial':total<60?'Em Desenvolvimento':total<80?'Em Crescimento':'Operação Estruturada';
  const ranked=scores.map((score,i)=>({score,i,pct:score/PILLARS[i].max})).sort((a,b)=>a.score-b.score||a.i-b.i);
  return {scores,total,level,revenueIndex:answers[0],profile:revenueProfile(answers[0]),strengths:ranked.filter(r=>r.pct>=.7).reverse(),weaknesses:ranked.filter(r=>r.pct<.5),bottleneck:ranked[0],actions:ranked.slice(0,3),perfect:total===100};
}
if(typeof module!=='undefined') module.exports={calculate,createPillarNarratives,createReportNarrative,QUESTIONS,PILLARS,REVENUE_PROFILES};

if(typeof document!=='undefined'){
  const $=id=>document.getElementById(id);
  let index=0,answers=Array(QUESTIONS.length).fill(null),lead={},result=null,loadingRun=0;
  function buildHeadlineReveal(animate=true){
    const heading=document.querySelector('#intro h1.headline-reveal');
    if(!heading)return;
    const source=heading.dataset.revealText||(heading.dataset.revealText=heading.textContent.trim());
    const accent=heading.dataset.revealAccent||(heading.dataset.revealAccent=(heading.querySelector('span')?.textContent.trim()||''));
    try{
      const words=source.split(/\s+/),accentWords=accent?accent.split(/\s+/).length:0;
      heading.classList.remove('is-ready','is-finished');
      heading.replaceChildren();
      const tokens=words.map((word,i)=>{
        const token=document.createElement('span');
        token.className=`headline-word${i>=words.length-accentWords?' is-accent':''}`;
        token.textContent=word;
        token.setAttribute('aria-hidden','true');
        heading.append(token,document.createTextNode(' '));
        return token;
      });
      const groups=[];
      tokens.forEach(token=>{
        const last=groups[groups.length-1];
        if(!last||last.top!==token.offsetTop)groups.push({top:token.offsetTop,tokens:[token]});
        else last.tokens.push(token);
      });
      heading.replaceChildren();
      heading.setAttribute('aria-label',source);
      groups.forEach((group,i)=>{
        const line=document.createElement('span');
        line.className='headline-reveal-line';
        line.style.setProperty('--reveal-delay',`${i*.2}s`);
        line.setAttribute('aria-hidden','true');
        group.tokens.forEach((token,wordIndex)=>{line.append(token);if(wordIndex<group.tokens.length-1)line.append(document.createTextNode(' '));});
        const bar=document.createElement('em');
        line.append(bar);
        heading.append(line);
      });
      heading.classList.add('is-ready');
      if(!animate)heading.classList.add('is-finished');
    }catch(error){
      heading.replaceChildren(document.createTextNode(source));
      heading.classList.remove('is-ready','is-finished');
    }
  }
  function initHeadlineReveal(){
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(()=>{buildHeadlineReveal(!reduce);lockIntroLayout();});
    let resizeTimer;
    window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{buildHeadlineReveal(false);lockIntroLayout();},180);},{passive:true});
  }
  function lockIntroLayout(){
    const elements=document.querySelectorAll('#intro h1.headline-reveal,#intro .hero-lead,#intro .intro-note');
    elements.forEach(element=>{
      const previousAnimation=element.style.animation;
      const previousWebkitAnimation=element.style.webkitAnimation;
      element.style.minHeight='';
      element.style.animation='none';
      element.style.webkitAnimation='none';
      const height=Math.ceil(element.getBoundingClientRect().height);
      element.style.minHeight=`${height}px`;
      element.style.animation=previousAnimation;
      element.style.webkitAnimation=previousWebkitAnimation;
    });
  }
  initHeadlineReveal();
  function show(id){
    document.querySelectorAll('.screen').forEach(el=>{el.hidden=el.id!==id;});
    window.scrollTo({top:0,behavior:'instant'});
    const heading=$(id).querySelector('h1,h2,legend>span:last-child');
    if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  }
  function renderQuestion(){
    const q=QUESTIONS[index],completed=answers.filter(a=>a!==null).length,activeStage=Math.min(Math.floor(index/2),4);
    document.querySelectorAll('#quiz-stages li').forEach((stage,i)=>{
      stage.classList.toggle('current',i===activeStage);stage.classList.toggle('done',i<activeStage);
      if(i===activeStage)stage.setAttribute('aria-current','step');else stage.removeAttribute('aria-current');
    });
    $('progress-label').textContent=`Etapa ${activeStage+1} — ${QUIZ_STAGES[activeStage]}`;
    $('progress-percent').textContent=`${completed*10}% respondido`;
    $('progress-fill').style.width=`${completed*10}%`;
    $('progress').setAttribute('aria-valuenow',completed);
    $('question-title').textContent=q.title;
    $('question-hint').textContent=q.hint||'';$('question-hint').hidden=!q.hint;
    $('options').replaceChildren(...q.options.map((label,i)=>{
      const option=document.createElement('label');option.className='option';
      const input=document.createElement('input');input.type='radio';input.name='answer';input.value=i;input.checked=answers[index]===i;input.required=true;
      const span=document.createElement('span');span.textContent=label;option.append(input,span);
      input.addEventListener('change',()=>{answers[index]=i;$('next').disabled=false;const count=answers.filter(a=>a!==null).length;$('progress-percent').textContent=`${count*10}% respondido`;$('progress-fill').style.width=`${count*10}%`;$('progress').setAttribute('aria-valuenow',count);});return option;
    }));
    $('next').disabled=answers[index]===null;$('next').querySelector('.button-label').textContent=index===QUESTIONS.length-1?'Continuar':'Continuar';
  }
  $('start').addEventListener('click',()=>{index=0;answers=Array(QUESTIONS.length).fill(null);renderQuestion();show('question');$('question-title').focus({preventScroll:true});});
  $('back').addEventListener('click',()=>{if(index===0){show('intro');return;}index--;renderQuestion();$('question-title').focus();});
  $('question-form').addEventListener('submit',event=>{event.preventDefault();if(answers[index]===null)return;if(index<QUESTIONS.length-1){index++;renderQuestion();$('question-title').focus();}else{result=calculate(answers);show('lead');$('lead-name').focus({preventScroll:true});}});
  const leadForm=$('lead-form');
  const leadSubmit=leadForm.querySelector('button[type="submit"]');
  const leadSubmitLabel=leadSubmit.querySelector('.button-label');
  const originalLeadSubmitLabel=leadSubmitLabel.textContent;
  let leadPending=false;
  leadForm.addEventListener('submit',async event=>{
    event.preventDefault();
    const name=$('lead-name').value.trim(),phone=$('lead-phone').value.trim(),instagram=$('lead-instagram').value.trim(),digits=phone.replace(/\D/g,'');
    $('lead-error').hidden=true;
    if(name.length<2||digits.length<10||instagram.length<2){$('lead-error').textContent='Confira nome, telefone e Instagram para liberar seu resultado.';$('lead-error').hidden=false;return;}
    if(leadPending)return;
    const instagramHandle=instagram.replace(/^https?:\/\/(?:www\.)?instagram\.com\//i,'').replace(/^@/,'').split(/[/?#]/)[0].trim();
    if(instagramHandle.length<1){$('lead-error').textContent='Informe o @ do Instagram da empresa.';$('lead-error').hidden=false;return;}
    const normalizedInstagram=`@${instagramHandle}`;
    const quizResult=calculate(answers);
    const payload={
      nome:name,
      telefone:phone.replace(/[\s()+-]/g,''),
      instagram:normalizedInstagram,
      faturamento_mensal:QUESTIONS[0].options[answers[0]],
      score:quizResult.total,
      nivel:quizResult.level,
      respostas:Object.fromEntries(QUESTIONS.map((question,i)=>[question.id,question.options[answers[i]]])),
      origem:'quiz-zarped',
      interesse:'Caça-Gargalo',
      idempotencyKey:crypto.randomUUID()
    };
    leadPending=true;leadSubmit.disabled=true;leadSubmitLabel.textContent='Enviando…';leadForm.setAttribute('aria-busy','true');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),30000);
    try{
      const response=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
      let reply={};try{reply=await response.json();}catch(_){/* resposta sem JSON */}
      if(![200,202].includes(response.status)||reply.ok!==true)throw new Error(reply.error||`Webhook respondeu ${response.status}`);
      lead={name,phone,phoneDigits:digits,instagram:normalizedInstagram};
      result=quizResult;
      $('download-status').textContent=reply.duplicate===true?'Este WhatsApp já estava cadastrado. Seu diagnóstico foi gerado normalmente.':'';
      runLoadingSequence();
    }catch(error){
      $('lead-error').textContent=error.name==='AbortError'?'A confirmação demorou. Seus dados continuam no formulário; tente enviar novamente.':'Não foi possível enviar seus dados agora. Eles continuam no formulário; tente novamente.';
      $('lead-error').hidden=false;
    }finally{
      clearTimeout(timer);leadPending=false;leadSubmit.disabled=false;leadSubmitLabel.textContent=originalLeadSubmitLabel;leadForm.removeAttribute('aria-busy');
    }
  });
  function runLoadingSequence(){
    const run=++loadingRun,start=performance.now(),phases=[
      'Analisando seus dados...',
      'Gerando seu relatório detalhado...',
      'Comparando dados com empresas semelhantes...'
    ];
    let activePhase=-1;
    show('loading');
    function setPhase(phase){
      if(phase===activePhase)return;
      activePhase=phase;
      const message=$('loading-message');
      message.classList.add('is-changing');
      setTimeout(()=>{if(run!==loadingRun)return;message.textContent=phases[phase];message.classList.remove('is-changing');},180);
    }
    function frame(now){
      if(run!==loadingRun)return;
      const elapsed=now-start,progress=Math.min(elapsed/3500,1),phase=progress<.34?0:progress<.68?1:2;
      setPhase(phase);
      $('loading-progress-fill').style.width=`${Math.round(progress*100)}%`;
      if(progress<1){requestAnimationFrame(frame);return;}
      result=calculate(answers);renderResult();show('result');animateScore(result.total);
    }
    setPhase(0);requestAnimationFrame(frame);
  }
  function paragraph(text,cls){const p=document.createElement('p');p.textContent=text;if(cls)p.className=cls;return p;}
  function scoreTone(score){
    if(score<40)return{color:'#ff4d5f',soft:'#ff4d5f2b'};
    if(score<60)return{color:'#ff8a3d',soft:'#ff8a3d2b'};
    if(score<80)return{color:'#ffd34e',soft:'#ffd34e2b'};
    return{color:'#35dc8b',soft:'#35dc8b2b'};
  }
  function paintScore(score){
    const gauge=$('score-ring'),card=gauge.closest('.score-card'),tone=scoreTone(score),rounded=Math.round(score);
    const marker=gauge.querySelector('.score-needle path');
    if(marker)marker.setAttribute('d','M 140 31 L 140 54');
    card.style.setProperty('--score-color',tone.color);card.style.setProperty('--score-soft',tone.soft);
    gauge.style.setProperty('--score',Number(score).toFixed(2));
    gauge.style.setProperty('--needle-angle',`${-90+(score*1.8)}deg`);
    gauge.setAttribute('aria-label',`Score ${rounded} de 100`);
  }
  function animateScore(total){
    const ring=$('score-ring'),card=ring.closest('.score-card'),value=$('score-value'),started=performance.now(),duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?1:1650;
    ring.classList.remove('is-settled');card.classList.remove('is-settled');paintScore(0);value.textContent='0';
    function frame(now){
      const progress=Math.min((now-started)/duration,1),eased=1-Math.pow(1-progress,3),current=eased*total;
      paintScore(current);value.textContent=Math.round(current);
      if(progress<1){requestAnimationFrame(frame);return;}
      paintScore(total);value.textContent=total;ring.classList.add('is-settled');card.classList.add('is-settled');
    }
    requestAnimationFrame(frame);
  }
  function renderResult(){
    const report=createReportNarrative(result,answers);
    $('diagnostic-title').textContent=`Diagnóstico · ${lead.instagram}`;
    $('result-name').textContent=lead.name;
    $('profile-tag').textContent=`${result.profile.label} · Faturamento: ${QUESTIONS[0].options[result.revenueIndex]}`;
    $('score-value').textContent='0';paintScore(0);$('level').textContent=result.level;
    $('level-copy').textContent=report.summary;
    $('pillar-bars').replaceChildren(...PILLARS.map((p,i)=>{const row=document.createElement('div');row.className='pillar-bar';row.innerHTML=`<div><span>${p.name}</span><b>${result.scores[i]}/${p.max}</b></div><div class="bar-track"><div style="width:${Math.round(result.scores[i]/p.max*100)}%"></div></div>`;return row;}));
    for(const [id,items,type] of [['strengths',result.strengths,'strong'],['weaknesses',result.weaknesses,'weak']]){
      $(id).replaceChildren(...items.map(({i})=>{const article=document.createElement('div');article.className='diagnosis-item';const h=document.createElement('h3');h.textContent=PILLARS[i].name;article.append(h,paragraph(report.pillars[i][type]));return article;}));
      if(!items.length)$(id).append(paragraph(id==='strengths'?report.strengthFallback:report.weaknessFallback,'empty-state'));
    }
    $('priority-label').textContent='PRINCIPAL GARGALO IDENTIFICADO';
    $('priority-title').textContent=result.perfect?'Próximo ganho: otimizar o que já funciona':report.priority.title;
    $('priority-copy').textContent=result.perfect?`${result.profile.context} Sua operação respondeu bem em todas as dimensões. Use os próximos ciclos para testar melhorias com metas, prazo e impacto mensurável.`:report.priority.copy;
    $('action-plan').replaceChildren(...result.actions.map(({i,pct},n)=>{const card=document.createElement('article');card.className='action-card';card.innerHTML=`<span>${n+1}</span><h3>${PILLARS[i].name}</h3>`;card.append(paragraph(pct<.7?report.pillars[i].action:report.pillars[i].optimize));return card;}));
  }
}
