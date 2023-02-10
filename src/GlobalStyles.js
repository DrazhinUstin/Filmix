import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    :root {
        --clr-black: #000;
        --clr-light-black: #161515;
        --clr-white: #fff;
        --clr-rgb-white: 255, 255, 255;
        --clr-gray: #d3d3d3;
        --clr-green: #6bc10f;
        --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        --spacing: 0.1rem;
        --max-content-width: 1200px;
        --navbar-height: 5rem;
        --radius: 0.25rem;
        --trans-ease: all 0.4s ease;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        background-color: var(--clr-black);
        color: var(--clr-white);
        font-family: var(--font);
        font-size: 1rem;
        line-height: 1.5;
        overflow-wrap: anywhere;
    }

    h1,
    h2,
    h3,
    h4 {
        text-transform: capitalize;
        letter-spacing: var(--spacing);
    }

    h1 {
        font-size: 2rem;
        line-height: 1.25;
    }

    h2 {
        font-size: 1.5rem;
        line-height: 1.25;
    }

    h3 {
        font-size: 1.25rem;
    }

    h4 {
        font-size: 1rem;
    }

    li {
        list-style-type: none;
    }

    a {
        text-decoration: none;
    }

    img,
    svg {
        display: block;
    }

    button {
        cursor: pointer;
        &:disabled {
            cursor: not-allowed;
        }
    }

    .section-center {
        max-width: var(--max-content-width);
        width: 90vw;
        margin: 0 auto;
    }

    .section {
        margin: 4rem auto;
    }

    .react-horizontal-scrolling-menu--scroll-container {
        gap: 1rem;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export default GlobalStyle;

export const breakpoints = {
    lg: '(max-width: 1200px)',
    md: '(max-width: 1024px)',
    sm: '(max-width: 768px)',
    xsm: '(max-width: 425px)',
};
