import { api, LightningElement } from 'lwc';

export default class DragAndDropList extends LightningElement {


    @api records
    @api stage


    itemDrag(e)
    {
        let id=e.detail
        const event= new CustomEvent('listdrag',{
            
            detail:id
        })
        this.dispatchEvent(event)
    }
    handleDragOver(e)
    {
        e.preventDefault()
    }

    handleDrop(e)
    {
        const event= new CustomEvent('itemdrop',{
            
            detail:this.stage
        })
        this.dispatchEvent(event)
    }
}