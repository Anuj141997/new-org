@isTest
Global class AnimalsHttpCalloutMock implements HttpCalloutMock{
    
    global HttpResponse respond(HttpRequest req)
    {
        HttpResponse res=new HttpResponse();
        res.setHeader('Content-Type','application/json');
        res.setBody('{"animals": ["majestic badger", "fluffy bunny"]}');
        res.setStatusCode(200);
        return res;
    }

}