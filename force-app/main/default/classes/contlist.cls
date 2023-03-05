public with sharing class contlist 
{
    @AuraEnabled
    public static list<Contact> getRelatedList(String recordId)
    {
        List<Contact> Conlist = [Select id, name,firstname,lastname from Contact where AccountId=: recordId ];
        
        return Conlist;
    }
    
    
    @AuraEnabled
    public static Contact createCon(Contact con, Id accId)
    {
        con.AccountId=accId;
        insert con;
        return con;
    }
}