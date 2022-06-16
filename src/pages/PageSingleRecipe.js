import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import YouTube from "react-youtube";
import Notes from "./PageSingleRecipe.Notes";
import Tips from "./PageSingleRecipe.Tips";
import Note from "./PageSingleRecipe.MyNote";
import ModalGuideSinglePage from "../components/ModalGuideSinglePage";
import { useQuery } from "react-query";
import { getRecipe } from "../api/recipeApi";
import { videoOptions } from "../config/youtubeConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio } from "@fortawesome/free-regular-svg-icons";
import useRecipeControlBySpeech from "../hooks/recipe-speech-control";
import TypeWriter from "typewriter-effect";

function PageSingleRecipe({ loginUserInfo, toggleTheme, theme }) {
  const [currentBoardPage, setBoardPage] = useState("notes");
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [myNoteId, setMyNoteId] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

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
  const { recognition, speechToText, isCommanding } = useRecipeControlBySpeech(
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

  const pageTitle = recipe ? recipe.belongsToMenu.name : "Recipe Detail";

  useLayoutEffect(() => {
    document.title = `${pageTitle} 레시 | 모조리`;
  }, [pageTitle]);

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

  const clickVoiceControlGuide = () => {
    setModalOpen(!isModalOpen);
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
      {isModalOpen && <ModalGuideSinglePage />}
      <LeftSection>
        <NavigationPage>
          <StyledLinkButton
            tabIndex="0"
            to="/recipes"
            ref={toRecipesButtonElement}
          >
            레시피 페이지
          </StyledLinkButton>
          <StyledLinkButton
            tabIndex="0"
            to="/rankings"
            ref={toRankingsButtonElement}
          >
            랭킹 페이지
          </StyledLinkButton>
          <ViewMode onClick={toggleTheme}>
            {theme === "light" && "Dark Mode ☾"}
            {theme === "dark" && "Light Mode ☀"}
          </ViewMode>
          <StyledFontAwesomeIcon
            icon={faFileAudio}
            onClick={clickVoiceControlGuide}
          />
          {isCommanding && (
            <RecodingBox>
              <RecordingStatus className="blob red"></RecordingStatus>
            </RecodingBox>
          )}
        </NavigationPage>
        <VideoPlayer tabIndex="1">
          <YouTube
            tabIndex="1"
            videoId={recipe?.youtubeUrl.split("v=")[1].split("&")[0]}
            onReady={handleVideo}
            id="youtube"
            opts={videoOptions}
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
                tabIndex="0"
                type="button"
                name="notes"
                onClick={handleBoardNavigation}
                ref={toNoteListButtonElement}
              >
                노트
              </Button>
              <Button
                tabIndex="0"
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
                  tabIndex="0"
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
  background-color: var(--primary-color);
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
  color: var(--button-font-color);
  display: flex;
  justify-content: space-between;
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

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  margin-right: 5px;

  cursor: pointer;
`;

const TypewriterContainer = styled.div`
  position: absolute;
  height: auto;
  width: 55%;
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
  background-color: var(--secondary-color);
  font-weight: bold;
  margin-right: 5px;
  padding: 2px;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 2px solid var(--line-color);
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
  color: var(--button-font-color);
  line-height: 40px;
  background-color: var(--secondary-color);
  font-weight: bold;
  margin-right: 10px;
  padding: 2px;

  &:hover,
  &:focus {
    border: 2px solid var(--line-color);
    padding: 2px;
  }
`;

const ViewMode = styled.button`
  width: 120px;
  margin-right: 10px;
  border-radius: 10px;
  height: 40px;
  font-size: medium;
  background-color: var(--font-color);
  color: var(--primary-color);
  border: none;

  &:hover {
    border: 2px solid var(--primary-color);
  }
`;
