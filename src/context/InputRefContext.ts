import { createContext, Dispatch, SetStateAction } from "react";

interface FilterSearchContextType {
  filter: string | null;
  setFilter: Dispatch<SetStateAction<string | null>>;
}

export const FilterSearchContext =
  createContext<FilterSearchContextType | null>(null);
