/**
 * @description       :
 * @author            : Anuj Panwar
 * @group             :
 * @last modified on  : 08-29-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   08-29-2022   Anuj Panwar   Initial Version
 **/
import { LightningElement, track } from "lwc";
import getacc from "@salesforce/apex/AccountController.getAccounts";
export default class SharingModeDemo extends LightningElement {
  col = [{ label: "Name", fieldName: "Name" }];

  @track acc = [];
  connectedCallback() {
    getacc()
      .then((res) => {
        console.log("res :>> ", res);
        this.acc = res;
        console.log("this.acc :>> ", this.acc);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }
}
