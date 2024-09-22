import { test } from '@playwright/test';
import { PageManager } from '../pages/pageManager'

test.beforeEach( async({page}) => {
  await page.goto('/')

});

test('Update pet type', async ({page}) => {

  const originalPetType = 'cat'
  const testPetType = 'rabbit'

  const pm = new PageManager(page)

  await pm.navigateTo().petTypesPage()

  await pm.onPetTypesPage().clickEditPetTypeFor(originalPetType)

  await pm.onPetTypeEditPage().fillPetType(testPetType)

  await pm.onPetTypeEditPage().updatePetType()

  await pm.onPetTypesPage().validatePetTypeEntryByIndex(testPetType, 0)
  
  await pm.onPetTypesPage().clickEditPetTypeFor(testPetType)
  
  await pm.onPetTypeEditPage().fillPetType(originalPetType)

  await pm.onPetTypeEditPage().updatePetType()
  
  await pm.onPetTypesPage().validatePetTypeEntryByIndex(originalPetType, 0)

})

test('Cancel pet type update', async ({page}) => {

  const originalPetType = 'dog'
  const testPetType = 'moose'

  const pm = new PageManager(page)

  await pm.navigateTo().petTypesPage()

  await pm.onPetTypesPage().clickEditPetTypeFor(originalPetType)
  
  await pm.onPetTypeEditPage().fillPetType(testPetType)
  
  await pm.onPetTypeEditPage().cancelPetTypeUpdate()

  await pm.onPetTypesPage().validatePetTypeEntryByIndex(originalPetType, 1)
})

test('Pet type name is required validation', async ({page}) => {
  const pm = new PageManager(page)

  await pm.navigateTo().petTypesPage()

  await pm.onPetTypesPage().clickEditPetTypeFor('lizard')

  await pm.onPetTypeEditPage().fillPetType('')

  await pm.onPetTypeEditPage().updatePetType()
  await pm.onPetTypeEditPage().updatePetType()

  await pm.onPetTypeEditPage().cancelPetTypeUpdate()

})