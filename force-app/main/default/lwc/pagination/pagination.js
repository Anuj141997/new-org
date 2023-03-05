import { LightningElement,api } from 'lwc';

export default class Pagination extends LightningElement {

    totalData
    pageSize = 5
    visibleRec
    totalPages = 0
    currentPage = 1
    
    get records()
    {
        return this.totalPages
    }
    
    @api
    set records(data)
    {
        if (data)
        {
            this.totalData = data
            this.totalPages = Math.ceil(data.length / this.pageSize)
            this.SlicedRec();
         }
    }

    get disablePrev()
    {
        return this.currentPage <= 1
    }
    get disableNext()
    {
        return this.currentPage >= this.totalPages
     }
    
    previous()
    {
        if (this.currentPage > 1)
        {
            this.currentPage = this.currentPage - 1
            this.SlicedRec()
         }
    }
    
    next()
    {
        if (this.currentPage < this.totalPages )
        {
            this.currentPage = this.currentPage + 1
            this.SlicedRec()
        }
        
    }
    

    SlicedRec() {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.pageSize * this.currentPage
         this.visibleRec = this.totalData.slice(start, end)
        this.dispatchEvent(new CustomEvent('getdata', {
            detail:{
            records: this.visibleRec
        }
    }))
     }
}