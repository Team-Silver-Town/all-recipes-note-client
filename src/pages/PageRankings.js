import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { getTopTenNotes } from "../api/noteApi";
import { getTopTenTips } from "../api/tipApi";

import Header from "../components/Header";

function PageRankings({ loginUserInfo, handleLogin }) {
  const [currentRankList, setCurrentRankList] = useState([]);
  const [currentRankType, setCurrentRnakType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Rankings";
  }, []);

  const rankListNaivigateHandler = (id) => {
    if (currentRankType === "note") {
      console.log("navigate note");
      console.log(id);
      navigate(`/recipes/${id}`);
    }

    if (currentRankType === "tip") {
      console.log("navigate tip");
      console.log(id);
      navigate(`/recipes/${id}`);
    }
  };

  const RankItemList = (props) => {
    const { currentRankList } = props;

    return currentRankList.map((item, index) => {
      const id = item.relatedRecipe._id;
      const { nickname } = item.creator;
      const { name: menuName } = item.relatedRecipe.belongsToMenu;
      const content = item.content;

      return (
        <RankItem
          key={`${item}${index}`}
          onClick={() => rankListNaivigateHandler(id)}
        >
          <RankNumber>{index + 1}위</RankNumber>
          <RankContent>
            <div>메뉴명 : {menuName}</div>
            <div>작성자 : {nickname}</div>
            {content && <div>내용 : {content}</div>}
          </RankContent>
        </RankItem>
      );
    });
  };

  const notesTop10ClickHandler = async () => {
    try {
      const resultData = await getTopTenNotes();

      setCurrentRankList(resultData);
      setCurrentRnakType("note");

      console.log("NotesTop10");
      console.log(currentRankList);
    } catch (error) {
      console.log(error);
    }
  };

  const tipsTop10ClickHandler = async () => {
    try {
      const resultData = await getTopTenTips();

      setCurrentRankList(resultData);
      setCurrentRnakType("tip");

      console.log("TipsTop10");
      console.log(resultData);
    } catch (error) {}
  };

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <Navigation>
          <RankingList>
            <h2>레시피 랭킹</h2>
            <ul>
              <li>최신 Top 10</li>
              <li>좋아요 Top 10</li>
              <li>한식 Top 10</li>
              <li>중식 Top 10</li>
              <li>양식 Top 10</li>
            </ul>
          </RankingList>
          <RankingList>
            <h2>인기 메뉴 노트 Top10</h2>
            <ul>
              <li>봉골레 Top 10</li>
              <li>토마토 파스타 10</li>
              <li>된장찌개 Top 10</li>
              <li>김치찌개 Top 10</li>
              <li>제육 볶음 Top 10</li>
            </ul>
          </RankingList>
          <RankingList>
            <h2 onClick={notesTop10ClickHandler}>베스트 노트 Top 10</h2>
          </RankingList>
          <RankingList>
            <h2 onClick={tipsTop10ClickHandler}>베스트 꿀팁 Top 10</h2>
          </RankingList>
        </Navigation>
        <RankingSection>
          <RankTable>
            <RankItemList currentRankList={currentRankList} />
          </RankTable>
        </RankingSection>
      </Main>
    </Container>
  );
}

export default PageRankings;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-top: 80px;
  display: flex;
`;

const Navigation = styled.nav`
  height: 100%;
  width: 250px;
  border-right: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
`;

const RankingList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 10px;

  &:hover {
    background-color: white;
  }

  h2 {
    font-size: larger;
    font-weight: bold;
    padding: 10px 0px;
  }

  li {
    font-size: medium;
    margin-bottom: 10px;
    padding-left: 20px;
  }

  li:hover {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }

  &:nth-child(3):hover {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }

  &:nth-child(4):hover {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }
`;

const RankingSection = styled.section`
  width: 100%;
  display: flex;
`;

const RankTable = styled.div`
  width: 90%;
  height: 90%;
  margin: 30px;
  display: flex;
  flex-direction: column;
`;

const RankItem = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  cursor: pointer;
  border-bottom: 1px solid black;

  &:hover {
    background-color: white;
    border: 2px solid black;
  }
`;

const RankNumber = styled.div`
  height: 100%;
  width: 100px;
  font-size: large;
  font-weight: bold;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const RankContent = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
  align-items: center;

  div:nth-child(1) {
    width: 25%;
  }

  div:nth-child(2) {
    width: 25%;
  }

  div:nth-child(3) {
    width: 50%;
  }
`;
