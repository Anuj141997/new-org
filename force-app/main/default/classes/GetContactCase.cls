public with sharing class GetContactCase {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getdata(String con,String n)
    {
         String s= '%'+con+'%';
         String s1= '%'+n+'%';
         String q='';

        if(con != null )
        {
            q= 'Select Id , Name,Amount_Invested__c,Amount_Earned__c, (SELECT CaseNumber,Status,Action_Taken__c From Cases ) From Contact Where Name like:s';
        }
       else 
        {
            q ='Select Id , Name,Amount_Invested__c,Amount_Earned__c, (SELECT CaseNumber,Status,Action_Taken__c From Cases) From Contact';
        }

        List<Contact> cont=Database.query(q);
        return cont;
    }

    
}