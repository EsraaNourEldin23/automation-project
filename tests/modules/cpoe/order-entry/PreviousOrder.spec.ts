import { test, expect } from '@playwright/test'
import PreviousOrderPage from '../pages/PreviousOrder.page';

//plz install this for sql -->npm install mssql
const sql = require('mssql');

/*test('View Portal',async ({page}) => {
    page.goto('physicianDesktop');
});*/

const previousOrder = new PreviousOrderPage(page);

//let PreviousOrderPage: any;

test('Before Order Entry', async () => {
    await previousOrder.goto();
    await previousOrder.dashboard();
});

test('Add Lab orde to the OrdelList', async () => {
    await previousOrder.goto();
    await previousOrder.addLabToOrderList();

    await expect(page.locator('.k-notification-content').first()).toBeVisible()
    console.log('Added to the order list, please confirm order');
});

test('Order Lab Order from the OrderList', async () => {
    await previousOrder.goto();
    await previousOrder.orderButton();

    await expect(page.locator('.k-notification-success').first()).toBeVisible();
    console.log('Ordered Successfully!');

    try {
        // Disable SSL certificate validation for testing (not recommended for production)
        await sql.connect({
            server: 'aws-devtest-01\mssqlserver19',
            port: 1433,
            database: 'AWS.DevelopmentTest.Main.HCMSScrum5',
            user: 'Scrum5',
            password: 'Scrum5pass@123',
            encrypt: false,
            options: {
                trustServerCertificate: true,
            },
        });

        const sqlQuery = `Select top (1) InvestigationNameEn from CPOE.OrderLine where CreatedBy = 18323764  order by CreatedDate desc`;

        const sqlresult = await sql.query(sqlQuery);

        expect(sqlresult.recordset).toEqual([{ InvestigationNameEn: 'ALBUMIN' }]);
        console.debug(sqlresult.recordset);

        // Log the result data
    } //end try

    catch (err) {
        console.debug(err);
        // ... error checks
    }//end catch
});

test('Go to Previouse Order', async () => {
    await previousOrder.goto();
    await previousOrder.previousOrder();
});

test('Reorder from Previous Order', async () => {
    await previousOrder.goto();
    await previousOrder.reOrder();

    await expect(page.locator('.k-notification-content')).toBeVisible()
    console.log('Added to the order list, please confirm order');
});

test('Cancel Order from Previouse Order', async () => {
    await previousOrder.goto();
    await previousOrder.cancelPreviousOrder();

    await expect(page.locator("#modal-scopedpre-order___BV_modal_body_")).toBeVisible()
});

test('Confirmation for cancel order', async () => {
    await previousOrder.goto();
    await previousOrder.confirmation();

    await expect(page.locator('.k-notification-content').first()).toBeVisible()
    console.log('Discontinued Successfully!');
});