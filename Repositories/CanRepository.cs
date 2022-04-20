using System;
using System.Collections.Generic;

namespace VendingMachine.Repositories
{
    public class CanRepository : ICanRepository
    {
        private List<Can> cans = new List<Can>();
        private int id = 1;

        public CanRepository()
        {
            Add(new Can { Name = "Coca-cola Classic 375ml", Stock = 5, ImgName = "cocaColaClassic.jpg" });
            Add(new Can { Name = "Coca-cola No Sugar 375ml", Stock = 3, ImgName = "cocaColaNoSugar.jpg" });
            Add(new Can { Name = "Fanta Orange 375ml", Stock = 3, ImgName = "fanta.jpg" });
            Add(new Can { Name = "Pepsi 375ml", Stock = 3, ImgName = "pepsi.jpg" });
            Add(new Can { Name = "Pepsi Max 375ml", Stock = 3, ImgName = "pepsiMax.jpg" });
            Add(new Can { Name = "Solo Lemon 375ml", Stock = 5, ImgName = "soloLemon.jpg" });
            Add(new Can { Name = "Sprite 375ml", Stock = 3, ImgName = "sprite.jpg" });
            Add(new Can { Name = "Mountain Dew 375ml", Stock = 2, ImgName = "mountainDew.jpg" });
            Add(new Can { Name = "Schweppes Lemonade 375ml", Stock = 3, ImgName = "schweppesLemonade.jpg" });
            Add(new Can { Name = "Sunkist Orange 375ml", Stock = 3, ImgName = "sunkistOrange.jpg" });
        }

        public Can Add(Can can)
        {
            if (can == null)
            {
                throw new ArgumentNullException("Argument null.");
            }
            if (cans.Count >= 10)
            {
                throw new Exception("Only 10 cans can be stocked in this machine.");
            }
            can.Id = id++;
            can.Price = 2.89F;
            cans.Add(can);
            return can;
        }

        public Can Get(int id)
        {
            return cans.Find(c => c.Id == id);
        }

        public IEnumerable<Can> GetAll()
        {
            return cans;
        }
    }
}
