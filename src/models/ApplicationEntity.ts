export class ApplicationEntity {
  id: number | null;
  title: string;
  description: string;
  email: string;
  submission_date: string;
  status: string;
  building_id: number | null;

  constructor(
    id: number | null = null,
    title: string = "",
    description: string = "",
    email: string = "",
    submission_date: string = "",
    status: string = "",
    building_id: number | null = null
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.email = email;
    this.submission_date = submission_date;
    this.status = status;
    this.building_id = building_id;
  }
}
