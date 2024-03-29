import { createGlobalStyle } from 'styled-components';

export const breakpoints = {
    lg: '(max-width: 1200px)',
    md: '(max-width: 1024px)',
    sm: '(max-width: 768px)',
    xsm: '(max-width: 425px)',
};

const GlobalStyle = createGlobalStyle`
    :root {
        --clr-black: #000;
        --clr-rgb-black: 0, 0, 0;
        --clr-light-black: #161515;
        --clr-white: #fff;
        --clr-rgb-white: 255, 255, 255;
        --clr-gray: #d3d3d3;
        --clr-green: #6bc10f;
        --clr-red: #ed0d3d;
        --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        --spacing: 0.1rem;
        --max-content-width: 1200px;
        --navbar-height: 5rem;
        --footer-height: 5rem;
        --fullscreen: calc(100vh - var(--navbar-height) - var(--footer-height));
        --radius: 0.25rem;
        --trans-ease: all 0.4s ease;
        --toastify-color-light: var(--clr-white);
        --toastify-color-error: var(--clr-red);
        --toastify-font-family: var(--font);
        --toastify-text-color-light: var(--clr-light-black);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
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

    input,
    select {
        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    } 

    button {
        cursor: pointer;
        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    .main {
        max-width: var(--max-content-width);
        min-height: calc(var(--fullscreen) - 8rem);
        width: 90vw;
        margin: 4rem auto;
    }

    .section-center {
        max-width: var(--max-content-width);
        width: 90vw;
        margin: 0 auto;
    }

    .section {
        margin: 4rem auto;
    }

    .section-sm {
        margin: 2rem 0;
    }

    .react-horizontal-scrolling-menu--scroll-container {
        gap: 1rem;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
        @media ${breakpoints.sm} {
            gap: 0.5rem;
        }
    }

    .message {
        text-align: center;
        text-decoration: underline;
        text-decoration-color: var(--clr-green);
        font-size: 1.2rem;
    }

    .form-message {
        text-align: center;
    }

    .form-success {
        color: var(--clr-green);
        text-align: center;
    }
    
    .form-error {
        color: var(--clr-red);
        text-align: center;
    }

    @keyframes appear {
        100% {
            opacity: 1;
        }
    }
`;

export default GlobalStyle;
