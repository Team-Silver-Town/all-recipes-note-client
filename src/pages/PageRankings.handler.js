import { getTopTenNotes } from "../api/noteApi";
import { getTopTenTips } from "../api/tipApi";
import { getMenu, getTop5Menus } from "../api/foodApi";
import { sortTop10RecipesInMenu } from "../utils/sortHelper";

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
    console.log("MenuTop10");
    console.log(sortedData);
  } catch (error) {
    console.log(error);
  }
};
