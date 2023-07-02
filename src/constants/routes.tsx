import HomeWordPage from "../pages/HomeWordPage";
import HomePage from "../pages/HomePage";
import WordPage from "../pages/WordPage";
import WordNotFoundPage from "../pages/WordNotFoundPage";
import BookmarksPage from "../pages/BookmarksPage";
import BookmarksWordPage from "../pages/BookmarksWordPage";

export const DESKTOP_ROUTES = [
  {
    path: "/:word?",
    element: <HomeWordPage />,
  },
  {
    path: "/user/bookmarks/:word?",
    element: <BookmarksWordPage />,
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
    path: "/user/bookmarks",
    element: <BookmarksPage />,
  },
  {
    path: "/user/bookmarks/:word?",
    element: <BookmarksWordPage />,
  },
  {
    path: "/:word/404",
    element: <WordNotFoundPage />,
  },
];
