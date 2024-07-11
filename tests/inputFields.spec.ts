import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')

  /* 1. Select the PET TYPES menu item in the navigation bar */
  await page.locator('a[title="pettypes"]').click()

  /* 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types */
  await expect(page.locator('h2')).toHaveText("Pet Types")

});

test('Update pet type', async ({page}) => {

  /* 3. Click on "Edit" button for the "cat" pet type */
  // Assumes cat is always the first option, so we click the first edit button
  const firstEditButton = page.locator('button', {hasText: 'Edit'}).first()
  await firstEditButton.click()

  
  /* 4. Add assertion of the "Edit Pet Type" text displayed */
  await expect(page.locator('h2')).toHaveText('Edit Pet Type')
  
  /* 5. Change the pet type name from "cat" to "rabbit" and click "Update" button */
  // Updating "cat" to be "rabbit"
  const editPetTypeField = page.locator('#name')
  await editPetTypeField.click()
  await editPetTypeField.clear()
  await editPetTypeField.fill('rabbit')
  await page.locator('button', {hasText: 'Update'}).click()

  /* 6. Add the assertion that the first pet type in the list of types has a value "rabbit" */
  // Expecting the newly updated entry to say "rabbit"
  //expect(await page.locator('input[name=pettype_name]').first().inputValue()).toEqual('rabbit')
 // await expect(page.locator('input[name=pettype_name]'))

  await expect(page.locator('input[name=pettype_name]').first()).toHaveValue('rabbit')
  
  /* 7. Click on "Edit" button for the same "rabbit" pet type */
  // Set the field back to its original value
  await firstEditButton.click()
  
  /* 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button */
  // Change "rabbit" back to "cat"
  await editPetTypeField.click()
  await editPetTypeField.clear()
  await editPetTypeField.fill('cat')
  //await page.getByText('Update').click()
  await page.locator('button', {hasText: 'Update'}).click()
  
  /* 9. Add the assertion that the first pet type in the list of names has a value "cat" */
  // Verifying the input field once again says "cat"
  await expect(page.locator('input[name=pettype_name]').first()).toHaveValue('cat')
})

test('Cancel pet type update', async ({page}) => {
  /* 3. Click on "Edit" button for the "dog" pet type */
  // Assumes "dog" is always the second pet type
  await page.locator('button', {hasText: 'Edit'}).nth(1).click()
  
  /* 4. Type the new pet type name "moose" */
  // Updating "dog" to "moose"
  const editPetTypeField = page.locator('#name')
  await editPetTypeField.click()
  await editPetTypeField.clear()
  await editPetTypeField.fill('moose')

  /* 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page */
  // Verifying the still-editable input field says "moose"
  await expect(editPetTypeField).toHaveValue('moose')
  
  /* 6. Click on "Cancel" button */
  // Clicking the "cancel" button
  await page.locator('button', {hasText: 'Cancel'}).click()

  /* 7. Add the assertion the value "dog" is still displayed in the list of pet types */
  // Verifying the inputfield still says "dog"
  await expect(page.locator('input[name=pettype_name]').nth(1)).toHaveValue('dog')
})

test('Pet type name is required validation', async ({page}) => {
  /* 3. Click on "Edit" button for the "lizard" pet type */
  // Assumes lizard is always the third pet type
  await page.locator('button', {hasText: 'Edit'}).nth(2).click()
  
  /* 4. On the Edit Pet Type page, clear the input field */
  // Editing the pettype field to clear the entry and leave it empty
  const editPetTypeField = page.locator('#name')
  await editPetTypeField.click()
  await editPetTypeField.clear()

  /* 5. Add the assertion for the "Name is required" message below the input field */
  // Expecting to see the message to fill in the pet type name
  await expect(page.locator('div').filter({ hasText: 'Name' }).nth(-1)).toHaveText('Name is required')

  /* 6. Click on "Update" button */
  // We will try to update the field anyway
  await page.locator('button', {hasText: 'Update'}).click()

  /* 7. Add assertion that "Edit Pet Type" page is still displayed */
  // Verifying that we are still on the same Edit page
  await expect(page.locator('h2')).toHaveText('Edit Pet Type')

  /* 8. Click on the "Cancel" button */
  // Clicking "Cancel" to go back
  await page.locator('button', {hasText: 'Cancel'}).click()

  /* 9. Add assertion that "Pet Types" page is displayed */
  // Verifying we are back on the Pet Types page
  await expect(page.locator('h2')).toHaveText('Pet Types')
})