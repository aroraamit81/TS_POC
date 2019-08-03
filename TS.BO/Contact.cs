using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TS.BO
{
    [Table("Contacts")]
    public class Contact 
    {
        [Column("Id")]
        public int ContactId { get; set; }
        [Column("Name")]
        public string ContactName { get; set; }
        public string Email { get; set; }


        
    }

    public class ContactsCompare : IEqualityComparer<Contact>
    {
        public bool Equals(Contact x, Contact y)
        {
            if (object.ReferenceEquals(x, y))
                return true;
            if (x == null || y == null)
                return false;
            return x.ContactId.Equals(y.ContactId);
        }

        public int GetHashCode(Contact obj)
        {
            return obj.ContactId.GetHashCode();
        }
    }

}
