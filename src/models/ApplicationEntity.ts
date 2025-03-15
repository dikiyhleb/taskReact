export class ApplicationEntity {
  id: number | null;
  title: string;
  description: string;
  email: string;
  submission_date: string;
  status: string;
  building_id: number | null;

  constructor() {
    this.id = null;
    this.title = "";
    this.description = "";
    this.email = "";
    this.submission_date = "";
    this.status = "";
    this.building_id = null;
  }
}
