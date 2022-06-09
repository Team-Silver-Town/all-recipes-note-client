import { Link } from "react-router-dom";
import styled from "styled-components";

const Notes = () => {
  return (
    <NotesContainer>
      <NotesCard>1번노트</NotesCard>
      <NotesCard>2번노트</NotesCard>
      <NotesCard>3번노트</NotesCard>
      <NotesCard>4번노트</NotesCard>
      <NotesCard>5번노트</NotesCard>
      <NotesCard>6번노트</NotesCard>
      <NotesCard>7번노트</NotesCard>
      <NotesCard>8번노트</NotesCard>
      <NotesCard>9번노트</NotesCard>
      <NotesCard>10번노트</NotesCard>
      <NotesCard>11번노트</NotesCard>
      <NotesCard>12번노트</NotesCard>
      <NotesCard>12번노트</NotesCard>
      <NotesCard>12번노트</NotesCard>
      <NotesCard>12번노트</NotesCard>
      <NotesCard>12번노트</NotesCard>
    </NotesContainer>
  );
};

export default Notes;

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const NotesCard = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
`;
