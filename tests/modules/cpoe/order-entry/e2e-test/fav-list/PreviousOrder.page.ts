import {Locator, Page} from '@playwright/test';
//import playwrightConfig from '../playwright.config';
export default class PreviousOrderPage{
 readonly page: Page;
 readonly IPDPatientbutton: Locator;
 readonly orderTabButton: Locator;
 readonly orderEntryButton: Locator;
 readonly AddNewLabField: Locator;
 readonly editIcon: Locator;
 readonly addToOrderListButton: Locator
 readonly orderButton: Locator;
 readonly previousOrdertab: Locator;
 readonly expendLabIcon: Locator;
 readonly reorderLabButton: Locator;
 readonly cancelLabFromPreviousOrderIcon: Locator;
 readonly yesButton: Locator;

 constructor(page) {
    this.page = page;
    this.IPDPatientbutton = page.locator('#no23084797');
    this.orderTabButton = page.locator('[class="k-state-default k-item k-link OrdersTab has-menu customNavItem"]');
    this.orderEntryButton = page.locator('.newItemClass.GrandMenuItem');
    this.AddNewLabField = page.locator('#ClassificationTextBoxId .k-dropdown-wrap .k-input');
    this.editIcon = page.locator('#ClassificationGridId > div.k-grid-content.k-auto-scrollable > table > tbody > tr:nth-child(1) > td.k-command-cell > a > img');
    this.addToOrderListButton = page.locator('#editLabRadProcedure___BV_modal_footer_ > div.buttons > button.btn.form-btn.btn-txt-turqize.btn-secondary.btn-md');
    this.orderButton = page.locator('#divOrder > div.row.pt-2 > div.col-md-7.col.pb-0.pt-0 > div > div.buttonRow.p-1.pl-3.pr-3 > button:nth-child(3)');
    this.previousOrdertab = page.locator('#PreviuosOrders');
    this.expendLabIcon = page.locator('#PreviuosOrdersList > div.clear.customwrapper > div:nth-child(1) > div.classificationWrapper.order-set-body-0 > div:nth-child(2) > div.header.headerColabseVisit.mb-1 > button > img:nth-child(1)');
    this.reorderLabButton = page.locator('.d-inline-block > .actionIcons');
    this.cancelLabFromPreviousOrderIcon = page.locator('.col > div:nth-child(3) > .actionIcons');
    this.yesButton = page.locator('#modal-scopedpre-order___BV_modal_footer_ > button.btn.btn-danger.btn-sm');
 }

 async goto(pg){
    await pg.goto("http://dev-testing.andalusiagroup.net:5004/");         
 }

    // Before Order Entry
    async dashboard(){
    await this.IPDPatientbutton.click();
    await this.orderTabButton.click();
    await this.orderEntryButton.click();
    }

    // Add Lab orde to the OrdelList
    async addLabToOrderList(){
    await this.AddNewLabField.click();
    await this.AddNewLabField.fill("Albumin");
    await this.editIcon.click();
    await this.addToOrderListButton.click();
    }

    // Order Lab Order from the OrderList
    async orderLab(){
    await this.orderButton.click();
    }

    // Go to Previouse Order
    async previousOrder(){
    await this.previousOrdertab.click();
    await this.expendLabIcon.click();
    }

    // Reorder from Previous Order
    async reOrder(){
    await this.reorderLabButton.click();
    }

    // Cancel Order from Previouse Order
    async cancelPreviousOrder(){
    await this.cancelLabFromPreviousOrderIcon.click();
    }

    // Confirmation for cancel order
    async confirmation(){
    await this.yesButton.click();
 }
}