import { createGlobalStyle } from "styled-components";

const Variables = createGlobalStyle`
    :root {
        --font-primary: 'Open Sans', sans-serif;
        --font-secondary: 'Silkscreen', cursive;

        --color-background: hsla(277, 6%, 12%, 1.0);
        --color-text: hsla(277, 6%, 85%, 1.0);
        --color-gray-800: hsla(277, 7%, 18%, 1.0);
    }
`;

export default Variables;
