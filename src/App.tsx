import { BrowserRouter } from "react-router";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { useAuthInterceptor } from "./interceptor/axiosInterceptor";
import UserEntity from "./models/UserEntity";

//TODO userService?
function App() {
  const [isAuth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState<UserEntity | null>(null);

  useAuthInterceptor();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const currentUser = localStorage.getItem("currentUser");
    if (token) {
      setAuth(true);
    }
    if (currentUser) {
      setAuthUser(JSON.parse(currentUser));
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("currentUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth,
        authUser,
        setAuthUser,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
