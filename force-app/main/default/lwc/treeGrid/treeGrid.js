import { LightningElement, wire } from 'lwc';
import getAcc from '@salesforce/apex/TreeGridData.getAcc';


export default class TreeGrid extends LightningElement {


    gridCol =
        [
            { type: 'url', label: 'Account Name', fieldName: 'acclink', typeAttributes: { label: { fieldName: 'accName' } } },
              { type: 'url', label: 'Account Website', fieldName: 'Website', typeAttributes: { target: '_blank' } },
            { type: 'text', label: 'Phone', fieldName: 'Phone' },
          
            { type: 'url', label: 'Contact Name', fieldName: 'conlink', typeAttributes: { label: { fieldName: 'conName' } } },
            {type:'email',label:'Email',fieldName:'Email'}
        ]
    
    wiredData

    @wire(getAcc)
    gridData({ error, data })
    {
        if (data)
        {
            console.log('data :>> ', data);
            this.wiredData = data;
          
            this.updatedData(data);
            console.log('this.wiredData2 :>> ', this.wiredData);
        }
        if (error)
        {
            console.log('error :>> ', error);
        }
        
        
    }
    
    updatedData(data)
    {
      
        
        this.wiredData = data.map(row =>
        {
            let { Contacts } = row
            
             Contacts=Contacts?.map(r => {
                return {
                    ...r,
                    conName: r.Name,
                    conlink: `/${r.Id}`
                }
             })
            if (Contacts) {
                return {
                    ...row,
                    acclink: `/${row.Id}`,
                    accName: row.Name,
                    '_children': Contacts
                }
            }
            else
            {
                 return {
                    ...row,
                    acclink: `/${row.Id}`,
                    accName: row.Name,      
                }
             }
         })
     }
}