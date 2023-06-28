import React from "react";
import { Word } from "../typings";

type WordDetailProps = {
  word: Word;
};

const WordDetail = (props: WordDetailProps) => {
  const { word } = props;

  return (
    <div className="my-6 flex items-center gap-4 px-2">
      <div>
        <p className="font-serif text-2xl font-bold text-neutral-900">
          {word.word}
        </p>

        <p className="text-violet-500">{word.phonetic}</p>

        <div>
          {word.meanings?.map((meaning, index) => (
            <div key={index}>
              <div>
                <div className="my-6 flex items-center gap-4">
                  <p className="font-serif font-semibold italic text-neutral-700">
                    {meaning.partOfSpeech}
                  </p>
                  <hr className="flex-1 border-neutral-500" />
                </div>
                <p className="font-serif text-sm italic text-neutral-500">
                  Meaning
                </p>
                <ul className="mt-2 space-y-4">
                  {meaning.definitions.map((definition, index) => (
                    <li
                      key={index}
                      className="ml-6 list-disc text-xs marker:text-violet-500"
                    >
                      <p className="text-neutral-600">
                        {definition.definition}
                      </p>
                      {definition.example && (
                        <p className="mt-1 text-neutral-400">
                          "{definition.example}"
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {word.sourceUrls ? (
            <div>
              <div className="mb-2 mt-6 flex items-center gap-4">
                <p className="font-serif font-semibold italic text-neutral-700">
                  Sources
                </p>
                <hr className="flex-1 border-neutral-500" />
              </div>
              <ul>
                {word.sourceUrls?.map((sourceUrl) => (
                  <li
                    key={sourceUrl}
                    className="ml-6 list-disc marker:text-violet-500"
                  >
                    <a
                      key={sourceUrl}
                      className="text-sm underline"
                      href={sourceUrl}
                      target="__blank"
                      rel="noopener norefererrer"
                    >
                      {sourceUrl}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WordDetail;
