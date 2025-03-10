import { BrowserRouter } from "react-router";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { useAuthInterceptor } from "./interceptor/axiosInterceptor";
import UserEntity from "./models/UserEntity";

function App() {
  const [isAuth, setAuth] = useState(true);
  const [authUser, setAuthUser] = useState<UserEntity | null>(null);

  useAuthInterceptor();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth, authUser, setAuthUser }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
