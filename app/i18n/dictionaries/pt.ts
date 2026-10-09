export const pt = {
  meta: {
    title: "Klock Tecnologia | Desenvolvimento de software sob medida — Node.js, Laravel e AWS",
    description:
      "Consultoria de engenharia de software em Cuiabá: aplicações web, APIs, legado, IA (MCP, RAG) e devs dedicados com Node.js, Laravel e AWS para Brasil e EUA.",
  },
  nav: {
    label: "Navegação principal",
    menu: "Menu",
    services: "Serviços",
    products: "Produtos",
    openSource: "Open source",
    relent: "Relent",
    about: "Sobre",
    contact: "Contato",
    cta: "Falar com a gente",
    language: "Idioma",
    home: "Klock Tecnologia — início",
  },
  hero: {
    strip: ["Klock Tecnologia", "Est. 2020", "Cuiabá, BR", "Brasil · EUA"],
    title: "Software sob medida, com rigor de engenharia.",
    subtitle:
      "Desenvolvemos, mantemos e modernizamos aplicações web, APIs e integrações com Node.js, TypeScript, Laravel e AWS — para empresas no Brasil e nos Estados Unidos. Operamos em UTC−3: horário comercial sobreposto ao seu, reuniões e respostas no mesmo dia.",
    primary: "Agendar uma conversa",
    primarySubject: "Novo projeto",
    secondary: "Ver serviços",
    spec: {
      title: "Ficha técnica",
      file: "klock.spec",
      rows: [
        { key: "Stack", value: "Node.js · NestJS · TypeScript · PHP/Laravel · AWS" },
        { key: "Experiência", value: "10+ anos com PHP/Laravel e TypeScript/JavaScript" },
        { key: "IA", value: "Engenharia assistida por IA · MCP · RAG · Agentes" },
        { key: "Entrega", value: "Projetos novos · Manutenção de legado · Times dedicados" },
        { key: "Idiomas", value: "Português · English" },
        { key: "Fuso", value: "UTC−3 · sobreposição com o horário comercial dos EUA" },
        { key: "Resposta", value: "Até 1 dia útil" },
      ],
      now: "Agora",
      clocks: { saoPaulo: "SAO", newYork: "NYC", portland: "PDX", lisbon: "LIS" },
    },
  },
  services: {
    label: "Serviços",
    title: "Do sistema novo ao legado que não pode parar.",
    intro:
      "Mais de 10 anos de experiência com PHP/Laravel e TypeScript/JavaScript, hoje com engenharia assistida por IA no dia a dia: mais velocidade sem abrir mão de código claro, revisado e com prazos combinados.",
    items: [
      {
        title: "Aplicações web e APIs",
        text: "Sistemas internos, plataformas SaaS e APIs REST, integradas ao que a sua empresa já usa.",
        tagsLabel: "Tecnologias",
        tags: ["Node.js", "NestJS", "TypeScript", "Laravel"],
      },
      {
        title: "Manutenção e modernização de legado",
        text: "Assumimos sistemas que já estão rodando — e que não podem parar. Correções, atualização de versões, cobertura de testes e modernização gradual, sem reescrever tudo do zero.",
        tagsLabel: "Áreas",
        tags: ["PHP / Laravel", "Upgrades", "Refatoração", "Suporte contínuo"],
      },
      {
        title: "Aplicações com IA",
        text: "Agentes, servidores MCP e RAG sobre os dados da sua empresa — com a mesma disciplina de engenharia de qualquer sistema em produção. É o que usamos para construir o Relent.",
        tagsLabel: "Tecnologias de IA",
        tags: ["MCP", "RAG", "Agentes de IA", "Claude · OpenAI · Gemini"],
      },
      {
        title: "Desenvolvedores dedicados",
        text: "Engenheiros da Klock dentro do seu time, em tempo real no seu horário comercial — como já fazemos para agências no Brasil e nos Estados Unidos.",
        tagsLabel: "Modelos",
        tags: ["Outsourcing", "Nearshore", "UTC−3"],
      },
      {
        title: "Arquitetura, cloud e consultoria",
        text: "Revisão de arquitetura e de código, infraestrutura na AWS e acompanhamento técnico de produtos em produção.",
        tagsLabel: "Áreas",
        tags: ["AWS", "Sistemas distribuídos", "Code review"],
      },
      {
        title: "Sites e landing pages",
        text: "Páginas rápidas, acessíveis e prontas para SEO, pensadas para quem vai usar — e para converter.",
        tagsLabel: "Foco",
        tags: ["Performance", "SEO técnico", "Acessibilidade"],
      },
      {
        title: "SEO",
        text: "Auditoria técnica, otimização de conteúdo e dados estruturados para o seu site ser encontrado — no Google e nas respostas de IA.",
        tagsLabel: "Foco",
        tags: ["SEO técnico", "Conteúdo", "Search Console"],
      },
      {
        title: "Social media e edição de vídeo",
        text: "Planejamento e produção de conteúdo para redes sociais, com edição de vídeo para Reels, Shorts e YouTube.",
        tagsLabel: "Foco",
        tags: ["Instagram", "Reels · Shorts", "YouTube"],
      },
    ],
  },
  products: {
    label: "Produtos",
    title: "Produtos que construímos e mantemos.",
    intro: "Além dos projetos para clientes, desenvolvemos produtos próprios — o mesmo rigor, aplicado aos nossos problemas.",
    status: "Em desenvolvimento",
    tagline: "Um agente de IA que acompanha pendências por você.",
    text: "Remarcar uma consulta, cobrar um orçamento, pedir um documento. O Relent conversa com a outra parte, insiste com educação ao longo dos dias e te chama quando resolve — ou quando precisa de uma decisão sua.",
    cta: "Conhecer o Relent",
    steps: [
      { title: "Você descreve", text: "O que precisa e com quem, em linguagem natural." },
      { title: "Você confirma", text: "Vira uma tarefa com objetivo claro. Só começa com o seu ok." },
      { title: "Ele conversa e insiste", text: "Lê cada resposta e retoma no intervalo certo." },
      { title: "Ele conclui ou te chama", text: "Para quando resolve. Te avisa se precisar de você." },
    ],
  },
  openSource: {
    label: "Open source",
    title: "Ferramentas abertas para engenharia com IA.",
    intro: "Plugins, skills e CLIs que usamos no dia a dia com Claude Code, Pi e agentes de código — publicados no GitHub.",
    profile: "github.com/ejklock",
    repos: {
      "living-docs-skill": {
        description:
          "Skill para agentes de IA que mantém a documentação do projeto viva: constituição, ADRs, PRDs e diagramas Mermaid, sem drift.",
        tags: ["Agent skill", "Claude Code", "Cursor"],
      },
      "claude-code-mode": {
        description:
          "Code mode para o Claude Code: o modelo escreve um único script que chama as ferramentas da sessão — só o resultado volta.",
        tags: ["Claude Code", "Tokens"],
      },
      "claude-mermaid-render": {
        description:
          "Plugin que renderiza diagramas Mermaid no transcript: cards Unicode coloridos no terminal, SVG nativo no desktop.",
        tags: ["Claude Code", "Mermaid"],
      },
      "claude-usage-mod": {
        description: "Barra acima do prompt com cache, tokens, custo e limites de 5h/7d com contagem regressiva e previsão.",
        tags: ["Claude Code", "Observabilidade"],
      },
      "claude-cache-statusline": {
        description: "Statusline em Rust: tokens acumulados, cache, custo, MCPs ativos e tokens por segundo.",
        tags: ["Rust", "Claude Code"],
      },
      "pi-claude-hooks": {
        description: "Hooks no formato settings.json do Claude Code rodando no agente Pi, com paridade de comportamento.",
        tags: ["Pi", "Hooks"],
      },
      "jira-cli": {
        description: "CLI para navegar e ler o Jira Cloud direto do terminal, em um único binário Rust.",
        tags: ["Rust", "CLI"],
      },
      "active-collab-cli": {
        description: "CLI multiplataforma para ActiveCollab self-hosted (REST API v1): consulte tarefas direto do terminal.",
        tags: ["CLI", "ActiveCollab"],
      },
      "docker-php-env-generate": {
        description: "Gera ambientes Docker Compose prontos para aplicações PHP em minutos.",
        tags: ["PHP", "Docker"],
      },
    },
  },
  process: {
    label: "Como trabalhamos",
    title: "Sem surpresas: tudo combinado por escrito.",
    stepPrefix: "ETAPA",
    steps: [
      {
        title: "Conversa",
        text: "Entendemos o problema e o negócio antes de falar em solução.",
      },
      {
        title: "Proposta",
        text: "Escopo, prazo e valor por escrito. Você sabe o que vai receber.",
      },
      {
        title: "Desenvolvimento",
        text: "Entregas em etapas, com contato direto com quem escreve o código.",
      },
    ],
  },
  clients: {
    label: "Clientes",
    strip: "Clientes atendidos direto ou com times alocados",
    regions: "BR · US",
  },
  about: {
    label: "Sobre",
    title: "Uma consultoria pequena por escolha.",
    text: "A Klock foi fundada em 2020, em Cuiabá, MT. Desenvolvemos e mantemos software para empresas no Brasil e nos Estados Unidos — com código claro, prazos combinados e quem decide sempre ao alcance de uma mensagem.",
    facts: [
      { key: "Experiência", value: "10+ anos" },
      { key: "Fundação", value: "2020" },
      { key: "Sede", value: "Cuiabá, MT" },
      { key: "Atuação", value: "BR · EUA" },
    ],
  },
  founder: {
    eyebrow: "Fundador",
    name: "Evaldo Klock",
    alt: "Evaldo Klock, fundador da Klock Tecnologia",
    role: "Engenheiro de software sênior",
    bio: "Mais de 10 anos em plataformas web e sistemas distribuídos com Node.js, NestJS, TypeScript, PHP/Laravel e AWS. Atende clientes no Brasil e nos Estados Unidos e lidera o desenvolvimento do Relent.",
    links: {
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "E-mail",
    },
  },
  contact: {
    label: "Contato",
    title: "Tem um projeto em mente? Vamos conversar.",
    text: "Conte o que você precisa. Respondemos em até um dia útil, em português ou inglês.",
    clocks: { saoPaulo: "SÃO PAULO", newYork: "NOVA YORK", portland: "PORTLAND", lisbon: "LISBOA" },
  },
  skipLink: "Pular para o conteúdo",
  footer: {
    label: "Rodapé",
    tagline: "Desenvolvimento de software sob medida para empresas no Brasil e nos Estados Unidos.",
    navigation: "Navegação",
    social: "Redes",
    rights: "Todos os direitos reservados.",
  },
  notFound: {
    code: "Erro 404",
    title: "Página não encontrada.",
    text: "O endereço pode ter mudado ou não existe mais.",
    back: "Voltar ao início",
    relent: "Conhecer o Relent",
  },
  relent: {
    meta: {
      title: "Relent | Agente de IA que acompanha pendências",
      description:
        "O Relent é um agente de IA que conversa com prestadores de serviço por você até a pendência ser resolvida.",
    },
    breadcrumb: "Trilha de navegação",
    title: "Um agente de IA que acompanha pendências por você.",
    subtitle:
      "Você diz o que precisa. O Relent conversa com a outra parte e insiste com educação até resolver — ou até precisar de você.",
    waitlist: "Entrar na lista de espera",
    waitlistSubject: "Lista de espera do Relent",
    panel: {
      title: "Pedidos típicos",
      file: "relent.tasks",
      tasks: ["Remarcar uma consulta", "Cobrar um orçamento da oficina", "Pedir um documento ao síndico"],
      channel: "Canal: Telegram · e-mail em breve",
    },
    problem: {
      label: "O problema",
      lead: "Esperar resposta de prestador de serviço toma tempo e atenção.",
      rest: "Mensagens ficam sem retorno, o acompanhamento é esquecido e a pendência se arrasta por semanas.",
    },
    how: {
      label: "Como funciona",
      title: "Você aprova. Ele acompanha até o fim.",
      channels: {
        label: "Canais",
        telegram: "Telegram",
        email: "E-mail · em breve",
        other: "Outros canais · em breve",
      },
      steps: [
        { title: "Você descreve", text: "Em linguagem natural: o que precisa e com quem." },
        {
          title: "Você confirma",
          text: "O pedido vira uma tarefa com objetivo e critério de conclusão. Só começa depois que você aprova.",
        },
        {
          title: "Ele conversa e insiste",
          text: "Fala com a outra parte, lê cada resposta e manda novas mensagens no intervalo certo, por dias se for preciso.",
        },
        {
          title: "Ele conclui ou te chama",
          text: "Quando o objetivo é atingido, ele para. Diante de uma recusa ou de algo que só você decide, ele te avisa.",
        },
      ],
    },
    principles: {
      label: "Princípios",
      title: "Insistente, nunca inconveniente.",
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
    byok: {
      label: "BYOK",
      title: "Use a sua própria chave.",
      text: "Você escolhe o modelo e paga direto ao provedor. Sem intermediário na sua conta de IA.",
      providersLabel: "Provedores compatíveis",
      providers: [
        { name: "Anthropic", models: "Claude" },
        { name: "OpenAI", models: "GPT" },
        { name: "Google", models: "Gemini" },
        { name: "OpenRouter", models: "Vários modelos" },
      ],
    },
    status: {
      label: "Status",
      title: "Seja avisado quando abrirmos.",
      text: "O Relent está em desenvolvimento. Entre na lista de espera e receba o convite primeiro.",
    },
  },
};

export type Dictionary = typeof pt;
