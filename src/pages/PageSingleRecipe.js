import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import YouTube from "react-youtube";
import Notes from "./PageSingleRecipe.Notes";
import Tips from "./PageSingleRecipe.Tips";
import Note from "./PageSingleRecipe.MyNote";
import { useQuery } from "react-query";
import { getRecipe } from "../api/recipeApi";
import useRecipeMutation from "../hooks/recipe-mutation-hook";
import { isLikedCheck } from "../utils/likeHelper";
import { videoOptions } from "../config/youtubeConfig";
import useVideoControlBySpeech from "../hooks/video-speech-control";

function PageSingleRecipe({ loginUserInfo, handleLogin }) {
  const [currentBoardPage, setBoardPage] = useState("notes");
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [myNoteId, setMyNoteId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState("");
  const [videoElement, setVideoElement] = useState(null);
  const { recipe_id } = useParams();
  const { data: recipe } = useQuery(["recipe", recipe_id], () =>
    getRecipe(recipe_id)
  );
  const { updateRecipeLikeMutation, cancelRecipeLikeMutation } =
    useRecipeMutation();
  const recognition = useVideoControlBySpeech(videoElement);

  recognition.start();

  const handleVideo = (event) => {
    setVideoElement(event.target);
    event.target.cueVideoById({
      videoId: recipe?.youtubeUrl.split("v=")[1].split("&")[0],
    });
  };

  const checkVideoState = (event) => {
    console.log(event.data);
  };

  useEffect(() => {
    document.title = "SingleRecipe";
  }, []);

  useEffect(() => {
    const note = recipe?.notes.find(
      (note) => note.creator.email === loginUserInfo.email
    );
    note && setMyNoteId(note._id);
  }, [recipe]);

  useEffect(() => {
    if (recipe) {
      const isAlreadyLiked = isLikedCheck(loginUserInfo.email, recipe?.liked);
      const isAlreadyDisliked = isLikedCheck(
        loginUserInfo.email,
        recipe.disliked
      );
      if (isAlreadyLiked || isAlreadyDisliked) {
        setIsLiked(true);
        isAlreadyLiked && setLikeOrDislike("like");
        isAlreadyDisliked && setLikeOrDislike("dislike");
      }
    }
  }, [recipe]);

  const clickLikeHandler = (event) => {
    if (isLiked && event.target.name === likeOrDislike) {
      cancelRecipeLikeMutation.mutate({
        email: loginUserInfo.email,
        recipe_id,
        like: event.target.name,
      });

      setIsLiked(false);
    } else if (!isLiked) {
      updateRecipeLikeMutation.mutate({
        email: loginUserInfo.email,
        recipe_id,
        like: event.target.name,
      });

      setIsLiked(true);
    }
  };

  const handleBoardNavigation = (event) => {
    if (event.target.name === "myNote") {
      setCurrentNoteId(myNoteId);
      setBoardPage("note");
    } else {
      setBoardPage(event.target.name);
    }
  };

  return (
    <Container>
      <LeftSection>
        <NavigationPage>
          <StyledLinkButton to="/recipes">뒤로 가기</StyledLinkButton>
          <button name="like" onClick={clickLikeHandler}>
            👍 {recipe?.liked.length}
          </button>
          <button name="dislike" onClick={clickLikeHandler}>
            👎 {recipe?.disliked.length}
          </button>
        </NavigationPage>
        <VideoPlayer>
          <YouTube
            onReady={handleVideo}
            id="youtube"
            opts={videoOptions}
            onStateChange={checkVideoState}
          />
        </VideoPlayer>
      </LeftSection>
      <RightSetction>
        <BoardHeader>
          <ButtonBox>
            <ButtonLeft>
              <Button
                type="button"
                name="notes"
                onClick={handleBoardNavigation}
              >
                노트
              </Button>
              <Button type="button" name="tips" onClick={handleBoardNavigation}>
                꿀팁
              </Button>
            </ButtonLeft>
            <ButtonRight>
              {currentBoardPage !== "myNote" && (
                <Button
                  type="button"
                  name="myNote"
                  onClick={handleBoardNavigation}
                >
                  {myNoteId ? "내 노트" : "새 노트"}
                </Button>
              )}
            </ButtonRight>
          </ButtonBox>
        </BoardHeader>
        <BoardMain>
          {currentBoardPage === "notes" && recipe && (
            <Notes
              loginUserInfo={loginUserInfo}
              notes={recipe.notes}
              openNote={setBoardPage}
              changeNote={setCurrentNoteId}
            />
          )}
          {currentBoardPage === "tips" && recipe?.tips && (
            <Tips loginUserInfo={loginUserInfo} recipeId={recipe_id} />
          )}
          {currentBoardPage === "note" && (
            <Note
              loginUserInfo={loginUserInfo}
              note_id={currentNoteId}
              recipeId={recipe_id}
              openNoteList={setBoardPage}
            />
          )}
        </BoardMain>
      </RightSetction>
    </Container>
  );
}

export default PageSingleRecipe;

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const RightSetction = styled.article`
  width: 50%;
  height: 100%;
`;

const BoardHeader = styled.header`
  min-height: 50px;
  height: 5%;
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  height: 100%;
  width: 95%;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

const ButtonLeft = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  button {
    margin-right: 5px;
  }
`;

const ButtonRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  font-weight: bold;
`;

const BoardMain = styled.main`
  height: 95%;
  padding: 0px 16px;
  overflow-y: auto;
`;

const LeftSection = styled.section`
  width: 50%;
  height: 100%;
  border-right: 1px solid black;
`;

const NavigationPage = styled.nav`
  min-height: 50px;
  height: 5%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
`;

const StyledLinkButton = styled(Link)`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  background-color: white;
  font-weight: bold;
`;

const VideoPlayer = styled.article`
  height: 95%;
`;

const Screen = styled.div`
  height: 80%;
  width: 100%;
  color: white;
  background-color: black;
`;

const Controller = styled.div`
  background-color: aqua;
  height: 20%;
  width: 100%;
`;
