import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Word } from "../typings";
import { motion } from "framer-motion";
import axios from "axios";
import PrivacyScreen from "../components/PrivacyScreen";
import PlayIcon from "../assets/icons/solid/PlayIcon";
import StarIcon from "../assets/icons/solid/StarIcon";
import StarIconOutline from "../assets/icons/outline/StarIcon";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { MEDIA } from "../constants/media";

const WordPage = () => {
  const { word } = useParams();

  const navigate = useNavigate();
  const isDesktop = useViewportWidth(MEDIA.TABLET);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [response, setResponse] = useState({} as Word);

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => setResponse(res.data[0]))
      .catch((err) => {
        if (err.response.status === 404) {
          navigate(`/${word}/404`);
        }
      });
  }, [navigate, word]);

  // Check if data for the phonetic text and audio is available
  const phoneticWithAudio = response?.phonetics?.filter(
    (phonetic) => phonetic.text && phonetic.audio
  )[0];

  function renderPhoneticText() {
    if (phoneticWithAudio) {
      return phoneticWithAudio.text;
    }
    if (response.phonetic) {
      return response.phonetic;
    }
    return null;
  }

  function playPhonetic() {
    const audio = document.getElementById("phonetic") as HTMLAudioElement;

    if (audio) {
      return audio.play();
    }
    return;
  }

  function renderBookMarkIcon() {
    return isBookmarked ? (
      <StarIcon className="fill-violet-600" />
    ) : (
      <StarIconOutline className="stroke-violet-300" />
    );
  }

  function handleOnClickBookMark() {
    setIsBookmarked(!isBookmarked);
  }

  return (
    <motion.div className="flex h-full flex-col gap-4 bg-neutral-100 p-4 pb-8 lg:p-12 lg:py-20">
      <div>
        <div>
          <Link to={"/"} className="text-xs text-neutral-400 lg:hidden">
            Back
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif text-2xl font-bold text-neutral-900">
                {response.word}
              </p>
              <p className="text-violet-500">{renderPhoneticText()}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleOnClickBookMark}>
                {renderBookMarkIcon()}
              </button>
              {phoneticWithAudio?.audio ? (
                <div>
                  <button
                    onClick={playPhonetic}
                    className="flex aspect-square h-12 items-center justify-center rounded-full bg-violet-200 p-2"
                  >
                    <PlayIcon className="fill-violet-500" />
                  </button>
                  <audio id="phonetic" src={phoneticWithAudio?.audio} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          {response.meanings?.map((meaning, index) => (
            <div key={index}>
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
                    <p className="text-neutral-600">{definition.definition}</p>
                    {definition.example && (
                      <p className="mt-1 text-violet-500">
                        "{definition.example}"
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {response.sourceUrls ? (
            <div>
              <div className="mb-2 mt-6 flex items-center gap-4">
                <p className="font-serif font-semibold italic text-neutral-700">
                  Sources
                </p>
                <hr className="flex-1 border-neutral-500" />
              </div>
              <ul>
                {response.sourceUrls?.map((sourceUrl) => (
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

      {!isDesktop ? <PrivacyScreen /> : null}
    </motion.div>
  );
};

export default WordPage;
