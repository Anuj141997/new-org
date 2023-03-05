import { LightningElement ,wire} from 'lwc';
import getdata from '@salesforce/apex/GetContactCase.getdata';

import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import caseStatus from '@salesforce/schema/Case.Status';
import caseAction from '@salesforce/schema/Case.Action_Taken__c';

export default class Report extends LightningElement {

    ReportData;
    cNum='';
    srcCon='';
    ActionFilterValue; StatusFilterValue;

      @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: caseStatus }) StatusPick;
     @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName: caseAction}) ActionPick;

      @wire(getdata)
        contacts({  error,data })
        {
            if (data) {
                this.ReportData = data;
            } if (error) {
                this.errors = error;
            }//  console.log('data',this.ReportData);
           
      }
    
    searchChange(e)
    {
      
            this.srcCon = e.target.value;
        const c = e.target.value;
        
         getdata({ con : c})
            .then(result=>
            {
                console.log('res', result);
                this.ReportData = result;
              
                console.log('this.ReportData :>> ', this.ReportData);
                
            })
            .catch(error => {
       
          
            console.log('error',error);
         })
         
     }
}