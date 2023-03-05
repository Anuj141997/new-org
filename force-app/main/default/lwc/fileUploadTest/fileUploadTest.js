/**
 * @description       :
 * @author            : Anuj Panwar
 * @group             :
 * @last modified on  : 02-28-2023
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   12-20-2022   Anuj Panwar   Initial Version
 **/
import { LightningElement, api } from "lwc";

export default class FileUploadTest extends LightningElement {
  @api recordId;
  recId = "0035g00000AhnNqAAJ";

  get acceptedFormats() {
    return [".pdf", ".png"];
  }

  handleUploadFinished(event) {
    // Get the list of uploaded files
    const uploadedFiles = event.detail.files;
    console.log("uploadedFiles :>> ", uploadedFiles);
  }
}
