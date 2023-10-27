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
  return (
    <div className={style}>
      <SelectDropDown
        style={style} 
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
        onChange={(e) => setTextToTranslate(e.target.value)}
        value={style === "input" ? textToTranslate : translatedText}
      />
      <textarea 
        placeholder={style === "input" ? "Enter Text" : "translation"}
        disabled={style === "output"}
      />
      {style === "input" && (
        <div className="delete" onClick={handleClick}>x</div>
      )}
    </div>
  )
};

export default TextBox;