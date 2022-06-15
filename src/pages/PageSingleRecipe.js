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
import TypeWriter from "typewriter-effect";

function PageSingleRecipe({ loginUserInfo, handleLogin }) {
  const [currentBoardPage, setBoardPage] = useState("notes");
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [myNoteId, setMyNoteId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState("");
  const [videoElement, setVideoElement] = useState(null);
  const [script, setScript] = useState("");
  const likeButtonElement = useRef();
  const dislikeButtonElement = useRef();
  const toMyNoteButtonElement = useRef();
  const toRankingsButtonElement = useRef();
  const toRecipesButtonElement = useRef();
  const toNoteListButtonElement = useRef();
  const toTipListButtonElement = useRef();
  const { recipe_id } = useParams();
  const { data: recipe } = useQuery(["recipe", recipe_id], () =>
    getRecipe(recipe_id)
  );
  const { updateRecipeLikeMutation, cancelRecipeLikeMutation } =
    useRecipeMutation();
  const { recognition, speechToText, isCommanding } = useVideoControlBySpeech(
    videoElement,
    likeButtonElement.current,
    dislikeButtonElement.current,
    toRankingsButtonElement.current,
    toRecipesButtonElement.current,
    toMyNoteButtonElement.current,
    toNoteListButtonElement.current,
    toTipListButtonElement.current
  );

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
  }, [recipe, loginUserInfo.email]);

  useEffect(() => {
    if (isCommanding) {
      setScript(speechToText);
    }
  }, [speechToText]);

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
          <StyledLinkButton to="/recipes" ref={toRecipesButtonElement}>
            레시피 페이지
          </StyledLinkButton>
          <StyledLinkButton to="/rankings" ref={toRankingsButtonElement}>
            랭킹 페이지
          </StyledLinkButton>
          <button
            name="like"
            onClick={clickLikeHandler}
            ref={likeButtonElement}
          >
            👍 {recipe?.liked.length}
          </button>
          <button
            name="dislike"
            onClick={clickLikeHandler}
            ref={dislikeButtonElement}
          >
            👎 {recipe?.disliked.length}
          </button>
          {isCommanding && (
            <div>
              <RecordingStatus className="blob red"></RecordingStatus>
            </div>
          )}
        </NavigationPage>
        <VideoPlayer>
          <YouTube
            onReady={handleVideo}
            id="youtube"
            opts={videoOptions}
            onStateChange={checkVideoState}
          />
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
                ref={toNoteListButtonElement}
              >
                노트
              </Button>
              <Button
                type="button"
                name="tips"
                onClick={handleBoardNavigation}
                ref={toTipListButtonElement}
              >
                꿀팁
              </Button>
            </ButtonLeft>
            <ButtonRight>
              {currentBoardPage !== "myNote" && (
                <Button
                  type="button"
                  name="myNote"
                  onClick={handleBoardNavigation}
                  ref={toMyNoteButtonElement}
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
              video={videoElement}
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

const TypewriterContainer = styled.div`
  position: absolute;
  height: 20%;
  width: 55%;
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

  &:hover {
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

  &:hover {
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
