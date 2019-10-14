import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

// import Navigation from '../Navigation';
// import LandingPage from '../Landing';
// import SignUpPage from '../SignUp';
// import SignInPage from '../SignIn';
// import PasswordForgetPage from '../PasswordForget';
// import AccountPage from '../Account';
import AccountPage from '../Auth/Account';
import SignInPage from '../Auth/SignIn';
import SignUpPage from '../Auth/SignUp';
import PasswordForgetPage from '../Auth/PasswordForget';
import HomePage from '../Home';
import withAuthentication from '../Session/withAuthentication';
import * as ROUTES from '../../constants/routes';

import ArticleListPage from '../Pages/articlelistpage';
import ArticlePage from '../Pages/articlepage';
import NewsPage from '../Pages/newspage';
import RedditPage from '../Pages/redditpage';
import SearchResultPage from '../Pages/searchresultpage';
import SearchedArticlePage from '../Pages/searchedarticlepage';
import YourListsPage from '../Pages/yourlistspage';
import YourListViewPage from '../Pages/yourlistviewpage';
import YourListSources from '../Pages/yourlistsources';
import Profile from '../Pages/profile';
import TestPage from '../Pages/testpage';


import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#FFF"
    },
    secondary: {
      main: grey['50'],
      contrastText: "#FFF"
    },
    error: red,
    background: {
      paper: grey['900']
    },
    text: {
      primary: grey['100'],
      secondary: grey['500']
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  status: {
    danger: 'orange',
  },
});


const App = () =>
  <Router>
    <MuiThemeProvider theme={theme}>
      <div className="app">
        <Route exact path={ROUTES.LANDING} component={() => <ArticleListPage />} />
        <Route exact path={ROUTES.NEWS} component={() => <ArticlePage />} />
        <Route exact path={ROUTES.REDDIT} component={() => <ArticlePage />} />
        <Route exact path={ROUTES.NEWS_DETAIL} component={NewsPage} />
        <Route exact path={ROUTES.REDDIT_DETAIL} component={RedditPage} />
        <Route exact path={ROUTES.SEARCH_RESULT} component={() => <SearchResultPage />} />
        <Route exact path={ROUTES.SEARCH_VIEW} component={() => <SearchedArticlePage />} />
        <Route exact path={ROUTES.YOUR_NEWS_LISTS} component={() => <YourListsPage />} />
        <Route exact path={ROUTES.YOUR_SOCIAL_LISTS} component={() => <YourListsPage />} />
        <Route exact path={ROUTES.YOUR_NEWS_LIST_VIEW} component={() => <YourListViewPage />} />
        <Route exact path={ROUTES.YOUR_SOCIAL_LIST_VIEW} component={() => <YourListViewPage />} />
        <Route exact path={ROUTES.YOUR_NEWS_LIST_SOURCES} component={() => <YourListSources />} />
        <Route exact path={ROUTES.YOUR_SOCIAL_LIST_SOURCES} component={() => <YourListSources />} />

        <Route exact path={ROUTES.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={ROUTES.SIGN_UP} component={() => <SignUpPage />} />
        <Route exact path={ROUTES.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        <Route exact path={ROUTES.HOME} component={() => <HomePage />} />
        <Route exact path={ROUTES.USER_PROFILE} component={() => <Profile />} />
        <Route exact path={ROUTES.ACCOUNT} component={() => <AccountPage />} />

        <Route exact path={ROUTES.TEST} component={() => <TestPage />} />

        {/* <hr />

        <Route exact path={routes.LANDING} component={() => <LandingPage />} />
        <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
        <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
        <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        <Route exact path={routes.HOME} component={() => <HomePage />} />
        <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />

        <hr /> */}
      </div>
    </MuiThemeProvider>
  </Router>

export default withAuthentication(App);