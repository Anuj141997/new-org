import { LightningElement,track,wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import Opp_Obj from '@salesforce/schema/Opportunity';
import { getPicklistValues , getObjectInfo} from 'lightning/uiObjectInfoApi';
import Stage_fld from '@salesforce/schema/Opportunity.StageName';
import { updateRecord } from 'lightning/uiRecordApi';
import Id_fld  from '@salesforce/schema/Opportunity.Id';   
import {refreshApex} from '@salesforce/apex';  

export default class DragAndDrop extends LightningElement {


     OppData
     @track StageNm
     recordId

    //  Fetching Opp ListView
    @wire(getListUi,
        {
            objectApiName:Opp_Obj,
            listViewApiName:'AllOpportunities'
        })wiredData({error,data})
        {
            if(data)
            {
                let oppWithAcc=[]
                data.records.records.forEach(element => {
                    if(element.fields.Account.value && element.fields.Amount.value)
                    {
                        oppWithAcc.push(element)
                    }
                    
                });

                console.log('new Data',oppWithAcc)
                this.OppData=oppWithAcc.map(item=>{ 
                    let field=item.fields  
                    let acc=field.Account.value.fields
                    return {
                    Id:field.Id.value, Name:field.Name.value, AccountId:acc.Id.value,
                    AccountName:acc.Name.value,
                    CloseDate:field.CloseDate.value,
                    StageName:field.StageName.value,
                    Amount:field.Amount.value   

                }
                })
                console.log('data',this.OppData)               
            }
            if(error)
            {
                console.log(error);
            }
        }

        //  Fetching metadata About Opp Object
        @wire(getObjectInfo,{objectApiName:Opp_Obj})objectInfo

        // Fetching Stage PickList
        @wire(getPicklistValues,{
            recordTypeId:'$objectInfo.data.defaultRecordTypeId',
            fieldApiName:Stage_fld,})Stages({error,data})
            {
                if(data)
                {
                   console.log('stage',data); 

                   this.StageNm=data.values.map(row=>row.value)

                    console.log('stagen',this.StageNm);
                }
                if(error)
                {
                    console.error(error);
                }

            }


            get calWidth()
            {
                let len=this.StageNm.length +1
                return `width: calc(100vw/ ${len})`
            }

            itemdrag(ev)
            {
                 this.recordId=ev.detail
                console.log('id',this.recordId)
                }

            itemdrop(e)
            {
                 let stage=e.detail
            //    this.OppData= this.OppData.map(item=>
            //         {
            //             return item.Id === this.recordId ? {...item,StageName:stage}:{...item}
            //         })

           this.updateHandler(stage)
            }

            updateHandler(stage)
            {
                const fields={}
                fields[Id_fld.fieldApiName]=this.recordId
                fields[Stage_fld.fieldApiName]=stage

                const recordInput= {fields}
                updateRecord(recordInput)
                .then(()=>
                {
                    console.log('Updated ')

                    //return refreshApex(this.WiredData)
                })
                .catch(error=>
                {
                    console.log('error',error)
                })
            }
}