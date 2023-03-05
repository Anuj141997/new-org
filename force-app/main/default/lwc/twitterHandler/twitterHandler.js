import { api, LightningElement ,wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS=['Contact.Twitter_Handle__c']

export default class TwitterHandler extends LightningElement {

    twitterHandle='anujpanwar221';
    
    @api recordId;

    @wire(getRecord,{recordId:'$recordId',fields:FIELDS})
    conRecord({error,data})
    {
        if(data)
        {
            this.twitterHandle=data.fields.Twitter_Handle__c.value;
        }
        if(error)
        {
            console.log(error);
        }
    }

    get fullurl()
    {
        return `https://hcl-64e-dev-ed--c.visualforce.com/apex/TwitterFeedPage?twitterHandle=${this.twitterHandle}`
    }
}