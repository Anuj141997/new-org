/**
 * @description       :
 * @author            : Anuj Panwar
 * @group             :
 * @last modified on  : 11-30-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   11-14-2022   Anuj Panwar   Initial Version
 **/
import { LightningElement, track, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";

export default class AccordianDemo extends LightningElement {
  @track accSections = [];

  secName;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      console.log("currentPageReference :>> ", currentPageReference);
    }
  }

  handleSection() {
    this.accSections.push(
      {
        name: "A",
        options: [
          { label: "A Label", value: "A value" },
          { label: "A Label1", value: "A value1" }
        ]
      },
      { name: "B", options: [{ label: "B Label", value: "B Value" }] }
    );
    //  this.accSections.push();
  }

  handleToggleSection(event) {
    this.secName = event.detail.openSections;
  }
}
