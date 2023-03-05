public class PracticeTriggerHandler {
    
   
    public static void beforeUpdate()
    {
        
    }
     public static void AfterUpdate(Map<id,Account> oldAccList)
    {
        Account[] accList=[Select id,phone,Name ,(select id,lastname,otherphone,mobilephone from contacts) from Account where Id in:trigger.new];
      /*  Map<Id,Account> map1=new Map<Id,Account>([Select id,phone,name ,(select id,otherphone,mobilephone from contacts) from Account where Id in:trigger.new]);
        for(Account a:map1.values())
        {
            system.debug('Account'+a);
            system.debug('Con'+a.contacts);
            
        }*/
        Contact[] conToUpdate= new List<Contact>();
         
        for(Account acc:accList)
        {
            Account oldAcc=oldAccLIst.get(acc.Id);
            System.debug('OldAccData'+oldAcc);
            
            if(acc.Phone != oldAcc.Phone || acc.Name != oldAcc.Name )
            {
                Contact[] con=acc.contacts;
                for(Contact c:con)
                {
                    c.otherphone=oldAcc.Phone;
                    c.mobilephone=acc.phone;
                   
                    conToUpdate.add(C);
                }
            }
            
            
        }
        
        if(!conToUpdate.isEmpty())
        {
            update conToUpdate;
        }
    }
     public static void beforeInsert()
    {
        
        
    }
     public static void AfterInsert(List<Account> newAccts)
    {
       //  List<account> newAccts=[Select Id,Industry,Rating,Name from Account where id in:trigger.new];
        
        List<Opportunity> oppList=new List<Opportunity>();
        
        for(Account acc:newAccts)
        {
            if(acc.Industry=='Banking' && acc.Rating=='Hot')
            {
                Opportunity opp=new Opportunity();
                opp.Name='Opportunity - '+acc.Name;
                opp.StageName='Prospecting';
                opp.CloseDate=System.today()+10;
                opp.AccountId=acc.Id;
                oppList.add(opp);
                
            }
            
        }
        
        if(!oppList.isEmpty())
        {
            insert oppList;
        }
    }

}