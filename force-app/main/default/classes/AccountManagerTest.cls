@isTest
public class AccountManagerTest {

    @isTest
    public static void test()
    {
        RestRequest req= new RestRequest();
     
        Id accId = createSampleAcc();
        req.requestURI='https://yourInstance.my.salesforce.com/services/apexrest/Accounts/'+accId+'/contacts';
        
        req.httpMethod='GET';
        RestContext.request=req;
        
       Account ac= AccountManager.getAccount();
        
        System.assert(ac!=null);
        System.assertEquals('Test Account',ac.Name);
        System.assertEquals(1, [Select count() from contact where accountId=:ac.Id]);
            }
    
    Static Id createSampleAcc()
    {
        Account acc= new Account(Name='Test Account');
        insert acc;
        Contact con=new Contact(LastName='Con', FirstName='Test', AccountId=acc.Id);
        insert con;
        
        return acc.Id;
    }
}