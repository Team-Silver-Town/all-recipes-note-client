import { Fragment } from "react";
import GlobalStyles from "../../config/GlobalStyles";
import DefaultRoutes from "../../routes/Routes";

function App() {
  const localStorageInfo = localStorage.getItem("allRecipesNoteLoginInfo");
  const tokken = localStorage.getItem("allRecipesNoteTokken");

  return (
    <Fragment>
      <GlobalStyles />
      <DefaultRoutes />
    </Fragment>
  );
}

export default App;
