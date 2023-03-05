public class ParkLocator {
    
   public static List<String> country(String countName)
    {
        ParkService.ParksImplPort park= new ParkService.ParksImplPort();
        
       return park.byCountry(countName);
        
    }

}