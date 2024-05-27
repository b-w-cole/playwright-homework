import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
  //1. Select the PET TYPES menu item in the navigation bar
  await page.getByText('Pet Types').click()
  //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  expect(await page.locator('h2').getByText('Pet Types').isVisible()).toBeTruthy()
})

test('Update pet type', async ({page}) => {
  test.slow()
  //3. Click on "Edit" button for the "cat" pet type
  //assumes cat is always first
  await page.getByText('Edit').first().click()

  //4. Add assertion of the "Edit Pet Type" text displayed
  expect(await page.getByText('Edit Pet Type').isVisible()).toBeTruthy()

  //5. Change the pet type name from "cat" to "rabbit" and click "Update" button
  const textField = page.locator('#name')
  await textField.click()
  await textField.clear()
  await textField.pressSequentially('rabbit')
  await page.locator('button').getByText('Update').click()
  
  //6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
  test.slow()
  const rabbit = page.locator('input[name=pettype_name]').first().inputValue()
  expect(await rabbit).toBe('rabbit')
  
  
  //7. Click on "Edit" button for the same "rabbit" pet type
  await page.getByText('Edit').first().click()
  
  //8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
  await textField.click()
  await textField.clear()
  await textField.pressSequentially('cat')
  await page.getByText('Update').click()
  
  //9. Add the assertion that the first pet type in the list of names has a value "cat" 
  const catEntry = page.locator('input[name=pettype_name]').first().inputValue()
  expect(await catEntry).toBe('cat')
})

test('Cancel pet type update', async ({page}) => {
  //3. Click on "Edit" button for the "dog" pet type
  //assumes "dog" is always second
  await page.getByText('Edit').nth(1).click()
  const textField = page.locator('#name')

  //4. Type the new pet type name "moose"
  await textField.click()
  await textField.clear()
  await textField.pressSequentially('moose')

  //5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
  expect(await textField.inputValue()).toBe('moose')
  
  //6. Click on "Cancel" button
  await page.getByText('Cancel').click()

  //7. Add the assertion the value "dog" is still displayed in the list of pet types
  const dogEntry = page.locator('input[name=pettype_name]').nth(1).inputValue()
  expect(await dogEntry).toBe('dog')
})

test('Pet type name is required validation', async ({page}) => {

  test.slow()
  //3. Click on "Edit" button for the "lizard" pet type
  await page.getByText('Edit').nth(2).click()
  const textField = page.locator('#name')

  //4. On the Edit Pet Type page, clear the input field
  await textField.click()
  await textField.clear()

  //5. Add the assertion for the "Name is required" message below the input field
  expect(await page.getByText('Name is required').isVisible).toBeTruthy()

  //6. Click on "Update" button
  await page.getByText('Update').click()

  //7. Add assertion that "Edit Pet Type" page is still displayed
  expect(await page.locator('h2').getByText('Edit Pet Type').isVisible()).toBeTruthy()

  //8. Click on the "Cancel" button
  await page.getByText('Cancel').click()

  //9. Add assertion that "Pet Types" page is displayed
  expect(await page.locator('h2').getByText('Pet Types').isVisible()).toBeTruthy()

})