import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'


test.beforeEach( async({page}) => {
  await page.goto('/')
});

test('Home page is opened and Welcome message is displayed', async ({page}) => {
    const pm = new PageManager(page)

    /* 1. Select the PET TYPES menu item in the navigation bar */
    await pm.navigateTo().petTypesPage()

    /* 2. On the "Pet Types" page, add assertion of the "Pet Types" text displayed above the table with the list of pet types */
    // Validate that h2 says "Pet Types" as expected
    await pm.onPetTypesPage().validatePageHeader('Pet Types')
  
    /* 5. Add a new pet type with the name "pig" and click "Save" button */
    /* 6. Add assertion that the last item in the list of pet types has value of "pig" */
    await pm.onPetTypesPage().addPetType('pig')

    /* 7. Click on "Delete" button for the "pig" pet type */
    /* 8. Add assertion to validate the message of the dialog box "Delete the pet type?" */
    /* 9. Click on OK button on the dialog box */
    /* 10. Add assertion, that the last item in the list of pet types is not the "pig" */
    await pm.onPetTypesPage().removePetType('pig')
    
  });