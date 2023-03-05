import { LightningElement, wire } from 'lwc';
import getOp from '@salesforce/apex/DataLoader.getOpp';

export default class PaginationDemo extends LightningElement {

    totalRec
    newRec

    @wire(getOp)
    Opportunities({ error, data })
    {
        if (data)
        {
            this.totalRec = data;

        }
        if (error)
        {
            console.log('error :>> ', error);
         }
    }
    
    HandleSlicedData(e)
    {
        this.newRec=e.detail.records
     }

}