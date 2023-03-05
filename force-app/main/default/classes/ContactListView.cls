public with sharing class ContactListView {
   
    @AuraEnabled(cacheable=true)
    public static List<Contact> getCon()
    {
        return [SELECT id,FirstName,LastName,MailingCity,MailingCountry,MailingStreet,MailingState
                ,MailingPostalCode,AccountId,Account.Name,Email FROM Contact LIMIT 1000];
    }
      @AuraEnabled(cacheable=true)
    public static List<Contact> getCon2()
    {
        return [SELECT id,FirstName,LastName,Account.Name,Email FROM Contact];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> searchC(string s)
    {
        List<List<SObject>> contacts = [FIND :s IN ALL FIELDS RETURNING Contact(FirstName,LastName,MailingCity
                                ,MailingCountry,MailingStreet,MailingState
                                    ,MailingPostalCode,AccountId,Account.Name,Email)];

        return (List<Contact>) contacts[0];
    }

    @AuraEnabled
    public static void del(List<Id> conId)
    {
        if(conId.size()>0)
        {
            delete [SELECT id from Contact where id in: conId];
        }
    }    
}