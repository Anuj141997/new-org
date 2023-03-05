({
    doSave : function(component, event, helper) {
       
        var action1 = component.get("c.createCon");
        var validContact= component.find('contactForm').reduce(function(validSoFar,inputCmp)
            {
                 inputCmp.reportValidity();
                
               
                
                return validSoFar && inputCmp.checkValidity();
            },true);
        if(validContact){
        action1.setParams(
            {
                con : component.get('v.CreateContact'),
                accId : component.get('v.accountId')
                
            });
        
        action1.setCallback(this, function(response)
                           {
                               var state=response.getState();
                              
                               if(state === 'SUCCESS' || state === 'DRAFT')
                               {
                                   var resVal=response.getReturnValue();
                                   var cmpEvent=component.getEvent('QuickContactEvent');
                                   //component.getEvent('QuickContactEvent')
                                   //$A.get("e.c:QuickContactEvent")
                                   console.log('hi'+cmpEvent);
                                   cmpEvent.setParams({
                                       
                                       conRecord: resVal
                                   });
                                   cmpEvent.fire();
                                   console.log('fired');
                               }else if(state == 'INCOMPLETE')
                               {
                                   
                               }else if(state == 'ERROR')
                               {
                                   var error=response.getError();
                                   alert(error[0].pageErrors[0].message);
                                   if(error || error[0].message)
                                   {
                                       
                                   }
                               }
                           },'ALL');
        $A.enqueueAction(action1);
        
    	}	
    }
})