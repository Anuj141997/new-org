import { LightningElement,api } from 'lwc';

export default class Loader extends LightningElement {

    @api spinnerText='';
    @api spinnerSize = 'medium';
    @api variant='base'

    get helpText()
    {
        return this.spinnerText?this.spinnerText:'Loading spinner'
     }
}