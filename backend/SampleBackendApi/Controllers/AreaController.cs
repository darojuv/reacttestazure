using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleBackendApi.Entities;
using SampleBackendApi.Models;

namespace SampleBackendApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AreaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AreaController(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        [HttpGet("states/all")]
        public async Task<ActionResult<List<State>>> GetAllStates()
        {
            return await _context.States.ToListAsync();
        }

        [HttpGet("cities/all")]
        public async Task<ActionResult<List<City>>> GetAllCities()
        {
            return await _context.Cities.ToListAsync();
        }

        [HttpGet("counties/all")]
        public async Task<ActionResult<List<County>>> GetAllCounties()
        {
            return await _context.Counties.ToListAsync();
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddArea(AddAreaRequestModel request)
        {
            if (request == null || request.StateId <= 0 || request.CityId <= 0 || request.CountyId <= 0)
            {
                return BadRequest();
            }
            _context.Areas.Add(new Area
            {
                StateId = request.StateId,
                CityId = request.CityId,
                CountyId = request.CountyId
            });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}