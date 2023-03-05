import { LightningElement } from 'lwc';

export default class SearchContactFilter extends LightningElement {

    
    Change(e)
    {
        const c = e.target.value;

        this.dispatchEvent(new CustomEvent('src', { detail: c }));
     }
}