import { useEffect, useState } from "react";
import { createRecipe } from "../../api/recipeApi";
import { useMutation, useQuery } from "react-query";
import { getCategories } from "../../api/foodApi";
import SearchInput from "../../components/Input/SearchInput";
import YouTube from "react-youtube";
import { useYoutube } from "../../hooks/youtube-hook";
import { useNavigate } from "react-router";

const PageNewRecipe = () => {
  const { data: categories } = useQuery("categories", getCategories);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [menuName, setMenuName] = useState("");
  const { opts, isValidUrl, videoId, youtubeUrl, thumbnailUrl, urlHandler } =
    useYoutube();
  const mutation = useMutation(createRecipe);
  const localStorageInfo = JSON.parse(
    localStorage.getItem("allRecipesNoteLoginInfo")
  );

  const selectCategoryHanlder = (e) => {
    const categoryIndex = e.target.options.selectedIndex;

    if (categoryIndex) {
      setCategory(categories[categoryIndex - 1]);
    } else {
      setCategory({});
    }
  };

  const createRecipeHandler = () => {
    const recipe = {
      email: localStorageInfo.email,
      youtubeUrl,
      thumbnailUrl,
      menuName,
      categoryName: category.name,
    };

    mutation.mutate(recipe);
    navigate("/");
  };

  useEffect(() => {
    document.title = "새로운 레시피";
  }, []);

  return (
    <div>
      <label>1. 링크 입력하기</label>
      <input id="youtubeUrl" onChange={urlHandler} />
      <div>
        <label>2. 메뉴카테고리 선택하기</label>
        <select
          id="categories"
          onChange={selectCategoryHanlder}
          disabled={!isValidUrl}
        >
          <option>선택</option>
          {categories?.map((category) => {
            return <option key={category._id}>{category.name}</option>;
          })}
        </select>
      </div>

      <label>3. 메뉴 선택하기</label>
      <SearchInput updateHanlder={setMenuName} searchData={category.menus} />

      {isValidUrl && <YouTube videoId={videoId} id="youtube" opts={opts} />}
      <button
        onClick={createRecipeHandler}
        disabled={!isValidUrl || !Object.keys(category).length || !menuName}
      >
        제출하기
      </button>
    </div>
  );
};

export default PageNewRecipe;
