import SelectDropDown from "./SelectDropDown";

const TextBox = ({ style }) => {
  return (
    <div className={style}>
      <SelectDropDown />
      <textarea 
        placeholder={style === "input" ? "Enter Text" : "translation"}
        disabled={style === "output"}
      />
    </div>
  )
};

export default TextBox;