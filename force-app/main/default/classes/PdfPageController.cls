public with sharing class PdfPageController {
   
    public String pdfText{get; set;}
    public String currentId{get;set;}
    public pdfPageController()
    {
        pdfText= String.escapeSingleQuotes(
            ApexPages.currentPage().getParameters().get('pdfText')

        );
        currentId=ApexPages.currentPage().getParameters().get('id');
    }
}