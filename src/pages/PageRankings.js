import { useEffect, useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";

function PageRankings({ loginUserInfo, handleLogin }) {
  useEffect(() => {
    document.title = "Rankings";
  }, []);

  const exampleRecipes = [
    "봉골레",
    "비빔밥",
    "봉골레",
    "비빔밥",
    "봉골레",
    "비빔밥",
    "봉골레",
    "비빔밥",
    "봉골레",
    "비빔밥",
  ];

  const RankItemList = (props) => {
    const { menus } = props;

    return menus.map((menu, index) => (
      <RankItem id={`${menu}${index}`}>
        <RankNumber>{index + 1}위</RankNumber>
        <RankContent>{menu}</RankContent>
      </RankItem>
    ));
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
            <h2>베스트 노트 Top 10</h2>
          </RankingList>
          <RankingList>
            <h2>베스트 꿀팁 Top 10</h2>
          </RankingList>
        </Navigation>
        <RankingSection>
          <RankTable>
            <RankItemList menus={exampleRecipes} />
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

  &:hover {
    background-color: white;
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
  align-items: center;
`;
