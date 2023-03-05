@RestResource(urlMapping='/Accounts/*/contacts')
global class AccountManager {
    
    @HttpGet
    global static Account getAccount()
    {
        RestRequest req= RestContext.request;
        
        String accId= req.requestURI.substringBetween('Accounts/','/contacts');
        
        Account result =  [SELECT Id,Name ,(Select Id,Name from Contacts)
                        FROM Account WHERE Id = :accId];
        
        String a=con(result.Id);
        return result;
    }
    
    public Static String con(Id accid)
    {
        Contact C=[Select Id,Name from Contact where AccountId=:accid limit 1];
        Opportunity op=new Opportunity();
        op.Name='Test op1';
        op.ContactId=C.Id;
        op.StageName='Prospecting';
        op.CloseDate=System.today();
        insert op;
        return c.Name;
    }

}