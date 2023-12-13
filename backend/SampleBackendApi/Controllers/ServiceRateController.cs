using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleBackendApi.Entities;
using SampleBackendApi.Models;

namespace SampleBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceRateController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServiceRateController(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<ServiceRateItem>>> GetServiceRatesForArea([FromQuery] GetServiceRatesForAreaRequest request)
        {
            if (request == null || request.StateId <= 0 || request.CityId <= 0 || request.CountyId <= 0)
            {
                return BadRequest();
            }
            Area? area = await _context.Areas.Where(x => x.StateId == request.StateId && x.CityId == request.CityId && x.CountyId == request.CountyId).FirstOrDefaultAsync(); 
            if (area == null)
            {
                // This area does not exist in the service rate table so creating a new entry and returning empty response
                _context.Areas.Add(new Area
                {
                    StateId = request.StateId,
                    CityId = request.CityId,
                    CountyId = request.CountyId
                });
                await _context.SaveChangesAsync();
                return Ok(new List<ServiceRateItem>());
            }
            else
            {
                List<ServiceRateItem> serviceRates = await _context.ServiceRates.Where(x => x.AreaId == area.Id).Select(x => new ServiceRateItem
                {
                    ServiceRateOne = x.ServiceRateOne,
                    ServiceRateOnePercentage = x.ServiceRateOnePercentage,
                    ServiceRateTwo = x.ServiceRateTwo,
                    ServiceRateTwoPercentage = x.ServiceRateTwoPercentage
                }).ToListAsync();
                return Ok(serviceRates);
            }
        }

        [HttpPost]
        public async Task<ActionResult<List<ServiceRateItem>>> AddServiceRatesForArea([FromBody] AddServiceRatesForAreaRequest request)
        {
            if (request == null || request.StateId <= 0 || request.CityId <= 0 || request.CountyId <= 0 || !request.ServiceRates.Any())
            {
                return BadRequest();
            }
            Area? area = await _context.Areas.Where(x => x.StateId == request.StateId && x.CityId == request.CityId && x.CountyId == request.CountyId).FirstOrDefaultAsync();
            if (area == null)
            {
                // No area found to add service rates to
                return BadRequest();
            }
            else
            {
                var serviceRates = await _context.ServiceRates.Where(x => x.AreaId == area.Id).ToListAsync();
                _context.ServiceRates.RemoveRange(serviceRates);
                request.ServiceRates.ForEach(x =>
                {
                    _context.ServiceRates.Add(new ServiceRate
                    {
                        AreaId = area.Id,
                        ServiceRateOne = x.ServiceRateOne,
                        ServiceRateTwo = x.ServiceRateTwo,
                        ServiceRateOnePercentage = x.ServiceRateOnePercentage,
                        ServiceRateTwoPercentage = x.ServiceRateTwoPercentage
                    });
                });
                _context.SaveChanges();
                return Ok();
            }
        }
    }
}
