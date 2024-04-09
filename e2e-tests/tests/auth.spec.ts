import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to signin", async ({ page }) => {
  await page.goto(UI_URL);

  // get the signin button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("asd@asd.com");
  await page.locator("[name=password]").fill("asd123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
  await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
