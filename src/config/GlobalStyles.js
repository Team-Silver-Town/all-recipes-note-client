import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
    ${reset}
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
        width: 100%;
        height: 100%;
    }

    #root {
      width: 100%;
      height: 100%;
    }
`;

export default GlobalStyles;
