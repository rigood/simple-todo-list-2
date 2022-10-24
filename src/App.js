/* Routing */
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* State */
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./recoil";

/* Theme, Style */
import { ThemeProvider, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { dark, light } from "./theme";

/* Components */
import Layout from "./layout/Layout";
import CategoryContainer from "./containers/CategoryContainer";
import HomeContainer from "./containers/HomeContainer";
import TodoContainer from "./containers/TodoContainer";

const GlobalStyle = createGlobalStyle`
${reset};
*{
    box-sizing: border-box;
  }
@font-face {
    font-family: 'MICEGothic Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-01@1.0/MICEGothic Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}
body{
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-family: 'MICEGothic Bold';
}
input,
button {
  all: unset;
}
input::placeholder {
    color: inherit;
}
li{
  list-style: none;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={isDark ? dark : light}>
          <GlobalStyle />
          <Layout>
            <CategoryContainer />
            <Routes>
              <Route path="/" element={<HomeContainer />}></Route>
              <Route path="/:id" element={<TodoContainer />}></Route>
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
