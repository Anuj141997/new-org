import { LightningElement,wire } from 'lwc';
import { exportCSV } from 'c/utils';
import getCon from '@salesforce/apex/ContactListView.getCon2';

export default class CsvDemo extends LightningElement {

    wiredData;
    @wire(getCon)
    contacts({ error, data })
    {
        if (data)
        {
           // console.log('data :>> ', data);
        //    this.wiredData  = data;
           this.wiredData = data.map((o) => {
                const { Account } = o
                console.log('Account.Name :>> ', Account?.Name);
                return {
                    ...o,
                    AccountName: Account?.Name
                }

            })
           console.log('this.wiredData :>> ', this.wiredData);
        }
        if (error)
        {
            console.log('error :>> ', error);
        }
        
    }
    
    userData =[
        {
            username: 'Rahul',
            age: 22,
            title:'Developer'
        },
         {
            username: 'Viplove',
            age: 24,
            title:'Developer'
        },
          {
            username: 'Rohit',
            age: 23,
            title:'Peon'
        },
           {
            username: 'Dev',
            age: 22,
            title:'Consultant'
        },
    ]
    
    

    headers =
        {
            Id : 'RecordId',
            FirstName: 'FirstName',
            LastName: 'LastName',
            Email: 'Email',
            AccountId: 'AccountId',
            AccountName:'Account Name'

        }
    
    downlaodUserData(e)
    {
        exportCSV(this.headers,this.wiredData,"Contact Detail")
     }
}