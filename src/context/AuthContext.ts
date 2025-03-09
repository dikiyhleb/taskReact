import { createContext, Dispatch, SetStateAction } from "react";
import UserEntity from "../models/UserEntity";

interface AuthContextType {
  isAuth: boolean;
  authUser: UserEntity | null;
  setAuthUser: Dispatch<SetStateAction<UserEntity | null>>;
  setAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
