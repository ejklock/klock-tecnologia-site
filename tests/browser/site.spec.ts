import { expect, test } from "@playwright/test";

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
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Software sob medida, feito por quem entende do seu negócio.",
    );
    await expect(page.getByRole("heading", { name: "Serviços" })).toBeVisible();
    await expect(page.locator("#services .service-row")).toHaveCount(4);
    await expect(page.getByRole("link", { name: /conhecer o relent/i })).toHaveAttribute("href", "/pt/relent");
    await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Evaldo Klock" })).toBeVisible();
    await expect(page.locator("#contact a.btn-cta")).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  test("English home is translated", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Custom software, built by people who understand your business.",
    );
    await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();
    await expect(page.locator("#services .service-row")).toHaveCount(4);
    await expect(page.getByRole("link", { name: /discover relent/i })).toHaveAttribute("href", "/en/relent");
    await expect(page.getByRole("heading", { name: "Serviços" })).toHaveCount(0);
  });

  test("clients show Planet Argon as a loaded logo alongside the other four", async ({ page }) => {
    await page.goto("/en");
    const clients = page.locator("#clients");
    for (const name of ["Planet Argon", "Base Digital", "Unirede", "VIP Commerce", "Gaussian"]) {
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
    await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible();
    await expect(page.getByText(/always says it is an AI agent/i)).toBeVisible();
    const waitlist = page.getByRole("link", { name: /join the waitlist/i }).first();
    await expect(waitlist).toHaveAttribute("href", new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=`));
  });

  test("Relent is bring-your-own-key in English", async ({ page }) => {
    await page.goto("/en/relent");
    await expect(page.getByRole("heading", { name: "Use your own key" })).toBeVisible();
    const text = page.getByText(/your own API key/i);
    for (const provider of ["Anthropic (Claude)", "OpenAI", "Google (Gemini)", "OpenRouter"]) {
      await expect(text).toContainText(provider);
    }
    await expect(page.getByText(/Built with Claude|built on Claude/i)).toHaveCount(0);
  });

  test("Relent is bring-your-own-key in Portuguese", async ({ page }) => {
    await page.goto("/pt/relent");
    await expect(page.getByRole("heading", { name: "Use a sua própria chave" })).toBeVisible();
    const text = page.getByText(/sua chave de API/i);
    for (const provider of ["Anthropic (Claude)", "OpenAI", "Google (Gemini)", "OpenRouter"]) {
      await expect(text).toContainText(provider);
    }
    await expect(page.getByText(/Feito com Claude|construído sobre o Claude/i)).toHaveCount(0);
  });

  test("Portuguese Relent page is translated", async ({ page }) => {
    await page.goto("/pt/relent");
    await expect(page.getByRole("heading", { name: "Como funciona" })).toBeVisible();
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
      await expect(page.locator("[data-parallax], .marquee, .statement")).toHaveCount(0);
      const transforms = await page
        .locator("h1, h2")
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
      await expect(page.locator("main a.btn-cta")).toHaveAttribute("href", back);
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
    const role = await page.locator("#founder .lead").boundingBox();
    const bio = await page.locator("#founder .lead + p").boundingBox();
    expect(role).not.toBeNull();
    expect(bio).not.toBeNull();
    expect(bio!.y - (role!.y + role!.height)).toBeGreaterThanOrEqual(6);
  });
});
