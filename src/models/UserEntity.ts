import { Role } from "./Role.enum";

export default class UserEntity {
  id: number;
  email: string;
  role: Role | null;
  name: string;

  constructor() {
    this.id = 0;
    this.email = "";
    this.role = null;
    this.name = "";
  }
}
