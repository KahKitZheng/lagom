import BookmarksPage from "./BookmarksPage";
import WordPage from "./WordPage";
import PrivacyScreen from "../components/PrivacyScreen";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { MEDIA } from "../constants/media";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookmarksWordPage = () => {
  const navigate = useNavigate();
  const isDesktop = useViewportWidth(MEDIA.TABLET);

  useEffect(() => {
    if (isDesktop === false) {
      navigate(`/user/bookmarks`);
    }
  }, [isDesktop, navigate]);

  return (
    <div className="scrollbar-y grid flex-1 grid-cols-2 overflow-y-scroll">
      <BookmarksPage />
      <WordPage />

      {/* <PrivacyScreen /> */}
    </div>
  );
};

export default BookmarksWordPage;
