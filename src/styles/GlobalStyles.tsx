import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`

${reset}


// 여기에 스타일을 지정하시면 전역으로 적용 됩니다.

.ql-editor{
    font-family: regular;
    background-color: #ffffff;
    font-size:1rem;

    @media (max-width: 650px) {
      font-size: 0.8rem;
  }
}
.ql-editor strong{
     font-weight:bold;

 }
 .quill{
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    font-family:regular;
    color: #0e1620;
 }


* {
    box-sizing:border-box;
    &::-webkit-scrollbar {
     width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
     background-color: #7d7d7d;
     border-radius: 0.5rem;
    }
    &::-webkit-scrollbar-track {
     background-color: #4f504f;
     border-radius: 0.5rem;
    }

    
}

@font-face {
    font-family: 'thin';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil1Thin.woff2') format('woff2');
    font-weight: 100;
    font-style: normal;
}
@font-face {
    font-family: 'light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil2Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
}
@font-face {
    font-family: 'regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil3Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'medium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil4Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
}
@font-face {
    font-family: 'bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

body{
    font-family: light;
    font-size: 16px;
    background-color: #0e1620;
    color: #ffffff;

    @media (max-width: 650px) {
        font-size: 14px;
    }
    

}

ul, li{
    list-style:none;
}

a {
    color: inherit;
    text-decoration:none;
}

button{
    font-family: regular;
    padding: 0;
    border: none;
    outline: none;
    cursor: pointer;

    @media (max-width: 650px) {
      font-size: 0.8rem;
  }
}

input{
    font-family: regular;
    font-size: 1rem;
    border: none;
    outline: none;

    line-height: 1.3;

    &::placeholder {
    font-family: regular;
    font-size: 1rem;
  }

  @media (max-width: 650px) {
      font-size: 0.8rem;

      &::placeholder {
        font-size: 0.8rem;
    }
  }
}

select{
    font-family: regular;
    font-size: 1rem;
    color: #0e1620; 
    border: none;
    outline: none;


    @media (max-width: 650px) {
      font-size: 0.8rem;
  }
  
}
`;

export default GlobalStyles;
