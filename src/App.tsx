import { BrowserRouter } from "react-router";
import "./App.css";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";

function App() {
  const [isAuth, setAuth] = useState(true);

  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
