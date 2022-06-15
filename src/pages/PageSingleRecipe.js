import { useState, useEffect, useLayoutEffect,useRef  } from "react";
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

  const pageTitle = recipe ? recipe.belongsToMenu.name : "Recipe Detail";

  useLayoutEffect(() => {
    document.title = `${pageTitle} | 모조리`;
  }, [pageTitle]);

  useEffect(() => {
    const note = recipe?.notes.find(
      (note) => note.creator.email === loginUserInfo.email
    );
    note && setMyNoteId(note._id);
  }, [recipe, loginUserInfo.email]);

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
  }, [recipe, loginUserInfo.email]);

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
          <StyledLinkButton tabIndex="0" to="/recipes">
            레시피 페이지
          </StyledLinkButton>
          <StyledLinkButton tabIndex="0" to="/rankings">
            랭킹 페이지
          </StyledLinkButton>
          <button tabIndex="0" name="like" onClick={clickLikeHandler}>
            👍 {recipe?.liked.length}
          </button>
          <button tabIndex="0" name="dislike" onClick={clickLikeHandler}>
            👎 {recipe?.disliked.length}
          </button>
        </NavigationPage>
        <VideoPlayer tabIndex="1">
          <YouTube
            tabIndex="1"
            videoId={recipe?.youtubeUrl.split("v=")[1].split("&")[0]}
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
                tabIndex="0"
                type="button"
                name="notes"
                onClick={handleBoardNavigation}
              >
                노트
              </Button>
              <Button
                tabIndex="0"
                type="button"
                name="tips"
                onClick={handleBoardNavigation}
              >
                꿀팁
              </Button>
            </ButtonLeft>
            <ButtonRight>
              {currentBoardPage !== "myNote" && (
                <Button
                  tabIndex="0"
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
  background-color: var(--secondary-color);
`;

const RightSetction = styled.article`
  width: 40%;
  height: 100%;
`;

const BoardHeader = styled.header`
  min-height: 75px;
  height: 5%;
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  height: 100%;
  width: 95%;
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
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 120px;
  height: 40px;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  background-color: white;
  font-weight: bold;
  margin-right: 5px;
  padding: 2px;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 2px solid black;
    padding: 2px;
  }
`;

const BoardMain = styled.main`
  height: 92%;
  padding: 0px 8px 0px 0px;
  overflow-y: auto;
`;

const LeftSection = styled.section`
  width: 60%;
  height: 100%;
`;

const NavigationPage = styled.nav`
  min-height: 75px;
  height: 5%;
  padding: 0 10px;
  display: flex;
  align-items: center;
`;

const StyledLinkButton = styled(Link)`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  background-color: white;
  font-weight: bold;
  margin-right: 10px;
  padding: 2px;

  &:hover,
  &:focus {
    border: 2px solid black;
    padding: 2px;
  }
`;

const VideoPlayer = styled.article`
  height: 95%;
  width: 100%;
  padding: 0px 8px 8px 8px;

  iframe {
    width: 100%;
    height: 600px;
  }
`;
