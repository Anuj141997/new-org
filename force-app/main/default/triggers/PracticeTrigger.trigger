trigger PracticeTrigger on Account (before insert,before update,After insert, After Update) {
    
    
   // Account[] accList=[Select Name,Industry,Rating from Account where Id in:trigger.new];
    	
   /* if(trigger.isInsert && trigger.isBefore){
   	 for(Account a:trigger.new)
   	 	{
    	  a.Rating='Warm';
            
   	 	}
    }*/
    
   /* if(trigger.isUpdate && trigger.isBefore)
    {
        for(Account ac:trigger.new)
        {
            if(ac.industry=='Banking')
            {
                ac.phone='123';
            }
        }
    }*/
     
    if(trigger.isAfter && trigger.isUpdate)
    {
       PracticeTriggerHAndler.AfterUpdate(trigger.oldMap);
    }
    
    
    if(trigger.isAfter && trigger.isInsert)
    {
        	PracticeTriggerHandler.AfterInsert(trigger.new);
    }
      
    
    
 
    
    

}