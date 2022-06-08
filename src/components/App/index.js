import { Fragment, useEffect, useState } from "react";
import GlobalStyles from "../../config/GlobalStyles";
import DefaultRoutes from "../../routes/Routes";

function App() {
  const localStorageInfo = JSON.parse(
    localStorage.getItem("allRecipesNoteLoginInfo")
  );
  const [loginUserInfo, setLoginUserInfo] = useState(localStorageInfo);
  const handleLogin = (input) => {
    setLoginUserInfo(input);
  };

  useEffect(() => {
    console.log(localStorageInfo);
  }, []);

  return (
    <Fragment>
      <GlobalStyles />
      <DefaultRoutes loginUserInfo={loginUserInfo} handleLogin={handleLogin} />
    </Fragment>
  );
}

export default App;
