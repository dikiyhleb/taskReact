//TODO спросить про mapper на фронте, нужно избавиться от snake_case
export default class BuildingEntity {
  id: number | null;
  name: string;
  address: string;
  registration_date: string;
  applications_count: number | null;
  user_id: number | null;

  constructor() {
    this.id = null;
    this.name = "";
    this.address = "";
    this.registration_date = "";
    this.applications_count = null;
    this.user_id = null;
  }
}
