import SelectDropDown from "./SelectDropDown";

const TextBox = ({ style, selectedLanguage }) => {
  return (
    <div className={style}>
      <SelectDropDown 
        selectedLanguage={selectedLanguage}
      />
      <textarea 
        placeholder={style === "input" ? "Enter Text" : "translation"}
        disabled={style === "output"}
      />
    </div>
  )
};

export default TextBox;