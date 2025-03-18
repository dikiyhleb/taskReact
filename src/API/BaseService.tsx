import LoginResponse from "../DTOs/LoginResponse";
import { api } from "../interceptor/axiosInterceptor";
import UserEntity from "../models/UserEntity";

//TODO обработка ошибки авторизации, проверка наличия res.data.token
//TODO фильтрация по нескольким полям одновременно
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

  public async getAllApplicationsByUserEmail(email: string) {
    const res = await api.get("/applications", { params: { email: email } });

    console.log("getAllApplicationsByUserEmail(): getting applications!");
    console.log(res.data);

    return res.data;
  }

  public async getBuildings(
    id: number,
    page: number,
    limit: number,
    order: string | null | undefined,
    orderBy: string | null | undefined,
    filterField: string | null | undefined,
    filter: string | null | undefined
  ) {
    const params = new URLSearchParams();

    params.append("user_id", id.toString());
    params.append("page", (page + 1).toString());
    params.append("limit", limit.toString());

    if (order && orderBy) {
      params.append("sortBy", order == "asc" ? orderBy : `-${orderBy}`);
    }

    if (filter && filterField) {
      params.append(filterField, `*${filter}`);
    }

    const res = await api.get("/buildings", {
      params: params,
    });

    console.log("getPageBuildingsWithSortByUserId(): getting pageBuildings!");
    console.log(res.data);

    return res.data;
  }

  public async getApplications(
    user: UserEntity,
    page: number,
    limit: number,
    order: string | null | undefined,
    orderBy: string | null | undefined,
    filterField: string | null | undefined,
    filter: string | null | undefined
  ) {
    const params = new URLSearchParams();

    switch (user.role) {
      case "MANAGER":
        params.append("user_id", user.id.toString());
        break;
      case "USER":
        params.append("email", user.email.toString());
    }

    params.append("page", (page + 1).toString());
    params.append("limit", limit.toString());

    if (order && orderBy) {
      params.append("sortBy", order == "asc" ? orderBy : `-${orderBy}`);
    }

    if (filter && filterField) {
      params.append(filterField, `*${filter}`);
    }

    const res = await api.get("/applications", {
      params: params,
    });

    console.log(
      "getPageApplicationsWithSortByUserId(): getting pageBuildings!"
    );
    console.log(res.data);

    return res.data;
  }

  public async getBuildingsByFilter(filter: string) {
    const res = await api.get("/buildings", {
      params: {
        name: `*${filter}`,
      },
    });

    console.log("getBuildingsByFilter");
    console.log(res);

    return res.data;
  }
}
