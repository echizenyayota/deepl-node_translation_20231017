import SelectDropDown from "./SelectDropDown";

const TextBox = ({ 
  style, 
  selectedLanguage, 
  setShowModal,
  textToTranslate,
  setTextToTranslate,
  setTranslatedText,
  translatedText
}) => {

  const handleClick = () => {
    setTextToTranslate("");
    setTranslatedText("");
  }

  return (
    <div className={style}>
      <SelectDropDown
        style={style} 
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
      />
      <textarea 
        placeholder={style === "input" ? "Enter Text" : "translation"}
        disabled={style === "output"}
        value={style === "input" ? textToTranslate : translatedText}
        onChange={(e) => setTextToTranslate(e.target.value)}
      />
      {style === "input" && (
        <div className="delete" onClick={handleClick}>x</div>
      )}
    </div>
  )
};

export default TextBox;