import { Fragment, useState, useRef } from "react";
import { debounce } from "lodash";

const SearchInput = ({ updateHanlder, searchData }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputElement = useRef();

  const inputHandler = debounce((e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    updateHanlder(input);

    if (e.nativeEvent.data) {
      const matchArray = [];

      searchData.map((data) => {
        if (data.name.includes(inputValue)) {
          matchArray.push(data.name);
        }
      });

      if (matchArray.length > 0) {
        setSuggestions(matchArray);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  const clickSuggestionHandler = (e) => {
    const suggestedValue = e.target.innerText;

    inputElement.current.value = suggestedValue;
    setInput(suggestedValue);
    updateHanlder(suggestedValue);
    setSuggestions([]);
  };

  return (
    <Fragment>
      <input onChange={inputHandler} ref={inputElement} />
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
