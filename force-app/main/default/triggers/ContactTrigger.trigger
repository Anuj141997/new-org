trigger ContactTrigger on Contact (After insert, After Delete) {

    
    if(trigger.isAfter && trigger.isDelete)
    {
        ContactTriggerHandler.afterDelete();
    }
}