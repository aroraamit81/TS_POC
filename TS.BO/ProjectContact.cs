using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TS.BO
{
    [Table("ProjectContact")]
    public class ProjectContact
    {
        [Column("Id")]
        [Key]
        public int PCId { get; set; }
        public int ProjectId { get; set; }
        public int ContactId { get; set; }
    }
}
