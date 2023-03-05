/**
 * @description       :
 * @author            : Anuj Panwar
 * @group             :
 * @last modified on  : 10-14-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   10-14-2022   Anuj Panwar   Initial Version
 **/
import { LightningElement, track, wire } from "lwc";
import accCont from "@salesforce/apex/AccountController.getAccounts";
// import name from "@salesforce/schema/Account.Name";

export default class TestLWC extends LightningElement {
  @track res = [];

  col = [{ label: "Name", fieldName: "Name", type: "text" }];
  test = [
    { label: "Test", name: "anuj" },
    { label: "Test", name: "anuj1" },
    { label: "Test", name: "anuj2" }
  ];

  connectedCallback() {
    this.res = this.test.map((i) => {
      return {
        label1: i.label,
        name1: i.name
      };
    });

    this.getData();
  }

  @wire(accCont, { recId: "$recId" })
  accs({ error, data }) {
    if (data) {
      console.log("data :>> ", data);
    }
    if (error) {
      console.log("error :>> ", error);
    }
  }

  getData() {
    accCont()
      .then((res) => {
        this.res = res;
        console.log("res :>> ", res);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }
}
