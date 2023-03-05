public class DMLDemo {			
    
     public static void create()
    {
        //list<account> ac=new List<account>{new Account(name='Ram'),new Account(name='Shyam')};
    
    	
        
        Account acc= new Account(Name='Account3',Industry='Banking');
        insert acc;
		Contact c=new Contact(LAstName='Contact3',firstname='Test',AccountId=acc.Id);
        
		   	insert c; 
        
        Opportunity opp=new Opportunity(name='testOpp1',AccountId=acc.Id);
        
        
       
        
       
        
        
    }
    
   /* public static void BulkInsertion()
    {
        List<Account> accList=new List<Account>();
        for(Integer i=0;i<100;i++)
        {
            Account ac=new Account();
            ac.Name='Test Account '+i;
            accList.add(ac);
        }
        
        insert accList;
    }*/
    
  /*  public static void updateDemo()
    {
        
        List<Account> accList=[select id,NAme,phone,industry from Account where createdDate=Today];
        Account[] toUpdate=new List<Account>();
        for(Account ac:accList)
        {
            ac.phone='0';
            ac.industry='Education';
            toUpdate.add(ac);
        }
        
        update toUpdate;
    }*/

  /*  public static void DelDemo()
    {
        Account[] accList= [select id from Account where createdDate=LAST_WEEK ];
        
        System.debug(accList);
        
        delete accList;
    } */
    
  /*  public static void UndeleteDemo()
    {
        Account[] acc= [Select id,Name from Account where createdDate=LAST_WEEK ALL ROWS];
        System.debug(acc);
        undelete acc;
    }*/
    
    public static void upsertDemo()
    {
        Account[] acctsList = [SELECT Id, Name,phone
                               FROM Account WHERE CreatedDate= LAST_WEEK];
        for (Account a : acctsList)
        {
          a.phone = '1234';
       	}
        Account newAcct = new Account(Name = 'UpsertAccount1', Phone='321');
        acctsList.add(newAcct);
        
        system.debug(acctsList);
        try{
				update acctsList;
        }
        catch (DMLException e)
        {
            system.debug('Some Error Occured '+ e.getMessage());
        }
    }
    

}