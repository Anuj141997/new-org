import { LightningElement, track } from "lwc";
import getAccount from "@salesforce/apex/AccountController.getAccounts";
const options = [
  { label: "India", value: "India" },
  { label: "USA", value: "USA" },
  { label: "China", value: "China" },
  { label: "Rusia", value: "Rusia" },
  { label: "Austrlia", value: "Australia" },
  { label: "UK", value: "UK" },
  { label: "Pakistan", value: "India" },
  { label: "Japan", value: "USA" },
  { label: "Malasiya", value: "China" },
  { label: "HongKong", value: "Rusia" },
  { label: "Siangapore", value: "Australia" },
  { label: "Chile", value: "UK" },
  { label: "Srilanka", value: "India" },
  { label: "Meerut", value: "USA" },
  { label: "Agra", value: "China" },
  { label: "Delhi", value: "Rusia" },
  { label: "Mumbai", value: "Australia" },
  { label: "LOndon", value: "UK" },
  { label: "Jammu", value: "India" },
  { label: "CHennai", value: "USA" },
  { label: "Goa", value: "China" },
  { label: "Alaska", value: "Rusia" },
  { label: "Canada", value: "Australia" },
  { label: "Korea", value: "UK" },
  { label: "Bihar", value: "India" },
  { label: "Patna", value: "USA" },
  { label: "Bengal", value: "China" },
  { label: "Noida", value: "Rusia" },
  { label: "Austria", value: "Australia" },
  { label: "Egypt", value: "UK" },
  { label: "California", value: "India" },
  { label: "Tornto", value: "USA" },
  { label: "Lucknow", value: "China" },
  { label: "Bhuni", value: "Rusia" },
  { label: "Anuj", value: "Australia" },
  { label: "Ankit", value: "UK" }
];

export default class MultiSelectPickListParent extends LightningElement {
  @track selectedValue;
  @track selectedValueList = [];
  @track options = options;
  @track selectedObjectList = [];

  //for single select picklist
  handleSelectOption(event) {
    this.selectedValue = event.detail;
  }

  //for multiselect picklist
  handleSelectOptionList(event) {
    this.selectedValueList = event.detail;
  }

  connectedCallback() {
    console.log("parent :>> ");
    getAccount()
      .then((data) => {
        console.log("data :>> ", data);
        data = data.map((row) => {
          return {
            name: row.Name
          };
        });

        //console.log("data :>> ", data);

        this.selectedObjectList = [...this.generteObjectPicklist(data)];

        //console.log(this.selectedObjectList);
        // this.options = JSON.parse(JSON.stringify(this.selectedObjectList));
        // this.options = v;
        console.log("list", this.options);
      })
      .catch((error) => {
        console.log("error :>> ", error);
      });
  }
  //   @wire(getAccount)
  //   objectHandler({ data, error }) {
  //     if (data) {
  //       // console.log(data);
  //       // data = JSON.parse(JSON.stringify(data));
  //       console.log("data :>> ", data);
  //       data = data.map((row) => {
  //         return {
  //           name: row.Name
  //         };
  //       });

  //       //console.log("data :>> ", data);

  //       this.selectedObjectList = [...this.generteObjectPicklist(data)];

  //       //console.log(this.selectedObjectList);
  //       this.options = JSON.parse(JSON.stringify(this.selectedObjectList));
  //       // this.options = v;
  //       console.log("list", this.options);
  //     }
  //     if (error) {
  //       console.error(error);
  //     }
  //   }

  generteObjectPicklist(data) {
    return data.map((item) => ({ label: item.name, value: item.name }));
  }
}