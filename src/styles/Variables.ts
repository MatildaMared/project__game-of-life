import { createGlobalStyle } from "styled-components";

const Variables = createGlobalStyle`
    :root {
        --font-primary: 'Open Sans', sans-serif;
        --font-secondary: 'Silkscreen', cursive;

        --color-background: hsla(277, 6%, 11%, 1.0);
        --color-text: hsla(277, 6%, 85%, 1.0);

        --color-gray-900: hsla(280, 4%, 13%, 1.0);
        --color-gray-800: hsla(277, 7%, 16%, 1.0);
        --color-gray-700: hsla(277, 7%, 18%, 1.0);
        --color-gray-600: hsla(277, 7%, 23%, 1.0);
        --color-gray-500: hsla(277, 7%, 30%, 1.0);
        --color-gray-400: hsla(277, 7%, 40%, 1.0);
        --color-gray-300: hsla(277, 7%, 50%, 1.0);
        --color-gray-200: hsla(277, 7%, 60%, 1.0);
        --color-gray-100: hsla(277, 7%, 70%, 1.0);

        --color-pink-dark: hsla(334, 62%, 52%, 1.0);
        --color-pink: hsla(334, 80%, 65%, .8);
        --color-pink-light: hsla(334, 100%, 77%, .8);
    }
`;

export default Variables;
