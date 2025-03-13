import { ApplicationEntity } from "../models/ApplicationEntity";
import { Meta } from "./Meta";

export class ApplicationsPage {
  meta: Meta;
  items: ApplicationEntity[];

  constructor() {
    this.items = [];
    this.meta = new Meta();
  }
}
