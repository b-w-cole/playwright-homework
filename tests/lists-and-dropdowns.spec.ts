import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'

test.beforeEach( async({page}) => {
  await page.goto('/')
});

test('Validate selected pet types from the list', async ({page}) => {
  const petName = 'Leo'
  const petOwner = 'George Franklin'
  const petType = 'cat'

  const pm = new PageManager(page)

  /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
  await pm.navigateTo().ownersPage()
  
  /* 2. Add assertion of the "Owners" text displayed */
  await pm.onOwnersPage().validatePageHeader('Owners')

  /* 3. Select the first owner "George Franklin" */
  await pm.onOwnersPage().selectOwner(petOwner)

  /* 4. Add the assertion for the owner "Name", the value "George Franklin" is displayed */
  await pm.onOwnerInformationPage().validateOwnerName(petOwner)
  
  /* 5. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Leo" */
  await pm.onOwnerInformationPage().editPet(petName)

  /* 6. Add assertion of "Pet" text displayed as header on the page */
  // Validate that h2 says "Pet" as expected
  await pm.onPetDetailsPage().validatePageHeader('Pet')

  /* 7. Add the assertion "George Franklin" name is displayed in the "Owner" field */
  /* 8. Add the assertion the value "cat" is displayed in the "Type" field */
  await pm.onPetDetailsPage().validateNameOwnerAndPetTypeFieldsDisplayCorrectly(petName, petOwner, petType)
  
  /* 9. Using a loop, select the values from the drop-down one by one, and add the assertion, that every selected value from the drop-down is displayed in the "Type" field */
  await pm.onPetDetailsPage().validateAllPetTypesDisplayCorrectly()

  

});


test('Validate the pet type update', async ({page}) => {

  const petName = 'Rosy'
  const petOwner = 'Eduardo Rodriquez'
  const petType = 'dog'

  const pm = new PageManager(page)

  /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
  pm.navigateTo().ownersPage()

  /* 2. Add assertion of the "Owners" text displayed */
  await pm.onOwnersPage().validatePageHeader('Owners')

  /* 3. Select the owner  */
  await pm.onOwnersPage().selectOwner(petOwner)

  /* 4. In the "Pets and Visits" section, click on "Edit Pet" button for the pet with a name "Rosy" */
  await pm.onOwnerInformationPage().editPet(petName)

  /* 5. Add the assertion that name "Rosy" is displayed in the input field "Name" */
  /* 6. Add the assertion the value "dog" is displayed in the "Type" field */
  await pm.onPetDetailsPage().validateNameOwnerAndPetTypeFieldsDisplayCorrectly(petName, petOwner, petType)
  
  /* 7. From the drop-down menu, select the value "bird" */
  /* 8. On the "Pet detils" page, add the assertion the value "bird" is displayed in the "Type" field as well as drop-down input field */
  /* 9. Select "Update Pet" button */
  await pm.onPetDetailsPage().selectNewPetTypeAndUpdate('bird')

  /* 10. On the "Owner Information" page, add the assertion that pet "Rosy" has a new value of the Type "bird" */
  await pm.onOwnerInformationPage().validatePetType(petName, 'bird')
  
  /* 11. Select "Edit Pet" button one more time, and perform steps 6-10 to revert the selection of the pet type "bird" to its initial value "dog" */
  /* Iterate through the process to change Rosy's pet type back to "dog" */
  // Edit Rosy's pet record again
  await pm.onOwnerInformationPage().editPet(petName)

  await pm.onPetDetailsPage().validateNameOwnerAndPetTypeFieldsDisplayCorrectly(petName, petOwner, 'bird')

  await pm.onPetDetailsPage().selectNewPetTypeAndUpdate(petType)

  await pm.onOwnerInformationPage().validatePetType(petName, petType)
  
  
});
