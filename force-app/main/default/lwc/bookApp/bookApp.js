import { LightningElement } from 'lwc';
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q='

export default class BookApp extends LightningElement {


    searchKey
    BooksData   
    timer

    connectedCallback()
    {
        this.fetchBook()
    }
    
    fetchBook() {
        fetch(BOOK_URL + this.searchKey)
            .then(response => response.json())
            .then(result => {
               // console.log('result :>> ', result)
                this.BooksData = result
                console.log('this.BooksData :>> ', this.BooksData);
            })
                        .catch(error => console.error('error :>> ', error)
            )
    }
    
    handleSearch(e)
    {
        this.searchKey = e.target.value;
        window.clearTimeout(this.timer)
        this.timer=setTimeout(()=>
        {
            this.fetchBook()
        },1000)
     }
}