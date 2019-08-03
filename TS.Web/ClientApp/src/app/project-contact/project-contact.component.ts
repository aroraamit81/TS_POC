import { Component, OnInit } from '@angular/core';
import { Project, ProjectContact, Contact } from '../classes';
import {
  FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors
} from "@angular/forms";
import { ProjectContactService } from '../projectcontact.service';

@Component({
  selector: 'app-project-contact',
  templateUrl: './project-contact.component.html',
  styleUrls: ['./project-contact.component.css']
})
export class ProjectContactComponent implements OnInit {

  contactsMapped: Contact[];
  contactsUnmapped: Contact[];
  projectsData: Project[];
  mappingData: ProjectContact[]=[];
  mappingForm: FormGroup;
  selectedProject: Project;


  constructor(private fb: FormBuilder, private service: ProjectContactService) { }

  ngOnInit() {
    this.mappingForm = this.fb.group(
      {
        projects: [],
        contacts: []
      });

    this.GetProjects();

    this.Project.setValue(0);

    this.Project.valueChanges.subscribe(() => {

      this.GetMappingData();
    });

    

  }

  get DisableSubmit(): boolean {
    
    return (this.Project.value == 0 || this.Contact.value == null);
  }

  get nMappedContacts(): number {
    if (this.contactsMapped == null) return 0;

    return this.contactsMapped.length;
  }

  get Project(): AbstractControl {
    return this.mappingForm.controls.projects;
  }

  get Contact(): AbstractControl {
    return this.mappingForm.controls.contacts;
  }


 

  get NoContactsForTheProjectYet(): string {
    if (this.selectedProject == null) return "";

    
    return "No Contact added to the project " + this.selectedProject.projectName;
  }

  GetProjects() {
    this.service.getProjects()
      .subscribe(
        (response) => {
          this.projectsData = response;
        },
        (error: any) => {
          console.log(error);
        }

      );
  }

  OnSubmit(): void {

    if (this.Contact.value == null) return;


    const contactIds: number[] = this.Contact.value;

    contactIds.forEach(c => {
      this.mappingData.push({ id: 0, projectId: this.Project.value, contactId: c });
    });

    this.service.AddMapping(this.mappingData)
      .subscribe(
      () => {
        this.GetMappingData();
       

      },
        (error: any) =>  console.log(error) 
      );

    
  }
  GetMappingData(): void {
    const ProjectValue: String = this.Project.value;
    this.Contact.reset();
    if (ProjectValue == "0") {
      this.contactsMapped = null;
      this.contactsUnmapped = null;
      this.selectedProject = null;
    }
    else {
      this.service.getMappingData(+ProjectValue)
        .subscribe(
          (response) => {

            this.contactsMapped = response["contactsMapped"];
            this.contactsUnmapped = response["contactsUnmapped"];
            this.selectedProject = response["selectedProject"][0];
            
          },
          (error: any) => {
            console.log(error);
          }

        );

    }

  }



}
