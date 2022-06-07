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

const NewRecipe = () => {
  const { data: categories } = useQuery("categories", getCategories);
  const [category, setCategory] = useState("");
  const [menuId, setMenuId] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const queryClient = useQueryClient();

  const selectCategoryHanlder = (e) => {
    const categoryIndex = e.target.options.selectedIndex;

    if (categoryIndex) {
      setCategory(categories[categoryIndex - 1]);
    } else {
      setCategory({});
    }
  };

  const selectMenuHandler = (e) => {
    const menuIndex = e.target.options.selectedIndex;

    if (menuIndex) {
      setMenuId(category.menus[menuIndex - 1]._id);
    } else {
      setMenuId("");
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
    const recipe = {
      postedBy: "",
      youtubeUrl,
      thumbnailUrl,
      belongsToMenu: menuId,
    };
  };

  // const createRecipeMutation = useMutation(createRecipe, {
  //   onSuccess: () => {
  //     // Invalidates cache and refresh
  //     queryClient.invalidateQueries("recipes");
  //   },
  // });

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    document.title = "새로운 레시피";
  }, []);

  return (
    <div>
      <label>1. 링크 입력하기</label>
      <input id="youtubeUrl" onChange={youtubeUrlHandler} />
      <label>2. 메뉴카테고리 선택하기</label>
      <select id="categories" onChange={selectCategoryHanlder}>
        <option>선택</option>
        {categories?.map((category) => {
          return <option key={category._id}>{category.name}</option>;
        })}
      </select>
      {Object.keys(category).length > 0 && (
        <div>
          <label>3. 메뉴 선택하기</label>
          <select id="menus" onChange={selectMenuHandler}>
            <option>선택</option>
            {category.menus?.map((menu) => {
              return <option key={menu._id}>{menu.name}</option>;
            })}
          </select>
        </div>
      )}
      <button onClick={handleModal}>직접입력</button>
      <button onClick={postRecipeHandler}>제출하기</button>
      {thumbnailUrl !== "" && <img src={thumbnailUrl} alt="thumbnail" />}
    </div>
  );
};

export default NewRecipe;
