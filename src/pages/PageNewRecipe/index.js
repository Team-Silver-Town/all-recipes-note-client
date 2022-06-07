import { useEffect, useState, Fragment } from "react";
import { createRecipe, getRecipes } from "../../api/recipeApi";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { getCategories, getMenus } from "../../api/foodApi";
import { getUser } from "../../api/authApi";
import Modal from "../../components/Modal/Modal";
import ModalPortal from "../../components/Modal/Portal";
import SearchInput from "../../components/Input/SearchInput";

const NewRecipe = () => {
  const { data: categories } = useQuery("categories", getCategories);
  const [category, setCategory] = useState("");
  const [menuName, setMenuName] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const queryClient = useQueryClient();

  const selectCategoryHanlder = (e) => {
    const categoryIndex = e.target.options.selectedIndex;

    if (categoryIndex) {
      setCategory(categories[categoryIndex - 1]);
    } else {
      setCategory({});
    }
  };

  const youtubeUrlHandler = (e) => {
    const url = e.target.value;
    const videoId = url.split("v=")[1];
    //validate url -> 분기 처리
    setYoutubeUrl(url);
    setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`);
  };

  const postRecipeHandler = () => {
    console.log("제출 됨");
    const recipe = {
      postedBy: "", //user email 이나 아이디 필요
      youtubeUrl,
      thumbnailUrl,
      menuName,
    };
  };

  useEffect(() => {
    document.title = "새로운 레시피";
  }, []);

  return (
    <div>
      <label>1. 링크 입력하기</label>
      <input id="youtubeUrl" onChange={youtubeUrlHandler} />

      {youtubeUrl !== "" && (
        <div>
          <label>2. 메뉴카테고리 선택하기</label>
          <select id="categories" onChange={selectCategoryHanlder}>
            <option>선택</option>
            {categories?.map((category) => {
              return <option key={category._id}>{category.name}</option>;
            })}
          </select>
        </div>
      )}
      {Object.keys(category).length > 0 && (
        <SearchInput updateHanlder={setMenuName} searchData={category.menus} />
      )}

      <button
        onClick={postRecipeHandler}
        disabled={
          youtubeUrl === "" ||
          Object.keys(category).length === 0 ||
          menuName === ""
        }
      >
        제출하기
      </button>

      {thumbnailUrl !== "" && <img src={thumbnailUrl} alt="thumbnail" />}
    </div>
  );
};

export default NewRecipe;
