import { api, LightningElement } from 'lwc';

const card_visible = 'fade slds-show'
const card_hide = 'fade slds-hide'
const dot_active = 'dot active'
const dot_inactive = 'dot'
const Timer = 3000

export default class CustomCarousel extends LightningElement {

    slides = []
    Sindex=1
    @api slideTimer = Timer
    @api enableAutoScroll =false
    timer

    @api
    get slidesData()
    {
        return this.slides
    }
    
    set slidesData(data)
    {
       this.slides= data.map((item,index) =>
        {
            return index === 0 ?
                {
                    ...item,
                    slideIndex: index + 1,
                    cardClass: card_visible,
                    dotClass: dot_active
                }
                :
                {
                    ...item,
                    slideIndex: index + 1,
                    cardClass: card_hide,
                    dotClass: dot_inactive
                }
         })
    }
    
    connectedCallback() {
        if (this.enableAutoScroll) {
            this.timer = window.setInterval(() => {
                this.slideSelection(this.Sindex + 1)
            }, Number(this.slideTimer))

        }
    }
    disconnectedCallback()
    {
        if (thius.enableAutoScroll) {
            window.clearInterval(this.timer)
        }
     }
    

    prevSlide()
    {
        let slideIndex = this.Sindex - 1
        this.slideSelection(slideIndex)
    }
    nextSlide()
    {
        let slideIndex = this.Sindex + 1
        this.slideSelection(slideIndex)
    }

    currentSlide(e)
    {   
        let slideIndex= Number(e.target.dataset.id)
         this.slideSelection(slideIndex)
    }
    
    
    slideSelection(i)
    {
        if (i > this.slides.length)
        {
            this.Sindex= 1
        }
        else if (i < 1)
        {
            this.Sindex=this.slides.length 
        }
        else
        {
            this.Sindex = i
        }

         this.slides= this.slides.map(item =>
        {
            return this.Sindex === item.slideIndex ?
                {
                    ...item,
                    cardClass: card_visible,
                    dotClass: dot_active
                }
                :
                {
                    ...item,
                    cardClass: card_hide,
                    dotClass: dot_inactive
                }
         })
    }
}