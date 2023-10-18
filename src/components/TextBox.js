const TextBox = ({ style }) => {
  return (
    <div>
      <textarea 
        placeholder={style === "input" ? "Enter Text" : "translation"}
        disabled={style === "output"}
      />
    </div>
  )
};

export default TextBox;