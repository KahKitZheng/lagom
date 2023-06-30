import DesktopPage from "../pages/DesktopPage";
import HomePage from "../pages/HomePage";
import WordNotFoundPage from "../pages/WordNotFoundPage";
import WordPage from "../pages/WordPage";

export const DESKTOP_ROUTES = [
  {
    path: "/:word?",
    element: <DesktopPage />,
  },
  {
    path: "/:word/404",
    element: <WordNotFoundPage />,
  },
];

export const MOBILE_ROUTES = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:word?",
    element: <WordPage />,
  },
  {
    path: "/:word/404",
    element: <WordNotFoundPage />,
  },
];
