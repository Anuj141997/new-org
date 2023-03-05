import { LightningElement, wire } from 'lwc';
import getCon from '@salesforce/apex/FilterController.getCon';
export default class FilterDemo extends LightningElement {
    
    headings = ['Id','Name','Title','Email']
    fullData
    filterData
    timer
    filterBy = 'Name'
    sortedBy = 'Name'
    sortDirection = 'asc'

    @wire(getCon)
    contacts({ error, data })
    {
        if (data)
        {
            console.log('data :>> ', data);
            this.fullData = data
            this.filterData=[...this.sortBy(data)]
        }
        if (error)
        {
            console.log('error :>> ', error);
         }
    }

    get filterOption()
    {
        return [
            { label:'All', value:'All'},
            { label: 'Id', value: 'Id' },
            { label: 'Name', value: 'Name' },
            { label: 'Title', value: 'Title' },
            { label: 'Email', value: 'Email' }
               
        ]
    }

      get sortOption()
    {
        return [
           
            { label: 'Id', value: 'Id' },
            { label: 'Name', value: 'Name' },
            { label: 'Title', value: 'Title' },
            { label: 'Email', value: 'Email' }
               
        ]
    }
    
    optionHandler(e)
    {
        this.filterBy =e.target.value
    }
    
    sortHandler(e)
    {
        this.sortedBy = e.target.value
        this.filterData=[...this.sortBy(this.filterData)]
    }
    
    sortBy(data)
    {
        const cloneData = [...data]
        cloneData.sort((a, b) =>
        {
            if (a[this.sortedBy] === b[this.sortedBy]) { return 0 }
            return this.sortDirection === 'desc' ? a[this.sortedBy] > b[this.sortedBy] ? -1 : 1 :
                    a[this.sortedBy] < b[this.sortedBy] ? -1 : 1
        })
        return cloneData
     }
    
    filterHandler(e)
    {
        const { value } = e.target
         window.clearTimeout(this.timer)
        // console.log('value :>> ', value);
        if (value) {
           
            this.timer = window.setTimeout(() =>
            {
                this.filterData = this.fullData.filter(obj => {
                     
                    if (this.filterBy === 'All') {
                        return Object.keys(obj).some(key => {
                            return obj[key].toLowerCase().includes(value)
                        })

                    } else {
                        const val = obj[this.filterBy] ? obj[this.filterBy] : ''
                        return val.toLowerCase().includes(value)
                    }
                 // Below Logic filter each property of every Object
                // return Object.keys(obj).some(key => {
                //     return obj[key].toLowerCase().includes(value)
                //     })
                })
             
            },500)
           
        }
        else
        {
            this.filterData=[...this.fullData]
         }
     }
}