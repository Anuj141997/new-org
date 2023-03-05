public class LinkedInController {
    
    public boolean isCode {get;set;}
    public String authCodeFromUrl {get;set;}
    public List<LinkedinInfo__c> linkedInInfo {get;set;}
    public String basicInfo {get;set;}
    public string urlToSharedPost {get;set;}
    public string sharedInfo {get;set;}
    
    public FINAL string consumerKey='86quh73j21egmi';
    public FINAL String consumerSecret= 'qwf1r1fqS1TOAoOe';
    public FINAL String redirect_uri = 'https://hcl-64e-dev-ed.lightning.force.com/lightning/n/LinkedIn';
    public Final String linkedIn_auth='https://www.linkedin.com/oauth/v2/authorization';
    public Final String accesstoken_endPoint = 'https://www.linkedin.com/oauth/v2/accessToken';
    
    public LinkedInController()
    {
        
    }
    

}