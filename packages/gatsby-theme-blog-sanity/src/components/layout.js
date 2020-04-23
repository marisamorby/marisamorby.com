/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Main, Container } from 'theme-ui';

const Layout = ({ children }) => (
  <div sx={{ variant: 'wrapper' }}>
    <Main>
      <Container>{children}</Container>
    </Main>
  </div>
);

export default Layout;
