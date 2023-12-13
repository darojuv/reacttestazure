namespace SampleBackendApi.Models
{
    public class AddServiceRatesForAreaRequest
    {
        public int StateId { get; set; }
        public int CityId { get; set; }
        public int CountyId { get; set; }
        public List<ServiceRateItem> ServiceRates { get; set; } = new();
    }
}
