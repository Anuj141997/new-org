public class AnimalLocator {

    public static String getAnimalNameById(Integer Id)
    {
        
        Http http =new Http();
        HttpRequest req= new HttpRequest();
       	
        req.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/'+Id);
        req.setMethod('GET');
        
        HttpResponse res=http.send(req);

		        
        Map<String,Object> result=(Map<String,Object>)JSON.deserializeUntyped(res.getBody());
         Map<String,Object> animals=(Map<String,Object>)result.get('animal');
        	String name=(String)animals.get('name');
        system.debug(name);
        return name;
        
        
    }
}