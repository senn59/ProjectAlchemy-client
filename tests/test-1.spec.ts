import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("test@test.test");
    await page.getByPlaceholder("Password").click();
    await page.getByPlaceholder("Password").fill("testing");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("button", { name: "Create a new project" }).click();
    await page.getByLabel("Project Name").fill("test");
    await page.getByRole("button", { name: "Create project" }).click();
});
