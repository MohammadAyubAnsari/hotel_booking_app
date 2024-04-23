import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the signin button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("asd@asd.com");
  await page.locator("[name=password]").fill("asd123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator('[name="name"]').fill("Test hotel");
  await page.locator('[name="city"]').fill("Test city");
  await page.locator('[name="country"]').fill("Test country");
  await page
    .locator('[name="description"]')
    .fill("This is a description description for test hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("3");
  await page.locator('[name="childCount"]').fill("5");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.jpg"),
    path.join(__dirname, "files", "2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  // await expect(page.getByText("Lila")).toBeVisible();
  await expect(page.getByText("Hotel Lila")).toBeVisible();

  await expect(page.getByText("Bengaluru,India")).toBeVisible();
  await expect(page.getByText("Luxury")).toBeVisible();
  await expect(page.getByText("₹3000 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("5 Star Rating")).toBeVisible();

  await expect(page.getByRole("link", { name: "View Details" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
