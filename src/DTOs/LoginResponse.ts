import UserEntity from "../models/UserEntity";

export default class LoginResponse {
  token: string;
  data: UserEntity | null;

  constructor() {
    this.token = "";
    this.data = null;
  }
}
