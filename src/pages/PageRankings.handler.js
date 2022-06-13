import { getTopTenNotes } from "../api/noteApi";
import { getTopTenTips } from "../api/tipApi";
import { getMenu } from "../api/foodApi";
import { sortTopRecipesInMenuByNumber } from "../utils/sortHelper";
import { getLatestTop10Recipes, getTop10Recipes } from "../api/recipeApi";
import { getCategoryByName } from "../api/foodApi";

export const clickNotesTop10Handler = async (
  handleSetCurrentRankType,
  handleSetCurrentRankList
) => {
  try {
    handleSetCurrentRankType("");

    const resultData = await getTopTenNotes();

    handleSetCurrentRankList(resultData);
    handleSetCurrentRankType("note");
  } catch (error) {
    console.log(error);
  }
};

export const clickTipsTop10Handler = async (
  handleSetCurrentRankType,
  handleSetCurrentRankList
) => {
  try {
    handleSetCurrentRankType("");

    const resultData = await getTopTenTips();

    handleSetCurrentRankList(resultData);
    handleSetCurrentRankType("tip");
  } catch (error) {}
};

export const clickMenuTop10Handler = async (
  menu,
  setCurrentMenu,
  handleSetCurrentRankType,
  handleSetCurrentRankList
) => {
  try {
    handleSetCurrentRankType("");

    const { name: menuName, _id: menuId } = menu;
    const menus = await getMenu(menuId);
    const sortedData = sortTopRecipesInMenuByNumber(menus, 10);

    setCurrentMenu(menuName);
    handleSetCurrentRankList(sortedData);
    handleSetCurrentRankType("menu");
  } catch (error) {
    console.log(error);
  }
};

export const clickLatestTop10RecipesHandler = async (
  handleSetCurrentRankType,
  handleSetCurrentRankList
) => {
  try {
    handleSetCurrentRankType("");

    const resultData = await getLatestTop10Recipes();

    console.log("최신 top10");

    handleSetCurrentRankList(resultData);
    handleSetCurrentRankType("recipe");
  } catch (error) {}
};

export const clickTop10Recipes = async (
  handleSetCurrentRankType,
  handleSetCurrentRankList
) => {
  try {
    handleSetCurrentRankType("");

    const resultData = await getTop10Recipes();

    console.log("전체 top10");

    handleSetCurrentRankList(resultData);
    handleSetCurrentRankType("recipe");
  } catch (error) {}
};

export const clickTop10MenusByCategory = async (
  category_name,
  handleSetCurrentRankType,
  handleSetCurrentRankList
) => {
  try {
    handleSetCurrentRankType("");
    const resultData = await getCategoryByName(category_name);

    handleSetCurrentRankList(resultData);
    handleSetCurrentRankType("category");
  } catch (error) {}
};
