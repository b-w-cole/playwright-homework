import { Page, expect } from "@playwright/test"

export class HelperBase{
    readonly page : Page

    constructor(page : Page){
        this.page = page
    }

    async validatePageHeader(headerName: string){
        await expect(this.page.locator('h2')).toHaveText(headerName)
    }

    async selectDateFromCalendarTool(date: Date){
        await this.page.locator('.mdc-icon-button').click()
        const year = date.getFullYear()
        const month = date.toLocaleString('En-US', {month: '2-digit'})
        const day = date.toLocaleString('En-US', {day: 'numeric'})

        let calendarMonthAndYear = await this.page.locator('.mat-calendar-period-button').textContent()

        while(!calendarMonthAndYear?.includes(`${month} ${year}`)){
            await this.page.locator('.mat-calendar-previous-button').click()
            calendarMonthAndYear = await this.page.locator('.mat-calendar-period-button').textContent()
        }

        await this.page.getByText(day, {exact: true}).click()
    }

    getDateDashFormat(date: Date){
        const year = date.getFullYear()
        const month = date.toLocaleString('En-US', {month: '2-digit'})
        const day = date.toLocaleString('En-US', {day: '2-digit'})
        return `${year}-${month}-${day}`
    }

    getDateSlashFormat(date: Date){
        const year = date.getFullYear()
        const month = date.toLocaleString('En-US', {month: '2-digit'})
        const day = date.toLocaleString('En-US', {day: '2-digit'})
        return `${year}/${month}/${day}`
    }
}