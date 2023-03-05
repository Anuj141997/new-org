trigger OpportunityTrigger on Opportunity (before update) {
    
    
    
    for(Opportunity o:trigger.new)
    {
        Opportunity opp = trigger.oldMap.get(o.id);
        if(o.StageName == 'Closed Lost' &&  opp.StageName != 'Negotiation/Review' ){
            
            o.addError('You can not select CLosed lost');
        }
    }

}