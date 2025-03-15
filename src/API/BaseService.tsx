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
    console.log(res.data);

    localStorage.setItem("accessToken", res.data.token);
    localStorage.setItem("currentUser", JSON.stringify(res.data.data));

    return res.data;
  }

  public async getAllBuildingsByUserId(id: number) {
    const res = await api.get("/buildings", { params: { user_id: id } });

    console.log("getAllBuildingByUserId(): getting buildings!");
    console.log(res.data);

    return res.data;
  }

  public async getAllApplicationsByUserId(id: number) {
    const res = await api.get("/applications", { params: { user_id: id } });

    console.log("getAllApplicationsByUserId(): getting applications!");
    console.log(res.data);

    return res.data;
  }

  public async getPageBuildingsWithSortByUserId(
    id: number,
    page: number,
    limit: number,
    order: string,
    orderBy: string
  ) {
    const res = await api.get("/buildings", {
      params: {
        user_id: id,
        page: page + 1,
        limit: limit,
        sortBy: order == "asc" ? orderBy : `-${orderBy}`,
      },
    });

    console.log("getPageBuildingsWithSortByUserId(): getting pageBuildings!");
    console.log(res.data);

    return res.data;
  }

  public async getPageApplicationsWithSortByUserId(
    id: number,
    page: number,
    limit: number,
    order: string,
    orderBy: string
  ) {
    const res = await api.get("/applications", {
      params: {
        user_id: id,
        page: page + 1,
        limit: limit,
        sortBy: order == "asc" ? orderBy : `-${orderBy}`,
      },
    });

    console.log(
      "getPageApplicationsWithSortByUserId(): getting pageBuildings!"
    );
    console.log(res.data);

    return res.data;
  }
}
