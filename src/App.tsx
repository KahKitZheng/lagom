import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import WordPage from "./pages/WordPage";
import DesktopPage from "./pages/DesktopPage";
import WordNotFoundPage from "./pages/WordNotFoundPage";

function App() {
  const location = useLocation();

  const element = useRoutes([
    // {
    //   path: "/",
    //   element: <DesktopPage />,
    // },
    {
      path: "/:word?",
      element: <DesktopPage />,
    },
    {
      path: "/:word/404",
      element: <WordNotFoundPage />,
    },
  ]);

  if (!element) return null;

  return element ? (
    <AnimatePresence mode="wait" initial={false}>
      {React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  ) : null;
}

export default App;
