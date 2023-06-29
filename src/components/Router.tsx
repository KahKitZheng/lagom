import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import WordPage from "../pages/WordPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:word",
    element: <WordPage />,
  },
]);
