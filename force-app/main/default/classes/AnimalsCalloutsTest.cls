@isTest
public class AnimalsCalloutsTest {
    
    @isTest
    static void getCall()
    {
        StaticResourceCalloutMock mock=new StaticResourceCalloutMock();
        
        mock.setStaticResource('GetAnimalResource');
        mock.setHeader('Content-Type','application/json;charset=UTF-8');
        mock.setStatusCode(200);
        
        Test.setMock(HttpCalloutMock.class, mock);
        
        HttpResponse result=AnimalsCallouts.makeGetCallout();
        
        System.assertNotEquals(null, result,'Callout Returned Null');
        System.assertEquals(200,result.getStatusCode());
       	System.assertEquals('application/json;charset=UTF-8',result.getHeader('Content-Type'));
        
        Map<String,Object> res=	(Map<String,Object>)JSON.deserializeUntyped(result.getBody());
        List<Object> a=(List<Object>)res.get('animals');
        System.assertEquals(3, a.size());
    }
    
     @isTest
    static void postCall()
    {
        	Test.setMock(HttpCalloutMock.class,new AnimalsHttpCalloutMock());
        
        	HttpResponse res= AnimalsCallouts.makePostCallout();
        	
        	String con=res.getHeader('Content-Type');
        	System.assert(con == 'application/json');
        
        String exp=  '{"animals": ["majestic badger", "fluffy bunny"]}';
        system.debug(res.getBody());
        	System.assertEquals(exp, res.getBody());
        System.assertEquals(200,res.getStatusCode());
    }
    

}