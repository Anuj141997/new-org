public class SetDemo {
    
    
    public void method1(){
        
        
    Set<String> newSet= new Set<String>();
    
    newSet.add('b');
    newSet.add('a');
        newSet.add('e');
        newSet.add('d');
        newSet.add('c');
        newSet.add('a');
        
    system.debug(newSet);
        
        for(String s:newSet)
        {
            system.debug(s);
        }    
        
        List<Account> acc= [Select id,name from account limit 10];
        
       /* Set<id> s1=new Set<id>();
        
        for(Account a:acc)
        {
            s1.add(a.Id);
        }
        */
        System.debug(acc);
        
        Map<String,integer> newMap= new Map<String,Integer>();
        
        newMap.put('a',123);
        newMap.put('b',321);
        newMap.put('a',245);
        newMap.put('c',123);
        
        System.debug(newMap);
        
        Set<String> s2= newMap.keySet();
         System.debug(s2);
        
        System.debug(newMap.get('a'));
        
        List<Integer> l1=newMap.values();
        System.debug(l1);
        
        
        
        
    }

}