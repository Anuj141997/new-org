public class PartialDML {
    
   

    public static void dbm()
    {
        
        Lead[] lead1= new List<Lead>([select FirstName,LastNAme,COmpany from Lead where CreatedDate=YESTERDAY]);
        for(Lead l:lead1)
        {
            l.company='HCL';
        }
        
        lead la=new lead(LastNAme='Anything',Company='HCL');
       	lead1.add(la);
        
        database.SaveResult[] re=database.Update(lead1,false);
        
        for(database.SaveResult r:re)
        {
            if(r.isSuccess())
            {
                system.debug('Record with '+r.getId() +' Inserted Successfuly');
            }
            else
            {	
                //system.debug('Error occured '+ r.getErrors());
                database.Error[] err=r.getErrors();
                for(database.error er:err)
                {
                    system.debug('Error :'+er.getstatuscode() +er.getmessage()+' '+er.getfields());
                }
            }
        }
    }


}