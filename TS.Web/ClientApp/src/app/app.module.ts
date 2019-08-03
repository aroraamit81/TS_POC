import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './project/project.component';
import { ProjectContactComponent } from './project-contact/project-contact.component';
import { ProjectContactService } from './projectcontact.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ContactComponent, ProjectComponent, ProjectContactComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/contacts' },
      { path: 'contacts', component: ContactComponent },
      { path: 'projects', component: ProjectComponent },
      { path: 'projects.contact', component: ProjectContactComponent },
    ])
  ],
  providers: [ProjectContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
