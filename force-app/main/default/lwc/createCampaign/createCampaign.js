/**
 * @description       :
 * @author            : Anuj Panwar
 * @group             :
 * @last modified on  : 10-18-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   10-18-2022   Anuj Panwar   Initial Version
 **/
import { LightningElement, track } from "lwc";
import checkDate from "@salesforce/apex/CheckCampaignDates.checkDates";
import saveRec from "@salesforce/apex/CheckCampaignDates.createRecord";
import { createRecord } from "lightning/uiRecordApi";

export default class CreateCampaign extends LightningElement {
  Name;
  edate;
  sdate;

  @track cRec = { Name: "", StartDate: "", EndDate: "" };

  hanldeChange(event) {
    this.cRec[event.target.name] = event.target.value;
  }

  //   Save() {
  //     checkDate({ sDate: this.cRec.StartDate, eDate: this.cRec.EndDate })
  //       .then((res) => {
  //         console.log("object :>> ", res);
  //         if (res === "true") {
  //           createRecord();
  //         } else {
  //           this.alert("Can not isert");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("error :>> ", error);
  //       });
  //   }

  createRecord() {
    saveRec({ payload: JSON.stringify(this.cRec) })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }
}
