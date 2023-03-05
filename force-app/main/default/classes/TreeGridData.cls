public with sharing class TreeGridData {
   
    @AuraEnabled(cacheable=true)
    public static List<Account> getAcc()
    {
        return [Select Id,Name,Phone,Website,
                (Select id,Name,Phone,Email from Contacts) from Account Limit 20];
    }
    
}