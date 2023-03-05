public class UsingFlow {

    @InvocableMethod
    public static List<Decimal> updateAcc(List<Id> ids)
    {
       List<Opportunity> op=[SELECT id,Amount,AccountId from Opportunity where id=:ids[0]];
        
        List<Account> ac=[select id,AnnualRevenue from Account where id=: op[0].AccountId];
        
        List<Decimal> l1=new List<Decimal>();
        
        ac[0].AnnualRevenue = ac[0].AnnualRevenue + op[0].Amount;
        
        update ac;
        l1.add(ac[0].AnnualRevenue);
        return l1;
    }
        
}