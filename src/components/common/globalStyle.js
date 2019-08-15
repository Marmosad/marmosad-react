import {createGlobalStyle} from 'styled-components'
import './fonts/Kodchasan/Kodchasan-Light.ttf';

export const GlobalStyle = createGlobalStyle`
  * {
    @font-face {
      font-family: "Kod";
      src: url(./fonts/Kodchasan/Kodchasan-Light.ttf)
    }
    font-family: 'Kod', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
  }
`;


// bg: "#ff5b5b",
// c: "#3b3e47"
