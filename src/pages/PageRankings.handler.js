import { getTopTenNotes } from "../api/noteApi";
import { getTopTenTips } from "../api/tipApi";
import { getMenu } from "../api/foodApi";
import { sortTop10RecipesInMenu } from "../utils/sortHelper";
import { getLatestTop10Recipes, getTop10Recipes } from "../api/recipeApi";

export const clickNotesTop10Handler = async (
  setCurrentRnakType,
  setCurrentRankList
) => {
  try {
    const resultData = await getTopTenNotes();

    setCurrentRnakType("note");
    setCurrentRankList(resultData);
  } catch (error) {
    console.log(error);
  }
};

export const clickTipsTop10Handler = async (
  setCurrentRnakType,
  setCurrentRankList
) => {
  try {
    const resultData = await getTopTenTips();

    setCurrentRnakType("tip");
    setCurrentRankList(resultData);
  } catch (error) {}
};

export const clickMenuTop10Handler = async (
  menu,
  setCurrentMenu,
  setCurrentRnakType,
  setCurrentRankList
) => {
  try {
    const { name: menuName, _id: menuId } = menu;
    const menus = await getMenu(menuId);
    const sortedData = sortTop10RecipesInMenu(menus);

    setCurrentMenu(menuName);
    setCurrentRnakType("menu");
    setCurrentRankList(sortedData);
  } catch (error) {
    console.log(error);
  }
};

export const clickLatestTop10RecipesHandler = async (
  setCurrentRnakType,
  setCurrentRankList
) => {
  try {
    const resultData = await getLatestTop10Recipes();

    console.log("최신 top10");

    setCurrentRnakType("recipe");
    setCurrentRankList(resultData);
  } catch (error) {}
};

export const clickTop10Recipes = async (
  setCurrentRnakType,
  setCurrentRankList
) => {
  try {
    const resultData = await getTop10Recipes();

    console.log("전체 top10");

    setCurrentRnakType("recipe");
    setCurrentRankList(resultData);
  } catch (error) {}
};
