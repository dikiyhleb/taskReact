import { createContext, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  isAuth: boolean;
  setAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
