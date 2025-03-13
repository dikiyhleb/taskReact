export class ApplicationEntity {
  id: number | null;
  name: string;
  description: string;
  email: string;
  submission_date: string;
  status: string;
  building_id: number | null;

  constructor() {
    this.id = null;
    this.name = "";
    this.description = "";
    this.email = "";
    this.submission_date = "";
    this.status = "";
    this.building_id = null;
  }
}
