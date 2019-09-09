/** @jsx jsx */
import { jsx, Layout as ThemeLayout } from 'theme-ui';
import { Global, css } from '@emotion/core';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => (
  <ThemeLayout>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
        }

        * + * {
          margin-top: 1rem;
        }

        body,
        #___gatsby {
          margin-top: 0;
        }

        @media (min-width: 600px) {
          .airtable-embed {
            margin-left: calc((90vw - 540px) / 2 * -1);
            height: 75vh;
            width: 90vw;
          }
        }
      `}
    />
    <Header />
    <main
      sx={{
        mx: 'auto',
        maxWidth: 540,
        width: '90vw',
      }}
    >
      {children}
    </main>
    <Footer />
  </ThemeLayout>
);

export default Layout;
