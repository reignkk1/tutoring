import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`

${reset}


// 여기에 스타일을 지정하시면 전역으로 적용 됩니다.

a {
    text-decoration:none;
}

button{
    background-color: inherit;
    padding: 0;
    border: none;
    outline: none;
    cursor: pointer;
}
`;

export default GlobalStyles;
