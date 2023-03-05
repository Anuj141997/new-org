public with sharing class OppChartData {
  
    
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpp()
    {
        return[SELECT StageName from Opportunity];
    }
}