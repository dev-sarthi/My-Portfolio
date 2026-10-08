import { chromium } from "../.tools/ui/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<html><body style="margin:0;background:#080b12;color:#edf0f7;font-family:Arial,sans-serif"><main style="position:relative;box-sizing:border-box;width:1200px;height:630px;padding:70px 80px;overflow:hidden"><p style="color:#afbcff;letter-spacing:4px;font-size:15px">AI/ML · FULL-STACK · SYSTEM DESIGN</p><h1 style="font-size:86px;letter-spacing:-5px;line-height:1.05;font-weight:500;margin:55px 0 28px;position:relative;z-index:1">Hi, I’m<br><span style="color:#afbcff">Parth Sarthi.</span></h1><p style="font-size:25px;line-height:1.5;color:#bac5da">Intelligent systems.<br>Thoughtful digital experiences.</p><svg style="position:absolute;right:-35px;top:80px" width="540" height="470" viewBox="0 0 540 470"><defs><radialGradient id="c"><stop stop-color="#304978"/><stop offset="1" stop-color="#11182b"/></radialGradient></defs><circle cx="270" cy="230" r="125" fill="url(#c)" stroke="#5c79c1"/><g fill="none" stroke-width="2"><ellipse cx="270" cy="230" rx="220" ry="100" stroke="#889eea" transform="rotate(-30 270 230)"/><ellipse cx="270" cy="230" rx="220" ry="100" stroke="#9275d0" transform="rotate(40 270 230)"/><ellipse cx="270" cy="230" rx="220" ry="100" stroke="#5989c5" transform="rotate(95 270 230)"/></g><g fill="#b9cbff"><circle cx="160" cy="102" r="5"/><circle cx="447" cy="250" r="5"/><circle cx="285" cy="435" r="5"/></g></svg><span style="position:absolute;bottom:50px;right:70px;color:#8b9bba;font-size:15px;letter-spacing:3px">DEV-SARTHI / PORTFOLIO</span></main></body></html>`,
  );
  await page.screenshot({ path: "public/social-card.png" });
} finally {
  await browser.close();
}
