import { User } from "@supabase/supabase-js";
import { createContext } from "react";

export type SupabaseEmailUser = { user: null } | { user: User };

type AppContextType = {
  user: SupabaseEmailUser;
  setUser: React.Dispatch<React.SetStateAction<SupabaseEmailUser>>;
  bookmarks: string[];
  setBookmarks: React.Dispatch<React.SetStateAction<string[]>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export default AppContext;
