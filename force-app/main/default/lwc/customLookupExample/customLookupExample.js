/* eslint-disable no-alert */
import { LightningElement } from "lwc";

export default class CustomLookupExample extends LightningElement {
  lookupRecord(e) {
    let con = e.detail.selectedRecord;
    alert(con.Name);
  }
}