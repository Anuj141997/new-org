public class SOQLDemo {
    
    
    public static void ParentToChild(){
   	
        
        List<Account> acc=[Select id,Name,industry,(Select Id,LastName,Email from Contacts)
                     from account  ];
        
        System.debug(acc);
        
    //    List<Contact> con=[select Id,LastName,Email,Phone from contact where AccountId=:acc.Id];
        List<Contact> toUpdate=new List<Contact>();
        For(Account ac:[Select id,Name,industry,(Select Id,LastName,Email from Contacts)
                     from account  ])
        {
            
              System.debug('Account NAme'+ac.Name);
           	  System.debug('Child COntacts');
             for(Contact a:ac.contacts)
        {
            System.debug('Contact NAme'+a.LastName);
            
        }
            System.debug('----------------');
        }
       
        
       // Update toUpdate;
        
    }
    
    public static void ChildToParent()
    {
        
        List<Contact> cons= [Select Id,LastName,Account.Name,Account.Industry from Contact where AccountId != null limit 10];
        
        for(Contact c:cons)
        {
            system.debug('Account Name '+ c.Account.Name);
            system.debug('Account Industry '+ c.Account.Industry);
            system.debug('Contact Name '+ c.LastName);
            system.debug('-----------------------------');
           
        }
    }

}