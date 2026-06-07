import { expect, test } from '@playwright/test';

test('completes a chained calculation and handles divide by zero', async ({
  page,
}) => {
  await page.goto('/');

  const display = page.locator('output');

  await expect(display).toHaveText('0');

  await page.getByRole('button', { name: 'Two' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Three' }).click();
  await page.getByRole('button', { name: 'Multiply' }).click();
  await page.getByRole('button', { name: 'Four' }).click();
  await page.getByRole('button', { name: 'Equals' }).click();

  await expect(display).toHaveText('20');

  await page.keyboard.press('Escape');
  await expect(display).toHaveText('0');

  await page.getByRole('button', { name: 'Eight' }).click();
  await page.getByRole('button', { name: 'Divide' }).click();
  await page.getByRole('button', { name: 'Zero' }).click();
  await page.getByRole('button', { name: 'Equals' }).click();

  await expect(display).toHaveText('Cannot divide by zero');
});
