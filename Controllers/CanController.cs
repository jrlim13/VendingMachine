using Microsoft.AspNetCore.Mvc;
using VendingMachine.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VendingMachine.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CanController : ControllerBase
    {
        private readonly ILogger<CanController> _logger;

        private static readonly CanRepository canRepository = new CanRepository();

        public CanController(ILogger<CanController> logger)
        {
            _logger = logger;
        }


        // GET: /<ValuesController>
        [HttpGet]
        public IEnumerable<Can> GetAll()
        {
            return canRepository.GetAll();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public Can Get(int id)
        {
            return canRepository.Get(id);
        }

        // POST api/<ValuesController>
        [HttpPost]
        [Route("add")]
        [Consumes("application/json")]
        public Can Post(Can can)
        {
            return canRepository.Add(can);
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // delete api/<valuescontroller>/5
        [HttpDelete("{id}")]
        public void delete(int id)
        {
        }
    }
}
