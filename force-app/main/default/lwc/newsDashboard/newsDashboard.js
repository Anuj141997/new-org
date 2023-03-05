import { LightningElement } from 'lwc';
import getNews from '@salesforce/apex/NewsController.getNews';

export default class NewsDashboard extends LightningElement {

    result
    selectedNews={}
    showModal = false;

    get modalClass()
    {
        return this.showModal?'slds-modal slds-fade-in-open':'slds-modal'
    }
    
    get modalBackClass()
    {
        return this.showModal?"slds-backdrop slds-backdrop_open":'slds-modal'
     }

    connectedCallback()
    {
        this.fetchNews()
    }
    
    fetchNews()
    {
        getNews()
            .then(res =>
            {
                console.log('res :>> ', res);
                this.formattedData(res.articles)
            })
            .catch(error =>
            {
                console.log('error :>> ', error);
             })
    }
    
    formattedData(res)
    {
        this.result=res.map((item,index) =>
        {
            let id = `new_${index + 1}`
            let name = item.source.name
            let date= new Date(item.publishedAt).toDateString()
            
            return{...item,id:id,name:name,date:date}


         })

    }
    
    openModal(e)
    {
        let id = e.target.dataset.id
        this.showModal = true
        
        this.result.forEach(item =>
        {
            if (item.id === id)
            {
                this.selectedNews = { ...item }
             }
         })
    }
    
    closeModal()
    {
        this.showModal=false
     }

}