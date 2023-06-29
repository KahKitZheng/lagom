import React from "react";
import { Link, useParams } from "react-router-dom";
import CharacterError from "../assets/svg/character_404.svg";
import ArrowRigthIcon from "../assets/icons/solid/ArrowRigthIcon";

const WordNotFoundPage = () => {
  const { word } = useParams();

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center p-4">
      <p className="mb-8 text-3xl font-semibold text-neutral-800">Oops!</p>
      <h1 className="text-center text-neutral-500">
        I cannot find the meaning of '
        <span className="font-semibold">{word}</span>' for you.
      </h1>
      <Link
        to="/"
        className="mb-20 mt-8 inline-flex items-center gap-1 text-violet-500"
      >
        <p>Try a different word</p>
        <ArrowRigthIcon className="aspect-square py-1" />
      </Link>
      <img
        src={CharacterError}
        alt="Cartoon character wondering what word to search for"
        className="absolute bottom-0 left-0 right-0 z-10 max-h-[13rem] w-full"
      />
    </div>
  );
};

export default WordNotFoundPage;
