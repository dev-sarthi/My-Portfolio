// Optional isolated tooling: npm install --prefix .tools/ui --no-package-lock playwright @axe-core/playwright
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "../.tools/ui/node_modules/playwright/index.mjs";
import AxeBuilder from "../.tools/ui/node_modules/@axe-core/playwright/dist/index.mjs";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
await fs.mkdir("test-results", { recursive: true });
const failures = [];
const results = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => failures.push(error.message));
  await page.goto(base);
  await page.getByRole("heading", { name: "Hi, I’m Parth Sarthi." }).waitFor();
  await page.getByText("PROCEDURAL CORE / LIVE 3D").waitFor({ timeout: 20000 });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.getByRole("button", { name: "Pause 3D animation" }).click();
  await page.getByRole("button", { name: "Play 3D animation" }).waitFor();
  await page
    .getByRole("link", { name: "Explore Projects", exact: true })
    .click();
  await page.waitForTimeout(900);
  assert.equal(
    await page.locator("nav a[aria-current]").textContent(),
    "Projects",
  );
  await page.screenshot({ path: "test-results/desktop-projects.png" });
  const trigger = page.getByRole("button", { name: "View VIGIL case study" });
  await trigger.click();
  assert.equal(
    await page.locator("dialog").evaluate((el) => el.matches(":modal")),
    true,
  );
  for (const heading of [
    "Problem",
    "Approach",
    "Architecture",
    "Implementation",
    "Challenges",
    "Outcome",
  ]) {
    await page
      .getByRole("dialog")
      .getByRole("heading", { name: heading, exact: true })
      .waitFor();
  }
  const modalAxe = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(
    modalAxe.violations.map((x) => x.id),
    [],
    "Case-study accessibility violations",
  );
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(
        () => document.activeElement.closest("dialog") !== null,
      ),
      true,
    );
  }
  await page.keyboard.press("Escape");
  assert.equal(
    await trigger.evaluate((el) => el === document.activeElement),
    true,
  );
  await page.getByRole("button", { name: "View LifeLens case study" }).click();
  assert.match(await page.getByRole("dialog").innerText(), /#43/);
  await page.getByRole("button", { name: "Close case study" }).click();
  await page.getByRole("button", { name: "View Praniti case study" }).click();
  assert.match(await page.getByRole("dialog").innerText(), /not been filed/);
  await page.keyboard.press("Escape");
  await page.locator(".skill-category").nth(4).click();
  assert.equal(
    await page.locator(".skill-category").nth(4).getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(await page.locator(".skill-focus h3").textContent(), "AI/ML");
  await page.waitForTimeout(700);
  await page.screenshot({ path: "test-results/desktop-skills.png" });
  const pdf = await context.request.get(`${base}/Parth-Sarthi-Resume.pdf`);
  assert.equal(pdf.status(), 200);
  assert.equal((await pdf.body()).subarray(0, 4).toString(), "%PDF");
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter((link) => !document.getElementById(link.hash.slice(1)))
        .map((link) => link.hash),
    );
  assert.deepEqual(brokenAnchors, []);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  await fs.writeFile(
    "test-results/accessibility.json",
    JSON.stringify(axe.violations, null, 2),
  );
  assert.deepEqual(
    axe.violations.map((x) => x.id),
    [],
    "Desktop accessibility violations",
  );
  results.push(
    "Desktop: WebGL scene, pause, anchors, all case studies, native modal focus trap/restore, skill selection, PDF, and axe scan passed.",
  );
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await page.waitForTimeout(700);
    const overflow = await page.evaluate(() => ({
      viewport: innerWidth,
      content: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > innerWidth)
        .map((el) => ({
          html: el.outerHTML.slice(0, 200),
          right: el.getBoundingClientRect().right,
        }))
        .slice(0, 12),
    }));
    assert.ok(
      overflow.content <= overflow.viewport,
      `Horizontal overflow at ${width}: ${JSON.stringify(overflow)}`,
    );
    if (width === 390) {
      await page.screenshot({
        path: "test-results/mobile-hero.png",
        fullPage: false,
      });
      assert.equal(
        await page.locator("canvas").count(),
        0,
        "Mobile must not initialize WebGL before opt-in",
      );
      await page.getByRole("button", { name: "Enable interactive 3D" }).click();
      await page.getByText("PROCEDURAL CORE / LIVE 3D").waitFor();
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Projects", exact: true })
        .click();
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
      await page.waitForTimeout(700);
      await page.screenshot({ path: "test-results/mobile-projects.png" });
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .evaluate((el) => el === document.activeElement),
        true,
      );
      const mobileAxe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      assert.deepEqual(
        mobileAxe.violations.map((x) => x.id),
        [],
        "Mobile accessibility violations",
      );
      await page.screenshot({
        path: "test-results/mobile-full.png",
        fullPage: true,
      });
    }
  }
  results.push(
    "Responsive: no overflow at 320, 390, 768, 1024, 1440 px; mobile menu, Escape and accessibility scan passed.",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  await page.getByText("PROCEDURAL CORE / LIVE 3D").waitFor();
  assert.equal(
    await page.getByRole("button", { name: "Pause 3D animation" }).count(),
    0,
  );
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  results.push(
    "Reduced motion: static WebGL rendering, animation control omitted, smooth scrolling disabled.",
  );
  await page.goto(`${base}/does-not-exist`);
  await page
    .getByRole("heading", { name: "This path is still unexplored." })
    .waitFor();
  results.push("Unknown route displays useful 404.");
  await page.goto(`${base}/#contact`);
  await page
    .getByRole("heading", { name: "Have an idea worth building?" })
    .waitFor();
  await page.waitForTimeout(500);
  assert.ok(
    await page
      .locator("#contact")
      .evaluate((el) => el.getBoundingClientRect().top < innerHeight),
    "Direct hash links must reach the target after React mounts",
  );
  await page.screenshot({ path: "test-results/desktop-contact.png" });
  await context.close();
  const fallbackContext = await browser.newContext();
  await fallbackContext.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.startsWith("webgl")
        ? null
        : original.call(this, type, ...args);
    };
  });
  const fallbackPage = await fallbackContext.newPage();
  await fallbackPage.goto(base);
  await fallbackPage.waitForTimeout(1800);
  await fallbackPage
    .getByRole("heading", { name: "Hi, I’m Parth Sarthi." })
    .waitFor();
  assert.equal(
    await fallbackPage
      .locator(".core-fallback")
      .evaluate((el) => getComputedStyle(el).opacity),
    "1",
  );
  await fallbackPage
    .getByRole("link", { name: "Explore Projects", exact: true })
    .click();
  await fallbackPage.screenshot({ path: "test-results/fallback.png" });
  results.push(
    "Unavailable WebGL: static illustration and primary navigation remain usable.",
  );
  assert.deepEqual(failures, [], "Unexpected page errors");
  console.log(results.join("\n"));
  await fs.writeFile("test-results/validation.txt", results.join("\n"));
} finally {
  await browser.close();
}
