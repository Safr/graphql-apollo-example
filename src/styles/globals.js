import { createGlobalStyle } from 'styled-components';
// EXPORTED STYLES
export const GlobalStyle = createGlobalStyle`
@import 'https://fonts.googleapis.com/css?family=Open+Sans:300, 400';

body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  background: rgba(0, 0, 0, 0.05);
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
`;