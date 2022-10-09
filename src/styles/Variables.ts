import { createGlobalStyle } from "styled-components";

const Variables = createGlobalStyle`
    :root {
        --font-primary: 'Open Sans', sans-serif;
        --font-secondary: 'Silkscreen', cursive;

        --color-background: hsla(277, 6%, 12%, 1.0);
        --color-text: hsla(277, 6%, 85%, 1.0);
        --color-gray-900: hsla(280, 4%, 13%, 1.0);
        --color-gray-800: hsla(277, 7%, 16%, 1.0);
        --color-gray-700: hsla(277, 7%, 18%, 1.0);

        --color-pink: hsla(327, 100%, 77%, .8);
    }
`;

export default Variables;
