import React, { useContext, useState } from "react";
import Menu from "../components/Menu";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { getAlphabetLetters } from "../utils";

const BookmarksPage = () => {
  const { bookmarks } = useContext(AppContext);

  const [selectedLetter, setSelectedLetter] = useState("");

  const isDesktop = useViewportWidth(1024);

  // Return an array of words that are grouped by their first letter
  function groupWordsByFirstLetter() {
    const groupedWords = bookmarks.sort().reduce((acc, word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const words = acc[firstLetter] || [];
      return {
        ...acc,
        [firstLetter]: [...words, word],
      };
    }, {} as { [key: string]: string[] });

    return groupedWords;
  }

  const wordsGroupedByFirstLetter = groupWordsByFirstLetter();

  return (
    <div className="sticky top-0 flex h-screen w-full flex-col border-[8px] border-neutral-100 bg-neutral-950 p-6 md:border-r-0 lg:px-16 lg:py-8">
      <Menu />
      <h1 className="mt-8 text-5xl font-bold text-slate-100">
        Your <span className="text-violet-500">bookmarks</span>
      </h1>

      {/* Displays all letters in alphabet */}
      {/* <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(28px,1fr))] gap-4">
        {getAlphabetLetters().map((letter) => (
          <button
            onClick={() => setSelectedLetter(letter.toUpperCase())}
            className={`grid place-content-center rounded py-1 text-sm ${
              Object.keys(wordsGroupedByFirstLetter).includes(
                letter.toUpperCase()
              )
                ? "bg-neutral-900 hover:bg-neutral-700"
                : "cursor-default bg-neutral-950"
            } ${
              Object.keys(wordsGroupedByFirstLetter).includes(
                letter.toUpperCase()
              )
                ? "text-neutral-400"
                : "text-neutral-700"
            }`}
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div> */}

      {/* Per word */}
      {/* <ul className="mt-12 list-disc">
        {selectedLetter !== ""
          ? wordsGroupedByFirstLetter[selectedLetter].map((word) => (
              <li className="ml-6 marker:text-violet-500">{word}</li>
            ))
          : null}
      </ul> */}

      {/* Show all bookmarks grouped by the first letter */}
      <div
        className="mt-8 grid grid-cols-2 gap-6 overflow-auto"
        style={{ gridAutoRows: "1fr" }}
      >
        {Object.keys(wordsGroupedByFirstLetter).map((key) => (
          <div className="grid grid-cols-[32px_1fr] gap-4">
            <p className="text-center text-2xl">{key}</p>
            <div className="space-y-1 ">
              {wordsGroupedByFirstLetter[key].map((word) => (
                <Link
                  to={isDesktop ? `/user/bookmarks/${word}` : `/${word}`}
                  className="block w-fit text-sm text-neutral-600 hover:text-neutral-400"
                >
                  {word}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder text if no bookmarks are present */}
      {/* <div className="flex h-full flex-col items-center justify-center opacity-50">
        <p className="text-2xl font-semibold text-neutral-400">No bookmarks!</p>
        <p className="mt-2 text-sm text-neutral-500">
          Looks like you haven't bookmarked a word yet.
        </p>
      </div> */}
    </div>
  );
};

export default BookmarksPage;
