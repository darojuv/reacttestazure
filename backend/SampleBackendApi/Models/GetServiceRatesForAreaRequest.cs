namespace SampleBackendApi.Models
{
    public class GetServiceRatesForAreaRequest
    {
        public int StateId { get; set; }
        public int CityId { get; set; }
        public int CountyId { get; set; }
    }
}
