import { LightningElement, track } from "lwc";

export default class DemoApp extends LightningElement {
  @track className = "slds-m-around_medium red";

  newEndTime = "";

  showData = false;
  @track data = [
    { label: "testttt", value: "testttt" },
    { label: "testttt1", value: "testttt" },
    { label: "testttt2", value: "testttt" },
    { label: "testttt3", value: "testttt" },
    { label: "testttt4", value: "testttt" },
    { label: "testttt5", value: "testttt" },
    { label: "testttt6", value: "testttt" },
    { label: "testttt7", value: "testttt" },
    { label: "testttt8", value: "testttt" },
    { label: "testttt9", value: "testttt" },
    { label: "testttt40", value: "testttt" },
    { label: "testttt0", value: "testttt" }
  ];

  genericTimeClick(e) {
    this.newEndTime = e.target.value;
  }
  connectedCallback() {
    // navigator.sayswho = (function () {
    //   var ua = navigator.userAgent,
    //     tem,
    //     M =
    //       ua.match(
    //         /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
    //       ) || [];
    //   if (/trident/i.test(M[1])) {
    //     tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    //     return "IE " + (tem[1] || "");
    //   }
    //   if (M[1] === "Chrome") {
    //     tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
    //     if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
    //   }
    //   M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    //   if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    //   return M.join(" ");
    // })();

    // console.log(navigator.sayswho);

    var userAgent = navigator.userAgent.toLowerCase();
    //alert('userAgent'+userAgent);
    var currentBrowser = "";

    if (userAgent.match("firefox")) {
      currentBrowser = "Firefox";
    }

    if (currentBrowser.includes("Firefox")) {
      this.className = "slds-m-around_medium red";
    } else {
      this.className = "slds-m-around_medium green";
    }
  }

  handlePress() {
    console.log("this.showData :>> ", this.showData);
    this.showData = true;
    console.log("this.showData :>> ", this.showData);
  }
}
