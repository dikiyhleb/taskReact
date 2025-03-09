import { Role } from "./Role.enum";

export default class UserEntity {
  id: number | null;
  email: string;
  role: Role | null;
  name: string;

  constructor() {
    this.id = null;
    this.email = "";
    this.role = null;
    this.name = "";
  }
}
