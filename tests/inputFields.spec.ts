import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
  //1. Select the PET TYPES menu item in the navigation bar
  await page.getByText('Pet Types').click()
  //2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types
  expect(await page.locator('h2').getByText('Pet Types').textContent()).toEqual('Pet Types')
})

test('Update pet type', async ({page}) => {
  //3. Click on "Edit" button for the "cat" pet type
  //assumes cat is always first
  await page.getByText('Edit').first().click()

  //4. Add assertion of the "Edit Pet Type" text displayed
  expect(await page.getByText('Edit Pet Type').textContent()).toEqual('Edit Pet Type')

  //5. Change the pet type name from "cat" to "rabbit" and click "Update" button
  const editPetTypeField = page.locator('#name')
  await editPetTypeField.click()
  await editPetTypeField.clear()
  await editPetTypeField.fill('rabbit')
  await page.locator('button').getByText('Update').click()
  
  //6. Add the assertion that the first pet type in the list of types has a value "rabbit" 
  expect(await page.locator('input[name=pettype_name]').first().inputValue()).toEqual('rabbit')
  
  //7. Click on "Edit" button for the same "rabbit" pet type
  await page.getByText('Edit').first().click()
  
  //8. Change the pet type name back from "rabbit" to "cat" and click "Update" button
  await editPetTypeField.click()
  await editPetTypeField.clear()
  await editPetTypeField.fill('cat')
  await page.getByText('Update').click()
  
  //9. Add the assertion that the first pet type in the list of names has a value "cat" 
  const updatedPetType = page.locator('input[name=pettype_name]').first().inputValue()
  expect(await updatedPetType).toBe('cat')
})

test('Cancel pet type update', async ({page}) => {
  //3. Click on "Edit" button for the "dog" pet type
  //assumes "dog" is always second
  await page.getByText('Edit').nth(1).click()
  const editPetTypeField = page.locator('#name')

  //4. Type the new pet type name "moose"
  await editPetTypeField.click()
  await editPetTypeField.clear()
  await editPetTypeField.fill('moose')

  //5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page
  expect(await editPetTypeField.inputValue()).toBe('moose')
  
  //6. Click on "Cancel" button
  await page.getByText('Cancel').click()

  //7. Add the assertion the value "dog" is still displayed in the list of pet types
  expect(await page.locator('input[name=pettype_name]').nth(1).inputValue()).toBe('dog')
})

test('Pet type name is required validation', async ({page}) => {
  //3. Click on "Edit" button for the "lizard" pet type
  //assumes lizard is always third
  await page.getByText('Edit').nth(2).click()
  const editPetTypeField = page.locator('#name')

  //4. On the Edit Pet Type page, clear the input field
  await editPetTypeField.click()
  await editPetTypeField.clear()

  //5. Add the assertion for the "Name is required" message below the input field
  expect(await page.locator('div').filter({ hasText: 'Name' }).nth(-1).textContent()).toEqual('Name is required')

  //6. Click on "Update" button
  await page.getByText('Update').click()

  //7. Add assertion that "Edit Pet Type" page is still displayed
  expect(await page.locator('h2').getByText('Edit Pet Type').textContent()).toEqual('Edit Pet Type')

  //8. Click on the "Cancel" button
  await page.getByText('Cancel').click()

  //9. Add assertion that "Pet Types" page is displayed
  expect(await page.locator('h2').getByText('Pet Types').textContent()).toEqual(('Pet Types'))
})