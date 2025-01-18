import { test, expect } from "@playwright/test";

test.use({ storageState: "auth.json" });
test("Creating a new project", async ({ page }) => {
    await page.goto("http://localhost:5173/projects");

    await page.click('[data-test="create-new-project-button"]');
    await page.fill('[data-test="create-project-name-input"]', "test");
    await page.click('[data-test="create-project-button"]');

    await expect(page.locator('[data-test="project-name"]')).toHaveText("test");
});
