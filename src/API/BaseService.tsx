export default class BaseService {
  private API = "https://41a6867a08e37e5e.mokky.dev";

  public async login(form: FormData) {
    const res = await fetch(`${this.API}/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    return res.json();
  }

  getAllBuilding() {}
}
