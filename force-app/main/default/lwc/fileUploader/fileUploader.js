import { LightningElement, api } from "lwc";
import fi from "@salesforce/apex/FileUploaderController.uploadFile";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class FileUploader extends LightningElement {
  @api recordId;
  filedata;
  showSpinner = false;

  file(e) {
    const f = e.target.files[0];

    var reader = new FileReader();

    reader.onload = () => {
      var base64 = reader.result.split(",")[1];
      this.filedata = {
        filename: f.name,
        base64: base64,
        recordId: this.recordId
      };
      console.log(this.filedata);
      // this.showSpinner = false;
      this.upload();
    };
    this.showSpinner = true;
    reader.readAsDataURL(f);
  }

  upload() {
    const b = this.filedata.base64;
    const f = this.filedata.filename;
    const r = this.filedata.recordId;
    // alert( base64, filename, recId );
    console.log(b, f, r);
    fi({ base64: b, filename: f, recordId: r })
      .then((res) => {
        console.log("res :>> ", res);
        this.filedata = null;
        this.showSpinner = false;
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: `${f} Uploaded Successfully`,
            variant: "success"
          })
        );
      })
      .catch((error) => {
        console.log("error :>> ", error);
        this.filedata = null;
        this.showSpinner = false;
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Failure",
            message: "Upload Failed: " + error.body.message,
            variant: "error"
          })
        );
      });
  }

  uploadFinish(e) {
    const uploadedFiles = e.detail.files;
    alert("No. of files uploaded : " + uploadedFiles.length);
  }
}
