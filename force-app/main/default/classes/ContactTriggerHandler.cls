public class ContactTriggerHandler {
    
    
    public static void beforeInsert()
    {
        system.debug('id'+Trigger.new);
    }

    
    public static void afterDelete()
    {
        Account[] acc = new List<Account>();
        Set<id> accIds = new Set<Id>();
        
        for(Contact c:(List<Contact>)trigger.old)
        {
            accIds.add(c.AccountId);
        }
        
        Account[] accList = [Select id, (Select Id from Contacts) from Account where Id in : accIds];
        
        for(Account ac:accList)
        {
            Contact[] con = ac.contacts;
            if(con.size() == 0)
            {
             	acc.add(ac);   
            }
        }
        
        if(!acc.isEmpty())
        {
            Delete acc;
        }
        
    }
}