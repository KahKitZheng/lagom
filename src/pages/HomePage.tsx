import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CharacterHome from "../assets/svg/character_home.svg";
import PrivacyScreen from "../components/PrivacyScreen";
import XIcon from "../assets/icons/solid/CloseIcon";
import axios from "axios";
import AuthModal from "../components/AuthModal";
import AppContext from "../context/AppContext";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { MEDIA } from "../constants/media";
import { supabase } from "../supabase/supabaseClient";
import Menu from "../components/Menu";

const HomePage = () => {
  const { word } = useParams();
  const { user, setUser, setBookmarks } = useContext(AppContext);

  const [wordQuery, setWordQuery] = useState("");
  const [localSearches, setLocalSearches] = useState([] as string[]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const isDesktop = useViewportWidth(MEDIA.TABLET);

  const localStorageName = "dictionary-searches";

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

  function redirectToWordPage(word: string) {
    navigate(`/${word}`);
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

  function isLocalSeachActive(searchQuery: string) {
    return word === searchQuery ? "bg-neutral-700 text-neutral-300" : "";
  }

  async function signOut() {
    await supabase.auth.signOut().then(() => {
      setUser({ user: null });
      setBookmarks([]);
    });
  }

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data);
  };

  useEffect(() => {
    getLocalSearches();
  }, []);

  return (
    <div className="sticky top-0 flex h-screen w-full flex-col border-[8px] border-neutral-100 bg-neutral-950 p-6 md:border-r-0 lg:px-16 lg:py-8">
      <Menu />

      <motion.div
        className="flex w-full flex-1 flex-col"
        // initial="hidden"
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0.5 }}
      >
        <div className="flex-1">
          <h1 className="mb-6 mt-8 text-5xl font-bold text-slate-100">
            This is your{" "}
            <span className="inline-block text-violet-500">dictionary</span>
          </h1>
          <motion.input
            type="text"
            value={wordQuery}
            onChange={(e) => setWordQuery(e.target.value)}
            className="w-full rounded-md border border-neutral-700/60 bg-neutral-900 px-4 py-2 placeholder:text-sm placeholder:text-neutral-500 focus:outline-double focus:outline-neutral-500"
            placeholder="What word are we learning today?"
            onKeyDown={handleInputSearch}
          />

          <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-60">
            {localSearches.map((searchQuery) => (
              <div
                key={searchQuery}
                className={`group flex cursor-pointer items-center rounded-full border border-neutral-700 pl-3 text-sm hover:bg-neutral-700 hover:text-neutral-300 ${isLocalSeachActive(
                  searchQuery
                )}`}
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
        {/* {user.user?.email ? (
          <button
            className="w-fit text-sm text-neutral-600 hover:text-neutral-400"
            onClick={signOut}
          >
            Sign out
          </button>
        ) : (
          <button
            className="w-fit text-sm text-neutral-600 hover:text-neutral-400"
            onClick={() => setIsModalOpen(true)}
          >
            Sign in
          </button>
        )} */}

        <img
          src={CharacterHome}
          alt="Cartoon character wondering what word to search for"
          className="absolute bottom-4 left-8 z-10 max-h-[25vh] overflow-hidden"
        />
      </motion.div>

      <AuthModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
          getUser();
        }}
      />

      {!isDesktop ? <PrivacyScreen /> : null}
    </div>
  );
};

export default HomePage;
