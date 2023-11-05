import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English (en)");
  const [outputLanguage, setOutputLanguage] = useState("Japanese (ja)");
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const extractLanguageCode = (languageString) => {
    const match = languageString.match(/\((\w+)\)/); // This regex matches the content within parentheses.
    if (match && match[1]) {
      return match[1]; // Returns the matched language code (in this case, "en").
    }
    return null; // Return null if no match is found.
  }

  const getLanguages = async () => {
    const response = await axios.get("http://localhost:8000/languages");
    setLanguages(response.data);
  }

  const translate = async () => {
    const data = {
      textToTranslate,
      outputLanguage: extractLanguageCode(outputLanguage),
      inputLanguage: extractLanguageCode(inputLanguage)
    }
    const response = await axios.get("http://localhost:8000/translation", {
      params: data,
    });
    // response.data returns in format {text: "", detectedSourceLang: ""}
    setTranslatedText(response.data?.text);
  }

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  return (
    <div className="app">
      {!showModal && <>
        <TextBox
          selectedLanguage={inputLanguage}
          style="input"
          setShowModal={setShowModal}
          textToTranslate={textToTranslate}
          setTextToTranslate={setTextToTranslate}
          setTranslatedText={setTranslatedText}
        />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>
        <TextBox
          selectedLanguage={outputLanguage}
          style="output"
          setShowModal={setShowModal} 
          translatedText={translatedText}
        />
        <div className="button-container" onClick={translate}>
          <Button />
        </div>
      </>}
      {showModal && <Modal 
        setShowModal={setShowModal}
        languages={languages}
        chosenLanguage={showModal === "input" ? inputLanguage : outputLanguage}
        setChosenLanguage={showModal === "input" ? setInputLanguage : setOutputLanguage}
      />}
    </div>
  );
}

export default App;
