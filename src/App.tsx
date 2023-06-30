import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { DESKTOP_ROUTES, MOBILE_ROUTES } from "./constants/routes";
import { useViewportWidth } from "./hooks/useViewportWidth";
import { MEDIA } from "./constants/media";

function App() {
  const location = useLocation();
  const isDesktop = useViewportWidth(MEDIA.TABLET);

  const element = useRoutes(isDesktop ? DESKTOP_ROUTES : MOBILE_ROUTES);

  if (!element) return null;

  return element ? (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  ) : null;
}

export default App;
