public with sharing class ContactSearch {
  
     @AuraEnabled(cacheable=true)
    public static List<Contact> getcon(String conname)
    {   
        List<Contact> con=new List<Contact>();
        if(conname!=''){
        String s= '%'+conname+'%';

         con= [select id,Name from Contact where name like:s WITH SECURITY_ENFORCED];
        return con;
        }
        return con;
    }
}