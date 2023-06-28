import { useState } from "react";
import axios from "axios";
import WordPreview from "../components/WordPreview";
import { Word } from "../typings";
import WordDetail from "../components/WordDetail";

const HomePage = () => {
  const [word, setWord] = useState({} as Word);
  const [wordQuery, setWordQuery] = useState("");

  const handleSearchWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordQuery}`)
        .then((res) => setWord(res.data[0]));
    }
  };

  return (
    <div className="flex flex-1 flex-col p-2">
      <div className="rounded bg-neutral-950 p-3">
        <h1 className="text-center text-2xl font-bold text-slate-100">
          Dictionary
        </h1>
        <input
          type="text"
          value={wordQuery}
          onChange={(e) => setWordQuery(e.target.value)}
          className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-center placeholder:text-sm"
          placeholder="What word are we learning today?"
          onKeyDown={handleSearchWord}
        />
        <hr className="m-4 border-neutral-700" />
        <div className="mt-4 flex gap-1">
          <div className="flex flex-1 justify-end">
            <button className="text-right text-sm text-slate-100">
              Recent searches
            </button>
          </div>
          <p className="text-neutral-600">/</p>
          <div className="flex flex-1 justify-start">
            <button className="text-left text-sm">Bookmarked</button>
          </div>
        </div>
      </div>

      <WordDetail word={word} />

      {/* <div className="mt-2 flex-1 space-y-2">
        <WordPreview />
        <WordPreview />
        <WordPreview />
        <WordPreview />
        <WordPreview />
      </div> */}
    </div>
  );
};

export default HomePage;
