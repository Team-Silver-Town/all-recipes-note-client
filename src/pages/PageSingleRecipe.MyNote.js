import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getIngredients, getUnits } from "../api/foodApi";
import useNoteMutation from "../hooks/note-mutation-hook";
import Ingredients from "./PageSingleRecipe.Ingredients";
import { isLikedCheck } from "../utils/likeHelper";
import { getNote } from "../api/noteApi";
import useNoteControlBySpeech from "../hooks/note-speech-control";
import TypeWriter from "typewriter-effect";

const Note = ({ loginUserInfo, note_id, recipeId, openNoteList, video }) => {
  const { data: ingredients } = useQuery("ingredients", getIngredients);
  const { data: units } = useQuery("units", getUnits);
  const { data: note } = useQuery(["note", note_id], () =>
    getNote(note_id ? note_id : null)
  );
  const {
    createNoteMutation,
    updateNoteMutation,
    deleteNoteMutation,
    updateNoteLikeMutation,
    cancelNoteLikeMutation,
  } = useNoteMutation();
  const [totalIngredients, setTotalIngredients] = useState([]);
  const [content, setContent] = useState("");
  const [isMyNote, setMyNote] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVisibile, setIsVisible] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState("");
  const [isSaved, setSaved] = useState(false);
  const [script, setScript] = useState("");
  const noteElement = useRef();
  const ingredientsButtonElement = useRef();
  const saveButtonElement = useRef();
  const deleteButtonElement = useRef();

  const [recognition, speechToText, isCommanding] = useNoteControlBySpeech(
    noteElement.current,
    ingredientsButtonElement.current,
    saveButtonElement.current,
    deleteButtonElement.current,
    setIsVisible,
    openNoteList,
    video,
    totalIngredients
  );

  recognition.start();

  useEffect(() => {
    if (note) {
      note.ingredients.length && setTotalIngredients(note.ingredients);
      note.creator.email === loginUserInfo.email && setMyNote(true);
      note.creator.email !== loginUserInfo.email && setMyNote(false);
      setContent(note.content);
      setIsVisible(note.visibility);
    } else {
      setTotalIngredients([]);
      setContent("");
      setIsVisible(true);
      setMyNote(true);
    }
  }, [note]);

  useEffect(() => {
    if (note) {
      const isAlreadyLiked = isLikedCheck(loginUserInfo.email, note.liked);
      const isAlreadyDisliked = isLikedCheck(
        loginUserInfo.email,
        note.disliked
      );
      if (isAlreadyLiked || isAlreadyDisliked) {
        setIsLiked(true);
        isAlreadyLiked && setLikeOrDislike("like");
        isAlreadyDisliked && setLikeOrDislike("dislike");
      }
    }
  }, [note]);

  useEffect(() => {
    let timer;
    if (isSaved) {
      timer = setTimeout(() => {
        setSaved(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isSaved]);

  useEffect(() => {
    if (isCommanding) {
      setScript(speechToText);
    }
  }, [speechToText]);

  const clickLikeHandler = (event) => {
    if (isLiked && event.target.name === likeOrDislike) {
      cancelNoteLikeMutation.mutate({
        email: loginUserInfo.email,
        note_id: note._id,
        like: event.target.name,
      });

      setIsLiked(false);
      setLikeOrDislike("");
    } else if (!isLiked) {
      updateNoteLikeMutation.mutate({
        email: loginUserInfo.email,
        note_id: note._id,
        like: event.target.name,
      });

      setIsLiked(true);
      setLikeOrDislike(event.target.name);
    }
  };

  const inputContentHandler = (event) => {
    setContent(event.target.value);
  };

  const createNoteHandler = () => {
    createNoteMutation.mutate({
      email: loginUserInfo.email,
      relatedRecipe: recipeId,
      ingredients: totalIngredients,
      content,
      visibility: isVisibile,
    });
    setSaved(true);
  };

  const updateNoteHandler = () => {
    updateNoteMutation.mutate({
      note_id: note._id,
      ingredients: totalIngredients,
      content,
      visibility: isVisibile,
    });
    setSaved(true);
  };

  const deleteNoteHandler = () => {
    deleteNoteMutation.mutate({
      note_id: note._id,
    });
    openNoteList("notes");
  };

  const openModalHandler = () => {
    setModalOpen(!isModalOpen);
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
      {isCommanding && (
        <RecodingBox>
          <RecordingStatus className="blob red"></RecordingStatus>
        </RecodingBox>
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
      <Container>
        {note && (
          <NoteLikeButton name="like" onClick={clickLikeHandler}>
            👍 {note.liked.length}
          </NoteLikeButton>
        )}
        {note && (
          <NoteDislikeButton name="dislike" onClick={clickLikeHandler}>
            👎 {note.disliked.length}
          </NoteDislikeButton>
        )}
        <ProcessMemo
          defaultValue={content}
          onChange={inputContentHandler}
          disabled={!isMyNote}
          ref={noteElement}
        />
        {isMyNote && (
          <>
            {isSaved && <SavedMessage>SAVED</SavedMessage>}
            <ControllButtonSave
              onClick={note ? updateNoteHandler : createNoteHandler}
              disabled={!isMyNote}
              ref={saveButtonElement}
            >
              저장
            </ControllButtonSave>
            <ControllButtonDelete
              onClick={deleteNoteHandler}
              disabled={!isMyNote}
              ref={deleteButtonElement}
            >
              삭제
            </ControllButtonDelete>
            <IngredientsList>
              {totalIngredients.length > 0 &&
                totalIngredients.map((ingredient, index) => {
                  return (
                    <IngredientsCard key={`${ingredient.name}-${index}`}>
                      <div key={ingredient._id}>{`${ingredient.split("-")[0]} ${
                        ingredient.split("-")[1]
                      }${ingredient.split("-")[2]}`}</div>
                    </IngredientsCard>
                  );
                })}
            </IngredientsList>
            <ControlButtonAddIngredient
              ref={ingredientsButtonElement}
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

const RecodingBox = styled.div`
  background-color: var(--primary-color);
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 2%;
  left: 22%;
`;

const RecordingStatus = styled.div`
  background: rgba(255, 0, 0, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 0, 0, 1);
  height: 30px;
  width: 30px;
  transform: scale(1);
  animation: pulse-red 1s infinite;

  @keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
`;

const SavedMessage = styled.div`
  position: absolute;
  width: 120px;
  height: 40px;
  bottom: 70px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
`;

const ControllButtonSave = styled.button`
  width: 120px;
  height: 40px;
  background-color: var(--secondary-color);
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: 2px solid black;
    padding: 2px;
  }
`;

const NoteLikeButton = styled.button`
  width: 5%;
  height: 5%;
  font-weight: bold;
  position: absolute;
  bottom: 4%;
  left: 59%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const NoteDislikeButton = styled.button`
  width: 5%;
  height: 5%;
  font-weight: bold;
  position: absolute;
  bottom: 4%;
  left: 64%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

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
  background-color: var(--secondary-color);
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
  margin-bottom: 5px;
  height: 100%;
  position: relative;
`;

const ProcessMemo = styled.textarea`
  width: 70%;
  height: 100%;
  padding: 10px;
  background-color: white;
  border: none;
  border-right: 1px solid black;
  outline: none;
`;

const ControlButtonAddIngredient = styled.button`
  width: 120px;
  height: 40px;
  background-color: var(--secondary-color);
  font-weight: bold;
  position: absolute;
  bottom: 80px;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border: 2px solid black;
    padding: 2px;
  }
`;

const ControllButtonDelete = styled.button`
  width: 120px;
  height: 40px;
  background-color: var(--secondary-color);
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  left: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: default;

  &:hover {
    border: 2px solid black;
    padding: 2px;
  }
`;
const ControllButtonDisclose = styled.button`
  width: 120px;
  height: 40px;
  background-color: var(--secondary-color);
  font-weight: bold;
  position: absolute;
  bottom: 30px;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: default;

  &:hover {
    border: 2px solid black;
    padding: 2px;
  }
`;
