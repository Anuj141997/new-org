public with sharing class CreateCase {
   
      @AuraEnabled
    public static Case createAcc(Case cobj){
        try {
            insert cobj;
            Case c=[SELECT Id,CaseNumber FROM Case WHERE CaseNumber=:cobj.CaseNumber];
            return c;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}