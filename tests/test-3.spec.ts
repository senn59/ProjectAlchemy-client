import { test, expect } from "@playwright/test";

test.use({ storageState: "auth.json" });
test("Adding a new issue under an existing project", async ({ page }) => {
    await page.goto("http://localhost:5173/projects");
    await page.click('[data-test="open-project-button"]');
    let rows = page.locator('[data-test="issue-table-row"]');
    const rowCountBeforeAdd = await rows.count();

    await page.click('[data-test="add-issue-button"]');
    await page.keyboard.insertText("new issue");
    await page.keyboard.press("Enter");

    rows = page.locator('[data-test="issue-table-row"]');
    const rowCountAfterAdd = await rows.count();
    expect(rowCountBeforeAdd).toBeLessThan(rowCountAfterAdd);
});
