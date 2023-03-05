import { LightningElement,track,wire } from 'lwc';
import getdata from '@salesforce/apex/GetContactCase.getdata';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import caseStatus from '@salesforce/schema/Case.Status';
import caseAction from '@salesforce/schema/Case.Action_Taken__c';
import getBusi from '@salesforce/apex/GetIndustry.getBusiness';
import getDiv from '@salesforce/apex/GetIndustry.getDivision';
import getArea from '@salesforce/apex/GetIndustry.getArea';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


// **********CONTACT******************
import ConObj from '@salesforce/schema/Contact';
import ContFname from '@salesforce/schema/Contact.FirstName';
import ContLname from '@salesforce/schema/Contact.LastName';
import ContEmail from '@salesforce/schema/Contact.Email';
import ContPhn from '@salesforce/schema/Contact.Phone';
import ContCity from '@salesforce/schema/Contact.MailingCity';
import ContState from '@salesforce/schema/Contact.MailingState';
import ContCount from '@salesforce/schema/Contact.MailingCountry';
import ContZcode from '@salesforce/schema/Contact.MailingPostalCode';
import ContBusi from '@salesforce/schema/Contact.Business_Vertical__c';
import ContDiv from '@salesforce/schema/Contact.Division_of_Vertical__c';
import ContArea from '@salesforce/schema/Contact.Area_of_Division__c';
import ContDate from '@salesforce/schema/Contact.Date_Procured__c';
import ContInvest from '@salesforce/schema/Contact.Amount_Invested__c';
import ContEarn from '@salesforce/schema/Contact.Amount_Earned__c';

// ***********CASE ******************************************
import caseObj from '@salesforce/schema/Case';
import cConid from '@salesforce/schema/Case.ContactId';
import cStatus from '@salesforce/schema/Case.Status';
import cAction from '@salesforce/schema/Case.Action_Taken__c';
import cSub from '@salesforce/schema/Case.Subject';
import cDesc from '@salesforce/schema/Case.Description';






export default class FirstComp extends NavigationMixin(LightningElement) {
   
//  ************************************** 
    showCon = false;
    showCase = false;
    showSearchCon = false;
    showReport = false;
    CaseWithCon = false;
//    *******************************
   
    srcCon='';
    ConLookUp;
    ActionFilterValue;
    StatusFilterValue;
    cNum='';

    CaseStatus; StatusSelectValue;
    CaseAction; ActionSelectValue;
    BusinessData; BusinessSelectValue;
    DivisionData; DivisionSelectValue;
    AreaData; AreaSelectValue;

    // ************CONTACT FLDS******************
    ConArea; ConBusi; ConCity; ConCount; ConDate; ConDiv; ConEarn; ConEmail; ConFname; ConInvest;
    ConLname; ConPhn; ConState; ConZcode;

    // ***********Case FLDS*******************

    cstatus; csub; cdesc; cconid; caction;

    @track ReportData;
    @track ReportData2;
    errors;

    @track options = [
        { label: 'Red', value: 'red' },
        { label: 'Pink', value: 'pink' }
    ];

// ****************************************
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: caseStatus }) StatusPick;
     @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName: caseAction}) ActionPick;

        @wire(getdata)
        contacts({  error,data })
        {
            if (data) {

                let newReportData = [];
               
                data.forEach(element => {
                    if (element.Cases)
                    {
                        console.log('element.Cases :>> ', element);
                        
                        newReportData.push(element)
                        
                    }
                    // if (!element.Cases)
                    // {
                    //     data.splice(element, 1);
                    //  }
                });
                                  console.log('newReportData :>> ', newReportData);

                this.ReportData = newReportData;
            } if (error) {
                this.errors = error;
            }  console.log('data',this.ReportData);
           
        }
    
    

        
// ***************************************************
    
    ConWithCase(e)
    {
        this.showCon = true;
        this.CaseWithCon = true;
        this.showCase = false;
        this.showReport = false;
        this.showSearchCon = false;
        this.getBusinessData();
     }
    Caseselect(e)
    {
        this.CaseSelectValue = e.target.value;
    }

    // CONTACT MODAL ***********************************************

    conModal()
    {
        this.showCon = true;
        this.showSearchCon = false;
        this.showCase = false;
        this.CaseWithCon = false;

        this.getBusinessData();
    }
    getBusinessData() {
        getBusi()
            .then(result => {
                let BusinessArray = [];
               
                for (let k in result) {
                    BusinessArray.push({ label: result[k], value: result[k] });
                }
                this.BusinessData = BusinessArray;
             
                console.log('buisness', this.BusinessData);
            })
            .catch(errors => {
                this.error = errors;
            });
    }
    BusinessSelect(ev)
    {
        this.BusinessSelectValue = ev.target.value;
        this.ConBusi = ev.target.value;
        getDiv({ buis: this.BusinessSelectValue } )
            .then(result => {
             let DivisionArray = [];
               
                for (let k in result)
                {
                    DivisionArray.push({ label: result[k], value: result[k] });
                }
             this.DivisionData = DivisionArray;
             
                console.log('Division', this.DivisionData);
            })
            .catch(errors=>{
                this.error = errors;
                console.log('div error', this.error);
            });

    }
    
    DivisionSelect(ev)
    {
        this.DivisionSelectValue = ev.target.value;
        this.ConDiv = ev.target.value;
         getArea({ div: this.DivisionSelectValue } )
            .then(result => {
             let AreaArray = [];
               
                for (let k in result)
                {
                    AreaArray.push({ label: result[k], value: result[k] });
                }
             this.AreaData = AreaArray;
             
                
            })
            .catch(errors=>{
                this.error = errors;
                console.log('area error', this.error);
            });
    }
    
    AreaSelect(ev)
    {
        this.AreaSelectValue = ev.target.value;
        this.ConArea = ev.target.value;
     }

    ConChnage(ev)
    {
        if (ev.target.label == 'First Name')
        {
            this.ConFname = ev.target.value;
        }
         if (ev.target.label == 'Last Name')
        {
            this.ConLname = ev.target.value;
         }
         if (ev.target.label == 'Email')
        {
            this.ConEmail = ev.target.value;
         }
         if (ev.target.label == 'Phone')
        {
            this.ConPhn = ev.target.value;
         }
         if (ev.target.label == 'City')
        {
            this.ConCity = ev.target.value;
         }
         if (ev.target.label == 'State')
        {
            this.ConState = ev.target.value;
         }
         if (ev.target.label == 'Country')
        {
            this.ConCount = ev.target.value;
         }
         if (ev.target.label == 'ZipCode')
        {
            this.ConZcode = ev.target.value;
         }
         if (ev.target.label == 'Date Procured')
        {
            this.ConDate = ev.target.value;
         }
         if (ev.target.label == 'Amount Invested')
        {
            this.ConInvest = ev.target.value;
         }
         if (ev.target.label == 'Amount Earned')
        {
            this.ConEarn = ev.target.value;
         }
     }
    
    
    // CREATE NEW CASE MODAL ******************************************
    

    searchCon()
    {
        this.showSearchCon = true;
        this.showCase = false;
        this.showCon = false;
     }
    caseModal() {
        this.showCase = true;
        this.showCon = false;
        this.showSearchCon = false;
    }
        StatusSelect(ev)
        {
            this.StatusSelectValue = ev.target.value;
            this.cstatus = this.StatusSelectValue;
        }
        ActionSelect(ev)
        {
            this.ActionSelectValue = ev.target.value;
            this.caction = this.ActionSelectValue;
         }
    
    caseChange(ev)
    {
        if (ev.target.label == 'Subject')
        {
            this.csub = ev.target.value;
        }
         if (ev.target.label == 'Description')
        {
            this.cdesc = ev.target.value;
         }
     }


    reset()
    {
        this.showCon = false;
        this.showCase = false;
        this.showSearchCon = false;
        this.showReport = false;
        this.CaseWithCon = false;
        this.ClearDataCase();
        this.ClearDataCon();        
    }
  
    handleSelectId(ev)
    {
        this.cconid = ev.detail;
      //  console.log('id', this.conId);
    }
    handleSelectName(ev)
    {
        this.ConLookUp = ev.detail;
      //  console.log('id', this.conId);
    }
    report()
    {
        this.showReport = true;
          this.showCase = false;
        this.showCon = false;
        this.showSearchCon = false;
     }
    closemodal()
    {
        this.showCase = false;
        this.showCon = false;
        this.showSearchCon = false;
        this.ClearDataCase();
        this.ClearDataCon();
        this.showReport = false;
        this.CaseWithCon = false;
    }

// ***********CASE WITH CON **************************
    
    saveContactWithCase()
    {
       
         let fields={};
         fields[ContFname.fieldApiName] = this.ConFname;
         fields[ContLname.fieldApiName] = this.ConLname;
         fields[ContEmail.fieldApiName]=this.ConEmail;
         fields[ContPhn.fieldApiName]=this.ConPhn;
         fields[ContState.fieldApiName]=this.ConState;
         fields[ContCount.fieldApiName]=this.ConCount;
         fields[ContCity.fieldApiName]=this.ConCity;
         fields[ContZcode.fieldApiName]=this.ConZcode;
         fields[ContBusi.fieldApiName]=this.ConBusi;
         fields[ContDiv.fieldApiName]=this.ConDiv;
         fields[ContArea.fieldApiName]=this.ConArea;
         fields[ContDate.fieldApiName]=this.ConDate;
         fields[ContInvest.fieldApiName]=this.ConInvest;
         fields[ContEarn.fieldApiName]=this.ConEarn;
         
        
         const fields2={};
         fields2[cStatus.fieldApiName] = this.cstatus;
         fields2[cAction.fieldApiName] = this.caction;
         fields2[cSub.fieldApiName]=this.csub;
       
        // console.log('flds', fields);
        const recinp = { apiName: ConObj.objectApiName, fields };
                  //console.log('fields[ContBusi] :>> ', fields[ContBusi.fieldApiName]);
         
         
         if (fields[ContBusi.fieldApiName] != undefined && fields[ContDiv.fieldApiName] != undefined && fields[ContEmail.fieldApiName] != undefined && fields[ContLname.fieldApiName] != undefined
             && fields[ContInvest.fieldApiName] != undefined && fields[ContEarn.fieldApiName] != undefined
             && fields[ContPhn.fieldApiName] != undefined && fields[ContZcode.fieldApiName] != undefined &&
            fields2[cStatus.fieldApiName] != undefined && fields2[cAction.fieldApiName] != undefined 
             && fields2[cSub.fieldApiName] != undefined) {
             
             

             createRecord(recinp)
                 .then(contact => {
                    
                     this.cconid = contact.id;
                     console.log('id', contact.id);
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Success',
                             message: 'Contact ' + contact.fields.LastName.value + ' created successfully',
                             variant: 'success',
                         }),
                     );
                         let fields={};
                        fields[cStatus.fieldApiName] = this.cstatus;
                        fields[cAction.fieldApiName] = this.caction;
                        fields[cSub.fieldApiName]=this.csub;
                        fields[cDesc.fieldApiName] = this.cdesc;
                     fields[cConid.fieldApiName] = contact.id;
                     const recinp2 = { apiName: caseObj.objectApiName, fields };
                  
                 createRecord(recinp2)
                     .then(res => {
                        
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Success',
                             message: 'Case '+ res.fields.CaseNumber.value + ' created successfully',
                             variant: 'success',
                         }),
                     );   this[NavigationMixin.Navigate]({

                         type: 'standard__recordPage',
                         attributes: {
                             recordId: res.id,
                             objectApiName: 'Case',
                             actionName: 'view'
                         },

                     });
                     this.ClearDataCase();
                         
                       })
                 .catch(error => {
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Case',
                             message: 'error',
                             variant: 'error',
                         }),
                     )
                   
                 });
                     this.ClearDataCon();
                 })
                 .catch(error => {
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Contact',
                             message: 'error',
                             variant: 'error',
                         }),
                     );
                     console.log('error', error);
                 });
             
                     

             
         }
         else {
               this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Record',
                             message: 'Please fill out all details',
                             variant: 'error',
                         }),
                     );
         }
       
      
     }
    
// ****CREATE CONTACT*********************
    
     saveContact()
    {
        let fields={};
         fields[ContFname.fieldApiName] = this.ConFname;
         fields[ContLname.fieldApiName] = this.ConLname;
         fields[ContEmail.fieldApiName]=this.ConEmail;
         fields[ContPhn.fieldApiName]=this.ConPhn;
         fields[ContState.fieldApiName]=this.ConState;
         fields[ContCount.fieldApiName]=this.ConCount;
         fields[ContCity.fieldApiName]=this.ConCity;
         fields[ContZcode.fieldApiName]=this.ConZcode;
         fields[ContBusi.fieldApiName]=this.ConBusi;
         fields[ContDiv.fieldApiName]=this.ConDiv;
         fields[ContArea.fieldApiName]=this.ConArea;
         fields[ContDate.fieldApiName]=this.ConDate;
         fields[ContInvest.fieldApiName]=this.ConInvest;
         fields[ContEarn.fieldApiName]=this.ConEarn;
         
        // console.log('flds', fields);
         const recinp = { apiName: ConObj.objectApiName, fields };
         //console.log('fields[ContBusi] :>> ', fields[ContBusi.fieldApiName]);
         
         
         if (fields[ContBusi.fieldApiName] != undefined && fields[ContDiv.fieldApiName] != undefined &&
             fields[ContEmail.fieldApiName] != undefined && fields[ContLname.fieldApiName] != undefined 
             && fields[ContInvest.fieldApiName] != undefined && fields[ContEarn.fieldApiName] != undefined
             && fields[ContPhn.fieldApiName] != undefined && fields[ContZcode.fieldApiName] != undefined
             && fields[ContDate.fieldApiName] != undefined)
         
         {
            //  createRecord(recinp).then(contacts =>
            //  {
            //      console.log('contacts :>> ', contacts);

               
            //     //   this.dispatchEvent(
            //     //          new ShowToastEvent({
            //     //              title: 'Success',
            //     //              message: 'Contact ' + contacts.fields.Name.value + ' created successfully',
            //     //              variant: 'success',
            //     //          }),
            //     //      );
            //     //      this.ClearDataCon();
            //   }).catch(error=>{console.log('error :>> ');})
             

             createRecord(recinp).then(contacts => {

                 this.dispatchEvent(
                     new ShowToastEvent({
                         title: 'Success',
                         message: 'Contact ' + contacts.fields.LastName.value + ' created successfully',
                         variant: 'success',
                     }),
                 );
                 this.ClearDataCon();
                 this[NavigationMixin.Navigate]({

                     type: 'standard__recordPage',
                     attributes: {
                         recordId: contacts.id,
                         objectApiName: 'Contact',
                         actionName: 'view'
                     },

                 });
             }).catch(error =>
                 {
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Contact',
                             message: error.body.message,
                             variant: 'error',
                         }),
                     );
                     console.log('error', error);
                 });
                  

             
         }
         else {
               this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Contact',
                             message: 'Please fill out all details',
                             variant: 'error',
                         }),
                     );
         }
            
     }
    
    saveCase()
    {
       
         const fields={};
         fields[cStatus.fieldApiName] = this.cstatus;
         fields[cAction.fieldApiName] = this.caction;
         fields[cSub.fieldApiName]=this.csub;
        fields[cDesc.fieldApiName] = this.cdesc;
        fields[cConid.fieldApiName] = this.cconid;
        
         const recinp = { apiName: caseObj.objectApiName, fields };
         
        

         if (fields[cStatus.fieldApiName] != undefined && fields[cAction.fieldApiName] != undefined 
             && fields[cSub.fieldApiName] != undefined) {
             
             

             createRecord(recinp)
                 .then(cases => {
                    
                     

                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Success',
                             message: 'Case '+cases.fields.CaseNumber.value + ' created successfully',
                             variant: 'success',
                         }),
                     );
                     this[NavigationMixin.Navigate]({

                         type: 'standard__recordPage',
                         attributes: {
                             recordId: cases.id,
                             objectApiName: 'Case',
                             actionName: 'view'
                         },

                     });
                     this.ClearDataCase();
                 })
                 .catch(error => {
                     this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Case',
                             message: error.body.message,
                             variant: 'error',
                         }),
                     );
                     console.log('error', error);
                 });
             
         }
         else {
               this.dispatchEvent(
                         new ShowToastEvent({
                             title: 'Error creating Case',
                             message: 'Please fill out all details',
                             variant: 'error',
                         }),
                     );
         }
       
     }


    ClearDataCase()
    {
         this.cstatus = undefined; this.ActionSelectValue = '';
                     this.StatusSelectValue = '';
                     this.cdesc = undefined;
                     this.csub = undefined;
                     this.caction = undefined;
                     this.ConLookUp = '';
                     this.cconid = undefined;
    }

    ClearDataCon()
    {
        this.ConArea = undefined; this.ConBusi = undefined; this.ConCity = undefined; this.ConCount = undefined;
        this.ConDate = undefined; this.ConDiv = undefined; this.ConEarn = undefined; this.ConEmail = undefined;
        this.ConFname = undefined; this.ConInvest = undefined;
        this.ConLname = undefined; this.ConPhn = undefined;
        this.ConState = undefined; this.ConZcode = undefined;
        
        this.BusinessSelectValue = ''; this.DivisionSelectValue = '';
        this.AreaSelectValue = '';
    }


    // FILTER******************************

    numChange(e)
    {
        this.cNum = e.target.value;
        const c = e.target.value;

        
       
     }
   searchChange(event)
   {

      
       
           this.srcCon = event.target.value;
           const c = event.target.value;
       
     
     //  const c = this.srcCon;
      
        getdata({ con : c})
            .then(result=>
            {
                 let newReportData = [];
               
                result.forEach(element => {
                    if (element.Cases)
                    {
                        console.log('element.Cases :>> ', element);
                        
                        newReportData.push(element)
                        
                    }
                  
                });
                                //  console.log('newReportData :>> ', newReportData);

                this.ReportData = newReportData;
               
              
                console.log('this.ReportData :>> ', this.ReportData);
                
            })
            .catch(error => {
       
           this.errors = error;
            console.log('error',error);
         })
     }

}