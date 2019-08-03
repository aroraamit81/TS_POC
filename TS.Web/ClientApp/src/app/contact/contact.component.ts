import { Component, OnInit } from '@angular/core';
import { Contact } from '../classes';
import {
  FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors
} from "@angular/forms";
import { ProjectContactService } from '../projectcontact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: ProjectContactService ) { }
  contactForm: FormGroup;
  message: string;
  contacts: Contact[];
  contactSize: number = 0;
  ngOnInit() {
    this.contactForm = this.fb.group(
      {
        Name: ['', Validators.required],
        Email: ["", [Validators.required, Validators.email]]
      });

    this.GetContacts();
  }

  GetContacts(): void {
    this.service.getContacts()
      .subscribe(
        (response) => {

          this.contacts = response;
          this.contactSize = this.contacts.length;
        },
        (error: any) => {
          console.log(error);
        }

      );
  }

  OnSubmit(): void {
    this.message = "";
    this.service.addContact({ contactId: 0, contactName: this.Name.value, email: this.Email.value })
      .subscribe(
      () => {
        this.GetContacts();
        this.contactForm.reset();
      },
      (error: string) => {
        this.message = error;
        console.log(error);
      }


      );
  }

  get Name(): AbstractControl {
    return this.contactForm.controls.Name;
  }
  get Email(): AbstractControl {
    return this.contactForm.controls.Email;
  }
  get IsNameBlank(): boolean {

    return (
      (this.Name.touched || this.Name.dirty) &&
      this.Name.errors != null && this.Name.errors.required
    );

  }
  get IsEmailBlank(): boolean {

    return (
      (this.Email.touched || this.Email.dirty) &&
      this.Email.errors != null && this.Email.errors.required
    );

  }
  get IsEmailInvalid(): boolean {
    return (
      (this.Email.touched || this.Email.dirty) &&
        this.Email.errors != null && !this.Email.errors.required && this.Email.errors.email
    );

  }

  

}
