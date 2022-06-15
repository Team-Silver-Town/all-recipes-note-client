import React, { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal";
import styled from "styled-components";
import useIngredientControlbySpeech from "../hooks/ingredient-speech-control";
import TypeWriter from "typewriter-effect";
import { generateSuggestions } from "../utils/suggestionHelper";

const Ingredients = ({
  ingredients,
  units,
  closeModalHandler,
  ingredientsHandler,
}) => {
  const [ingredient, setIngredient] = useState("");
  const [portion, setPortion] = useState(0);
  const [unit, setUnit] = useState("");
  const [ingredientSuggestions, setIngredientSuggestions] = useState([]);
  const [unitSuggestions, setUnitSuggestions] = useState([]);
  const [isAdded, setAdded] = useState(false);
  const [script, setScript] = useState("");
  const doneButtonElement = useRef();
  const addButtonElement = useRef();
  const [recognition, speechToText, isCommanding] =
    useIngredientControlbySpeech(
      setIngredient,
      setPortion,
      setUnit,
      doneButtonElement,
      addButtonElement
    );

  recognition.start();

  useEffect(() => {
    if (isCommanding) {
      setScript(speechToText);
    }
  }, [speechToText]);

  const changeIngredientHandler = (event) => {
    setIngredient(event.target.value);
    setIngredientSuggestions(
      generateSuggestions(ingredients, event.target.value)
    );
  };

  const clickIngredientSuggestionHandler = (event) => {
    console.log("suggestion clicked", event.target.innerText);
    setIngredient(event.target.innerText);
    setIngredientSuggestions([]);
  };

  const changePortionHandler = (event) => {
    setPortion(event.target.value);
  };

  const changeUnitHandler = (event) => {
    setUnit(event.target.value);
    setUnitSuggestions(generateSuggestions(units, event.target.value));
  };

  const clickUnitSuggestionHandler = (event) => {
    setUnit(event.target.innerText);
    setUnitSuggestions([]);
  };

  const clickCloseHandler = () => {
    closeModalHandler();
  };

  const clickAddHandler = (event) => {
    event.preventDefault();

    const ingredients = `${ingredient}-${portion}-${unit}`;

    ingredientsHandler((previous) => {
      return [...previous, ingredients];
    });

    setAdded(true);
    setIngredient("");
    setPortion(0);
    setUnit("");
  };

  return (
    <>
      {isCommanding && (
        <div>
          <RecordingStatus className="blob red"></RecordingStatus>
        </div>
      )}
      {
        <TypewriterContainer>
          {script && (
            <TypeWriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(script)
                  .pauseFor(1000)
                  .deleteAll()
                  .callFunction(() => setScript(""))
                  .start();
              }}
            />
          )}
        </TypewriterContainer>
      }
      <Modal>
        <Container>
          <ExitButton onClick={clickCloseHandler}>X</ExitButton>
          <Form onSubmit={clickAddHandler}>
            <TextInput>
              <label>재료</label>
              <input
                type="text"
                onChange={changeIngredientHandler}
                value={ingredient}
              />
              {ingredientSuggestions > 0 && (
                <SuggestionContainer>
                  {ingredientSuggestions.map((suggestion, index) => {
                    return (
                      <Suggestion
                        key={`${suggestion}-${index}`}
                        onClick={clickIngredientSuggestionHandler}
                      >
                        {suggestion}
                      </Suggestion>
                    );
                  })}
                </SuggestionContainer>
              )}
            </TextInput>
            <NumberInput>
              <label>양</label>
              <input
                type="number"
                min="0"
                onChange={changePortionHandler}
                value={portion}
              />
            </NumberInput>
            <TextInput>
              <label>단위</label>
              <input type="text" onChange={changeUnitHandler} value={unit} />
              {unitSuggestions.length > 0 && (
                <SuggestionContainer>
                  {unitSuggestions.map((suggestion, index) => {
                    return (
                      <Suggestion
                        key={`${suggestion}-${index}`}
                        onClick={clickUnitSuggestionHandler}
                      >
                        {suggestion}
                      </Suggestion>
                    );
                  })}
                </SuggestionContainer>
              )}
            </TextInput>
            <ButtonContainer>
              <button
                type="submit"
                disabled={!ingredient || !portion || !unit}
                ref={addButtonElement}
              >
                추가
              </button>
              <button onClick={clickCloseHandler} ref={doneButtonElement}>
                완료
              </button>
            </ButtonContainer>
          </Form>
        </Container>
      </Modal>
    </>
  );
};

export default Ingredients;

const SuggestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const Suggestion = styled.div`
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ExitButton = styled.button`
  align-self: flex-end;
`;
const TextInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NumberInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: end;
`;

const TypewriterContainer = styled.div`
  height: 20%;
  width: 55%;
  position: absolute;
  bottom: 4%;
  left: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
`;

const RecordingStatus = styled.div`
  position: absolute;
  top: 2%;
  right: 65%;

  background: rgba(255, 82, 82, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 82, 82, 1);
  margin: 10px;
  height: 25px;
  width: 25px;
  transform: scale(1);
  animation: pulse-red 1s infinite;

  @keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`;
