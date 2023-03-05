import { api, LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class DrapAndDropCard extends NavigationMixin(LightningElement) {
    
    
    @api record
    @api stage

    get isSameStage()
    {
        return this.stage === this.record.StageName
    }

    navigationOpp(e)
    {
        e.preventDefault();
        this.nav(e.target.dataset.id,'Opportunity')
    }
    navigationAcc(e)
    {
        e.preventDefault();
        this.nav(e.target.dataset.id,'Account')
    }
    nav(id,obj)
    {
      
        this[NavigationMixin.Navigate](
            {
                type:'standard__recordPage',
                attributes:
                {
                    recordId:id,
                    objectApiName:obj,
                    actionName:'view'
                }
            })
    }

    HandleDrag()
    {
        const event= new CustomEvent('itemdrag',{
            
            detail:this.record.Id
        })
        this.dispatchEvent(event)
    }
  
}