import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTop5Menus } from "../api/foodApi";

import {
  clickNotesTop10Handler,
  clickTipsTop10Handler,
  clickMenuTop10Handler,
} from "./PageRankings.handler";

import Header from "../components/Header";
import {
  RankItemListWithNoteOrTip,
  RankItemListWithMenu,
} from "./PageRankings.component";

function PageRankings({ loginUserInfo, handleLogin }) {
  const [currentRankList, setCurrentRankList] = useState([]);
  const [currentRankType, setCurrentRnakType] = useState("");
  const [curretnTop5Menus, setCurrentTop5Menus] = useState([]);
  const [currentMenu, setCurrentMenu] = useState("");

  useEffect(() => {
    document.title = "Rankings";
  }, []);

  useEffect(() => {
    async function fetchTop5Menus() {
      const data = await getTop5Menus();
      setCurrentTop5Menus(data);
    }

    fetchTop5Menus();
  }, []);

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
            <h2>인기 메뉴 레시피 Top10</h2>
            <ul>
              {curretnTop5Menus.map((menu, index) => {
                return (
                  <li
                    key={menu._id}
                    onClick={() =>
                      clickMenuTop10Handler(
                        menu,
                        setCurrentMenu,
                        setCurrentRnakType,
                        setCurrentRankList
                      )
                    }
                  >
                    {menu.name} Top 10
                  </li>
                );
              })}
            </ul>
          </RankingList>
          <RankingList>
            <h2
              onClick={() =>
                clickNotesTop10Handler(setCurrentRnakType, setCurrentRankList)
              }
            >
              베스트 노트 Top 10
            </h2>
          </RankingList>
          <RankingList>
            <h2
              onClick={() =>
                clickTipsTop10Handler(setCurrentRnakType, setCurrentRankList)
              }
            >
              베스트 꿀팁 Top 10
            </h2>
          </RankingList>
        </Navigation>
        <RankingSection>
          <RankTable>
            {(currentRankType === "note" || currentRankType === "tip") && (
              <RankItemListWithNoteOrTip
                currentRankList={currentRankList}
                currentRankType={currentRankType}
              />
            )}
            {currentRankType === "menu" && (
              <RankItemListWithMenu
                currentRankList={currentRankList}
                currentRankType={currentRankType}
                currentMenu={currentMenu}
              />
            )}
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
  width: 220px;
  min-width: 220px;
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
