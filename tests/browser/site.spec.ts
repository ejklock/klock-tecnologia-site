import { expect, test, type Page } from "@playwright/test";

const CONTACT_EMAIL = "evaldo@klocktecnologia.com";

test.describe("locale routing", () => {
  test("root redirects an English browser to /en", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await context.close();
  });

  test("root redirects a Portuguese browser to /pt", async ({ browser }) => {
    const context = await browser.newContext({ locale: "pt-BR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/pt$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await context.close();
  });

  test("an unsupported browser language falls back to Portuguese", async ({ browser }) => {
    const context = await browser.newContext({ locale: "de-DE" });
    const page = await context.newPage();
    await page.goto("/relent");
    await expect(page).toHaveURL(/\/pt\/relent$/);
    await context.close();
  });

  test("an unknown path is a 404", async ({ page }) => {
    const response = await page.goto("/fr");
    expect(response?.status()).toBe(404);
  });

  test("the language switcher keeps the current page", async ({ page }) => {
    await page.goto("/pt/relent");
    await page.getByRole("link", { name: "English" }).click();
    await expect(page).toHaveURL(/\/en\/relent$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("follows up on pending tasks");
  });

  test("each page declares hreflang alternates for both languages", async ({ page }) => {
    await page.goto("/en/relent");
    await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute("href", /\/pt\/relent$/);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/relent$/);
  });
});

test.describe("home page", () => {
  test("Portuguese home shows services, Relent, clients, founder and contact", async ({ page }) => {
    await page.goto("/pt");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Software sob medida, com rigor de engenharia.");
    await expect(
      page.getByRole("heading", { name: "Do sistema novo ao legado que não pode parar." }),
    ).toBeVisible();
    await expect(page.locator("#services .service-row")).toHaveCount(8);
    await expect(page.getByRole("link", { name: /conhecer o relent/i })).toHaveAttribute("href", "/pt/relent");
    await expect(page.getByRole("region", { name: "Clientes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Evaldo Klock" })).toBeVisible();
    await expect(page.locator("#contact").getByRole("link", { name: CONTACT_EMAIL })).toHaveAttribute(
      "href",
      `mailto:${CONTACT_EMAIL}`,
    );
  });

  test("English home is translated", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Custom software, engineered with rigor.");
    await expect(
      page.getByRole("heading", { name: "From new builds to legacy systems that can't go down." }),
    ).toBeVisible();
    await expect(page.locator("#services .service-row")).toHaveCount(8);
    await expect(page.getByRole("link", { name: /discover relent/i })).toHaveAttribute("href", "/en/relent");
    await expect(page.getByRole("heading", { name: "Serviços" })).toHaveCount(0);
  });

  test("clients show Planet Argon as a loaded logo alongside the other five", async ({ page }) => {
    await page.goto("/en");
    const clients = page.locator("#clients");
    for (const name of ["Planet Argon", "Base Digital", "Unirede", "VIP Commerce", "Gaussian", "PPGE UFMT"]) {
      await expect(clients.getByRole("link", { name: new RegExp(name, "i") })).toBeVisible();
    }
    const logo = clients.getByRole("img", { name: "Planet Argon" });
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toBeVisible();
    await expect
      .poll(() => logo.evaluate((element: HTMLImageElement) => element.naturalWidth))
      .toBeGreaterThan(0);
  });

  test("founder section links to GitHub, LinkedIn and email", async ({ page }) => {
    await page.goto("/en");
    const founder = page.locator("#founder");
    await expect(founder.getByRole("img", { name: "Evaldo Klock" })).toBeVisible();
    await expect(founder.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/ejklock");
    await expect(founder.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/ejklock");
    await expect(founder.getByRole("link", { name: /email/i })).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
    await expect(founder).toContainText("10+ years");
    await expect(founder).not.toContainText("Planet Argon");
  });

  test("brand logo image loads", async ({ page }) => {
    await page.goto("/pt");
    const logo = page.locator(".nav-logo img");
    await expect(logo).toBeVisible();
    expect(await logo.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  });
});

test.describe("Relent page", () => {
  test("explains the product, its principles, status and waitlist", async ({ page }) => {
    await page.goto("/en/relent");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "An AI agent that follows up on pending tasks for you.",
    );
    await expect(page.getByRole("heading", { name: "You approve. It follows through." })).toBeVisible();
    await expect(page.getByText(/always says it is an AI agent/i)).toBeVisible();
    const waitlist = page.getByRole("link", { name: /join the waitlist/i }).first();
    await expect(waitlist).toHaveAttribute("href", new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=`));
  });

  test("Relent is bring-your-own-key in English", async ({ page }) => {
    await page.goto("/en/relent");
    await expect(page.getByRole("heading", { name: "Use your own key." })).toBeVisible();
    const providers = page.getByRole("list", { name: "Supported providers" });
    for (const provider of ["Anthropic", "OpenAI", "Google", "OpenRouter"]) {
      await expect(providers).toContainText(provider);
    }
    await expect(page.getByText(/Built with Claude|built on Claude/i)).toHaveCount(0);
  });

  test("Relent is bring-your-own-key in Portuguese", async ({ page }) => {
    await page.goto("/pt/relent");
    await expect(page.getByRole("heading", { name: "Use a sua própria chave." })).toBeVisible();
    const providers = page.getByRole("list", { name: "Provedores compatíveis" });
    for (const provider of ["Anthropic", "OpenAI", "Google", "OpenRouter"]) {
      await expect(providers).toContainText(provider);
    }
    await expect(page.getByText(/Feito com Claude|construído sobre o Claude/i)).toHaveCount(0);
  });

  test("Portuguese Relent page is translated", async ({ page }) => {
    await page.goto("/pt/relent");
    await expect(page.getByRole("heading", { name: "Você aprova. Ele acompanha até o fim." })).toBeVisible();
    await expect(page.getByRole("link", { name: /lista de espera/i }).first()).toBeVisible();
  });
});

test.describe("motion and layout", () => {
  for (const path of ["/pt", "/en/relent"]) {
    test(`mobile ${path} has no horizontal overflow`, async ({ browser }) => {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
      await context.close();
    });
  }
});

test.describe("editorial layout", () => {
  for (const path of ["/pt", "/en/relent"]) {
    test(`${path} has none of the template devices`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("[data-parallax], .marquee")).toHaveCount(0);
      const transforms = await page
        .locator("h1, h2:not(.section-label *)")
        .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).textTransform));
      expect(transforms.filter((value) => value === "uppercase")).toEqual([]);
      const align = await page.locator("h1").evaluate((element) => getComputedStyle(element).textAlign);
      expect(align).not.toBe("center");
    });
  }
});

test.describe("localized 404", () => {
  const cases = [
    { path: "/en/nope", text: "Page not found", back: "/en" },
    { path: "/pt/nope", text: "Página não encontrada", back: "/pt" },
    { path: "/fr", text: "Página não encontrada", back: "/pt" },
  ];

  for (const { path, text, back } of cases) {
    test(`404 at ${path} is in the language of its URL`, async ({ browser }) => {
      const context = await browser.newContext({ locale: "pt-BR" });
      const page = await context.newPage();
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByText(text)).toBeVisible();
      await expect(page.locator("main a.btn--primary")).toHaveAttribute("href", back);
      await context.close();
    });
  }
});

test.describe("skip link", () => {
  const labels: Record<string, string> = { "/pt": "Pular para o conteúdo", "/en": "Skip to content" };

  for (const [path, label] of Object.entries(labels)) {
    test(`skip link is the first tab stop on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.keyboard.press("Tab");
      const focused = page.locator(":focus");
      const mainId = await page.locator("main").getAttribute("id");
      expect(mainId).toBeTruthy();
      await expect(focused).toHaveAttribute("href", `#${mainId}`);
      await expect(focused).toBeVisible();
      await expect(focused).toHaveText(label);
    });
  }
});

test.describe("founder section", () => {
  test("founder role line is separated from the bio", async ({ page }) => {
    await page.goto("/pt");
    const founder = page.locator("#founder");
    const role = await founder.getByText("Engenheiro de software sênior", { exact: true }).boundingBox();
    const bio = await founder.getByText(/^Mais de 10 anos em plataformas web/).boundingBox();
    expect(role).not.toBeNull();
    expect(bio).not.toBeNull();
    expect(bio!.y - (role!.y + role!.height)).toBeGreaterThanOrEqual(6);
  });
});

const WHITE = "rgb(255, 255, 255)";

function luminance(rgb: number[]): number {
  const weights = [0.2126, 0.7152, 0.0722];
  return rgb.reduce((sum, channel, index) => {
    const unit = channel / 255;
    const linear = unit <= 0.03928 ? unit / 12.92 : ((unit + 0.055) / 1.055) ** 2.4;
    return sum + (weights[index] ?? 0) * linear;
  }, 0);
}

function contrastAgainstBrandBlue(color: string): number {
  const foreground = luminance((color.match(/\d+/g) ?? []).slice(0, 3).map(Number));
  const background = luminance([31, 54, 112]);
  return (foreground + 0.05) / (background + 0.05);
}

test.describe("brand blue at the ends", () => {
  const heroes = [
    { path: "/pt", hero: "#hero", color: "rgb(31, 54, 112)" },
    { path: "/en/relent", hero: "#hero", color: "rgb(31, 54, 112)" },
  ];

  for (const { path, hero, color } of heroes) {
    test(`brand blue frames header, hero and footer on ${path}`, async ({ page }) => {
      await page.goto(path);
      const background = (selector: string) =>
        page.locator(selector).first().evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(await background(".site-header")).toBe("rgba(31, 54, 112, 0.97)");
      expect(await background(hero)).toBe(color);
      expect(await background(".site-footer")).toBe("rgb(31, 54, 112)");
      const h1 = await page.locator("h1").evaluate((element) => getComputedStyle(element).color);
      expect(h1).toBe(WHITE);
    });
  }

  test("brand keeps the middle sections light", async ({ page }) => {
    await page.goto("/pt");
    const background = await page
      .locator("#services")
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    expect(background).toBe("rgb(246, 246, 243)");
  });

  test("brand header navigation and language switcher are white on blue", async ({ page }) => {
    await page.goto("/pt");
    const colors = await page
      .locator(".nav-links a, .lang-switch__link")
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).color));
    expect(colors.length).toBeGreaterThan(0);
    for (const color of colors) {
      expect(contrastAgainstBrandBlue(color)).toBeGreaterThanOrEqual(4.5);
    }
  });
});

test.describe("hero crest", () => {
  for (const { path, hero } of [
    { path: "/pt", hero: "#hero" },
    { path: "/en/nope", hero: "main section" },
  ]) {
    test(`crest is drawn in the hero on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path);
      const crest = page.locator(`${hero} img[src*="klock-brasao-branco"]`);
      await expect(crest).toBeVisible();
      await expect(crest).toHaveAttribute("alt", "");
    });
  }
});

test.describe("clients in greyscale", () => {
  test("clients lists six loaded logos, each link greyscale at rest", async ({ page }) => {
    await page.goto("/en");
    const clients = page.locator("#clients");
    for (const name of ["Planet Argon", "Base Digital", "Unirede", "VIP Commerce", "Gaussian", "PPGE UFMT"]) {
      const logo = clients.getByRole("img", { name });
      await logo.scrollIntoViewIfNeeded();
      await expect(logo).toBeVisible();
      await expect
        .poll(() => logo.evaluate((element: HTMLImageElement) => element.naturalWidth))
        .toBeGreaterThan(0);
    }
    await expect(clients.getByRole("link", { name: "PPGE UFMT" })).toHaveAttribute("href", "https://ppge.ufmt.br");
    const filters = await clients
      .getByRole("link")
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).filter));
    expect(filters).toEqual(Array(6).fill("grayscale(1)"));
  });
});

test.describe("PPGE logo size", () => {
  test("PPGE UFMT renders 44px tall, other logos 28px tall, no mobile overflow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pt");
    const clients = page.locator("#clients");
    const ppge = clients.getByRole("img", { name: "PPGE UFMT" });
    await ppge.scrollIntoViewIfNeeded();
    const box = await ppge.boundingBox();
    expect(box?.height).toBeCloseTo(44, 0);
    for (const name of ["Planet Argon", "Base Digital", "Unirede", "VIP Commerce", "Gaussian"]) {
      const other = await clients.getByRole("img", { name }).boundingBox();
      expect(other?.height).toBeCloseTo(28, 0);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/pt");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

const FOOTER_BLUE = "rgb(31, 54, 112)";

function contrastAgainst(color: string, background: number[]): number {
  const foreground = luminance((color.match(/\d+/g) ?? []).slice(0, 3).map(Number));
  const other = luminance(background);
  const [high, low] = foreground > other ? [foreground, other] : [other, foreground];
  return (high + 0.05) / (low + 0.05);
}

test.describe("v2 fonts", () => {
  test("body uses Geist, the language switcher uses Geist Mono, Inter is gone", async ({ page }) => {
    await page.goto("/pt");
    const family = (selector: string) =>
      page.locator(selector).first().evaluate((element) => getComputedStyle(element).fontFamily);
    expect(await family("body")).toMatch(/^"?(__)?Geist(?!.?Mono)/);
    expect(await family(".lang-switch__link")).toMatch(/Geist.?Mono/);
    expect(await family("body")).not.toMatch(/Inter/);
  });
});

test.describe("v2 tokens", () => {
  const tokens: Record<string, string> = {
    "--bg": "#f6f6f3",
    "--bg-alt": "#eeeeea",
    "--surface": "#ffffff",
    "--text": "#0d1117",
    "--text-2": "#33384a",
    "--muted": "#43474f",
    "--muted-2": "#5f646d",
    "--line": "#d4d4ce",
    "--line-strong": "#c4c5bf",
    "--accent": "#2d4c9c",
    "--accent-deep": "#1f3670",
    "--on-brand": "#ffffff",
    "--on-brand-soft": "#eef2fb",
    "--on-brand-muted": "#d3dcf2",
    "--on-brand-muted-2": "#dde4f5",
    "--on-brand-faint": "#9fb0dc",
    "--brand-line": "rgba(255, 255, 255, 0.22)",
    "--status": "#2fa36b",
    "--status-on-brand": "#45c486",
  };

  function asRgb(value: string): string {
    const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/.exec(value);
    return match ? `rgb(${match.slice(1).map((hex) => parseInt(hex, 16)).join(", ")})` : value;
  }

  test("root defines every design token and the base styles use them", async ({ page }) => {
    await page.goto("/pt");
    const values = await page.evaluate((names) => {
      const probe = document.createElement("span");
      document.body.append(probe);
      const resolved = names.map((name) => {
        probe.style.backgroundColor = `var(${name})`;
        return getComputedStyle(probe).backgroundColor;
      });
      probe.remove();
      return resolved;
    }, Object.keys(tokens));
    expect(Object.fromEntries(Object.keys(tokens).map((name, index) => [name, values[index]]))).toEqual(
      Object.fromEntries(Object.entries(tokens).map(([name, value]) => [name, asRgb(value)])),
    );

    const computed = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const header = getComputedStyle(document.querySelector(".site-header")!);
      return {
        background: body.backgroundColor,
        color: body.color,
        size: body.fontSize,
        scroll: getComputedStyle(document.documentElement).scrollPaddingTop,
        headerBackground: header.backgroundColor,
        headerBlur: header.backdropFilter,
        headerPosition: header.position,
        headerMin: header.minHeight,
        footerBackground: getComputedStyle(document.querySelector(".site-footer")!).backgroundColor,
      };
    });
    expect(computed).toEqual({
      background: "rgb(246, 246, 243)",
      color: "rgb(13, 17, 23)",
      size: "17px",
      scroll: "72px",
      headerBackground: "rgba(31, 54, 112, 0.97)",
      headerBlur: "blur(12px)",
      headerPosition: "sticky",
      headerMin: "72px",
      footerBackground: FOOTER_BLUE,
    });
  });
});

test.describe("v2 header", () => {
  const cases = [
    {
      locale: "pt",
      links: ["Serviços", "Produtos", "Open source", "Sobre", "Contato"],
      cta: "Falar com a gente",
    },
    { locale: "en", links: ["Services", "Products", "Open source", "About", "Contact"], cta: "Talk to us" },
  ];
  const anchors = ["services", "products", "opensource", "about", "contact"];

  for (const { locale, links, cta } of cases) {
    test(`header on /${locale} has the five links, the CTA, the logo and the switcher`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const header = page.getByRole("banner");
      const nav = header.locator("ul.nav-links");
      await expect(nav.getByRole("link")).toHaveText(links);
      const hrefs = await nav.getByRole("link").evaluateAll((elements) => elements.map((a) => a.getAttribute("href")));
      expect(hrefs).toEqual(anchors.map((anchor) => `/${locale}#${anchor}`));
      await expect(header.getByRole("link", { name: cta, exact: true })).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);

      const logo = header.getByRole("img", { name: "Klock Tecnologia" });
      expect((await logo.boundingBox())?.height).toBeCloseTo(48, 0);
      expect(await logo.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);

      const switcher = header.getByRole("list", { name: locale === "pt" ? "Idioma" : "Language" });
      await expect(switcher.getByRole("listitem")).toHaveCount(2);
      await expect(switcher.getByRole("link")).toHaveText(["PT", "EN"]);
      const colors = await switcher
        .getByRole("link")
        .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).color));
      const [current, other] = locale === "pt" ? colors : [colors[1], colors[0]];
      expect(current).toBe("rgb(255, 255, 255)");
      expect(other).toBe("rgb(211, 220, 242)");

      const all = await header
        .locator("ul.nav-links a, .lang-switch__link")
        .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).color));
      for (const color of all) {
        expect(contrastAgainst(color, [31, 54, 112])).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
});

test.describe("v2 footer", () => {
  const cases = [
    {
      path: "/pt",
      tagline: "Desenvolvimento de software sob medida para empresas no Brasil e nos Estados Unidos.",
      label: "Rodapé",
      links: ["Serviços", "Produtos", "↳ Relent", "Open source", "Sobre", "Contato"],
      relent: "/pt/relent",
      rights: "Todos os direitos reservados.",
    },
    {
      path: "/en/relent",
      tagline: "Custom software development for companies in Brazil and the United States.",
      label: "Footer",
      links: ["Services", "Products", "↳ Relent", "Open source", "About", "Contact"],
      relent: "/en/relent",
      rights: "All rights reserved.",
    },
  ];

  for (const { path, tagline, label, links, relent, rights } of cases) {
    test(`footer on ${path} shows logo, tagline, navigation, social and legal line`, async ({ page }) => {
      await page.goto(path);
      const footer = page.getByRole("contentinfo");
      const logo = footer.getByRole("img", { name: "Klock Tecnologia" });
      expect((await logo.boundingBox())?.height).toBeCloseTo(52, 0);
      await expect(footer.getByText(tagline)).toBeVisible();

      const nav = footer.getByRole("navigation", { name: label });
      await expect(nav.getByRole("link")).toHaveText(links);
      await expect(nav.getByRole("link", { name: "Relent" })).toHaveAttribute("href", relent);

      await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/ejklock");
      await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/ejklock",
      );
      await expect(footer.getByRole("link", { name: "Instagram" })).toHaveAttribute(
        "href",
        "https://www.instagram.com/klocktecnologia",
      );

      const year = new Date().getFullYear();
      await expect(footer.getByText(`© ${year} Klock Tecnologia. ${rights}`)).toBeVisible();
      const legal = footer.getByText("E. J. K. NETO LTDA · CNPJ 38.043.818/0001-64 · Cuiabá, MT");
      await expect(legal).toBeVisible();
      expect(await legal.evaluate((element) => getComputedStyle(element).fontFamily)).toMatch(/Geist.?Mono/);
    });
  }
});

test.describe("v2 json-ld", () => {
  const expected = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Klock Tecnologia",
    url: "https://www.klocktecnologia.com",
    email: CONTACT_EMAIL,
    foundingDate: "2020",
    address: { "@type": "PostalAddress", addressLocality: "Cuiabá", addressRegion: "MT", addressCountry: "BR" },
    areaServed: ["BR", "US"],
    knowsAbout: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "Laravel",
      "PHP",
      "AWS",
      "AI-assisted software engineering",
      "Model Context Protocol (MCP)",
      "Retrieval-Augmented Generation (RAG)",
      "AI agents",
      "SEO",
      "Social media",
      "Video editing",
    ],
    founder: { "@type": "Person", name: "Evaldo Klock" },
  };

  for (const path of ["/pt", "/en"]) {
    test(`${path} carries one ProfessionalService block without a literal less-than sign`, async ({ page }) => {
      await page.goto(path);
      const scripts = page.locator('script[type="application/ld+json"]');
      await expect(scripts).toHaveCount(1);
      const raw = (await scripts.first().textContent()) ?? "";
      expect(raw).not.toContain("<");
      expect(JSON.parse(raw)).toEqual(expected);
    });
  }
});

test.describe("v2 meta", () => {
  const cases = [
    {
      path: "/pt",
      title: "Klock Tecnologia | Desenvolvimento de software sob medida — Node.js, Laravel e AWS",
      description:
        "Consultoria de engenharia de software em Cuiabá: aplicações web, APIs, legado, IA (MCP, RAG) e devs dedicados com Node.js, Laravel e AWS para Brasil e EUA.",
    },
    {
      path: "/en",
      title: "Klock Tecnologia | Custom software development — Node.js, Laravel and AWS",
      description:
        "Software engineering consultancy in Brazil: web apps, APIs, legacy modernization, AI (MCP, RAG) and dedicated Node.js, Laravel and AWS developers for US teams.",
    },
  ];

  for (const { path, title, description } of cases) {
    test(`${path} has the v2 title and description`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", description);
      expect(description.length).toBeLessThanOrEqual(160);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
    });
  }
});

const SPEC_BLUE = "rgb(31, 54, 112)";

test.describe("v2 hero", () => {
  const cases = [
    {
      locale: "pt",
      strip: ["Klock Tecnologia", "Est. 2020", "Cuiabá, BR", "Brasil · EUA"],
      title: "Software sob medida, com rigor de engenharia.",
      subtitle:
        "Desenvolvemos, mantemos e modernizamos aplicações web, APIs e integrações com Node.js, TypeScript, Laravel e AWS — para empresas no Brasil e nos Estados Unidos. Operamos em UTC−3: horário comercial sobreposto ao seu, reuniões e respostas no mesmo dia.",
      primary: "Agendar uma conversa",
      subject: "Novo%20projeto",
      secondary: "Ver serviços",
      sheet: "Ficha técnica",
      keys: ["Stack", "Experiência", "IA", "Entrega", "Idiomas", "Fuso", "Resposta", "Agora"],
      values: [
        "Node.js · NestJS · TypeScript · PHP/Laravel · AWS",
        "10+ anos com PHP/Laravel e TypeScript/JavaScript",
        "Engenharia assistida por IA · MCP · RAG · Agentes",
        "Projetos novos · Manutenção de legado · Times dedicados",
        "Português · English",
        "UTC−3 · sobreposição com o horário comercial dos EUA",
        "Até 1 dia útil",
      ],
    },
    {
      locale: "en",
      strip: ["Klock Tecnologia", "Est. 2020", "Cuiabá, BR", "Brazil · USA"],
      title: "Custom software, engineered with rigor.",
      subtitle:
        "We build, maintain and modernize web applications, APIs and integrations with Node.js, TypeScript, Laravel and AWS for companies in Brazil and the United States. We work in UTC−3, so our hours overlap with yours: same-day meetings and replies.",
      primary: "Book a call",
      subject: "New%20project",
      secondary: "See services",
      sheet: "Spec sheet",
      keys: ["Stack", "Experience", "AI", "Delivery", "Languages", "Time zone", "Response", "Now"],
      values: [
        "Node.js · NestJS · TypeScript · PHP/Laravel · AWS",
        "10+ years with PHP/Laravel and TypeScript/JavaScript",
        "AI-assisted engineering · MCP · RAG · Agents",
        "New builds · Legacy maintenance · Dedicated teams",
        "Portuguese · English",
        "UTC−3 · overlaps US business hours",
        "Within 1 business day",
      ],
    },
  ];

  for (const c of cases) {
    test(`v2 hero on /${c.locale}: strip, h1, CTAs, spec sheet and crest`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${c.locale}`);
      const hero = page.locator("#hero");
      await expect(hero).toHaveCSS("background-color", SPEC_BLUE);

      for (const item of c.strip) await expect(hero.getByText(item, { exact: true })).toBeVisible();
      const separators = hero.locator('[aria-hidden="true"]', { hasText: /^\/$/ });
      await expect(separators).toHaveCount(3);

      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      const h1 = hero.getByRole("heading", { level: 1 });
      await expect(h1).toHaveText(c.title);
      await expect(h1).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(h1).toHaveCSS("font-weight", "500");
      await expect(hero.getByText(c.subtitle, { exact: true })).toBeVisible();

      await expect(hero.getByRole("link", { name: c.primary })).toHaveAttribute(
        "href",
        `mailto:${CONTACT_EMAIL}?subject=${c.subject}`,
      );
      await expect(hero.getByRole("link", { name: c.secondary })).toHaveAttribute("href", /#services$/);

      const sheet = hero.getByLabel(c.sheet);
      await expect(sheet.locator("dt")).toHaveText(c.keys);
      await expect(sheet.locator("dd")).toHaveCount(8);
      await expect(sheet.locator("dd").filter({ hasNotText: /SAO/ })).toHaveText(c.values);
      await expect(hero.getByText("klock.spec", { exact: true })).toBeVisible();

      const crest = hero.locator('img[src*="klock-brasao-branco"]');
      await expect(crest).toBeVisible();
      await expect(crest).toHaveAttribute("alt", "");
      await expect(crest).toHaveCSS("opacity", "0.1");
    });
  }
});

test.describe("v2 clocks", () => {
  const instants = [
    { label: "winter", at: "2026-01-15T14:59:50Z", times: ["11:59", "09:59", "06:59", "14:59"] },
    { label: "summer", at: "2026-07-15T12:00:00Z", times: ["09:00", "08:00", "05:00", "13:00"] },
  ];
  const hero = ["SAO", "NYC", "PDX", "LIS"];
  const contact = {
    pt: ["SÃO PAULO", "NOVA YORK", "PORTLAND", "LISBOA"],
    en: ["SÃO PAULO", "NEW YORK", "PORTLAND", "LISBON"],
  };

  test("the server HTML carries a placeholder for every time and no digits", async ({ request }) => {
    const html = await (await request.get("/pt")).text();
    expect(html.match(/>--:--</g)).toHaveLength(8);
    expect(html).not.toMatch(/>\d\d:\d\d</);
  });

  for (const { label, at, times } of instants) {
    test(`v2 clocks show the four zones at a ${label} instant`, async ({ page }) => {
      await page.clock.install({ time: new Date(at) });
      const problems: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") problems.push(message.text());
      });
      page.on("pageerror", (error) => problems.push(error.message));
      await page.goto("/pt");
      const spec = page.locator("#hero");
      const block = page.locator("#contact");
      for (const [index, zone] of hero.entries()) {
        await expect(spec.getByText(`${zone} ${times[index]}`, { exact: true })).toBeVisible();
      }
      for (const [index, zone] of contact.pt.entries()) {
        await expect(block.getByText(`${zone} ${times[index]}`, { exact: true })).toBeVisible();
      }
      expect(problems).toEqual([]);
    });
  }

  test("v2 clocks refresh every 15 seconds", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-01-15T14:59:50Z") });
    await page.goto("/pt");
    await page.clock.pauseAt(new Date("2026-01-15T14:59:55Z"));
    await expect(page.locator("#hero").getByText("SAO 11:59", { exact: true })).toBeVisible();
    await page.clock.runFor(15_000);
    const expected = ["12:00", "10:00", "07:00", "15:00"];
    for (const [index, zone] of hero.entries()) {
      await expect(page.locator("#hero").getByText(`${zone} ${expected[index]}`, { exact: true })).toBeVisible();
    }
  });

  test("v2 clocks use 24-hour time and English labels on /en", async ({ page }) => {
    await page.clock.install({ time: new Date("2026-01-15T14:59:50Z") });
    await page.goto("/en");
    await expect(page.locator("#hero").getByText("NYC 09:59", { exact: true })).toBeVisible();
    await expect(page.locator("#contact").getByText("NEW YORK 09:59", { exact: true })).toBeVisible();
    await expect(page.locator("#contact").getByText("LISBON 14:59", { exact: true })).toBeVisible();
    await expect(page.locator("#hero").getByText(/AM|PM/)).toHaveCount(0);
  });
});

test.describe("v2 services", () => {
  const cases = [
    {
      locale: "pt",
      label: "Serviços",
      title: "Do sistema novo ao legado que não pode parar.",
      intro:
        "Mais de 10 anos de experiência com PHP/Laravel e TypeScript/JavaScript, hoje com engenharia assistida por IA no dia a dia: mais velocidade sem abrir mão de código claro, revisado e com prazos combinados.",
      rows: [
        ["Aplicações web e APIs", "Tecnologias", 4],
        ["Manutenção e modernização de legado", "Áreas", 4],
        ["Aplicações com IA", "Tecnologias de IA", 4],
        ["Desenvolvedores dedicados", "Modelos", 3],
        ["Arquitetura, cloud e consultoria", "Áreas", 3],
        ["Sites e landing pages", "Foco", 3],
        ["SEO", "Foco", 3],
        ["Social media e edição de vídeo", "Foco", 3],
      ],
    },
    {
      locale: "en",
      label: "Services",
      title: "From new builds to legacy systems that can't go down.",
      intro:
        "10+ years of experience with PHP/Laravel and TypeScript/JavaScript, now with AI-assisted engineering every day: more speed without giving up clear, reviewed code and agreed deadlines.",
      rows: [
        ["Web applications and APIs", "Technologies", 4],
        ["Legacy maintenance and modernization", "Areas", 4],
        ["AI applications", "AI technologies", 4],
        ["Dedicated developers", "Models", 3],
        ["Architecture, cloud and consulting", "Areas", 3],
        ["Websites and landing pages", "Focus", 3],
        ["SEO", "Focus", 3],
        ["Social media and video editing", "Focus", 3],
      ],
    },
  ] as const;

  for (const c of cases) {
    test(`v2 services on /${c.locale}: label, title, intro, eight rows with tags`, async ({ page }) => {
      await page.goto(`/${c.locale}`);
      const services = page.locator("#services");
      await expect(services.getByText("§01", { exact: true })).toBeVisible();
      await expect(services.getByText(c.label, { exact: true })).toBeVisible();
      await expect(services.getByRole("heading", { level: 2 })).toHaveText(c.title);
      await expect(services.getByText(c.intro, { exact: true })).toBeVisible();

      const rows = services.locator(".service-row");
      await expect(rows).toHaveCount(8);
      await expect(services.getByRole("heading", { level: 3 })).toHaveText(c.rows.map(([title]) => title));
      await expect(services.locator('.service-row > [aria-hidden="true"]')).toHaveText(
        ["01", "02", "03", "04", "05", "06", "07", "08"],
      );
      for (const [index, [, tagsLabel, count]] of c.rows.entries()) {
        const tags = rows.nth(index).getByRole("list", { name: tagsLabel });
        await expect(tags.getByRole("listitem")).toHaveCount(count);
      }

      const row = rows.nth(2);
      await expect(row).not.toHaveCSS("background-color", "rgb(255, 255, 255)");
      await row.hover();
      await expect(row).toHaveCSS("background-color", "rgb(255, 255, 255)");
    });
  }
});

test.describe("v2 products and process", () => {
  const cases = [
    {
      locale: "pt",
      title: "Produtos que construímos e mantemos.",
      pill: "Em desenvolvimento",
      tagline: "Um agente de IA que acompanha pendências por você.",
      text: "Remarcar uma consulta, cobrar um orçamento, pedir um documento. O Relent conversa com a outra parte, insiste com educação ao longo dos dias e te chama quando resolve — ou quando precisa de uma decisão sua.",
      cta: "Conhecer o Relent",
      steps: [
        ["Você descreve", "O que precisa e com quem, em linguagem natural."],
        ["Você confirma", "Vira uma tarefa com objetivo claro. Só começa com o seu ok."],
        ["Ele conversa e insiste", "Lê cada resposta e retoma no intervalo certo."],
        ["Ele conclui ou te chama", "Para quando resolve. Te avisa se precisar de você."],
      ],
      processTitle: "Sem surpresas: tudo combinado por escrito.",
      stage: "ETAPA",
      process: [
        ["Conversa", "Entendemos o problema e o negócio antes de falar em solução."],
        ["Proposta", "Escopo, prazo e valor por escrito. Você sabe o que vai receber."],
        ["Desenvolvimento", "Entregas em etapas, com contato direto com quem escreve o código."],
      ],
    },
    {
      locale: "en",
      title: "Products we build and maintain.",
      pill: "In development",
      tagline: "An AI agent that follows up on pending tasks for you.",
      text: "Reschedule an appointment, chase a quote, request a document. Relent talks to the other party, follows up politely for days and checks back with you when it's resolved, or when it needs your decision.",
      cta: "Discover Relent",
      steps: [
        ["You describe it", "What you need and from whom, in plain language."],
        ["You confirm", "It becomes a task with a clear goal. Nothing starts without your OK."],
        ["It talks and follows up", "Reads every reply and tries again at the right interval."],
        ["It finishes or calls you", "Stops when it is resolved. Tells you if it needs you."],
      ],
      processTitle: "No surprises: everything agreed in writing.",
      stage: "STEP",
      process: [
        ["Conversation", "We understand the problem and the business before we talk about solutions."],
        ["Proposal", "Scope, timeline and price in writing. You know what you will receive."],
        ["Development", "Delivery in stages, with direct contact with the people who write the code."],
      ],
    },
  ];

  for (const c of cases) {
    test(`v2 products and process on /${c.locale}`, async ({ page }) => {
      await page.goto(`/${c.locale}`);
      const products = page.locator("#products");
      await expect(products.getByRole("heading", { level: 2 })).toHaveText(c.title);
      await expect(products.getByText(c.pill, { exact: true })).toBeVisible();
      await expect(products.locator(".status-pill__dot")).toHaveCSS("background-color", "rgb(47, 163, 107)");
      await expect(products.getByRole("heading", { level: 3, name: "Relent" })).toBeVisible();
      await expect(products.getByText(c.tagline, { exact: true })).toBeVisible();
      await expect(products.getByText(c.text, { exact: true })).toBeVisible();
      const link = products.getByRole("link", { name: c.cta });
      await expect(link).toHaveAttribute("href", `/${c.locale}/relent`);
      await expect(link).toHaveCSS("background-color", SPEC_BLUE);

      const steps = products.getByRole("listitem");
      await expect(steps).toHaveCount(4);
      for (const [index, [title, text]] of c.steps.entries()) {
        const step = steps.nth(index);
        await expect(step).toContainText(`0${index + 1}`);
        await expect(step).toContainText(title as string);
        await expect(step).toContainText(text as string);
      }

      const process = page.locator("#process");
      await expect(process).toHaveCSS("background-color", "rgb(238, 238, 234)");
      await expect(process.getByRole("heading", { level: 2 })).toHaveText(c.processTitle);
      const items = process.getByRole("listitem");
      await expect(items).toHaveCount(3);
      for (const [index, [title, text]] of c.process.entries()) {
        const item = items.nth(index);
        await expect(item.getByText(`${c.stage} 0${index + 1}`, { exact: true })).toBeVisible();
        await expect(item.getByRole("heading", { level: 3 })).toHaveText(title as string);
        await expect(item.getByText(text as string, { exact: true })).toBeVisible();
      }
    });
  }
});

test.describe("v2 open source", () => {
  const repos = [
    "living-docs-skill",
    "claude-code-mode",
    "claude-mermaid-render",
    "claude-usage-mod",
    "claude-cache-statusline",
    "pi-claude-hooks",
    "jira-cli",
    "active-collab-cli",
    "docker-php-env-generate",
  ];
  const cases = [
    {
      locale: "pt",
      title: "Ferramentas abertas para engenharia com IA.",
      intro:
        "Plugins, skills e CLIs que usamos no dia a dia com Claude Code, Pi e agentes de código — publicados no GitHub.",
      cards: [
        ["Skill para agentes de IA que mantém a documentação do projeto viva: constituição, ADRs, PRDs e diagramas Mermaid, sem drift.", ["Agent skill", "Claude Code", "Cursor"]],
        ["Code mode para o Claude Code: o modelo escreve um único script que chama as ferramentas da sessão — só o resultado volta.", ["Claude Code", "Tokens"]],
        ["Plugin que renderiza diagramas Mermaid no transcript: cards Unicode coloridos no terminal, SVG nativo no desktop.", ["Claude Code", "Mermaid"]],
        ["Barra acima do prompt com cache, tokens, custo e limites de 5h/7d com contagem regressiva e previsão.", ["Claude Code", "Observabilidade"]],
        ["Statusline em Rust: tokens acumulados, cache, custo, MCPs ativos e tokens por segundo.", ["Rust", "Claude Code"]],
        ["Hooks no formato settings.json do Claude Code rodando no agente Pi, com paridade de comportamento.", ["Pi", "Hooks"]],
        ["CLI para navegar e ler o Jira Cloud direto do terminal, em um único binário Rust.", ["Rust", "CLI"]],
        ["CLI multiplataforma para ActiveCollab self-hosted (REST API v1): consulte tarefas direto do terminal.", ["CLI", "ActiveCollab"]],
        ["Gera ambientes Docker Compose prontos para aplicações PHP em minutos.", ["PHP", "Docker"]],
      ],
    },
    {
      locale: "en",
      title: "Open tools for AI-assisted engineering.",
      intro:
        "Plugins, skills and CLIs we use every day with Claude Code, Pi and coding agents, published on GitHub.",
      cards: [
        ["Agent skill that keeps project documentation alive: constitution, ADRs, PRDs and Mermaid diagrams, with no drift.", ["Agent skill", "Claude Code", "Cursor"]],
        ["Code mode for Claude Code: the model writes a single script that calls the session's tools, and only the result comes back.", ["Claude Code", "Tokens"]],
        ["Plugin that renders Mermaid diagrams in the transcript: colored Unicode cards in the terminal, native SVG on desktop.", ["Claude Code", "Mermaid"]],
        ["Status bar above the prompt: cache, tokens, cost and 5h/7d limits with countdown and forecast.", ["Claude Code", "Observability"]],
        ["Rust status line: accumulated tokens, cache, cost, active MCPs and tokens per second.", ["Rust", "Claude Code"]],
        ["Runs hooks written in Claude Code's settings.json format inside the Pi agent, with matching behavior.", ["Pi", "Hooks"]],
        ["CLI to browse and read Jira Cloud from the terminal, in a single Rust binary.", ["Rust", "CLI"]],
        ["Cross-platform CLI for self-hosted ActiveCollab (REST API v1): query tasks from the terminal.", ["CLI", "ActiveCollab"]],
        ["Generates ready-to-use Docker Compose environments for PHP applications in minutes.", ["PHP", "Docker"]],
      ],
    },
  ] as const;

  for (const c of cases) {
    test(`v2 open source on /${c.locale}: nine repo cards in order`, async ({ page }) => {
      await page.goto(`/${c.locale}`);
      const section = page.locator("#opensource");
      await expect(section.getByRole("heading", { level: 2 })).toHaveText(c.title);
      await expect(section.getByText(c.intro, { exact: true })).toBeVisible();
      const profile = section.getByRole("link", { name: "github.com/ejklock" });
      await expect(profile).toHaveAttribute("href", "https://github.com/ejklock");
      await expect(profile).toHaveText("github.com/ejklock ↗");

      const cards = section.locator("li > a");
      await expect(cards).toHaveCount(9);
      const hrefs = await cards.evaluateAll((elements) => elements.map((element) => element.getAttribute("href")));
      expect(hrefs).toEqual(repos.map((repo) => `https://github.com/ejklock/${repo}`));

      for (const [index, repo] of repos.entries()) {
        const card = cards.nth(index);
        const [description, tags] = c.cards[index] as readonly [string, readonly string[]];
        await expect(card).toHaveAttribute("rel", /noopener/);
        await expect(card).toHaveAccessibleName(new RegExp(`^${repo} `));
        const name = card.getByText(repo, { exact: true });
        await expect(name).toHaveCSS("font-family", /Geist.?Mono/);
        await expect(card.getByText(description, { exact: true })).toBeVisible();
        for (const tag of tags) await expect(card.getByText(tag, { exact: true })).toBeVisible();
        await expect(card.locator('[aria-hidden="true"]')).toHaveText("↗");
      }
    });
  }
});

test.describe("v2 about and contact", () => {
  const cases = [
    {
      locale: "pt",
      title: "Uma consultoria pequena por escolha.",
      text: "A Klock foi fundada em 2020, em Cuiabá, MT. Desenvolvemos e mantemos software para empresas no Brasil e nos Estados Unidos — com código claro, prazos combinados e quem decide sempre ao alcance de uma mensagem.",
      facts: [["Experiência", "10+ anos"], ["Fundação", "2020"], ["Sede", "Cuiabá, MT"], ["Atuação", "BR · EUA"]],
      alt: "Evaldo Klock, fundador da Klock Tecnologia",
      label: "Fundador",
      role: "Engenheiro de software sênior",
      bio: /^Mais de 10 anos em plataformas web e sistemas distribuídos/,
      email: "E-mail",
      contactTitle: "Tem um projeto em mente? Vamos conversar.",
      contactText: "Conte o que você precisa. Respondemos em até um dia útil, em português ou inglês.",
    },
    {
      locale: "en",
      title: "A small consultancy, by choice.",
      text: "Klock was founded in 2020 in Cuiabá, Brazil. We build and maintain software for companies in Brazil and the United States, with clear code, agreed deadlines and decision-makers always a message away.",
      facts: [["Experience", "10+ years"], ["Founded", "2020"], ["Based in", "Cuiabá, MT"], ["Serving", "BR · US"]],
      alt: "Evaldo Klock, founder of Klock Tecnologia",
      label: "Founder",
      role: "Senior software engineer",
      bio: /^10\+ years building web platforms and distributed systems/,
      email: "Email",
      contactTitle: "Have a project in mind? Let's talk.",
      contactText: "Tell us what you need. We reply within one business day, in English or Portuguese.",
    },
  ] as const;

  for (const c of cases) {
    test(`v2 about and contact on /${c.locale}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${c.locale}`);
      const about = page.locator("#about");
      await expect(about.getByRole("heading", { level: 2 })).toHaveText(c.title);
      await expect(about.getByText(c.text, { exact: true })).toBeVisible();
      await expect(about.locator("dl dt")).toHaveText(c.facts.map(([key]) => key));
      await expect(about.locator("dl dd")).toHaveText(c.facts.map(([, value]) => value));

      const founder = about.locator("#founder");
      const portrait = founder.getByRole("img", { name: c.alt, exact: true });
      await expect(portrait).toBeVisible();
      const box = await portrait.boundingBox();
      expect([box?.width, box?.height]).toEqual([136, 136]);
      await expect(portrait).toHaveCSS("object-fit", "cover");
      await expect(founder.getByText(c.label, { exact: true })).toBeVisible();
      await expect(founder.getByRole("heading", { level: 3 })).toHaveText("Evaldo Klock");
      await expect(founder.getByText(c.role, { exact: true })).toBeVisible();
      await expect(founder.getByText(c.bio)).toBeVisible();
      await expect(founder.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/ejklock");
      await expect(founder.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/ejklock",
      );
      await expect(founder.getByRole("link", { name: c.email, exact: true })).toHaveAttribute(
        "href",
        `mailto:${CONTACT_EMAIL}`,
      );
      if (c.locale === "en") await expect(founder).not.toContainText("Planet Argon");

      const contact = page.locator("#contact");
      await expect(contact).toHaveCSS("background-color", SPEC_BLUE);
      await expect(contact.getByRole("heading", { level: 2 })).toHaveText(c.contactTitle);
      await expect(contact.getByText(c.contactText, { exact: true })).toBeVisible();
      await expect(contact.getByRole("link", { name: CONTACT_EMAIL, exact: true })).toHaveAttribute(
        "href",
        `mailto:${CONTACT_EMAIL}`,
      );
    });
  }
});

test.describe("v2 clients", () => {
  const names = ["Planet Argon", "Base Digital", "Unirede", "VIP Commerce", "Gaussian", "PPGE UFMT"];
  const urls = [
    "https://www.planetargon.com",
    "https://base.digital",
    "https://aunirede.org.br",
    "https://www.vipcommerce.com.br",
    "https://www.gaussiansolucoes.com.br",
    "https://ppge.ufmt.br",
  ];

  for (const { locale, label, strip } of [
    { locale: "pt", label: "Clientes", strip: "Clientes atendidos direto ou com times alocados" },
    { locale: "en", label: "Clients", strip: "Clients served directly or through embedded teams" },
  ]) {
    test(`v2 clients on /${locale}: six greyscale logo links`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${locale}`);
      const clients = page.getByRole("region", { name: label });
      await expect(clients.getByText(strip, { exact: true })).toBeVisible();
      await expect(clients.getByText("BR · US", { exact: true })).toBeVisible();
      await expect(clients.getByRole("heading")).toHaveCount(0);

      const links = clients.getByRole("link");
      await expect(links).toHaveCount(6);
      for (const [index, name] of names.entries()) {
        const link = links.nth(index);
        await expect(link).toHaveAttribute("href", urls[index] as string);
        await expect(link).toHaveAccessibleName(name);
        const logo = link.getByRole("img");
        await logo.scrollIntoViewIfNeeded();
        await expect.poll(() => logo.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
        expect((await logo.boundingBox())?.height).toBeCloseTo(name === "PPGE UFMT" ? 44 : 28, 0);
        await expect(link).toHaveCSS("filter", "grayscale(1)");
        await expect(link).toHaveCSS("opacity", "0.65");
      }

      const first = links.first();
      await first.hover();
      await expect(first).toHaveCSS("opacity", "1");
      expect(await first.evaluate((element) => getComputedStyle(element).filter)).toMatch(/^(none|grayscale\(0\))$/);
    });
  }

  test("v2 clients at 390px have no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of ["/pt", "/en"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    }
  });
});

const RELENT_BLUE = "rgb(31, 54, 112)";

const relentCases = [
  {
    locale: "pt",
    breadcrumb: "Trilha de navegação",
    products: "Produtos",
    pill: "Em desenvolvimento",
    title: "Um agente de IA que acompanha pendências por você.",
    subtitle:
      "Você diz o que precisa. O Relent conversa com a outra parte e insiste com educação até resolver — ou até precisar de você.",
    waitlist: "Entrar na lista de espera",
    subject: "Lista%20de%20espera%20do%20Relent",
    how: "Como funciona",
    panel: "Pedidos típicos",
    tasks: ["Remarcar uma consulta", "Cobrar um orçamento da oficina", "Pedir um documento ao síndico"],
    channel: "Canal: Telegram · e-mail em breve",
    problem: "O problema",
    statementLead: "Esperar resposta de prestador de serviço toma tempo e atenção.",
    statementRest: "Mensagens ficam sem retorno, o acompanhamento é esquecido e a pendência se arrasta por semanas.",
    howTitle: "Você aprova. Ele acompanha até o fim.",
    steps: ["Você descreve", "Você confirma", "Ele conversa e insiste", "Ele conclui ou te chama"],
    channels: "Canais",
    soon: ["E-mail · em breve", "Outros canais · em breve"],
    principlesTitle: "Insistente, nunca inconveniente.",
    asAi: "Se apresenta como IA",
    byokTitle: "Use a sua própria chave.",
    byokText: "Você escolhe o modelo e paga direto ao provedor. Sem intermediário na sua conta de IA.",
    providers: "Provedores compatíveis",
    many: "Vários modelos",
    statusTitle: "Seja avisado quando abrirmos.",
    statusText: "O Relent está em desenvolvimento. Entre na lista de espera e receba o convite primeiro.",
  },
  {
    locale: "en",
    breadcrumb: "Breadcrumb",
    products: "Products",
    pill: "In development",
    title: "An AI agent that follows up on pending tasks for you.",
    subtitle:
      "You say what you need. Relent talks to the other party and follows up politely until it's resolved, or until it needs you.",
    waitlist: "Join the waitlist",
    subject: "Relent%20waitlist",
    how: "How it works",
    panel: "Typical requests",
    tasks: [
      "Reschedule an appointment",
      "Chase a quote from the repair shop",
      "Request a document from the building manager",
    ],
    channel: "Channel: Telegram · email coming soon",
    problem: "The problem",
    statementLead: "Waiting on a service provider takes time and attention.",
    statementRest: "Messages go unanswered, follow-ups get forgotten and the task drags on for weeks.",
    howTitle: "You approve. It follows through.",
    steps: ["You describe it", "You confirm", "It talks and follows up", "It finishes or calls you"],
    channels: "Channels",
    soon: ["Email · coming soon", "Other channels · coming soon"],
    principlesTitle: "Persistent, never pushy.",
    asAi: "Identifies as AI",
    byokTitle: "Use your own key.",
    byokText: "You choose the model and pay the provider directly. No middleman on your AI bill.",
    providers: "Supported providers",
    many: "Many models",
    statusTitle: "Get notified when we open.",
    statusText: "Relent is in development. Join the waitlist and get your invite first.",
  },
];

test.describe("v2 relent hero", () => {
  for (const c of relentCases) {
    test(`v2 relent hero on /${c.locale}/relent`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/${c.locale}/relent`);
      const hero = page.locator("#hero");
      await expect(hero).toHaveCSS("background-color", RELENT_BLUE);
      await expect(hero.locator('img[src*="klock-brasao-branco"]')).toHaveCount(0);

      const crumbs = hero.getByRole("navigation", { name: c.breadcrumb });
      await expect(crumbs.getByRole("link")).toHaveCount(2);
      await expect(crumbs.getByRole("link", { name: "Klock" })).toHaveAttribute("href", `/${c.locale}`);
      await expect(crumbs.getByRole("link", { name: c.products })).toHaveAttribute("href", `/${c.locale}#products`);
      await expect(crumbs.locator('[aria-current="page"]')).toHaveText("Relent");
      await expect(crumbs.locator('[aria-hidden="true"]', { hasText: /^\/$/ })).toHaveCount(2);
      await expect(hero.getByText(c.pill, { exact: true })).toBeVisible();

      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      const h1 = hero.getByRole("heading", { level: 1 });
      await expect(h1).toHaveText(c.title);
      await expect(h1).toHaveCSS("color", "rgb(255, 255, 255)");
      await expect(hero.getByText(c.subtitle, { exact: true })).toBeVisible();

      await expect(hero.getByRole("link", { name: c.waitlist })).toHaveAttribute(
        "href",
        new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=${c.subject}$`),
      );
      await expect(hero.getByRole("link", { name: c.how })).toHaveAttribute("href", /#how$/);

      await expect(hero.getByText(c.panel, { exact: true })).toBeVisible();
      await expect(hero.getByText("relent.tasks", { exact: true })).toBeVisible();
      for (const task of c.tasks) await expect(hero.getByText(task, { exact: true })).toBeVisible();
      await expect(hero.getByText(c.channel, { exact: true })).toBeVisible();
    });
  }
});

test.describe("v2 relent body", () => {
  for (const c of relentCases) {
    test(`v2 relent body on /${c.locale}/relent`, async ({ page }) => {
      await page.goto(`/${c.locale}/relent`);

      await expect(page.getByRole("heading", { level: 2, name: c.problem })).toBeVisible();
      const statement = page.getByText(c.statementLead);
      await expect(statement).toContainText(c.statementRest);
      await expect(statement.getByText(c.statementRest)).toHaveCSS("color", "rgb(95, 100, 109)");

      const problem = page.locator("section", { has: page.getByRole("heading", { level: 2, name: c.problem }) });
      await expect(problem).toHaveCSS("border-bottom", "1px solid rgb(212, 212, 206)");

      const how = page.locator("#how");
      await expect(how).toHaveCSS("border-top-width", "0px");
      await expect(how).toHaveCSS("border-bottom-width", "0px");
      await expect(how.getByRole("heading", { level: 2 })).toHaveText(c.howTitle);
      await expect(how.getByRole("heading", { level: 3 })).toHaveText(c.steps);
      await expect(how.locator("ol > li")).toHaveCount(4);
      await expect(how.locator("ol > li").first().locator("span").first()).toHaveText("01");
      await expect(how.locator("ol > li").last().locator("span").first()).toHaveText("04");
      await expect(how.getByText(c.channels, { exact: true })).toBeVisible();
      const telegram = how.getByText("Telegram", { exact: true });
      await expect(telegram.locator("[aria-hidden]")).toHaveCSS("background-color", "rgb(47, 163, 107)");
      for (const soon of c.soon) await expect(how.getByText(soon, { exact: true })).toBeVisible();

      const principles = page.locator("section", {
        has: page.getByRole("heading", { level: 2, name: c.principlesTitle }),
      });
      await expect(principles).toHaveCSS("background-color", "rgb(238, 238, 234)");
      await expect(principles.getByRole("heading", { level: 3 })).toHaveCount(4);
      await expect(principles.getByRole("heading", { level: 3, name: c.asAi })).toBeVisible();

      const byok = page.locator("section", { has: page.getByRole("heading", { level: 2, name: c.byokTitle }) });
      await expect(byok.getByText(c.byokText, { exact: true })).toBeVisible();
      const rows = byok.getByRole("list", { name: c.providers }).getByRole("listitem");
      await expect(rows).toHaveCount(4);
      await expect(rows).toHaveText(["AnthropicClaude", "OpenAIGPT", "GoogleGemini", `OpenRouter${c.many}`]);
      await expect(
        page.getByText(/Built with Claude|built on Claude|Feito com Claude|construído sobre o Claude/i),
      ).toHaveCount(0);

      const status = page.locator("section", {
        has: page.getByRole("heading", { level: 2, name: c.statusTitle }),
      });
      await expect(status).toHaveCSS("background-color", RELENT_BLUE);
      await expect(status.getByText(c.statusText, { exact: true })).toBeVisible();
      await expect(status.getByRole("link", { name: c.waitlist })).toHaveAttribute(
        "href",
        new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=${c.subject}$`),
      );
    });
  }
});

test.describe("v2 relent json-ld", () => {
  const publisher = { "@type": "Organization", name: "Klock Tecnologia", url: "https://www.klocktecnologia.com" };
  const expected = {
    pt: {
      description:
        "O Relent é um agente de IA que conversa com prestadores de serviço por você até a pendência ser resolvida.",
      inLanguage: "pt-BR",
    },
    en: {
      description: "Relent is an AI agent that talks to service providers for you until the pending task is resolved.",
      inLanguage: "en",
    },
  };

  for (const locale of ["pt", "en"] as const) {
    test(`/${locale}/relent carries ProfessionalService and SoftwareApplication`, async ({ page }) => {
      await page.goto(`/${locale}/relent`);
      const scripts = page.locator('script[type="application/ld+json"]');
      await expect(scripts).toHaveCount(2);
      const raws = await scripts.allTextContents();
      for (const raw of raws) expect(raw).not.toContain("<");
      const blocks = raws.map((raw) => JSON.parse(raw) as { "@type": string });
      expect(blocks.map((block) => block["@type"]).sort()).toEqual(["ProfessionalService", "SoftwareApplication"]);
      expect(blocks.find((block) => block["@type"] === "SoftwareApplication")).toEqual({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Relent",
        description: expected[locale].description,
        url: `https://www.klocktecnologia.com/${locale}/relent`,
        inLanguage: expected[locale].inLanguage,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        publisher,
      });
    });

    test(`/${locale} carries only the ProfessionalService block`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const scripts = page.locator('script[type="application/ld+json"]');
      await expect(scripts).toHaveCount(1);
      const block = JSON.parse((await scripts.first().textContent()) ?? "") as { "@type": string };
      expect(block["@type"]).toBe("ProfessionalService");
    });
  }
});

test.describe("v2 not found", () => {
  const cases = [
    {
      path: "/en/nope",
      code: "Error 404",
      title: "Page not found.",
      text: "The address may have changed or no longer exists.",
      back: "Back to home",
      relent: "Discover Relent",
      home: "/en",
      line: "GET /en/nope → 404 Not Found",
    },
    {
      path: "/pt/nope",
      code: "Erro 404",
      title: "Página não encontrada.",
      text: "O endereço pode ter mudado ou não existe mais.",
      back: "Voltar ao início",
      relent: "Conhecer o Relent",
      home: "/pt",
      line: "GET /pt/nope → 404 Not Found",
    },
    {
      path: "/fr",
      code: "Erro 404",
      title: "Página não encontrada.",
      text: "O endereço pode ter mudado ou não existe mais.",
      back: "Voltar ao início",
      relent: "Conhecer o Relent",
      home: "/pt",
      line: "GET /pt/fr → 404 Not Found",
    },
  ];

  for (const c of cases) {
    test(`v2 not found at ${c.path}`, async ({ browser }) => {
      const context = await browser.newContext({ locale: "pt-BR", viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const response = await page.goto(c.path);
      expect(response?.status()).toBe(404);
      const screen = page.locator("main section");
      await expect(screen).toHaveCSS("background-color", RELENT_BLUE);
      await expect(screen.getByText(c.code, { exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title);
      await expect(screen.getByText(c.text, { exact: true })).toBeVisible();
      await expect(screen.getByRole("link", { name: c.back })).toHaveAttribute("href", c.home);
      await expect(screen.getByRole("link", { name: c.relent })).toHaveAttribute("href", `${c.home}/relent`);
      await expect(screen.getByText(c.line, { exact: true })).toBeVisible();
      await expect(screen.locator(".error-screen__arrow")).toHaveAttribute("aria-hidden", "true");
      const crest = screen.locator('img[src*="klock-brasao-branco"]');
      await expect(crest).toHaveAttribute("alt", "");
      await expect(crest).toHaveCSS("opacity", "0.1");
      await context.close();
    });
  }

  test("a 300-character path is shown in full without horizontal overflow at 390px", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const path = `/pt/${"a".repeat(300)}`;
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator("main").getByText(`GET ${path} → 404 Not Found`, { exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await context.close();
  });

  test("a script in the path is shown as text and never runs", async ({ page }) => {
    const dialogs: string[] = [];
    page.on("dialog", (dialog) => {
      dialogs.push(dialog.message());
      void dialog.dismiss();
    });
    const response = await page.goto("/pt/%3Cscript%3Ealert(1)%3C%2Fscript%3E");
    expect(response?.status()).toBe(404);
    const line = page.locator("main").getByText(/^GET \/pt\/.*404 Not Found$/);
    await expect(line).toContainText("script");
    await expect(line).toContainText("alert(1)");
    await expect(page.locator("main script")).toHaveCount(0);
    expect(dialogs).toEqual([]);
  });
});

test.describe("v2 llms", () => {
  const SITE = "https://www.klocktecnologia.com";
  const description =
    "Software engineering consultancy in Brazil: web apps, APIs, legacy modernization, AI (MCP, RAG) and dedicated Node.js, Laravel and AWS developers for US teams.";
  const repos = [
    "living-docs-skill",
    "claude-code-mode",
    "claude-mermaid-render",
    "claude-usage-mod",
    "claude-cache-statusline",
    "pi-claude-hooks",
    "jira-cli",
    "active-collab-cli",
    "docker-php-env-generate",
  ];

  function section(body: string, name: string): string[] {
    const start = body.indexOf(`## ${name}\n`);
    expect(start).toBeGreaterThanOrEqual(0);
    const rest = body.slice(start + name.length + 4);
    const end = rest.indexOf("\n## ");
    return (end === -1 ? rest : rest.slice(0, end)).split("\n").filter((line) => line.startsWith("- "));
  }

  test("GET /llms.txt serves the site summary as plain text without redirecting", async ({ playwright, baseURL }) => {
    const request = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { "Accept-Language": "pt-BR" },
      maxRedirects: 0,
    });
    const response = await request.get("/llms.txt");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^text\/plain;\s*charset=utf-8/i);
    const body = await response.text();
    const home = await (await request.get("/en")).text();
    await request.dispose();

    expect(body.startsWith(`# Klock Tecnologia\n\n> ${description}`)).toBe(true);

    expect(body).toContain(
      "Use your own key. You choose the model and pay the provider directly. No middleman on your AI bill.",
    );
    expect(body.split("\n")).toContain("Supported providers: Anthropic, OpenAI, Google, OpenRouter");
    expect(body).not.toContain("bring-your-own-key");

    const services = section(body, "Services");
    expect(services).toHaveLength(8);
    for (const line of services) {
      const title = /^- \*\*(.+?)\*\*: /.exec(line)?.[1] ?? "";
      expect(title).not.toBe("");
      expect(home).toContain(title);
    }

    expect(section(body, "Products").some((line) => line.startsWith(`- [Relent](${SITE}/en/relent): `))).toBe(true);

    const openSource = section(body, "Open source");
    expect(openSource).toHaveLength(9);
    for (const repo of repos) {
      expect(openSource.some((line) => line.startsWith(`- [${repo}](https://github.com/ejklock/${repo}): `))).toBe(
        true,
      );
    }

    const pages = section(body, "Pages").join("\n");
    for (const url of [`${SITE}/en`, `${SITE}/pt`, `${SITE}/en/relent`, `${SITE}/pt/relent`]) {
      expect(pages).toContain(`](${url})`);
    }

    expect(section(body, "Contact").join("\n")).toContain(CONTACT_EMAIL);

    const links = [...body.matchAll(/\]\(([^)]*)\)/g)].map((match) => match[1] ?? "");
    expect(links.length).toBeGreaterThan(14);
    for (const link of links) expect(link).toMatch(/^https:\/\//);
  });
});

test.describe("mobile menu", () => {
  const BREAKPOINT_PX = 912;
  const SECTION_ANCHORS = ["services", "products", "opensource", "about", "contact"];
  const locales = [
    { locale: "pt", cta: "Falar com a gente", language: "Idioma" },
    { locale: "en", cta: "Talk to us", language: "Language" },
  ];

  for (const { locale, cta, language } of locales) {
    test.describe(`on /${locale}`, () => {
      test("at 390px the bar is one row with logo, language switcher and a collapsed menu toggle", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`/${locale}`);
        const header = page.getByRole("banner");
        const toggle = header.getByRole("button", { name: "Menu" });
        await expect(toggle).toBeVisible();
        await expect(toggle).toHaveAttribute("aria-expanded", "false");
        await expect(header.getByRole("img", { name: "Klock Tecnologia" })).toBeVisible();
        await expect(header.getByRole("list", { name: language })).toBeVisible();
        await expect(header.locator("ul.nav-links")).toBeHidden();
        await expect(header.getByRole("link", { name: cta, exact: true })).toBeHidden();
        expect((await header.boundingBox())?.height).toBeLessThanOrEqual(72);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
      });

      test("at 1440px the desktop row is on one line and the toggle is hidden", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`/${locale}`);
        const header = page.getByRole("banner");
        await expect(header.getByRole("button", { name: "Menu" })).toBeHidden();
        const targets = [
          header.getByRole("img", { name: "Klock Tecnologia" }),
          header.locator("ul.nav-links"),
          header.getByRole("list", { name: language }),
          header.getByRole("link", { name: cta, exact: true }),
        ];
        const centers: number[] = [];
        for (const target of targets) {
          await expect(target).toBeVisible();
          const box = await target.boundingBox();
          centers.push((box?.y ?? 0) + (box?.height ?? 0) / 2);
        }
        for (const center of centers) {
          expect(Math.abs(center - (centers[0] ?? 0))).toBeLessThanOrEqual(1);
        }
      });

      test("the desktop row shows at the breakpoint width and the toggle shows one pixel below it", async ({ page }) => {
        const header = page.getByRole("banner");
        await page.setViewportSize({ width: BREAKPOINT_PX, height: 900 });
        await page.goto(`/${locale}`);
        await expect(header.getByRole("button", { name: "Menu" })).toBeHidden();
        await expect(header.locator("ul.nav-links")).toBeVisible();
        expect((await header.boundingBox())?.height).toBeLessThanOrEqual(72);

        await page.setViewportSize({ width: BREAKPOINT_PX - 1, height: 900 });
        await expect(header.getByRole("button", { name: "Menu" })).toBeVisible();
        await expect(header.locator("ul.nav-links")).toBeHidden();
      });

      test("at 320px the bar is one row with no horizontal overflow", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 640 });
        await page.goto(`/${locale}`);
        const header = page.getByRole("banner");
        await expect(header.getByRole("button", { name: "Menu" })).toBeVisible();
        expect((await header.boundingBox())?.height).toBeLessThanOrEqual(72);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
      });

      test("the toggle is at least 44px square and the page logs no console error", async ({ page }) => {
        const problems: string[] = [];
        page.on("console", (message) => {
          if (message.type() === "error" || message.type() === "warning") problems.push(message.text());
        });
        page.on("pageerror", (error) => problems.push(error.message));
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`/${locale}`);
        const toggle = page.getByRole("banner").getByRole("button", { name: "Menu" });
        const box = await toggle.boundingBox();
        expect(box?.width).toBeGreaterThanOrEqual(44);
        expect(box?.height).toBeGreaterThanOrEqual(44);
        await toggle.click();
        await expect(toggle).toHaveAttribute("aria-expanded", "true");
        expect(problems).toEqual([]);
      });
    });
  }

  test("the server HTML carries the collapsed toggle without running scripts", async ({ request }) => {
    const html = await (await request.get("/pt")).text();
    expect(html).toMatch(/<button[^>]*aria-expanded="false"[^>]*>/);
  });

  test.describe("opening and closing at 390px", () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto("/pt");
    });

    test("the toggle opens a panel with the five links and the CTA and Tab reaches the first link", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      const panelId = await toggle.getAttribute("aria-controls");
      const panel = page.locator(`[id="${panelId}"]`);
      const links = panel.locator("ul.nav-links").getByRole("link");
      await expect(links).toHaveText(["Serviços", "Produtos", "Open source", "Sobre", "Contato"]);
      const hrefs = await links.evaluateAll((elements) => elements.map((a) => a.getAttribute("href")));
      expect(hrefs).toEqual(SECTION_ANCHORS.map((anchor) => `/pt#${anchor}`));
      await expect(panel.getByRole("link", { name: "Falar com a gente", exact: true })).toBeVisible();

      await toggle.focus();
      await page.keyboard.press("Tab");
      await expect(links.first()).toBeFocused();
    });

    test("Escape closes the panel and returns focus to the toggle", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Escape");
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(header.locator("ul.nav-links")).toBeHidden();
      await expect(toggle).toBeFocused();
    });

    test("pressing the toggle twice closes the panel", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(header.locator("ul.nav-links")).toBeHidden();
    });

    test("choosing a section link closes the panel and shows the section below the header", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await header.getByRole("link", { name: "Serviços" }).click();
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(header.locator("ul.nav-links")).toBeHidden();
      const headerBottom = (await header.boundingBox())?.height ?? 0;
      await expect
        .poll(async () => {
          const top = (await page.locator("#services").boundingBox())?.y ?? -1;
          return top >= headerBottom - 1 && top < 844;
        })
        .toBe(true);
    });

    test("switching language with the panel open lands on /en with the panel closed", async ({ page }) => {
      const header = page.getByRole("banner");
      await header.getByRole("button", { name: "Menu" }).click();
      await header.getByRole("link", { name: "English" }).click();
      await expect(page).toHaveURL(/\/en$/);
      await expect(header.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
      await expect(header.locator("ul.nav-links")).toBeHidden();
    });

    test("widening to desktop with the panel open shows the plain desktop row", async ({ page }) => {
      const header = page.getByRole("banner");
      await header.getByRole("button", { name: "Menu" }).click();
      await page.setViewportSize({ width: 1440, height: 900 });
      await expect(header.getByRole("button", { name: "Menu" })).toBeHidden();
      await expect(header.locator("ul.nav-links")).toBeVisible();
      expect((await header.boundingBox())?.height).toBeLessThanOrEqual(72);
    });

    test("the keyboard-focused toggle shows an outline that differs from the header background", async ({ page }) => {
      const toggle = page.getByRole("banner").getByRole("button", { name: "Menu" });
      await toggle.click();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await expect(toggle).toBeFocused();
      const outline = await toggle.evaluate((element) => {
        const style = getComputedStyle(element);
        return { color: style.outlineColor, width: style.outlineWidth, style: style.outlineStyle };
      });
      expect(outline.style).not.toBe("none");
      expect(parseFloat(outline.width)).toBeGreaterThan(0);
      expect(outline.color).toBe("rgb(255, 255, 255)");
    });

    test("the panel stays closed after widening to desktop and narrowing again", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(header.locator("ul.nav-links")).toBeHidden();
    });

    test("the panel stays open while resizing within the mobile range", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await page.setViewportSize({ width: BREAKPOINT_PX - 1, height: 844 });
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(header.locator("ul.nav-links")).toBeVisible();
    });

    test("widening to exactly the breakpoint width and back leaves the panel closed", async ({ page }) => {
      const header = page.getByRole("banner");
      const toggle = header.getByRole("button", { name: "Menu" });
      await toggle.click();
      await page.setViewportSize({ width: BREAKPOINT_PX, height: 844 });
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(toggle).toHaveAttribute("aria-expanded", "false");
      await expect(header.locator("ul.nav-links")).toBeHidden();
    });
  });

  for (const { locale, cta } of locales) {
    test.describe(`keyboard order on /${locale}`, () => {
      const languageNames = ["Português", "English"];
      const focused = (page: Page) =>
        page.evaluate(() => {
          const element = document.activeElement as HTMLElement | null;
          return {
            text: element?.getAttribute("aria-label") ?? element?.textContent?.trim() ?? "",
            left: element?.getBoundingClientRect().left ?? -1,
            inHeader: !!element?.closest("header"),
          };
        });

      const tabThrough = async (page: Page, steps: number) => {
        const visited = [];
        for (let step = 0; step < steps; step += 1) {
          await page.keyboard.press("Tab");
          visited.push(await focused(page));
        }
        return visited;
      };

      test("at 1440px Tab visits the section links, the language links and the CTA left to right", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(`/${locale}`);
        const header = page.getByRole("banner");
        const sections = await header.locator("ul.nav-links a").allTextContents();
        expect(sections).toHaveLength(5);
        await header.locator("a.nav-logo").focus();
        const visited = await tabThrough(page, 8);
        expect(visited.map((item) => item.text)).toEqual([...sections, ...languageNames, cta]);
        for (let index = 1; index < visited.length; index += 1) {
          expect(visited[index]?.left).toBeGreaterThan(visited[index - 1]?.left ?? 0);
        }
      });

      test("at 390px with the panel closed Tab visits the language links then the toggle only", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`/${locale}`);
        const header = page.getByRole("banner");
        await header.locator("a.nav-logo").focus();
        const visited = await tabThrough(page, 4);
        expect(visited.slice(0, 3).map((item) => item.text)).toEqual([...languageNames, "Menu"]);
        expect(visited[3]?.inHeader).toBe(false);
      });

      test("at 390px with the panel open Tab from the toggle visits the five links then the CTA", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`/${locale}`);
        const header = page.getByRole("banner");
        await header.getByRole("button", { name: "Menu" }).click();
        const expected = await header.locator("ul.nav-links a").allTextContents();
        const visited = await tabThrough(page, 6);
        expect(visited.map((item) => item.text)).toEqual([...expected, cta]);
      });

      for (const width of [390, 1440]) {
        test(`at ${width}px each language link resolves to one element`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(`/${locale}`);
          const header = page.getByRole("banner");
          for (const name of languageNames) await expect(header.getByRole("link", { name })).toHaveCount(1);
        });
      }
    });
  }

  test("at 1440px the desktop gaps are 32px and 20px with no negative margin on the switcher", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/pt");
    const header = page.getByRole("banner");
    const lastLink = (await header.locator("ul.nav-links a").last().boundingBox())!;
    const firstLang = (await header.getByRole("link", { name: "Português" }).boundingBox())!;
    const lastLang = (await header.getByRole("link", { name: "English" }).boundingBox())!;
    const cta = (await header.getByRole("link", { name: "Falar com a gente", exact: true }).boundingBox())!;
    expect(Math.abs(firstLang.x - (lastLink.x + lastLink.width) - 32)).toBeLessThanOrEqual(1);
    expect(Math.abs(cta.x - (lastLang.x + lastLang.width) - 20)).toBeLessThanOrEqual(1);
    const margins = await header.getByRole("list", { name: "Idioma" }).evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.marginLeft, style.marginRight];
    });
    expect(margins).toEqual(["0px", "0px"]);
  });
});
