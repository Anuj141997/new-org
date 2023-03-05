/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 11-01-2022
 * @last modified by  : Anuj Panwar 
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   11-01-2022   Anuj Panwar   Initial Version
**/
import { LightningElement } from "lwc";
import modal from "@salesforce/resourceUrl/modal";
import { loadStyle } from "lightning/platformResourceLoader";

export default class QuickActionDemo extends LightningElement {
  connectedCallback() {
    loadStyle(this, modal);
  }
}
