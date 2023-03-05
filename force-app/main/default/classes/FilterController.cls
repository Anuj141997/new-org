public with sharing class FilterController {
    
     @AuraEnabled(cacheable=true)
    public static List<Contact> getCon()
    {
        return [SELECT Id,Name,Email,Title FROM Contact Where Title !=NULL WITH SECURITY_ENFORCED];
    }
}