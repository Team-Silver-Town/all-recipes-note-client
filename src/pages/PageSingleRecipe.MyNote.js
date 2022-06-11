import { useState, useEffect, Fragment } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getIngredients, getUnits } from "../api/foodApi";
import { createNote, deleteNote, updateNote } from "../api/noteApi";
import SearchInput from "../components/Input.Search";
import Modal from "../components/Modal";
import Ingredients from "./PageSingleRecipe.Ingredients";

const Note = ({ loginUserInfo, note, recipeId }) => {
  const { data: ingredients } = useQuery("ingredients", getIngredients);
  const { data: units } = useQuery("units", getUnits);
  const [totalIngredients, setTotalIngredients] = useState([]);
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMyNote, setIsMyNote] = useState(false);
  const [isVisibile, setIsVisible] = useState(true);
  const queryClient = useQueryClient();

  console.log("NOTE", note);

  useEffect(() => {
    if (note) {
      note.ingredients.length && setTotalIngredients(note.ingredients);
      note.creator.email === loginUserInfo.email && setIsMyNote(true);
      setContent(note.content);
      setIsVisible(note.visibility);
    }
  }, [note]);

  const inputContentHandler = (event) => {
    setContent(event.target.value);
  };

  const createNoteMutation = useMutation(createNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipe");
    },
  });

  const createNoteHandler = () => {
    createNoteMutation.mutate({
      email: loginUserInfo.email,
      relatedRecipe: recipeId,
      ingredients: totalIngredients,
      content,
      visibility: isVisibile,
    });
  };

  const updateNoteHandler = () => {
    updateNoteMutation.mutate({
      note_id: note._id,
      ingredients: totalIngredients,
      content,
      visibility: isVisibile,
    });
  };

  const deleteNoteHandler = () => {
    deleteNoteMutation.mutate();
  };

  const openModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleVisibilityHandler = () => {
    setIsVisible(!isVisibile);
  };

  return (
    <>
      {isModalOpen && (
        <Ingredients
          ingredients={ingredients.map((ingredient) => ingredient.name)}
          units={units.map((unit) => unit.name)}
          closeModalHandler={openModalHandler}
          ingredientsHandler={setTotalIngredients}
        />
      )}
      <Container>
        <ProcessMemo
          defaultValue={content}
          onChange={inputContentHandler}
          disabled={!isMyNote}
        />
        {loginUserInfo && (
          <>
            <ControllButtonSave
              onClick={note ? updateNoteHandler : createNoteHandler}
              disabled={!isMyNote}
            >
              저장
            </ControllButtonSave>
            <ControllButtonDelete
              onClick={deleteNoteHandler}
              disabled={!isMyNote}
            >
              삭제
            </ControllButtonDelete>
            <IngredientsList>
              {totalIngredients.length &&
                totalIngredients.map((ingredient) => {
                  return (
                    <IngredientsCard>
                      <div>{`${ingredient.split("-")[0]} ${
                        ingredient.split("-")[1]
                      }${ingredient.split("-")[2]}`}</div>
                    </IngredientsCard>
                  );
                })}
            </IngredientsList>
            <ControlButtonAddIngredient
              onClick={openModalHandler}
              disabled={!isMyNote}
            >
              재료등록
            </ControlButtonAddIngredient>
            <ControllButtonDisclose
              onClick={toggleVisibilityHandler}
              disabled={!isMyNote}
            >
              {isVisibile ? "비공개" : "공개"}
            </ControllButtonDisclose>
          </>
        )}
      </Container>
    </>
  );
};

export default Note;

const IngredientsList = styled.div`
  width: 20%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-self: top;
  align-items: center;
  gap: 10px;
`;

const IngredientsCard = styled.div`
  border-radius: 10px;
  font-size: 11px;
  background-color: red;
  width: 100px;
  height: 30px;
  background-color: var(--primary-color);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

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

const ControlButtonAddIngredient = styled.button`
  width: 100px;
  height: 30px;
  background-color: var(--primary-color);
  font-weight: bold;
  position: absolute;
  bottom: 80px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const ControllButtonSave = styled.button`
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

const ControllButtonDelete = styled.button`
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
const ControllButtonDisclose = styled.button`
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
