import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import routes from 'config/routes';
import PublicPages from 'containers/PublicPages/Loadable';
import Authentication from 'utils/auth/Authentication';

import GlobalStyle from 'global-styles';

import BlogRouter from 'containers/Blog/BlogRouter';
import EditUserProfile from 'containers/EditUserProfile';

import ErrorBoundary from './ErrorBoundary';
import Header from './components/Header';

const Container = styled.div`
  margin: 40px;
  margin-top: 110px;
  padding: 24px;
  background-color: #fff;
`;

export default function App() {
  return (
    <ErrorBoundary>
      <Route path={[routes.login, routes.register]} component={PublicPages} />

      <Authentication>
        <Header />

        <Container>
          <Switch>
            <Route
              exact
              path={routes.profile.edit}
              component={EditUserProfile}
            />

            <Route
              path={[routes.index, routes.blog.index]}
              component={BlogRouter}
            />
          </Switch>
        </Container>
      </Authentication>

      <GlobalStyle />
    </ErrorBoundary>
  );
}
