using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TS.BO
{
    public class DuplicateItem : Exception
    {
        public readonly string message;

        public DuplicateItem(string message) {
            this.message = message;
        }
    }
}
