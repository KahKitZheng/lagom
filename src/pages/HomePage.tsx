import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CharacterHome from "../assets/svg/character_home.svg";
import PrivacyScreen from "../components/PrivacyScreen";
import XIcon from "../assets/icons/solid/CloseIcon";
import axios from "axios";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { MEDIA } from "../constants/media";

const HomePage = () => {
  const [wordQuery, setWordQuery] = useState("");
  const [localSearches, setLocalSearches] = useState([] as string[]);

  const navigate = useNavigate();
  const isDesktop = useViewportWidth(MEDIA.TABLET);
  const localStorageName = "dictionary-searches";

  function redirectToWordPage(word: string) {
    navigate(`/${word}`);
  }

  function handleInputSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      redirectToWordPage(wordQuery);
      saveLocalSearches();
    }
    return;
  }

  function getLocalSearches() {
    const localSearches = localStorage.getItem(localStorageName);
    if (localSearches) {
      return setLocalSearches(JSON.parse(localSearches) as string[]);
    }
    return setLocalSearches([] as string[]);
  }

  function saveLocalSearches() {
    if (localSearches.includes(wordQuery)) {
      return;
    }
    if (localSearches.length <= 10) {
      const localSearchesCopy = [wordQuery, ...localSearches];
      localStorage.setItem(localStorageName, JSON.stringify(localSearchesCopy));
    }
  }

  function removeLocalSearch(searchQuery: string) {
    const filteredSearches = localSearches.filter(
      (search) => search !== searchQuery
    );

    localStorage.setItem(localStorageName, JSON.stringify(filteredSearches));
    getLocalSearches();
  }

  function handleOnClickLocalSearch(searchQuery: string) {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchQuery}`)
      .then(() => {
        redirectToWordPage(searchQuery);
      })
      .catch((err) => {
        err.response.status === 404 && navigate(`/${searchQuery}/404`);
      });
  }

  useEffect(() => {
    getLocalSearches();
  }, []);

  return (
    <div className="sticky top-0 flex h-screen w-full flex-col items-end border-[8px] border-neutral-100 bg-neutral-950 p-6 lg:border-r-0 lg:px-16">
      <motion.div
        className="flex w-full flex-1 flex-col"
        initial="hidden"
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mt-12 flex-1">
          <h1 className="text-5xl font-bold text-slate-100">
            This is your{" "}
            <span className="inline-block text-violet-500">dictionary</span>
          </h1>
          <motion.input
            type="text"
            value={wordQuery}
            onChange={(e) => setWordQuery(e.target.value)}
            className="mt-8 w-full rounded-md border border-neutral-700/60 bg-neutral-900 px-4 py-2 placeholder:text-sm placeholder:text-neutral-500"
            placeholder="What word are we learning today?"
            onKeyDown={handleInputSearch}
          />

          <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-60">
            {localSearches.map((searchQuery) => (
              <div
                key={searchQuery}
                className="group flex cursor-pointer items-center rounded-full border border-neutral-700 pl-3 text-sm hover:bg-neutral-700 hover:text-neutral-300"
                onClick={() => handleOnClickLocalSearch(searchQuery)}
              >
                <span className="p-1 pr-2">{searchQuery} </span>
                <button
                  className="rounded-full border-0 group-hover:bg-neutral-500 group-hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    removeLocalSearch(searchQuery);
                  }}
                >
                  <XIcon className="aspect-square p-1" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <img
          src={CharacterHome}
          alt="Cartoon character wondering what word to search for"
          className="absolute bottom-0 right-4 z-10 w-1/2 max-w-[12rem] overflow-hidden lg:right-12"
        />
      </motion.div>

      {!isDesktop ? <PrivacyScreen /> : null}
    </div>
  );
};

export default HomePage;
