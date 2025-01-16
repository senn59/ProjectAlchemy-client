import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("test@test.test");
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill("testing");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Open" }).click();
    await page.getByRole("button", { name: "Go to settings" }).click();
    await page.getByLabel("Email Address").click();
    await page.getByLabel("Email Address").fill("test@test.com");
    await page.getByRole("button", { name: "Send invite" }).click();
    await page.getByRole("button", { name: "Cancel" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
});
