import { LightningElement,wire } from 'lwc';
import getOpp from '@salesforce/apex/OppChartData.getOpp';
export default class ChartDemo extends LightningElement {

    pieChartLabel=[]
    pieChartData

    @wire(getOpp)
    opp({ error, data })
    {
        if (data)
        {
            console.log('data :>> ', data);
            const result = data.reduce((json, val) => ({ ...json, [val.StageName]: (json[val.StageName] | 0) + 1 }), {})
            
            if (Object.keys(result).length)
            {
                this.pieChartLabel = Object.keys(result)
                this.pieChartData = Object.values(result)

            }
            console.log('this.pieChartLabel :>> ', this.pieChartData);
             console.log('this.pieChartLabel2 :>> ', this.pieChartLabel);
        }
        if (error)
        {
            console.log('error :>> ', error);
         }
     }
}