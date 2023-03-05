public with sharing class DataLoader {
   
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpp()
    {
        return [SELECT Name,StageName FROM Opportunity ];
    }
}