using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TS.BO;
using TS.Web.Models;

namespace TS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectContactController : ControllerBase
    {
        private readonly IContactRepository contactRepository;
        private readonly IProjectRepository projectRepository;
        private readonly IProjectContactRepository projectContactRepository;

        public ProjectContactController(IContactRepository contactRepository, IProjectRepository projectRepository, IProjectContactRepository projectContactRepository )
        {
            this.contactRepository = contactRepository;
            this.projectRepository = projectRepository;
            this.projectContactRepository = projectContactRepository;
        }

        [HttpGet("[action]")]
        public IActionResult GetProjects()
        {
            try
            {
                IEnumerable<Project> projects = projectRepository.GetProjects().OrderByDescending(p => p.ProjectId).ToList();
                return Ok(projects);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "A server error occurred");
            }
        }

        [HttpGet]
        [Route("GetMappingData/{projectId}")]
        public IActionResult GetMappingData(int projectId)
        {
            try
            {
                IEnumerable<ProjectContact> mapping = projectContactRepository.GetMapping(projectId).ToList();
                IEnumerable<Contact> AllContacts = contactRepository.GetContacts().ToList();

                var selectedProject = projectRepository.GetProjects().Where(p => p.ProjectId == projectId);

                IEnumerable<Contact> contactsMapped = (from mappingData in mapping
                                                      join contacts in AllContacts on mappingData.ContactId equals contacts.ContactId
                                                      select new Contact
                                                      {
                                                          ContactId = contacts.ContactId,
                                                          ContactName = contacts.ContactName,
                                                          Email = contacts.Email
                                                      }).ToList();

                var contactsUnmapped = AllContacts.Except(contactsMapped, new ContactsCompare()).ToList();




                var response = new
                {
                    contactsMapped = contactsMapped,
                    contactsUnmapped = contactsUnmapped,
                    selectedProject = selectedProject
                };

                return Ok(response);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "A server error occurred");
            }
        }

        [HttpPost("[action]")]
        public IActionResult AddMapping(ProjectContact[] projectContacts)
        {
            try
            {
                projectContactRepository.AddMapping(projectContacts);
                return Ok();
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "A server error occurred");
            }
        }
        [HttpPost("[action]")]
        public IActionResult AddProject(Project project)
        {
            try
            {
                projectRepository.AddProject(project);
                return Ok();
            }
            catch(DuplicateItem dc)
            {
                return StatusCode((int)HttpStatusCode.Conflict, dc.message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "A server error occurred");
            }
        }
        [HttpGet("[action]")]
        public IActionResult GetContacts()
        {
            try
            {
                IEnumerable<Contact> contacts = contactRepository.GetContacts().OrderByDescending(c=>c.ContactId).ToList();
                return Ok(contacts);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "A server error occurred");
            }
        }

        [HttpPost("[action]")]
        public IActionResult AddContact(Contact contact)
        {
            try
            {
                contactRepository.AddContact(contact);
                return Ok();
            }
            catch (DuplicateItem dc)
            {
                return StatusCode((int)HttpStatusCode.Conflict, dc.message);
            }
            catch
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "A server error occurred");
            }
        }




    }
}