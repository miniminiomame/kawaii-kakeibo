import { test, expect } from '@playwright/test';

test.describe('Kawaii Kakeibo Core Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display correct title and default theme', async ({ page }) => {
        await expect(page).toHaveTitle(/かけいぼっ！/);
        await expect(page.locator('h1')).toContainText('かけいぼっ！');
    });

    test('should show savings alert when income exceeds budget limit', async ({ page }) => {
        // 1. Go to Settings and set limit to 1000
        await page.getByRole('button', { name: '設定' }).click();
        const limitInput = page.getByLabel('目標ライン (円)');
        await limitInput.fill('1000');

        // 2. Go to Input
        await page.getByRole('button', { name: '入力' }).click();
        await page.getByRole('button', { name: '収入' }).click();

        // 3. Enter 1500
        await page.getByLabel('金額 (円)').fill('1500');
        await page.getByLabel('カテゴリー').selectOption('salary');
        // (Assuming 'salary' value, or we select by index if needed. Let's try selectOption)

        // 4. Verify Alert
        await expect(page.getByText('すごい！10%')).toBeVisible();

        // 5. Submit
        await page.getByRole('button', { name: '記録する' }).click();

        // 6. Verify success sound logic (we can't easily audit audio, but we check if it didn't crash)
        // Should be back to list or stay? 
        // Implementation: setActiveTab('list') on submit.
        // So we check for list view.
        await expect(page.getByText('+¥1,500')).toBeVisible();
    });

    test('should switch themes', async ({ page }) => {
        await page.getByRole('button', { name: '設定' }).click();

        // Switch to Pixel
        await page.getByRole('button', { name: 'ドット絵モード' }).click();

        // Verify background attribute changes
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'pixel');

        // Verify icons are images now (in BottomNav)
        // We need to look for img inside nav
        // const nav = page.locator('nav');
        // await expect(nav.locator('img')).toHaveCount(4); 
        // (Implementation detail: 4 tabs with images)
    });
});
