import { useEffect, useState } from "react";
import { createRecipe } from "../api/recipeApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

import { getCategories } from "../api/foodApi";
import SearchInput from "../components/Input.Search";
import YouTube from "react-youtube";
import { useYoutube } from "../hooks/youtube-hook";
import { useNavigate } from "react-router";

import Header from "../components/Header";
import Footer from "../components/Footer";

const PageNewRecipe = ({ loginUserInfo, handleLogin }) => {
  const { data: categories } = useQuery("categories", getCategories);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [menuName, setMenuName] = useState("");

  const {
    youtubeOptions,
    isValidUrl,
    videoId,
    youtubeUrl,
    thumbnailUrl,
    urlHandler,
  } = useYoutube();
  const createRecipeMutation = useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries("recipes");
    },
  });
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

    createRecipeMutation.mutate(recipe);
    navigate("/recipes");
  };

  useEffect(() => {
    document.title = "새로운 레시피";
  }, []);

  return (
    <Container>
      <Header loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
      <Main>
        <InputForm>
          <InputLinkTitle>1. 링크 입력하기</InputLinkTitle>
          <InputLinkDetail>
            <label>URL : </label>
            <input id="youtubeUrl" onChange={urlHandler} />
          </InputLinkDetail>
          <InputCategory>
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
          </InputCategory>
          <InputMenu>
            <label>3. 메뉴명 입력하기</label>
            <SearchInput
              updateHanlder={setMenuName}
              searchData={category.menus}
            />
          </InputMenu>

          <SubmitButton
            onClick={createRecipeHandler}
            disabled={!isValidUrl || !Object.keys(category).length || !menuName}
          >
            제출하기
          </SubmitButton>
        </InputForm>
        <Preview>
          {isValidUrl && (
            <>
              <YouTube videoId={videoId} id="youtube" opts={youtubeOptions} />
              <div>미리보기 화면입니다.</div>
            </>
          )}
        </Preview>
      </Main>
      <Footer />
    </Container>
  );
};

export default PageNewRecipe;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  padding-top: 80px;
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
`;

const InputForm = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-top: 20px;
  background-color: var(--secondary-color);

  div {
    font-size: large;
    font-weight: bold;
  }
`;

const InputLinkTitle = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

const InputLinkDetail = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  input {
    width: 80%;
    height: 30px;
    border: none;
    outline: none;
    padding-left: 10px;
  }
`;

const InputCategory = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  select {
    height: 30px;
    width: 100px;
    padding-left: 10px;
  }
`;

const InputMenu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  label {
    display: block;
    margin-right: 10px;
  }

  input {
    display: block;
    height: 30px;
    padding-left: 10px;
    border: none;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 120px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  cursor: pointer;
`;

const Preview = styled.div`
  width: 50%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--secondary-color);

  div {
    font-size: larger;
  }
`;
