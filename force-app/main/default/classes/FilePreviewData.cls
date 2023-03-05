public with sharing class FilePreviewData {
   
    @AuraEnabled(cacheable=true)
    public static Map<Id,String> getFiles(String recId)
    {
        List<ContentDocumentLink> cdl=[SELECT ContentDocumentId FROM ContentDocumentLink 
                                         WHERE LinkedEntityId =:recId];
        List<Id> files=new List<Id>();
        for(ContentDocumentLink c:cdl)
        {
            files.add(c.ContentDocumentId);
        }

        List<ContentVersion> cv=[SELECT ContentDocumentId,FileExtension,Title FROM ContentVersion
                                    WHERE ContentDocumentId IN :files];
        Map<Id,String> m=new Map<Id,String>();
        for(ContentVersion c:cv)
        {
            m.put(c.ContentDocumentId,c.Title);
        }
        return m;
    }
}