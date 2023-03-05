/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 11-30-2022
 * @last modified by  : Anuj Panwar 
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   11-30-2022   Anuj Panwar   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import getCon from '@salesforce/apex/ContactListView.getCon';
import searchContacts from '@salesforce/apex/ContactListView.searchC';
import { NavigationMixin } from 'lightning/navigation';
import del from '@salesforce/apex/ContactListView.del';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';

const ACTIONS = [{ label: 'Delete', name: 'delete' },
                  { label: 'Edit', name: 'edit' }];

const COLS = [{ label: 'Name', fieldName: 'link', type: 'url',  : { label: { fieldName: 'FullName' } } },

    { label: 'Email', fieldName: 'Email' ,type:'email',editable:true},
    { label: 'Account', fieldName: 'Accountlink', type: 'url', typeAttributes: { label: { fieldName: 'AccountName',editable:true } } },
    { label: 'Mailing Adress', fieldName: 'MailingAddress',editable :true },
    {fieldName:'actions', type:'action',typeAttributes:{rowActions : ACTIONS}}
]

export default class ListView extends NavigationMixin(LightningElement) {

    cols = COLS;

    contacts;
    wiredContacts;
    selectedContacts;
    baseData;

    draftValues = [];
    
    @wire(getCon)
    contactsWire(result)
    {
        this.wiredContacts = result;
        if (result.data)
        {
            this.contacts = result.data
             console.log('data1',this.contacts)
            this.contacts = result.data.map((row)=>
                {
                return this.mapContacts(row);
            });
            this.baseData = this.contacts;
            console.log('data',this.contacts)
        }
        if (result.error)
        {
            console.error(result.error);
         }
    }
    
    mapContacts(row) {
       

        var accountName = '';
        var accountlink = '';
        if (row.AccountId != undefined)
        {
            accountlink = `/${row.AccountId}`;
            accountName = row.Account['Name'];
        }
        
        var street = row.MailingStreet;
        if (row.MailingStreet == undefined)
        {
            street = '';
        }
         var city = row.MailingCity;
        if (row.MailingCity == undefined)
        {
            city = '';
        }
         var state = row.MailingState;
        if (row.MailingState == undefined)
        {
            state = '';
        }
         var country = row.MailingCountry;
        if (row.MailingCountry == undefined)
        {
            country = '';
        }
         var zcode = row.MailingPostalCode;
        if (row.MailingPostalCode == undefined)
        {
            zcode = '';
         }
        return {
            ...row,
            FullName: `${row.FirstName} ${row.LastName}`,
            link: `/${row.Id}`,
            AccountName: accountName,
            Accountlink: accountlink,
            MailingAddress : `${street} ${city} ${state} ${zcode} ${country} `
            
        };
    }

    handleRowSelection(e)
    {
        this.selectedContacts = e.detail.selectedRows;
        
    }
    
    get selectedContactsLength()
    {
        if (this.selectedContacts == undefined) return 0;
        return this.selectedContacts.length;
    }
    
    async handleSearch(e)
    {
        if (e.target.value == '')
        {
            this.contacts = this.baseData;
        }
        else if (e.target.value.length > 1)
        {
            const searchCon = await searchContacts({ s: e.target.value })
            
            this.contacts = searchCon.map(row =>
            {
                return this.mapContacts(row);
             })
        }
    }
    
    navToNew()
    {
        this[NavigationMixin.Navigate](
            {
                type: 'standard__objectPage',
                attributes:
                {
                    objectApiName: 'Contact',
                    actionName :'new'
                    }
            })
        
    }
    
    handleRowAction(e)
    {

        const actionN = e.detail.action.name;

        if (actionN == 'delete') {
            del({ conId: [e.detail.row.Id] }).then(() => {
                refreshApex(this.wiredContacts);

                const ev = new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact deleted successfully',
                    variant: 'success',
                });
                this.dispatchEvent(ev);
            }).catch(error => {
                const ev = new ShowToastEvent({
                    title: 'Error deleting Contact',
                    message: error.body.message,
                    variant: 'error',
                });
                this.dispatchEvent(ev);
            })
        }
        if (actionN == 'edit')
        {
            this[NavigationMixin.Navigate](
            {
                type: 'standard__recordPage',
                attributes:
                {
                    recordId: e.detail.row.Id,
                    objectApiName: 'Contact',
                    actionName :'edit'
                    }
            })

         }
    }
    
    delSelectedCon()
    {
        var IdList = this.selectedContacts.map(row => { return row.Id });

        del({conId : IdList}).then(() =>
        
        {
            refreshApex(this.wiredContacts);

            const ev = new ShowToastEvent({
                title: 'Success',
                message: 'Contacts deleted successfully',
                variant: 'success',
            });
            this.dispatchEvent(ev);
        }).catch(error =>
        {
               const ev = new ShowToastEvent({
                title: 'Error',
                message: error.body.message,
                variant: 'Error',
            });
            this.dispatchEvent(ev);
         })
        
        this.template.querySelector('lightning-datatable').selectedRows = [];
        this.selectedContacts = undefined;
    }

    handleSave(e)
    {
        console.log(e.detail.draftValues);

        const recInp = e.detail.draftValues.slice().map(draft => {
            const fields= Object.assign({},draft)
            return {fields}
        })

        const promise = recInp.map(r => updateRecord(r))
        Promise.all(promise).then(res => {

              const ev = new ShowToastEvent({
                title: 'Success',
                message: 'Contacts Updated successfully',
                variant: 'success',
            });
            this.dispatchEvent(ev);
            this.draftValues = [];
            return refreshApex(this.wiredContacts);
        }).catch(error => {
              const ev = new ShowToastEvent({
                title: 'Failed',
                message:error.body.message,
                variant: 'error',
            });
            this.dispatchEvent(ev);
        })
     }
}