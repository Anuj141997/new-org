import { LightningElement,api } from 'lwc';
import generatePdf from '@salesforce/apex/pdfController.generatePdf';
import { NavigationMixin } from 'lightning/navigation';


export default class PdfGeneration extends NavigationMixin(LightningElement) {

    @api recordId;

    imageUrl ='https://www.sparksuite.com/images/logo.png'
    invoiceData = 
        {
            invoiceNo: '123',
            invoiceCreated: 'Nov 14 2020',
            invoiceDue: 'Dec 10 2020',
            companyName: 'Wipro',
            address1: '12345 Sarjapur Road',
            address2: 'Bangalore, Karnatka'
            
        }
    
    clientData =
        {
            client: 'Dazeworks',
            userName: 'Rahul Tyagi',
            email:'rahul@gmail.com'
        }

    services =[
        {
            name:'Consulting fees',amount:1000.00
        },
        {
            name:'Website design',amount:300.00
        },
        {
            name:'Hosting(3 months)',amount:100.00
        }
    ]
    

    get totalAmount()
    {
        return this.services.reduce((total, service) =>
        {
            return total= total+service.amount
         },0)
    }
    
    pdfHandler()
    {
        let content = this.template.querySelector('.container');
        console.log(content.outerHTML)

        generatePdf({ recordId: this.recordId, data: content.outerHTML })
            .then(res =>
            {
                console.log('result :>> ', res);
                 
                this[NavigationMixin.Navigate](
            {
                type: 'standard__namedPage',
                attributes:
                {
                    pageName:'filePreview'
                },
                state:
                {
                    
                    selectedRecordId : res
                    }
            })
            })
            .catch(error =>
            {
                console.log('error :>> ', error);
             })
     }

}