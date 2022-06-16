import { Fragment, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "../config/GlobalStyles";
import DefaultRoutes from "../routes/Routes";

import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  const [theme, setTheme] = useState("light");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    console.log("hi");
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const localStorageInfo = JSON.parse(
    localStorage.getItem("allRecipesNoteLoginInfo")
  );
  const [loginUserInfo, setLoginUserInfo] = useState(localStorageInfo);
  const handleLogin = (input) => {
    setLoginUserInfo(input);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Fragment>
          <GlobalStyles />
          <DefaultRoutes
            toggleTheme={toggleTheme}
            theme={theme}
            loginUserInfo={loginUserInfo}
            handleLogin={handleLogin}
          />
        </Fragment>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
