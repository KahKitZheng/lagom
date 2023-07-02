import React, { useEffect, useState } from "react";
import AppContext, { type SupabaseEmailUser } from "./context/AppContext";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { DESKTOP_ROUTES, MOBILE_ROUTES } from "./constants/routes";
import { useViewportWidth } from "./hooks/useViewportWidth";
import { MEDIA } from "./constants/media";
import { supabase } from "./supabase/supabaseClient";

function App() {
  const location = useLocation();
  const isDesktop = useViewportWidth(MEDIA.TABLET);

  const [user, setUser] = useState<SupabaseEmailUser>({ user: null });
  const [bookmarks, setBookmarks] = useState([] as string[]);

  const element = useRoutes(isDesktop ? DESKTOP_ROUTES : MOBILE_ROUTES);

  // Get user's data and save it in local store
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data);
  };

  // Get user's bookmarks and save it in local store
  async function getBookmarks() {
    const { data } = await supabase.from("Bookmark").select("word");

    return setBookmarks(data?.map((word) => word.word) || []);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user.user !== null) {
      getBookmarks();
    }
  }, [user.user]);

  return element ? (
    <AppContext.Provider value={{ user, setUser, bookmarks, setBookmarks }}>
      <AnimatePresence mode="wait" initial={false}>
        {React.cloneElement(element, { key: location.pathname })}
      </AnimatePresence>
    </AppContext.Provider>
  ) : null;
}

export default App;
