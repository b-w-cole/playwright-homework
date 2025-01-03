import { test } from './test-options'
import { RandomDataHelper } from '../pages/randomDataHelper'
import { expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('visual testing', async ({ pageManager }) => {

    const firstName = 'FirstName'
    const lastName = 'LastName'
    const address = 'Address'
    const city = 'City'
    const telephone = '5555555555'

    await pageManager.navigateTo().ownersPage()
    await pageManager.onOwnersPage().clickAddOwner()

    const newOwnerFormLocator = await pageManager.onNewOwnerPage().getNewOwnerFormLocatorForVisualTesting()

    await expect(newOwnerFormLocator).toHaveScreenshot('newFormScreenshot-1.png')

    await pageManager.onNewOwnerPage().fillNewOwnerForm(firstName, lastName, address, city, telephone)

    const newOwnerFormLocator2 = await pageManager.onNewOwnerPage().getNewOwnerFormLocatorForVisualTesting()

    await expect(newOwnerFormLocator2).toHaveScreenshot('newFormScreenshot-2.png')

})