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

    await pageManager.onNewOwnerPage().createScreenshotForVisualTesting('newFormScreenshot-1.png')

    await pageManager.onNewOwnerPage().fillNewOwnerForm(firstName, lastName, address, city, telephone)

    await pageManager.onNewOwnerPage().createScreenshotForVisualTesting('newFormScreenshot-2.png')
})