public class PracClass1 {
    
    List<User> userList=new List<User>();
    
    Map<Id,List<Account>> leadMap=new Map<Id,List<Account>>();
    
    List<User> usId= [Select Id,userName from User];
    
    List<Account> accList=[Select Id,Name,CreatedById from Account where CALENDAR_MONTH(CreatedDate)=4 AND CALENDAR_YEAR(CreatedDate)=2020 ];
    
    

}