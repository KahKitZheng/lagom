import HomePage from "./HomePage";
import WordPage from "./WordPage";
import PrivacyScreen from "../components/PrivacyScreen";

const DesktopPage = () => {
  return (
    <div className="grid flex-1 grid-cols-2 overflow-y-scroll">
      <HomePage />
      <WordPage />

      <PrivacyScreen />
    </div>
  );
};

export default DesktopPage;
