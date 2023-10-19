import { useState } from "react";

const Modal = () => {

  const [searchedLanguage, setSearchedLanguage] = useState("");

  const handleClick = (e) => {
    setSearchedLanguage(e.target.value);
  }

  console.log(searchedLanguage);

  return (
    <div className="option-List">
      <div className="search-bar">
        <input value={searchedLanguage} onChange={handleClick} />
      </div>
    </div>
  )
};

export default Modal;