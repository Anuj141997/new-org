import { LightningElement, track ,wire} from 'lwc';
import getcon from '@salesforce/apex/ContactSearch.getcon';

export default class LookUpComp extends LightningElement {

    @track accId;
    @track accName='';
    @track accList=[];
    @track noresult=false;
    @track showmodal=false;
    isshow=true;
    @track showvalues=false;

    @wire(getcon,{ conname: '$accName'})
    accounts({error,data})
    {
        this.noresult=false;
        if(data)
        {
            console.log('data::'+data.length);
            if(data.length>0 && this.isshow){
                this.accList=data;
                this.showvalues=true;
                this.noresult=false;
            }
            else if(data.length==0)
            {
                this.accList=[];
                this.showvalues=false;
                if(this.accName!='')
                {
                    this.noresult=true;
                }
            }
        }
        if(error)
        {
            this.accId='';
            this.accName='';
            this.accList=[];
            this.showvalues=false;
            this.noresult=true;
        }
    }
    changeHandler(ev)
    {
        this.noresult=false;
        this.accName=ev.target.value;
    }
    click(ev)
    {
        this.isshow=true;
        this.noresult=false;
    }

    parent(ev)
    {
        this.isshow=false;
        this.showvalues=false;
        this.noresult=false;

        this.accId=ev.target.dataset.val;
        this.accName=ev.target.dataset.name;
        console.log(this.accId);

        const selevent=new CustomEvent('selectid',{detail: this.accId});
        this.dispatchEvent(selevent);
         const selevent1=new CustomEvent('selectname',{detail: this.accName});
        this.dispatchEvent(selevent1);
    }
    openmodal(ev)
    {
        this.showmodal=true;
        //this.showvalues=false;
        //this.noresult=false;
    }
    closemodal(ev)
    {
        this.showmodal=false;
    }


    save(ev)
    {
        this.showmodal=false;
        this.showvalues=false;
        this.noresult=false;

        this.accId=ev.detail.id;

        this.accName=ev.detail.fields.Name.value;

        const ev2=new CustomEvent('select',{detail: this.accId});
        this.dispatchEvent(ev2);
    }

    reset(ev)
    {
        const inp=this.template.querySelectorAll('lightning-input-field');

        if(inp)
        {
            inp.forEach(element => {
                element.reset();
            });
        }
        this.showmodal=false;
    }
}