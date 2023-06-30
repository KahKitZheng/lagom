import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import WordPage from "./WordPage";
import PrivacyScreen from "../components/PrivacyScreen";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Word } from "../typings";
import WordNotFoundPage from "./WordNotFoundPage";

const DesktopPage = () => {
  const { word } = useParams();

  const navigate = useNavigate();

  const [response, setResponse] = useState({} as Word);
  const [errorStatus, setErrorStatus] = useState<undefined | number>(undefined);

  // Fetch word data from API
  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => setResponse(res.data[0]))
      .catch((err) => {
        if (err.response.status === 404) {
          // setErrorStatus(err.response.status);
          navigate(`/${word}/404`);
        }
      });
  }, [navigate, word]);

  function render() {
    // if (Object.keys(response).length === 0) {
    //   return <WordNotFoundPage />;
    // }

    return (
      <div className="grid flex-1 grid-cols-2 overflow-y-scroll">
        <HomePage />
        <WordPage response={response} />

        <PrivacyScreen />
      </div>
    );
  }

  return render();
};

export default DesktopPage;
