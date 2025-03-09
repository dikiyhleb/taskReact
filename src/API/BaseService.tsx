import LoginResponse from "../DTOs/LoginResponse";
import { api } from "../interceptor/axiosInterceptor";

//TODO обработка ошибки авторизации, проверка наличия res.data.token
export default class BaseService {
  public async login(form: FormData) {
    const res = await api.post<LoginResponse>("/auth", {
      email: form.get("email"),
      password: form.get("password"),
    });

    console.log("login...");
    console.log(res);

    localStorage.setItem("token", res.data.token);

    return res.data;
  }

  getAllBuilding() {}
}
