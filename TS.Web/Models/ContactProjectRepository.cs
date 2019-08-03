using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TS.BO;
using TS.DAL;

namespace TS.Web.Models
{
    public class ProjectContactRepository : IProjectContactRepository
    {
        private readonly AppDbContext appDbContext;
        public ProjectContactRepository(AppDbContext AppDbContext)
        {
            appDbContext = AppDbContext;
        }
        public void AddMapping(ProjectContact[] pc)
        {
            this.appDbContext.AddRange(pc);
            this.appDbContext.SaveChanges(); 
        }

        public IEnumerable<ProjectContact> GetMapping(int ProjectId)
        {
            return this.appDbContext.ProjectContact.Where(pc=>pc.ProjectId == ProjectId).ToList();
        }
    }
    public interface IProjectContactRepository
    {
        IEnumerable<ProjectContact> GetMapping(int ProjectId);
        void AddMapping(ProjectContact[] pc);

    }
}
