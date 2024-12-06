import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'
import { RandomDataHelper } from '../pages/randomDataHelper';


test.beforeEach( async({page}) => {
  await page.goto('/')
});

test('Home page is opened and Welcome message is displayed', async ({page}) => {
    const pm = new PageManager(page)
    const randomDataHelper = new RandomDataHelper()

    const testPetType = randomDataHelper.getPetType()

    await pm.navigateTo().petTypesPage()

    await pm.onPetTypesPage().addPetType(testPetType)
    
    await pm.onPetTypesPage().removePetType(testPetType)
    
  });