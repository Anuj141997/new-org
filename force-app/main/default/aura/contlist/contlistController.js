({
 myAction : function(component, event, helper) 
    {
        var ConList = component.get("c.getRelatedList");
        ConList.setParam
        (
            "recordId", component.get("v.recordId")
        );
        
        ConList.setCallback(this, function(data) 
                           {
                               component.set("v.ContactList", data.getReturnValue());
                           });
        $A.enqueueAction(ConList);
 },
    
    
    redirectToContact : function(component,event,helper)
    {
    	var eventSource= event.getSource();
        var id=eventSource.get('v.name');
        
        var navEvt= $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId":id,
            "slideDevName":"detail"
            
        });
        navEvt.fire();
	},
    
    handleCompEvent : function(component,event,helper)
    {
        
       var availableContact= component.get('v.ContactList');
        var con=event.getParam('conRecord');
        console.log(con);
        availableContact.push(con);
        component.set('v.ContactList',availableContact);
    }
})