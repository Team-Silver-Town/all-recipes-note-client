import React, { useState } from "react";
import Modal from "../components/Modal";
import SearchInput from "../components/Input.Search";
import styled from "styled-components";

const Ingredients = ({
  ingredients,
  units,
  closeModalHandler,
  ingredientsHandler,
}) => {
  const [ingredient, setIngredient] = useState("");
  const [portion, setPortion] = useState(0);
  const [unit, setUnit] = useState("");

  const changePortionHandler = (event) => {
    setPortion(event.target.value);
  };

  const clickCloseHandler = () => {
    closeModalHandler();
  };

  const clickAddHandler = () => {
    const ingredients = `${ingredient}-${portion}-${unit}`;

    ingredientsHandler((previous) => {
      return [...previous, ingredients];
    });

    setIngredient("");
    setPortion(0);
    setUnit("");
  };

  return (
    <>
      <Modal>
        <Container>
          <TextInput>
            <label>재료</label>
            <SearchInput
              searchData={ingredients}
              updateHanlder={setIngredient}
            />
          </TextInput>
          <NumberInput>
            <label>양</label>
            <input type="number" min="0" onChange={changePortionHandler} />
          </NumberInput>
          <TextInput>
            <label>단위</label>
            <SearchInput searchData={units} updateHanlder={setUnit} />
          </TextInput>
          <Button onClick={clickCloseHandler}>완료</Button>
          <Button
            disabled={!ingredient || !portion || !unit}
            onClick={clickAddHandler}
          >
            추가
          </Button>
        </Container>
      </Modal>
    </>
  );
};

export default Ingredients;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
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

const Button = styled.button`
  height: 10%;
  width: 10%;
`;
