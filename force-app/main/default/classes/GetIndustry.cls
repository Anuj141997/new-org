public with sharing class GetIndustry {

    @AuraEnabled(cacheable=true)
    public static List<String> getBusiness()
    {
         
        Set<String> s1=new Set<String>();
        for(Industry__c i:[SELECT Business_Vertical__c FROM Industry__c])
        {
            s1.add(i.Business_Vertical__c);
        }
        List<String> l1=new List<String>();
        l1.addAll(s1);
        return l1;
        
    }

    @AuraEnabled
     public static List<String> getDivision(String buis)
    {
         
        Set<String> s1=new Set<String>();
        for(Industry__c i:[SELECT Division_of_Vertical__c FROM Industry__c WHERE Business_Vertical__c=: buis])
        {
            s1.add(i.Division_of_Vertical__c);
        }
        List<String> l1=new List<String>();
        l1.addAll(s1);
        return l1;
        
    }

     @AuraEnabled
     public static List<String> getArea(String div)
    {
         
        Set<String> s1=new Set<String>();
        for(Industry__c i:[SELECT Area_of_Division__c FROM Industry__c WHERE Division_of_Vertical__c=: div])
        {
            s1.add(i.Area_of_Division__c);
        }
        List<String> l1=new List<String>();
        l1.addAll(s1);
        return l1;
        
    }
}