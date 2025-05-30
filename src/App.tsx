import { BrowserRouter } from "react-router";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { useAuthInterceptor } from "./interceptor/axiosInterceptor";
import UserEntity from "./models/UserEntity";
import ReactModal from "react-modal";

//TODO userService?
function App() {
  const [isAuth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState<UserEntity | null>(null);

  ReactModal.setAppElement("#root");

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
