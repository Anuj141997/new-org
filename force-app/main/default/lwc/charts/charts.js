import { LightningElement,api } from 'lwc';
import charts from '@salesforce/resourceUrl/charts';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
export default class Charts extends LightningElement {

    isChart
    chart
    

    @api type
    @api chartHeading
    @api chartData
    @api chartLabels

     

    renderedCallback()
    {
        if (this.isChart)
        {
            return;
         }
        loadScript(this, charts+'/chartJs/Chart.js').then(() =>
        {
            console.log(' Chart Loaded:>> ');
           
            this.isChart = true;
            this.loadChart()
        })
            .catch(error =>
            {
                console.error( error);
             })
    }
    

    loadChart()
    {
        
        window.Chart.platform.disableCSSInjection = true
        const canvas = document.createElement('canvas')
        this.template.querySelector('div.chart').appendChild(canvas)

        const ctx = canvas.getContext('2d')
        this.chart = new window.Chart(ctx, this.config())

    }
    

    config()
    {

        return{
    type: this.type,
    data: { 
        labels:  JSON.parse(JSON.stringify(this.chartLabels)),
        datasets: [{
            label: this.chartHeading ,
            data: JSON.parse(JSON.stringify(this.chartData)),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                   'rgba(255, 135, 90, 0.2)',
                'rgba(75, 192, 120, 0.2)',
                'rgba(153, 102, 55, 0.2)',
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                     'rgba(255, 135, 90, 1)',
                'rgba(75, 192, 120, 1)',
                'rgba(153, 102, 55, 1)',
            ],
            borderWidth: 1,
               hoverOffset: 4
        }]
    },
            options: {
                responsive: true,
                
                legend: { position: 'right' },
                animation:
                {
                    animateScale: true,
                    animateRotate:true 
                    }
    }
}
     }
}