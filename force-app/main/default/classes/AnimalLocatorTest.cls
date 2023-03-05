@isTest
public class AnimalLocatorTest {
    
    @isTest
    static void getCall()
    {
        
        
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());
        
        
        String res=AnimalLocator.getAnimalNameById(1);
        
        System.assertEquals('chicken', res);
        
    }
    
}