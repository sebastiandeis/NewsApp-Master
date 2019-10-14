import * as ActionTypes from "./ActionTypes";

import * as menu from '../constants/menu';
import { 
    GetNewsArticles, GetRedditPosts,
    GetNewsFirstPage, GetNewsNextPage,
    GetRedditFirstPage, GetRedditNextPage,
    GetNewsArticle, GetRedditPost
} from '../firebase/articledb';

// import { newsData } from '../dummydata/news';
// import { redditData } from '../dummydata/reddit';


export const getArticles = (mainType, activeCategory, sources) => {
    return async (dispatch, getState) => {

        dispatch({ type: ActionTypes.REFRESH_ARTICLE });
        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        // get articles from firebase
        var GetArticles = null;
        if (mainType === menu.NEWS) {
            GetArticles = GetNewsArticles;
        } else if (mainType === menu.REDDIT) {
            GetArticles = GetRedditPosts;
        } else {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Unsupported main type!" });
            return;
        }

        if (GetArticles === null) {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get articles!" });
            return;
        }

        var results = [];
        var new_sources = [];
        for (let source of sources) {
            if (source.selected === false || source.cached) continue;

            var articles = await GetArticles(source);
            if (articles !== null) {
                results = results.concat(articles);
            }
            new_sources.push(source);
        }

        dispatch({ type: ActionTypes.GET_ARTICLES, category: activeCategory, sources: sources, articles: results });
        dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: new_sources });

        // selectedSources.forEach(source => {
        //     GetArticles(source)
        //     .then(articles => {
        //         dispatch({ type: ActionTypes.GET_ARTICLES, articles });
        //         dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS });
        //     })
        //     .catch(errMsg => {
        //         dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: errMsg });
        //     });
        // })
    };
}

export const getNewsArticle = nid => {
    return async (dispatch, getState) => {

        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        // get a news article from firebase firestore
        var article = await GetNewsArticle(nid);
        if (article === null) {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get news article!" });
            return;
        }

        dispatch({ type: ActionTypes.GET_NEWS_ARTICLE, article: article });
        dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null });
    };
}

export const getRedditPost = rid => {
    return async (dispatch, getState) => {

        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        // get a reddit post from firebase firestore
        var article = await GetRedditPost(rid);
        if (article === null) {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get reddit post!" });
            return;
        }

        dispatch({ type: ActionTypes.GET_REDDIT_POST, article: article });
        dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null });
    };
}


export const selectNewsCountry = newsCountry => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.REFRESH_ARTICLE });
        dispatch({ type: ActionTypes.SELECT_NEWS_COUNTRY, newsCountry })
    };
}

export const selectNewsType = newsType => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.REFRESH_ARTICLE });
        dispatch({ type: ActionTypes.SELECT_NEWS_TYPE, newsType })
    };
}

export const selectArticle = id => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.SELECT_ARTICLE, id });
    };
}

export const needGetArticles = (need) => {
    return (dispatch, getState) => {
        dispatch({ type: ActionTypes.NEED_GET_ARTICLES, need });
    };
}

export const getNewsFirstPage = () => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.REFRESH_ARTICLE });
        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        let page = await GetNewsFirstPage();
        if (page !== null) {
            dispatch({ type: ActionTypes.GET_NEWS_FIRSTPAGE, page });
            dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null });
        } else {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get articles!" });
        }
    };
}

export const getNewsNextPage = lastid => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        let page = await GetNewsNextPage(lastid);
        if (page !== null) {
            dispatch({ type: ActionTypes.GET_NEWS_NEXTPAGE, page });
            dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null });
        } else {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get articles!" });
        }
    };
}

export const getRedditFirstPage = () => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.REFRESH_ARTICLE });
        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        let page = await GetRedditFirstPage();
        if (page !== null) {
            dispatch({ type: ActionTypes.GET_REDDIT_FIRSTPAGE, page });
            dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null });
        } else {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get articles!" });
        }
    }
}

export const getRedditNextPage = lastid => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.DATA_REQUEST_PENDING });

        let page = await GetRedditNextPage(lastid);
        if (page !== null) {
            dispatch({ type: ActionTypes.GET_REDDIT_NEXTPAGE, page });
            dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null });
        } else {
            dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message: "Failed to get articles!" });
        }
    }
}
