import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { loadState, saveState } from './localstorage';
import * as menu from '../constants/menu';
import { conf_categories } from '../config/category';
import { conf_sources } from '../config/source';
import * as news from '../constants/newstype';
import * as NEWS_COUNTRY from '../constants/state';

const logger = createLogger();

const persistedState = loadState();
// console.log("persistedState", persistedState);

var sources = null;
var categories = null;
if (persistedState === undefined ||persistedState.sources === undefined) {
    sources = conf_sources;
    categories = conf_categories;
} else {
    // console.log("persistedState sources", persistedState.sources);
    categories = persistedState.categories;
    sources = persistedState.sources.map(source => {
        source.cached = false;
        return source;
    });
}

const initialState = {
    uiState: {
        mainType: menu.NEWS,
        mainFeedsType: menu.NEWS_FEEDS,
        categories: categories,
        activeCategory: 0,
        sources: sources,
        newsType: news.NEWS_TYPE_BREAKING,
        country: NEWS_COUNTRY.ALL,
        articleNeeded: true,
        articles: [],
        selectedArticles: [],
        selectedArticle: {},
        selectedLastId: "",
        searchKey: "",
        searchResults: [],
        selectedSearchArticle: {},
        isRequesting: false,
        isLoading: false,
        showTopNavbar: true,
        showBottomNavbar: true,
        message: "",
        scrollPos: {x: 0, y: 0},
        searchScrollPos: {x: 0, y: 0}
    }
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
// console.log("store's state", store.getState());

store.subscribe(() => {
    saveState({
        categories: store.getState().uiState.categories,
        sources: store.getState().uiState.sources
    });
});

export default store;