public with sharing class NewsController {
   
    @AuraEnabled
    public static Map<String,Object> getNews()
    {
        HttpRequest httpreq= new HttpRequest();

        httpreq.setEndpoint('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d276762a060d45008b0baa6f578f1e24');

        httpreq.setMethod('GET');

        Map<String,Object> newsData= new Map<String,Object>();
       
        String response=null;

        try
        {
            Http http= new Http();
            HttpResponse httpres= http.send(httpreq);
            if(httpres.getStatusCode()== 200)
            {
                response=httpres.getBody();
            }
            else
            {
                throw new CalloutException(httpres.getBody());
            }
            
        }catch(Exception e)
        {
            throw e;
        }

        if(!String.isBlank(response))
        {
            
            newsData=(Map<String,Object>)JSON.deserializeUntyped(response);
        }
        if(!newsData.isEmpty())
        {
            return newsData;
        }
        else
        {
            return null;
        }
    }
}