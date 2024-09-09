import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'

test.beforeEach( async({page}) => {
  await page.goto('/')

});

test('Update pet type', async ({page}) => {

  const pm = new PageManager(page)

  /* 1. Select the PET TYPES menu item in the navigation bar */
  await pm.navigateTo().petTypesPage()

  /* 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types */
  await pm.onPetTypesPage().validatePageHeader('Pet Types')

  /* 3. Click on "Edit" button for the "cat" pet type */
  /* 4. Add assertion of the "Edit Pet Type" text displayed */
  await pm.onPetTypesPage().editPetType('cat')

  /* 5. Change the pet type name from "cat" to "rabbit" and click "Update" button */
  await pm.onPetTypeEditPage().enterNewPetType('rabbit')
  await pm.onPetTypeEditPage().updateNewPetType()

  /* 6. Add the assertion that the first pet type in the list of types has a value "rabbit" */
  // Expecting the newly updated entry to say "rabbit"
  await pm.onPetTypesPage().validatePetTypeEntryByRowPosition('rabbit', 0)
  
  /* 7. Click on "Edit" button for the same "rabbit" pet type */
  await pm.onPetTypesPage().editPetType('rabbit')
  
  /* 8. Change the pet type name back from "rabbit" to "cat" and click "Update" button */
  await pm.onPetTypeEditPage().enterNewPetType('cat')
  await pm.onPetTypeEditPage().updateNewPetType()
  
  /* 9. Add the assertion that the first pet type in the list of names has a value "cat" */
  // Verifying the input field once again says "cat"
  await pm.onPetTypesPage().validatePetTypeEntryByRowPosition('cat', 0)

})

test('Cancel pet type update', async ({page}) => {
  const pm = new PageManager(page)

  /* 1. Select the PET TYPES menu item in the navigation bar */
  await pm.navigateTo().petTypesPage()

  /* 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types */
  await pm.onPetTypesPage().validatePageHeader('Pet Types')

  /* 3. Click on "Edit" button for the "dog" pet type */
  await pm.onPetTypesPage().editPetType('dog')
  
  /* 4. Type the new pet type name "moose" */
  /* 5. Add assertion the value "moose" is displayed in the input field of the "Edit Pet Type" page */
  await pm.onPetTypeEditPage().enterNewPetType('moose')

  /* 6. Click on "Cancel" button */
  // Clicking the "cancel" button
  await pm.onPetTypeEditPage().cancelPetTypeUpdate()

  /* 7. Add the assertion the value "dog" is still displayed in the list of pet types */
  // Verifying the inputfield still says "dog"
  await pm.onPetTypesPage().validatePetTypeEntryByRowPosition('dog', 1)
})

test('Pet type name is required validation', async ({page}) => {
  const pm = new PageManager(page)

  /* 1. Select the PET TYPES menu item in the navigation bar */
  await pm.navigateTo().petTypesPage()

  /* 2. Add assertion of the "Pet Types" text displayed above the table with the list of pet types */
  await pm.onPetTypesPage().validatePageHeader('Pet Types')

  /* 3. Click on "Edit" button for the "lizard" pet type */  
  /* 4. On the Edit Pet Type page, clear the input field */
  /* 5. Add the assertion for the "Name is required" message below the input field */
  await pm.onPetTypesPage().editPetType('lizard')
  await pm.onPetTypeEditPage().enterNewPetType('')
  await pm.onPetTypeEditPage().updateNewPetType()

  /* 6. Click on "Update" button */
  // We will try to update the field anyway
  await pm.onPetTypeEditPage().updateNewPetType()

  /* 7. Add assertion that "Edit Pet Type" page is still displayed */
  // Verifying that we are still on the same Edit page
  await pm.onPetTypeEditPage().validatePageHeader('Edit Pet Type')

  /* 8. Click on the "Cancel" button */
  // Clicking "Cancel" to go back
  await pm.onPetTypeEditPage().cancelPetTypeUpdate()

  /* 9. Add assertion that "Pet Types" page is displayed */
  // Verifying we are back on the Pet Types page
  await pm.onPetTypesPage().validatePageHeader('Pet Types')
})