import { api, LightningElement, wire } from 'lwc';
import getFiles from '@salesforce/apex/FilePreviewData.getFiles';
import { NavigationMixin } from 'lightning/navigation';

export default class FilePreview extends NavigationMixin(LightningElement) {

    @api recordId;
    totalData;

    @wire(getFiles,{ recId: '$recordId' })
    wiredFiles({ error, data })
    {
        if (data)
        {
            this.totalData = Object.keys(data).map(item =>
            ({
                'label': data[item], 'value': item,
                "url": `/sfc/servlet.shepherd/document/download/${item}`
            }))

            console.log('this.totalData :>> ', this.totalData);
            
        }
        if (error)
        {
            console.log('error :>> ', error);
         }
    }
    
    preview(e)
    {
        this[NavigationMixin.Navigate](
            {
                type: 'standard__namedPage',
                attributes:
                {
                    pageName:'filePreview'
                },
                state:
                {
                    selectedRecordId : e.target.dataset.id
                    }
            })
    }
}