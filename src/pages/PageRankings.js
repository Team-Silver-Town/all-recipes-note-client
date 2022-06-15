import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { getTop5Menus } from "../api/foodApi";

import {
  clickNotesTop10Handler,
  clickTipsTop10Handler,
  clickMenuTop10Handler,
  clickLatestTop10RecipesHandler,
  clickTop10Recipes,
  clickTop10MenusByCategory,
} from "./PageRankings.handler";

import { getLatestTop10Recipes } from "../api/recipeApi";

import Header from "../components/Header";
import Loading from "../components/Loading";
import {
  RankItemListWithNoteOrTip,
  RankItemListWithMenu,
  RankItemListWithRecipe,
  RankItemListWithCategory,
} from "./PageRankings.component";

function PageRankings({ loginUserInfo, handleLogin }) {
  const [currentRankList, setCurrentRankList] = useState([]);
  const [currentRankType, setCurrentRankType] = useState("");
  const [currentRankTitle, setCurrentRankTitle] =
    useState("최신 레시피 Top 10");
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

  useEffect(() => {
    async function fetchLatestTop10Menus() {
      const data = await getLatestTop10Recipes();
      setCurrentRankList(data);
      setCurrentRankType("recipe");
    }

    fetchLatestTop10Menus();
  }, []);

  const handleSetCurrentRankType = (type) => setCurrentRankType(type);
  const handleSetCurrentRankList = (list) => setCurrentRankList(list);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <Navigation>
          <RankingList>
            <h2>레시피 / 메뉴 랭킹</h2>
            <ul>
              <li
                tabIndex="0"
                onClick={() => {
                  clickLatestTop10RecipesHandler(
                    handleSetCurrentRankType,
                    handleSetCurrentRankList
                  );
                  setCurrentRankTitle("최신 레시피 Top 10");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    clickLatestTop10RecipesHandler(
                      handleSetCurrentRankType,
                      handleSetCurrentRankList
                    );
                    setCurrentRankTitle("최신 레시피 Top 10");
                  }
                }}
              >
                최신 레시피 Top 10
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  clickTop10Recipes(
                    handleSetCurrentRankType,
                    handleSetCurrentRankList
                  );
                  setCurrentRankTitle("전체 레시피 Top 10");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    clickTop10Recipes(
                      handleSetCurrentRankType,
                      handleSetCurrentRankList
                    );
                    setCurrentRankTitle("전체 레시피 Top 10");
                  }
                }}
              >
                전체 레시피 Top 10
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  clickTop10MenusByCategory(
                    "한식",
                    handleSetCurrentRankType,
                    handleSetCurrentRankList
                  );
                  setCurrentRankTitle("한식 메뉴 Top 10");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    clickTop10MenusByCategory(
                      "한식",
                      handleSetCurrentRankType,
                      handleSetCurrentRankList
                    );
                    setCurrentRankTitle("한식 메뉴 Top 10");
                  }
                }}
              >
                한식 메뉴 Top 10
              </li>
              <li
                tabIndex="0"
                onClick={() => {
                  clickTop10MenusByCategory(
                    "양식",
                    handleSetCurrentRankType,
                    handleSetCurrentRankList
                  );
                  setCurrentRankTitle("양식 메뉴 Top 10");
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    clickTop10MenusByCategory(
                      "양식",
                      handleSetCurrentRankType,
                      handleSetCurrentRankList
                    );
                    setCurrentRankTitle("양식 메뉴 Top 10");
                  }
                }}
              >
                양식 메뉴 Top 10
              </li>
            </ul>
          </RankingList>
          <RankingList>
            <h2>인기 메뉴 레시피 Top10</h2>
            <ul>
              {curretnTop5Menus.map((menu, index) => {
                return (
                  <li
                    key={menu._id}
                    tabIndex="0"
                    onClick={() => {
                      clickMenuTop10Handler(
                        menu,
                        setCurrentMenu,
                        handleSetCurrentRankType,
                        handleSetCurrentRankList
                      );
                      setCurrentRankTitle(`${menu.name} Top 10`);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        clickMenuTop10Handler(
                          menu,
                          setCurrentMenu,
                          handleSetCurrentRankType,
                          handleSetCurrentRankList
                        );
                        setCurrentRankTitle(`${menu.name} Top 10`);
                      }
                    }}
                  >
                    {menu.name} Top 10
                  </li>
                );
              })}
            </ul>
          </RankingList>
          <RankingList>
            <h2
              tabIndex="0"
              onClick={() => {
                clickNotesTop10Handler(
                  handleSetCurrentRankType,
                  handleSetCurrentRankList
                );
                setCurrentRankTitle("베스트 노트 Top 10");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  clickNotesTop10Handler(
                    handleSetCurrentRankType,
                    handleSetCurrentRankList
                  );
                  setCurrentRankTitle("베스트 노트 Top 10");
                }
              }}
            >
              베스트 노트 Top 10
            </h2>
          </RankingList>
          <RankingList>
            <h2
              tabIndex="0"
              onClick={() => {
                clickTipsTop10Handler(
                  handleSetCurrentRankType,
                  handleSetCurrentRankList
                );
                setCurrentRankTitle("베스트 꿀팁 Top 10");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  clickTipsTop10Handler(
                    handleSetCurrentRankType,
                    handleSetCurrentRankList
                  );
                  setCurrentRankTitle("베스트 꿀팁 Top 10");
                }
              }}
            >
              베스트 꿀팁 Top 10
            </h2>
          </RankingList>
        </Navigation>
        <RankingSection>
          <RankTable>
            {!currentRankType && <Loading />}
            {currentRankType &&
              (currentRankType === "note" || currentRankType === "tip") && (
                <Fragment>
                  <RankTitle>{currentRankTitle}</RankTitle>
                  <RankItemListWithNoteOrTip
                    currentRankList={currentRankList}
                  />
                </Fragment>
              )}
            {currentRankType && currentRankType === "menu" && (
              <Fragment>
                <RankTitle>{currentRankTitle}</RankTitle>
                <RankItemListWithMenu
                  currentRankList={currentRankList}
                  currentMenu={currentMenu}
                />
              </Fragment>
            )}
            {currentRankType && currentRankType === "recipe" && (
              <Fragment>
                <RankTitle>{currentRankTitle}</RankTitle>
                <RankItemListWithRecipe currentRankList={currentRankList} />
              </Fragment>
            )}
            {currentRankType && currentRankType === "category" && (
              <Fragment>
                <RankTitle>{currentRankTitle}</RankTitle>
                <RankItemListWithCategory currentRankList={currentRankList} />
              </Fragment>
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
  border-right: 2px solid black;
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
  height: 95%;
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const RankTitle = styled.h2`
  width: 90%;
  height: 10%;
  font-size: x-large;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding-left: 30px;
`;
