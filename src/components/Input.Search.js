import { Fragment, useState, useRef } from "react";
import { debounce } from "lodash";

const SearchInput = ({ updateHanlder, searchData, category }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputElement = useRef();
  // TODO: fine tuning
  const inputHandler = debounce((e) => {
    const inputValue = e.target.value;
    updateHanlder(inputValue);

    generateSuggestions(e);
  }, 200);

  const generateSuggestions = (e) => {
    if (e.nativeEvent.data) {
      const matchArray = [];

      searchData.forEach((data) => {
        if (data.name.includes(e.target.value)) {
          matchArray.push(data.name);
        }
      });

      if (matchArray.length > 0) {
        setSuggestions(matchArray);
      }
    } else {
      setSuggestions([]);
    }
  };

  const clickSuggestionHandler = (e) => {
    const suggestedValue = e.target.innerText;

    inputElement.current.value = suggestedValue;
    setInput(suggestedValue);
    updateHanlder(suggestedValue);
    setSuggestions([]);
  };

  return (
    <Fragment>
      <input
        onChange={inputHandler}
        ref={inputElement}
        // disabled={!(searchData && searchData.length > 0)}
      />
      {suggestions.length > 0 && (
        <div>
          {suggestions.map((suggestion, index) => {
            return (
              <div
                key={`${suggestion}-${index}`}
                onClick={clickSuggestionHandler}
              >
                {suggestion}
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};

export default SearchInput;
