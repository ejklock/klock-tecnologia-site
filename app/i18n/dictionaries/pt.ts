export const pt = {
  meta: {
    title: "Klock Tecnologia | Desenvolvimento de software sob medida",
    description:
      "Consultoria de desenvolvimento de software em Cuiabá, MT, e criadora do Relent, um agente de IA que acompanha pendências por você.",
  },
  nav: {
    label: "Navegação principal",
    services: "Serviços",
    relent: "Relent",
    about: "Sobre",
    contact: "Contato",
    language: "Idioma",
    home: "Klock Tecnologia — início",
  },
  hero: {
    title: "Software sob medida, feito por quem entende do seu negócio.",
    subtitle: "Somos uma consultoria de desenvolvimento em Cuiabá, MT. Atendemos empresas no Brasil e nos Estados Unidos.",
    cta: "Falar com a gente",
  },
  services: {
    title: "Serviços",
    items: [
      {
        title: "Sites e landing pages",
        text: "Páginas rápidas e responsivas, pensadas para quem vai usar.",
      },
      {
        title: "Aplicações web",
        text: "Sistemas internos, APIs e integrações com o que a sua empresa já usa.",
      },
      {
        title: "Consultoria e suporte",
        text: "Revisão de arquitetura e de código, e acompanhamento técnico de produtos em produção.",
      },
      {
        title: "Outsourcing",
        text: "Desenvolvedores da Klock trabalhando dentro do seu time, como já fazemos para agências no Brasil e nos Estados Unidos.",
      },
    ],
  },
  relentTeaser: {
    eyebrow: "Nosso produto",
    tagline: "Um agente de IA que acompanha pendências por você.",
    text: "Você explica o que precisa resolver: remarcar uma consulta, cobrar um orçamento, pedir um documento. O Relent conversa com a outra parte, acompanha ao longo dos dias e te chama quando resolve ou quando precisa de uma decisão sua.",
    cta: "Conhecer o Relent",
  },
  process: {
    title: "Como trabalhamos",
    steps: [
      {
        title: "Conversa",
        text: "Entendemos o problema antes de falar em solução.",
      },
      {
        title: "Proposta",
        text: "Escopo, prazo e valor por escrito.",
      },
      {
        title: "Desenvolvimento",
        text: "Entregas em etapas, com contato direto com quem está desenvolvendo.",
      },
    ],
  },
  clients: {
    title: "Clientes",
    subtitle: "Empresas que atendemos diretamente ou com desenvolvedores alocados nos times delas.",
  },
  about: {
    title: "Sobre a Klock",
    text: "A Klock foi fundada em 2020, em Cuiabá, MT. Desenvolvemos e mantemos software para empresas no Brasil e nos Estados Unidos, com código claro e prazos combinados.",
  },
  founder: {
    eyebrow: "Fundador",
    name: "Evaldo Klock",
    role: "Fundador e engenheiro de software sênior",
    bio: "Desenvolvedor sênior com mais de 10 anos de experiência em plataformas web e sistemas distribuídos, com Node.js, NestJS, TypeScript, PHP/Laravel e AWS. Atende clientes no Brasil e nos Estados Unidos e lidera o desenvolvimento do Relent.",
    links: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "E-mail",
    },
  },
  contact: {
    title: "Contato",
    text: "Conte o que você precisa. Respondemos em até um dia útil.",
    cta: "Enviar e-mail",
  },
  skipLink: "Pular para o conteúdo",
  footer: {
    rights: "Todos os direitos reservados.",
  },
  notFound: {
    title: "Página não encontrada",
    back: "Voltar ao início",
  },
  relent: {
    meta: {
      title: "Relent | Agente de IA que acompanha pendências",
      description:
        "O Relent é um agente de IA que conversa com prestadores de serviço por você até a pendência ser resolvida.",
    },
    eyebrow: "Relent · em desenvolvimento",
    title: "Um agente de IA que acompanha pendências por você.",
    subtitle:
      "Remarcar uma consulta, cobrar um orçamento da oficina, pedir um documento ao síndico. Você diz o que precisa, o Relent conversa com a outra parte e insiste com educação até resolver ou até precisar de você.",
    waitlist: "Entrar na lista de espera",
    waitlistSubject: "Lista de espera do Relent",
    problem: {
      title: "O problema",
      text: "Esperar resposta de prestador de serviço toma tempo e atenção. Mensagens ficam sem retorno, o acompanhamento é esquecido e a pendência se arrasta por semanas.",
    },
    how: {
      title: "Como funciona",
      steps: [
        { title: "Você descreve", text: "Em linguagem natural: o que precisa e com quem." },
        {
          title: "Você confirma",
          text: "O Relent transforma o pedido numa tarefa com objetivo e critério de conclusão. Ele só começa depois que você aprova.",
        },
        {
          title: "Ele conversa e insiste",
          text: "Fala com a outra parte, lê cada resposta e manda novas mensagens no intervalo certo, por dias se for preciso.",
        },
        {
          title: "Ele conclui ou te chama",
          text: "Quando o objetivo é atingido, ele para. Se receber uma recusa ou algo que só você pode decidir, ele te avisa.",
        },
      ],
    },
    principles: {
      title: "Princípios",
      items: [
        {
          title: "Se apresenta como IA",
          text: "Sempre informa que é um agente de IA agindo em nome de alguém.",
        },
        {
          title: "Recusa é recusa",
          text: "Não barganha nem pressiona. A decisão volta para você.",
        },
        {
          title: "Você no controle",
          text: "Acompanhe cada conversa e pause, cancele ou assuma quando quiser.",
        },
        {
          title: "Privacidade",
          text: "Usa só os dados pessoais necessários para cada tarefa, conforme a LGPD.",
        },
      ],
    },
    channels: "Funciona pelo Telegram. E-mail e outros canais estão em desenvolvimento.",
    byok: {
      title: "Use a sua própria chave",
      text: "O Relent funciona com a sua chave de API da Anthropic (Claude), OpenAI, Google (Gemini) ou OpenRouter. Você escolhe o modelo e paga direto ao provedor.",
    },
    status: {
      title: "Status",
      text: "Em desenvolvimento. Entre na lista de espera para saber quando abrir.",
    },
  },
};

export type Dictionary = typeof pt;
