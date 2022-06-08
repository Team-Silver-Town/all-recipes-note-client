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

const PageNewRecipe = () => {
  const { data: categories } = useQuery("categories", getCategories);
  const [category, setCategory] = useState("");
  const [menuName, setMenuName] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation(createRecipe);

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

    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    if (regex.test(url)) {
      console.log("VALID");
    } else {
      console.log("INVALID");
    }

    const videoId = url.split("v=")[1];
    //validate url -> 분기 처리
    setYoutubeUrl(url);
    setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`);
  };

  const postRecipeHandler = () => {
    const recipe = {
      postedBy: "sp@test.com", //user email 이나 아이디 필요
      youtubeUrl,
      thumbnailUrl,
      menuName,
    };

    mutation.mutate(recipe);
  };

  useEffect(() => {
    document.title = "새로운 레시피";
  }, []);

  return (
    <div>
      <label>1. 링크 입력하기</label>
      <input id="youtubeUrl" onChange={youtubeUrlHandler} />
      <div>
        <label>2. 메뉴카테고리 선택하기</label>
        <select
          id="categories"
          onChange={selectCategoryHanlder}
          disabled={youtubeUrl === ""}
        >
          <option>선택</option>
          {categories?.map((category) => {
            return <option key={category._id}>{category.name}</option>;
          })}
        </select>
      </div>

      <label>3. 메뉴 선택하기</label>
      <SearchInput updateHanlder={setMenuName} searchData={category.menus} />
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

export default PageNewRecipe;
