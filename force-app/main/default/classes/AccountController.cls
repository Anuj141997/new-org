/**
 * @description       : 
 * @author            : Anuj Panwar
 * @group             : 
 * @last modified on  : 09-21-2022
 * @last modified by  : Anuj Panwar
 * Modifications Log
 * Ver   Date         Author        Modification
 * 1.0   08-29-2022   Anuj Panwar   Initial Version
**/
public class AccountController {
    
    
    @AuraEnabled
    public static List<Account> getAccounts()
    {
        return [Select Name from Account LIMIT 10];
    }
}