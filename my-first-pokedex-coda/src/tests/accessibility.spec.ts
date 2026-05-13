import {expect, type Page, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function assertAccessibilityFor(page: Page, tags: string[]) {
    await page.goto('/');
    // SPA : wait for JS rendering and async fetches before axe-core analysis
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({page})
        .withTags(tags)
        .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
}

test.describe('Accessibility tests sur Pokédex', () => {
    test('RGAA should not have any automatically detectable accessibility issues', async ({ page }) => {
        await assertAccessibilityFor(page, ['RGAAv4']);
    });

    test('WCAG should not have any automatically detectable wcag issues', async ({ page }) => {
        await assertAccessibilityFor(page, ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
    });
});