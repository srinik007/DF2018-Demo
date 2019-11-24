public class SocialC {
	public String code {set;get;}
    public String accessToken {set;get;}
    public String redirectUri {set;get;}
    public String clientId {set;get;}
    public String clientSecret {set;get;}
    public String username {set;get;}
    public String password {set;get;}
    public String jsonResponse {set;get;}
    public String jsonResp {set;get;}
    public String fileName {set;get;}
    public SocialC(){
        redirectUri='https://myprod-dev-ed.lightning.force.com/lightning/n/Social';
        clientId='8143bnozkhjeb1';
        clientSecret='JahKW3eDjgcRT1K9';
    }
    public void getAuthCode(){
        Http p=new Http();
        HttpRequest request=new HttpRequest();
        request.setEndpoint('https://www.linkedin.com/oauth/v2/authorization');
        request.setMethod('GET');
        String body='response_type=code&client_id='+clientId;
        body=body+'&redirect_uri='+redirectUri+'&state=mySFDCLinkedInApp';
        body=body+'&scope=r_liteprofile%20r_emailaddress%20w_member_social';
        request.setBody(body);
        HttpResponse res=p.send(request);
        String result=res.getBody();
        System.debug('result=='+result);
        /*System.JSONParser jp=JSON.createParser(result);
        System.debug('jp=='+jp);
        while(jp.nextToken()!=null){
            if(jp.getText()=='code'){
                jp.nextToken();
                accessToken=jp.getText();
            }
        }
        System.debug('code=='+accessToken);*/
    }
    public void getToken(){
        Http p=new Http();
        HttpRequest request=new HttpRequest();
        request.setEndpoint('https://www.linkedin.com/oauth/v2/accessToken?');
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setMethod('POST');
        String body='grant_type=client_credentials&client_id='+clientId;
        body=body+'&client_secret='+clientSecret;
        request.setBody(body);
        HttpResponse res=p.send(request);
        String result=res.getBody();
        System.debug('result=='+result);
        System.JSONParser jp=JSON.createParser(result);
        System.debug('jp=='+jp);
        while(jp.nextToken()!=null){
            if(jp.getText()=='access_token'){
                jp.nextToken();
                accessToken=jp.getText();
            }
        }
        System.debug('accessToken=='+accessToken);
     	//getFolderInfo();
    }
}