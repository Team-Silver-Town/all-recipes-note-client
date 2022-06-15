import { Fragment, useState } from "react";
import GlobalStyles from "../config/GlobalStyles";
import DefaultRoutes from "../routes/Routes";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();

  const localStorageInfo = JSON.parse(
    localStorage.getItem("allRecipesNoteLoginInfo")
  );
  const [loginUserInfo, setLoginUserInfo] = useState(localStorageInfo);
  const handleLogin = (input) => {
    setLoginUserInfo(input);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <GlobalStyles />
        <DefaultRoutes
          loginUserInfo={loginUserInfo}
          handleLogin={handleLogin}
        />
      </Fragment>
    </QueryClientProvider>
  );
}

export default App;
