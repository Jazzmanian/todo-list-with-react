import { createGlobalStyle } from 'styled-components';
import { ITheme } from './type';
export const GlobalStyles = createGlobalStyle<{ theme: ITheme }>`
    * {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background: ${({ theme }) => theme.colors.bg};
    }

    & > div {
        flex:1
    }
`;
