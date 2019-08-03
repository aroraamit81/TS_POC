import { Component, OnInit } from '@angular/core';
import { Project } from '../classes';
import {
  FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors
} from "@angular/forms";
import { ProjectContactService } from '../projectcontact.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ProjectContactService) { }
  projectForm: FormGroup;
  message: string;
  projects: Project[];
  projectSize: number = 0;

  ngOnInit() {
    this.projectForm = this.fb.group(
      {
        Name: ['', Validators.required],
        Location: ["", Validators.required]
      });

    this.GetProjects();
  }

  GetProjects(): void {
    this.service.getProjects()
      .subscribe(
        (response) => {

          this.projects = response;
          this.projectSize = this.projects.length;
        },
      (error: string) => {

       
        this.message = error;
          console.log(error);
        }

    )
      

      ;
  }

  OnSubmit(): void {
    this.message = "";
    this.service.addProject({ projectId: 0, projectName: this.Name.value, location: this.Location.value })
      .subscribe(
        () => {
          this.GetProjects();
          this.projectForm.reset();
        },
      (error: string) => {
        this.message = error;
          console.log(error);
        }


      );
  }

  get Name(): AbstractControl {
    return this.projectForm.controls.Name;
  }
  get Location(): AbstractControl {
    return this.projectForm.controls.Location;
  }
  get IsNameBlank(): boolean {

    return (
      (this.Name.touched || this.Name.dirty) &&
      this.Name.errors != null && this.Name.errors.required
    );

  }
  get IsLocationBlank(): boolean {

    return (
      (this.Location.touched || this.Location.dirty) &&
      this.Location.errors != null && this.Location.errors.required
    );

  }

}
