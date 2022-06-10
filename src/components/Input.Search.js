import { useState, useRef } from "react";
import { debounce } from "lodash";
import styled from "styled-components";

const SearchInput = ({ updateHanlder, searchData }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputElement = useRef();
  // TODO: fine tuning
  const inputHandler = debounce((e) => {
    const inputValue = e.target.value;
    updateHanlder(inputValue);

    generateSuggestions(e);
  }, 500);

  const generateSuggestions = (e) => {
    const matchArray = searchData.filter(
      (data) => data.indexOf(e.target.value.trim()) > -1
    );

    if (matchArray.length > 0) {
      setSuggestions(matchArray);
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
    <Container>
      <input onChange={inputHandler} ref={inputElement} />
      {suggestions?.length !== searchData?.length && suggestions?.length > 0 && (
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
    </Container>
  );
};

export default SearchInput;

const Container = styled.div`
  display: flex;
  align-items: center;

  input {
    margin-right: 10px;
  }

  div {
    font-size: 16px;
    cursor: pointer;
  }
`;
