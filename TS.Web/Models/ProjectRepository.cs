using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TS.BO;
using TS.DAL;

namespace TS.Web.Models
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext appDbContext;

        public ProjectRepository(AppDbContext appDbContext )
        {
            this.appDbContext = appDbContext;
        }
        public void AddProject(Project project)
        {
            if(appDbContext.Projects.Where(p=>p.ProjectName.ToLower()==project.ProjectName).Count()>0)
            {
                throw new DuplicateItem(string.Format("The project {0} has already been added", project.ProjectName));
            }


            appDbContext.Projects.Add(project);
            appDbContext.SaveChanges();
        }

        public IEnumerable<Project> GetProjects()
        {
            return this.appDbContext.Projects;
        }
    }
    public interface IProjectRepository
    {
        IEnumerable<Project> GetProjects();
        void AddProject(Project project);
    }
}
