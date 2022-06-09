import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MyNote = ({ loginUserInfo }) => {
  return (
    <Container>
      <ProcessMemo />
      <IngredientsMemo />
      {loginUserInfo && (
        <>
          <ControllButtonSave>저장</ControllButtonSave>
          <ControllButtonDelete>삭제</ControllButtonDelete>
          <ControllButtonDisclose>비공개</ControllButtonDisclose>
        </>
      )}
    </Container>
  );
};

export default MyNote;

const Container = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  margin-top: 5px;
  height: 100%;
  position: relative;
`;

const ProcessMemo = styled.textarea`
  width: 80%;
  height: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  border-right: 1px solid black;
  outline: none;
`;

const IngredientsMemo = styled.div`
  width: 20%;
  background-color: white;
`;

const ControllButtonSave = styled.div`
  width: 100px;
  height: 30px;
  background-color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const ControllButtonDelete = styled.div`
  width: 100px;
  height: 30px;
  background-color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  left: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;
const ControllButtonDisclose = styled.div`
  width: 100px;
  height: 30px;
  background-color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;
