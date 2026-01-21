import { Browser, BrowserContext, chromium, devices, firefox, Locator, webkit } from '@playwright/test';
import { BROWSERS, PLATFORMS } from './Constants';

export function timestamp(): string { /* Top‑level named function declaration. */
  // yyyyMMddHHmmss
  const now: Date = new Date();
  const timestamp: string = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0') +
    String(now.getSeconds()).padStart(2, '0');
  return timestamp;
}

export function emailAddress(): string {
  return `sad${timestamp()}@gmail.com`;
}

export const sleep = (seconds: number): Promise<void> => new Promise<void>(r => setTimeout(r, seconds * 1000));


type Platform = 'iOS' | 'Android' | 'macOS';
export async function setPlatform(platform: Platform, browser: Browser): Promise<BrowserContext> {
  let context: BrowserContext;

  switch (platform) {
    case PLATFORMS.IOS: {
      // Use a close iPhone preset (you can pick any: iPhone 13/14/SE)
      const iphone = devices['iPhone 13'];
      context = await browser.newContext({ ...iphone });
      return context;
    }
    case PLATFORMS.ANDROID: {
      const pixel2 = devices['Pixel 2'];
      context = await browser.newContext({ ...pixel2 });
      return context;
    }
    case PLATFORMS.MACOS: {
      // Desktop spoof: userAgent + viewport (+ scale factor if you want)
      context = await browser.newContext({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
      });
      return context;
    }
    default:
      context = await browser.newContext(); // default desktop
      return context;
  }
}

type BrowserName = 'Chrome' | 'Firefox' | 'Edge' | 'Safari';
export async function setBrowser(target: BrowserName): Promise<{ browser: Browser; context: BrowserContext }> {
  switch (target) {
    case BROWSERS.EDGE: {
      const browser = await chromium.launch({ channel: 'msedge', headless: false });
      const context = await browser.newContext();
      return { browser, context };
    }
    case BROWSERS.FIREFOX: {
      const browser = await firefox.launch({ headless: false });
      const context = await browser.newContext();
      return { browser, context };
    }
    case BROWSERS.SAFARI: { // WebKit
      const browser = await webkit.launch({ headless: false });
      const context = await browser.newContext({ ignoreHTTPSErrors: true });
      return { browser, context };
    }
    default:
      const browser = await chromium.launch({ channel: 'chrome', headless: false });
      const context = await browser.newContext();
      return { browser, context };
  }
}

export async function textContentOf(locator: Locator): Promise<string> {
  return (await locator.textContent())?.trim() || '';
}