import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const GlobalStyles = createGlobalStyle`
    ${reset}
    :root {
      --button-font-color: black;
      --button-color: white;
      --secondary-color: rgb(254, 177, 2);

      --primary-color:${({ theme }) => theme.primaryColor};
      --line-color: ${({ theme }) => theme.lineColor};
      --font-color: ${({ theme }) => theme.fontColor};
    }

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }

    html {
      width: 100%;
      height: 100%;
    }

    body {
        font-size: 14px;
        background-color: var(--primary-color);
        color: var(--font-color);
        width: 100%;
        height: 100%;
    }

    #root {
      width: 100%;
      height: 100%;
    }
`;

export const lightTheme = {
  primaryColor: "white",
  lineColor: "black",
  fontColor: "black",
};

export const darkTheme = {
  primaryColor: "black",
  lineColor: "rgb(254, 177, 2)",
  fontColor: "white",
};
