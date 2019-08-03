using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TS.BO;
using TS.DAL;

namespace TS.Web.Models
{
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext appDbContext;

        public ContactRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public void AddContact(Contact contact)
        {
            var contacts = appDbContext.Contacts;
            if (contacts.Where(c => c.ContactName.ToLower() == contact.ContactName).Count() > 0)
                throw new DuplicateItem(string.Format("Contact with the name {0} already exists", contact.ContactName));

            if (contacts.Where(c => c.Email.ToLower() == contact.Email).Count() > 0)
                throw new DuplicateItem(string.Format("Contact with the email {0} already exists", contact.Email));

            appDbContext.Contacts.Add(contact);
            appDbContext.SaveChanges();
        }

        public IEnumerable<Contact> GetContacts()
        {
            return this.appDbContext.Contacts;
        }
    }
    public interface IContactRepository
    {
        IEnumerable<Contact> GetContacts();
        void AddContact(Contact contact);
    }
}
