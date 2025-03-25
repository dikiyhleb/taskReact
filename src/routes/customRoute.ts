import { Role } from "../models/Role.enum";

export class CustomRoute {
  label: string;
  path: string;
  icon: React.ReactNode;
  element: React.ReactNode;
  roles: Role[];

  constructor() {
    this.label = "";
    this.path = "";
    this.roles = [];
  }
}
