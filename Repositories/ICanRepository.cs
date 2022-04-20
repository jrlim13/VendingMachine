using System;
using System.Collections.Generic;

namespace VendingMachine
{
    public interface ICanRepository
    {
        IEnumerable<Can> GetAll();
        Can Get(int id);
        Can Add(Can can);
    }
}
