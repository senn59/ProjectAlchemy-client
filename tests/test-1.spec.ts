import { test, expect } from "@playwright/test";

test("Signing into an existing account", async ({ page }) => {
    await page.goto("http://localhost:5173/auth/signin");

    await page.fill('[data-test="email-input"]', "test@test.test");
    await page.fill('[data-test="password-input"]', "testing");
    await page.click('[data-test="signin-continue-button"]');

    await expect(page).toHaveURL("http://localhost:5173/projects");

    await page.context().storageState({ path: "auth.json" });
});
