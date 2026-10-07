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
    await expect(page.getByRole("heading", { level: 1 })).toContainText("won't quit");
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
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "O que fazemos" })).toBeVisible();
    await expect(page.locator("#services .service-row")).toHaveCount(4);
    await expect(page.getByRole("link", { name: /conhecer o relent/i })).toHaveAttribute("href", "/pt/relent");
    await expect(page.getByRole("heading", { name: "Clientes" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Evaldo Klock" })).toBeVisible();
    await expect(page.locator("#contact a.btn-cta")).toHaveAttribute("href", `mailto:${CONTACT_EMAIL}`);
  });

  test("English home is translated", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "What we do" })).toBeVisible();
    await expect(page.getByRole("link", { name: /meet relent/i })).toHaveAttribute("href", "/en/relent");
    await expect(page.getByText("O que fazemos")).toHaveCount(0);
  });

  test("clients include Planet Argon alongside the existing four", async ({ page }) => {
    await page.goto("/en");
    const clients = page.locator("#clients");
    for (const name of ["Planet Argon", "Base Digital", "Unirede", "VIP Commerce", "Gaussian"]) {
      await expect(clients.getByRole("link", { name: new RegExp(name, "i") })).toBeVisible();
    }
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
    await expect(page.getByRole("heading", { level: 1 })).toContainText("won't quit");
    await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible();
    await expect(page.getByText(/always says it is an AI agent/i)).toBeVisible();
    await expect(page.getByText(/built on Claude/i)).toBeVisible();
    const waitlist = page.getByRole("link", { name: /join the waitlist/i }).first();
    await expect(waitlist).toHaveAttribute("href", new RegExp(`^mailto:${CONTACT_EMAIL}\\?subject=`));
  });

  test("Portuguese Relent page is translated", async ({ page }) => {
    await page.goto("/pt/relent");
    await expect(page.getByRole("heading", { name: "Como funciona" })).toBeVisible();
    await expect(page.getByRole("link", { name: /lista de espera/i }).first()).toBeVisible();
  });
});

test.describe("motion and layout", () => {
  test("parallax moves on scroll and stays still under reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await context.newPage();
    await page.goto("/pt");
    await page.locator("#statement").scrollIntoViewIfNeeded();
    await expect
      .poll(() => page.locator("[data-parallax]").first().evaluate((element) => getComputedStyle(element).transform))
      .not.toBe("none");
    await context.close();

    const reduced = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
    const stillPage = await reduced.newPage();
    await stillPage.goto("/pt");
    await stillPage.locator("#statement").scrollIntoViewIfNeeded();
    const transforms = await stillPage
      .locator("[data-parallax]")
      .evaluateAll((elements) => elements.map((element) => getComputedStyle(element).transform));
    expect(transforms.every((transform) => transform === "none")).toBe(true);
    await reduced.close();
  });

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
