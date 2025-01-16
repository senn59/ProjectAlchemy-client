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
    await page.getByRole("button", { name: "+ Add issue" }).click();
    await page.getByPlaceholder("Enter new item name").fill("new issue");
    await page.getByPlaceholder("Enter new item name").press("Enter");
    await page.getByText("new issue").click();
    await page.getByRole("button", { name: "new issue" }).click();
    await page.getByRole("textbox").press("ControlOrMeta+a");
    await page.getByRole("textbox").fill("edit name");
    await page.getByRole("textbox").press("Enter");
    await page.locator("div:nth-child(4)").first().click();
    await page.getByRole("combobox").first().click();
    await page.getByText("UserStory").click();
});
