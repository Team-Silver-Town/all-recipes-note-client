import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import { getUser } from "../api/authApi";
import { getNotesByUserId } from "../api/noteApi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NoteCard from "./PageMyRecipes.NoteCard";
import Loading from "../components/Loading";

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

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      {!notesData && (
        <Main>
          <Loading />
        </Main>
      )}
      {notesData && (
        <GridMain>
          {notesData.map((noteData) => (
            <NoteCard key={`notes-${noteData._id}`} noteData={noteData} />
          ))}
        </GridMain>
      )}

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

const GridMain = styled.main`
  height: 100%;
  overflow: auto;
  padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 150px;
  gap: 10px;
  margin: 10px;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
