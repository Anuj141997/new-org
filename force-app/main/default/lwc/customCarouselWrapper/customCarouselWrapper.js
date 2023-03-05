import { LightningElement } from 'lwc';
import carousel_img from '@salesforce/resourceUrl/carousel';

export default class CustomCarouselWrapper extends LightningElement {


    slides =
        [
            {
                image: `${carousel_img}/carousel/photo1.jpg`,
                heading: 'Caption One',
                desc:'You can add description of 1st Slide here'
            },
             {
                 image: `${carousel_img}/carousel/photo2.jpg`,
                   heading: 'Caption Two',
                desc:'You can add description of 2nd Slide here'
            },
              {
                  image: `${carousel_img}/carousel/photo3.jpg`,
                    heading: 'Caption Three',
                desc:'You can add description of 3rd Slide here'
            },

        ]
}