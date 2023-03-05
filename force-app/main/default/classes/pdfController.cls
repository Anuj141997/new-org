public with sharing class pdfController {
   
    // @AuraEnabled
    // public static Attachment generatePdf(Id recid,String data)
    // {
    //     Pagereference pg=Page.renderAsPdf;
    //     pg.getParameters().put('pdfText',data);
    //     pg.getParameters().put('id',recid);

    //     Contact con=new Contact(Id=recid);

    //     Attachment a=new Attachment();
    //     a.Name='Sample Pdf.pdf';
    //     a.ParentId=con.Id;
    //     a.Body=pg.getContentaspdf();
    //     a.IsPrivate=false;
    //     insert a;
    //     return a;

    // }

     @AuraEnabled
    public static String generatePdf(Id recordId,String data) {
         Pagereference pg=Page.renderAsPdf;
        pg.getParameters().put('pdfText',data);
        pg.getParameters().put('id',recordId);
    ContentVersion cv = createContentVersion(pg);
    ContentDocumentLink cdl = createContentLink(cv.Id, recordId);
    if (cv == null || cdl == null) { return null; }
    return cdl.ContentDocumentId;
  }

   private static ContentVersion createContentVersion(Pagereference pg) {
    ContentVersion cv = new ContentVersion();
    cv.VersionData = pg.getContentaspdf();
    cv.Title = 'SamplePdf.pdf';
    cv.PathOnClient = 'SamplePdf.pdf';
    try {
      insert cv;
      return cv;
    } catch(DMLException e) {
      System.debug(e);
      return null;
    }
  }

     private static ContentDocumentLink createContentLink(String contentVersionId, Id recordId) {
              if (contentVersionId == null || recordId == null) { return null; }
    ContentDocumentLink cdl = new ContentDocumentLink();
    cdl.ContentDocumentId = [
      SELECT ContentDocumentId 
      FROM ContentVersion 
      WHERE Id =: contentVersionId
    ].ContentDocumentId;
    cdl.LinkedEntityId = recordId;
    // ShareType is either 'V', 'C', or 'I'
    // V = Viewer, C = Collaborator, I = Inferred
    cdl.ShareType = 'V';
    try {
      insert cdl;
      return cdl;
    } catch(DMLException e) {
      System.debug(e);
      return null;
    }
  }

}