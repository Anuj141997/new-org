@isTest
private class ParkLocatorTest {

    @isTest
    static void testCallout()
    {
        Test.setMock(WebServiceMock.class, new ParkServiceMock());
        
        String s='India';
        List<String> l1=ParkLocator.country(s);
        System.assertEquals(new String[]{'Anamudi Shola National Park',' Anshi National Park',' Bandipur National Park'}, l1);
    }
}