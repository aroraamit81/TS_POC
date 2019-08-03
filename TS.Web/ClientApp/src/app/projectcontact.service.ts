import { Injectable, Inject } from '@angular/core';
import { Contact, Project, ProjectContact } from './classes';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProjectContactService {

  private baseUrl: string;
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl +"api/ProjectContact/";
  }

  getContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.baseUrl + 'GetContacts');

  }


  addContact(contact: Contact): Observable<any> {
    return this.httpClient.post<Contact>(this.baseUrl + 'AddContact', contact, {

    }).pipe(catchError(this.handleError));
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl + 'GetProjects');

  }

  private handleError(errorResponse: HttpErrorResponse) {
    return throwError(errorResponse.error);
  }

  addProject(project: Project): Observable<any> {
    return this.httpClient.post<Project>(this.baseUrl + 'AddProject', project, {

    })
   .pipe(catchError(this.handleError));

  }

  getMappingData(projectId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + 'getMappingData/' + projectId);

  }


  AddMapping(mappingData: ProjectContact[]): Observable<any> {
    return this.httpClient.post<ProjectContact[]>(this.baseUrl + 'AddMapping', mappingData, {

    });
  }
  
}
