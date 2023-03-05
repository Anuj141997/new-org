import { LightningElement } from 'lwc';

export default class SpinnerDemo extends LightningElement {

    showSpinner=false;

    spinner1(e)
    {
        this.showSpinner = true;
        let timer = window.setTimeout(() =>
        {
            this.showSpinner = false;
            window.clearTimeout(timer)
         },5000)
    }

}