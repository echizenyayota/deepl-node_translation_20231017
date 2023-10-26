import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Japanese");
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);

  const getLanguages = async() => {
    const response = await axios("http://localhost:8000/languages");
    setLanguages(response.data);
  }

  console.log("languages", languages);

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  console.log("showModal", showModal);

  return (
    <div className="app">
      {!showModal && <>
        <TextBox
          selectedLanguage={inputLanguage}
          style="input"
          setShowModal={setShowModal}
        />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>
        <TextBox
          selectedLanguage={outputLanguage}
          style="output"
          setShowModal={setShowModal} 
        />
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
