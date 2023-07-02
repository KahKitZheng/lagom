import HomePage from "./HomePage";
import WordPage from "./WordPage";
import PrivacyScreen from "../components/PrivacyScreen";
import Menu from "../components/Menu";

const HomeWordPage = () => {
  return (
    <div className="scrollbar-y relative grid flex-1 grid-cols-2 overflow-y-scroll">
      <HomePage />
      <WordPage />

      {/* <PrivacyScreen /> */}
    </div>
  );
};

export default HomeWordPage;
