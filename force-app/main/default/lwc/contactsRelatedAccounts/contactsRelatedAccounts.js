import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import indus from '@salesforce/apex/Indus.getBusiness';

export default class ContactsRelatedAccounts extends LightningElement {

    AccountsData
    selectedAccount
    options=[]
    

    @wire(getAccounts)
    accounts({error,data})
    {
        if(data)
        {
            this.AccountsData=data;
            console.log('data',this.AccountsData);

            this.options = this.AccountsData.map(item=>({
                label: item.Name,
                value: item.Id
            }))

           
                           
        }
        if(error)
        {
            console.log(error);
        }
    }

    
    // for (let k in result) {
    //     BusinessArray.push({
    //       label: result[k],
    //       value: result[k]
    //     })

    // async fetchData()
    // {
    //     const data = await indus();

    //     console.log('async',data);
    // }

    
}