import { Fragment, useState, useRef } from "react";
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
    <Fragment>
      <input onChange={inputHandler} ref={inputElement} />
      <Suggestions>
        {suggestions.length !== searchData.length && suggestions.length > 0 && (
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
      </Suggestions>
    </Fragment>
  );
};

// const [stateList, setList] = useState(list);

// function filterList(e: SyntheticEvent) {
//   let newList = [...list];
//   let string = "";
//   string = (e.target as HTMLInputElement).value;
//   newList = list.filter((element) => {
//     element = element.toLocaleLowerCase();
//     return element.includes(string);
//   });
//   setList(newList);
//   console.log(JSON.stringify(list));
// }

// return (
//   <div className="App">
//     <h2> Code Challenge </h2>
//     <input onChange={filterList} />
//     <p> {stateList.toString()}</p>
//   </div>
// );

const Suggestions = styled.div`
  z-index: 1000;
`;

export default SearchInput;
