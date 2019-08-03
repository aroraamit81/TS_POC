export class Contact {
  public contactId: number;
  public contactName: string;
  public email: string;
}
export class Project {
  public projectId: number;
  public projectName: string;
  public location: string;
}
export class ProjectContact {
  public id: number;
  public contactId: number;
  public projectId: number;
}
