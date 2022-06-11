import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getUser } from "../api/authApi";
import { getNotesByUserId } from "../api/noteApi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeCard from "../components/Card.Recipe";

function PageMyRecipes({ loginUserInfo, handleLogin }) {
  const [notesData, setNotesData] = useState(null);
  const { email } = loginUserInfo;
  console.log("notesData", notesData);

  useEffect(() => {
    document.title = "MyRecipes";
  }, []);

  useEffect(() => {
    async function getMyNotesData() {
      const responseUserData = await getUser(email);
      const userId = responseUserData.data._id;
      const responseNotesData = await getNotesByUserId(userId);
      setNotesData(responseNotesData);
    }

    getMyNotesData();
  }, [email]);

  //업데이트 날짜: notesData[i].updatedAt
  //메뉴명 : notesData[i].relatedRecipe.belongsToMenu.name
  //thumbnailUrl:  notesData[i].thumbnailUrl

  const NoteCard = ({ noteData }) => {
    const menuName = noteData.relatedRecipe.belongsToMenu.name;
    const {
      thumbnailUrl: videoThumbnail,
      liked,
      disliked,
    } = noteData.relatedRecipe;
    const recipeId = noteData.relatedRecipe._id;

    return (
      <Fragment>
        <StyledLink to={`/recipes/${recipeId}`}>
          <StyledLinkImg src={videoThumbnail} alt="recipe-thumbnail-image" />
          <StyledLinkInfo>
            <MenuName>{menuName}</MenuName>
            <RecipePreference>
              <div>👍 {liked.length}</div>
              <div>👎 {disliked.length}</div>
            </RecipePreference>
          </StyledLinkInfo>
        </StyledLink>
      </Fragment>
    );
  };

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        {notesData &&
          notesData.map((noteData) => (
            <NoteCard key={`notes-${noteData._id}`} noteData={noteData} />
          ))}
      </Main>
      <Footer />
    </Container>
  );
}

export default PageMyRecipes;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  height: 100%;
  overflow: auto;
  padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 150px;
  gap: 10px;
  margin: 10px;
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;

  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border: 2px solid black;
    padding: 2px;
    font-weight: bolder;
  }
`;

const StyledLinkImg = styled.img`
  width: 100%;
  height: 75%;
  border-radius: 10px 10px 0px 0px;
  background-color: gold;
`;

const StyledLinkInfo = styled.div`
  height: 25%;
  width: 100%;
  min-height: 20px;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  align-items: center;
`;

const MenuName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: medium;
`;

const RecipePreference = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  width: 50%;

  div {
    margin: 0px 5px;
  }
`;
