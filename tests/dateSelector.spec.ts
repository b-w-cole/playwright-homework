import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    /* 1. Select the OWNERS menu item in the navigation bar and then select "Search" from the drop-down menu */
    await page.getByText('Owners').click()
    await page.getByText('Search').click()
})

test('Select the desired date in the calendar - 1', async ({page}) => {

    /* 2. In the list of the Owners, locate the owner by the name "Harold Davis" and select this owner */
    await page.getByText('Harold Davis').click()

    /* 3. On the Owner Information page, select "Add New Pet" button */
    // Generate Test Pet
    await page.getByRole('button', {name: 'Add New Pet'}).click()

    /* 4. In the Name field, type any new pet name, for example "Tom" */
    await page.locator('#name').fill('Tom')

    /* 5. Add the assertion of icon in the input field, that it changed from "X" to "<checkmark>" */
    // Validate the checkmark appears for text entered in the previous textbox
    await page.locator('.glyphicon-ok').isVisible()

    /* 6. Click on the calendar icon for the "Birth Date" field */
    const currentDay = new Date()
    const currentMonthYear = `${currentDay.toLocaleString('En-US', {month: '2-digit'})} ${currentDay.getFullYear()}`

    const expectedDayShort = '2'
    const expectedDayLong = '02'
    const expectedMonthNumeric = '05'
    const expectedMonthText = 'MAY'
    const expectedYear = '2014'

    // Click on the calendar icon
    await page.locator('.mdc-icon-button').click()

    /* 7. Using calendar selector, select the date "May 2nd, 2014" */
    // Select the desired year, month, and day from the calendar functionality, starting with the current month and year button
    await page.getByRole('button').getByText(currentMonthYear).click()
    await page.locator('.mat-calendar-previous-button').click()
    await page.getByText(expectedYear).click()
    await page.getByText(expectedMonthText).click()
    await page.getByText(expectedDayShort, {exact: true}).click()

     /* 8. Add the assertion of the in the input field is in the format "2014/05/02" */
     await expect(page.locator('.mat-datepicker-input')).toHaveValue(`${expectedYear}/${expectedMonthNumeric}/${expectedDayLong}`)

     /* 9. Select the type of pet "dog" and click "Save Pet" button */
     await page.selectOption('select', 'dog')
     await page.getByText('Save Pet').click()
 
     /* 10. On the Owner Information page, add assertions for the newly created pet. Name is Tom, Birth Date is in the format "2014-05-02", Type is dog */
 
     // Select the most recent pet record with pet information only
     const newPetTable = page.locator('app-pet-list').last().locator('dl').first()
 
     // Assert that the new pet's name, birthdate, and type are correct
     await expect(newPetTable.locator('dd').first()).toHaveText('Tom')
     await expect(newPetTable.locator('dd').nth(1)).toHaveText(`${expectedYear}-${expectedMonthNumeric}-${expectedDayLong}`)
     await expect(newPetTable.locator('dd').nth(2)).toHaveText('dog')
 
     /* 11. Click "Delete Pet" button the for the new pet "Tom" */
     // Clean up from test
     await newPetTable.getByText('Delete').click()
 
     /* 12. Add assertion that Tom does not exist in the list of pets anymore */
     await expect(newPetTable.locator('dd').first()).not.toHaveText('Tom')
 
})

test('Select the desired date in the calendar - 2', async ({page}) => {

    /* 2. In the list of the Owners, locate the owner by the name "Jean Coleman" and select this owner */
    await page.getByText('Jean Coleman').click()

    /* 3. In the list of pets, locate the pet with a name "Samantha" and click "Add Visit" button */
    // Create two new vet visits for the pet Samantha
    const petRecord = page.locator('app-pet-list', {hasText: 'Samantha'})
    await petRecord.getByText('Add Visit').click()

    /* 4. Add the assertion that "New Visit" is displayed as header of the page */
    await expect(page.locator('h2')).toHaveText('New Visit')

    /* 5. Add the assertion that pet name is "Samantha" and owner name is "Jean Coleman" */
    // Assert that the pet name and owner are correct
    await expect(page.locator('table').first().locator('td').first()).toHaveText('Samantha')
    await expect(page.locator('table').first().locator('td').last()).toHaveText('Jean Coleman')

    /* 6. Click on the calendar icon and select the current date in date picker */
    // Add an appointment for today's date for 'dermatology'
    const date = new Date()
    const dermatologyAppointmentYear = date.getFullYear()
    const dermatologyAppointmentMonth = date.toLocaleString('En-US', {month: '2-digit'})
    const dermatologyAppointmentDay = date.toLocaleString('En-US', {day: '2-digit'})
    const expectedDermatologyAppointmentDate = `${dermatologyAppointmentYear}-${dermatologyAppointmentMonth}-${dermatologyAppointmentDay}`

    await page.locator('.mdc-icon-button').click()
    await page.getByRole('button').getByText(dermatologyAppointmentDay).click()
    
    /* 7. Add assertion that date is displayed in the format "YYYY/MM/DD" */
    // Compare the calendar input to the format we're expecting - "YYYY/MM/DD"
    await expect(page.locator('.mat-datepicker-input')).toHaveValue(`${dermatologyAppointmentYear}/${dermatologyAppointmentMonth}/${dermatologyAppointmentDay}`)

    /* 8. Type the description in the field, for example, "dermatologists visit" and click "Add Visit" button */
    await page.locator('#description').fill('dermatologists visit')
    await page.getByText('Add Visit').click()
    
    /* 9. Add assertion that date of visit is displayed at the top of the list of visits for "Samantha" pet on the "Owner Information" page and is in the format "YYYY-MM-DD" */
    // Validate the appointment date is in the format we're expecting
    await expect(petRecord.locator('app-visit-list tr td').first()).toHaveText(expectedDermatologyAppointmentDate)

    /* 10. Add one more visit for "Samantha" pet by clicking "Add Visit" button */
    // Add a new vet visit 45 days before today for 'massage therapy'
    await petRecord.getByText('Add Visit').click() 

    /* 11. Click on the calendar icon and select the date which is 45 days back from the current date */
    await page.locator('.mdc-icon-button').click()

    date.setDate(date.getDate() - 45)
    const massageAppointmentYear = date.getFullYear()
    const massageAppointmentMonth = date.toLocaleString('En-US', {month: '2-digit'})
    const massageAppointmentDaySingleDigit = date.toLocaleString('En-US', {day: 'numeric'})
    const massageAppointmentDayDoubleDigit = date.toLocaleString('En-US', {day: '2-digit'})
    const expectedMassageAppointmentDate = `${massageAppointmentYear}-${massageAppointmentMonth}-${massageAppointmentDayDoubleDigit}`

    let calendarMonthAndYear = await page.locator('.mat-calendar-period-button').textContent()

    while(!calendarMonthAndYear?.includes(`${massageAppointmentMonth} ${massageAppointmentYear}`)){
        await page.locator('.mat-calendar-previous-button').click()
        calendarMonthAndYear = await page.locator('.mat-calendar-period-button').textContent()
    }

    await page.getByText(massageAppointmentDaySingleDigit, {exact: true}).click()

    /* 12. Type the description in the field, for example, "massage therapy" and click "Add Visit" button */
    await page.locator('#description').fill('massage therapy')
    await page.getByText('Add Visit').click()

    /* 13. Add the assertion, that date added at step 11 is in chronological order in relation to the previous dates for "Samantha" pet on the "Owner Information" page. The date of visit above this date in the table should be greater. */
    const petAppointments = petRecord.locator('app-visit-list tr')

    // Validate that the two appointments are listed in chronological order
    const actualDermatologyAppointment = await petAppointments.nth(1).locator('td').first().textContent()
    const actualMassageAppointment = await petAppointments.nth(2).locator('td').first().textContent()
    
    // The massage appointment is 45 days older than the dermatology one and should be the smaller number
    expect(Date.parse(actualMassageAppointment!) < Date.parse(actualDermatologyAppointment!)).toBeTruthy()

    /* 14. Select the "Delete Visit" button for both newly created visits */
    // Clean up test data
    await petRecord.locator('app-visit-list tr', {hasText: expectedDermatologyAppointmentDate}).getByText('Delete Visit').click()
    await petRecord.locator('app-visit-list tr', {hasText: expectedMassageAppointmentDate}).getByText('Delete Visit').click()
    
    // Ensure the page has completed deleting the record
    await page.waitForResponse("https://petclinic-api.bondaracademy.com/petclinic/api/visits/*")

    /* 15. Add the assertion that deleted visits are no longer displayed in the table on "Owner Information" page */
    // Validate that all test rows have been removed    
    for(const row of await petAppointments.all()){
        expect(await row.textContent()).not.toContain(expectedDermatologyAppointmentDate)
        expect(await row.textContent()).not.toContain(expectedMassageAppointmentDate)     
    }

})