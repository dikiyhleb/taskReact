import BuildingEntity from "../models/BuildingEntity";
import { Meta } from "./Meta";

export class BuildingsPage {
  meta: Meta;
  items: BuildingEntity[];

  constructor() {
    this.items = [];
    this.meta = new Meta();
  }
}
