using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TS.BO
{
    [Table("Projects")]
    public class Project
    {
        [Column("Id")]
        public int ProjectId { get; set; }
        [Column("Name")]
        public string ProjectName { get; set; }
        public string Location { get; set; }
    }
}
