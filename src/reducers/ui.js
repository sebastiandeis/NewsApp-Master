import * as ActionTypes from '../actions/ActionTypes';
import * as menu from '../constants/menu';
import { conf_categories } from '../config/category';
import { conf_sources } from '../config/source';
import { arrayMove } from '../utility/utils';
import { news_type } from '../config/newstype';
import * as news from '../constants/newstype';
import * as NEWS_COUNTRY from '../constants/state';


const initialState = {
    mainFeedsType: menu.NEWS_FEEDS,
    mainType: menu.NEWS,
    categories: conf_categories,
    activeCategory: 0,
    sources: conf_sources,
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
    scrollPos: { x: 0, y: 0 },
    searchScrollPos: { x: 0, y: 0 }
};

function getCategoryName(categoryValue) {
    for (let category of conf_categories) {
        if (category.value === categoryValue) {
            return category.label;
        }
    }
    return null;
}

function getNewsTypeName(newsType) {
    let newstype = news_type.find(item => item.value === newsType);
    if (newstype) {
        return newstype.name;
    }
    return null;
}

function compareByNid(a, b) {
    if (a.nid < b.nid) {
        return -1;
    }
    if (a.nid > b.nid) {
        return 1;
    }
    return 0;
}

function compareByRid(a, b) {
    if (a.rid < b.rid) {
        return -1;
    }
    if (a.rid > b.rid) {
        return 1;
    }
    return 0;
}

function uiReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SELECT_MAIN_TYPE: {
            let mainCategories = state.categories.filter(category => category.type === action.maintype && category.selected);
            if (mainCategories.length === 0) {
                return state;
            }
            return Object.assign({}, state, {
                mainType: action.maintype,
                activeCategory: mainCategories[0].value
            });
        }

        case ActionTypes.SELECT_MAIN_FEEDS_TYPE: {
            return Object.assign({}, state, {
                mainFeedsType: action.mainFeedsType,
            });
        }

        case ActionTypes.CHANGE_CATEGORY: {
            return Object.assign({}, state, {
                activeCategory: action.value
            });
        }

        case ActionTypes.TOGGLE_CATEGORY_STATUS: {
            let new_categories = state.categories.slice();

            // check if there is at least one category
            let selectedCategories = new_categories.filter(category =>
                category.type === state.mainType && category.selected === true
            );
            if (selectedCategories.length <= 1 && selectedCategories[0].value === action.index) {
                console.log("Cannot uncheck category anymore!");
                return state;
            }

            // toggle category status
            for (let category of new_categories) {
                if (category.type === state.mainType && category.value === action.index) {
                    category.selected = !category.selected;
                }
            }

            // check if active category was changed, and reactivate a category if it is true
            let activeCategoryValue = state.activeCategory;
            let activeCategories = new_categories.filter(category =>
                category.type === state.mainType && category.value === activeCategoryValue
            );

            if (activeCategories.length === 0 || activeCategories[0].selected === false) {
                for (let category of new_categories) {
                    if (category.type === state.mainType && category.selected === true) {
                        activeCategoryValue = category.value;
                        break;
                    }
                }
            }

            return Object.assign({}, state, {
                categories: new_categories,
                activeCategory: activeCategoryValue
            })
        }

        case ActionTypes.TOGGLE_SOURCE_STATUS: {
            let new_sources = state.sources.slice();

            // check if there is at least one source
            let selectedSources = new_sources.filter(source =>
                source.category === state.activeCategory && source.selected);
            if (selectedSources.length <= 1 && selectedSources[0].value === action.index) {
                console.log("Cannot uncheck source anymore!");
                return state;
            }

            // toggle source status
            for (let source of new_sources) {
                if (source.value === action.index) {
                    source.selected = !source.selected;
                    break;
                }
            }

            return Object.assign({}, state, {
                sources: new_sources
            })
        }

        case ActionTypes.CHANGE_CATEGORY_ORDER: {
            // get minimum value of current category
            let selectedCategories = state.categories.filter(category => category.type === state.mainType)
            let minValue = Number.POSITIVE_INFINITY;
            for (let category of selectedCategories) {
                if (minValue > category.value) {
                    minValue = category.value;
                }
            }
            // console.log("Change category order minValue ", selectedCategories, minValue)
            minValue += 1;      // The first item is an 'All' item.

            let new_categories = arrayMove(state.categories, action.oldIndex + minValue, action.newIndex + minValue);
            return Object.assign({}, state, {
                categories: new_categories
            });
        }

        case ActionTypes.DATA_REQUEST_PENDING:
            return Object.assign({}, state, {
                isRequesting: true
            });

        case ActionTypes.DATA_REQUEST_SUCCESS: {
            if (action.sources === null) {
                return Object.assign({}, state, {
                    isRequesting: false
                });
            }

            let new_sources = state.sources.slice();
            for (let source of action.sources) {
                for (let item of new_sources) {
                    if (item.label === source.label) {
                        item.cached = true;
                    }
                }
            }
            return Object.assign({}, state, {
                sources: new_sources,
                isRequesting: false
            });
        }

        case ActionTypes.DATA_REQUEST_FAIL:
            return Object.assign({}, state, {
                isRequesting: false,
                message: action.message
            });

        case ActionTypes.LOADING_START:
            return Object.assign({}, state, {
                isRequesting: true
            });

        case ActionTypes.LOADING_END:
            return Object.assign({}, state, {
                isRequesting: false
            });

        case ActionTypes.LOADING_FAIL:
            return Object.assign({}, state, {
                isRequesting: false,
                message: action.message
            });

        case ActionTypes.INIT_SCROLL_POS:
            return Object.assign({}, state, {
                scrollPos: { x: 0, y: 0 }
            });

        case ActionTypes.SAVE_SCROLL_POS:
            return Object.assign({}, state, {
                scrollPos: action.pos
            });

        case ActionTypes.NEED_GET_ARTICLES: {
            return Object.assign({}, state, {
                articleNeeded: action.need
            });
        }

        case ActionTypes.GET_ARTICLES: {
            let categoryName = getCategoryName(action.category);
            if (categoryName === null) return state;

            let activeSourceNames = [];
            for (let source of action.sources) {
                if (source.selected) {
                    activeSourceNames.push(source.label);
                }
            }

            let newsType = getNewsTypeName(state.newsType);
            let selectedArticles = [];
            // the articles was already fetched!
            if (action.articles.length === 0) {
                if (state.mainType === menu.NEWS) {
                    if (state.country === NEWS_COUNTRY.ALL) {
                        selectedArticles = state.articles.filter(article =>
                            article.category === categoryName &&
                            activeSourceNames.includes(article.source) &&
                            article.type === newsType
                        );
                    } else {
                        selectedArticles = state.articles.filter(article =>
                            article.category === categoryName &&
                            activeSourceNames.includes(article.source) &&
                            article.type === newsType &&
                            article.state === state.country
                        );
                    }
                    selectedArticles.sort(compareByNid)
                } else if (state.mainType === menu.REDDIT) {
                    selectedArticles = state.articles.filter(article =>
                        article.category === categoryName &&
                        activeSourceNames.includes(article.source)
                    );
                    selectedArticles.sort(compareByRid)
                }

                return Object.assign({}, state, {
                    selectedArticles: selectedArticles
                });
            }

            // if there is new articles, add them to articles
            let new_articles = state.articles.slice();
            new_articles = new_articles.concat(action.articles);

            if (state.mainType === menu.NEWS) {
                if (state.country === NEWS_COUNTRY.ALL) {
                    selectedArticles = new_articles.filter(article =>
                        article.category === categoryName &&
                        activeSourceNames.includes(article.source) &&
                        article.type === newsType
                    );
                } else {
                    selectedArticles = new_articles.filter(article =>
                        article.category === categoryName &&
                        activeSourceNames.includes(article.source) &&
                        article.type === newsType &&
                        article.state === state.country
                    );
                }
                selectedArticles.sort(compareByNid)
            } else if (state.mainType === menu.REDDIT) {
                selectedArticles = new_articles.filter(article =>
                    article.category === categoryName &&
                    activeSourceNames.includes(article.source)
                );
                selectedArticles.sort(compareByRid)
            }
            return Object.assign({}, state, {
                articles: new_articles,
                selectedArticles: selectedArticles
            });
        }

        case ActionTypes.SELECT_ARTICLE: {
            let new_article = {};
            for (let article of state.selectedArticles) {
                if (state.mainType === menu.NEWS) {
                    if (article.nid === action.id) {
                        new_article = article;
                    }
                }
                if (state.mainType === menu.REDDIT) {
                    if (article.rid === action.id) {
                        new_article = article;
                    }
                }
            }

            // console.log("Article reducer selectedArticle ", new_article);
            return Object.assign({}, state, {
                selectedArticle: new_article
            });
        }

        case ActionTypes.GET_NEWS_ARTICLE:
        case ActionTypes.GET_REDDIT_POST: {
            return Object.assign({}, state, {
                selectedArticle: action.article
            });
        }

        case ActionTypes.REFRESH_ARTICLE: {
            return Object.assign({}, state, {
                selectedArticles: [],
                selectedArticle: {}
            });
        }

        case ActionTypes.SELECT_NEWS_TYPE: {
            let categoryName = getCategoryName(state.activeCategory);
            let activeSources = state.sources.filter(source =>
                source.category === state.activeCategory && source.selected
            );
            let activeSourceNames = [];
            for (let source of activeSources) {
                if (source.selected) {
                    activeSourceNames.push(source.label);
                }
            }

            let newsType = getNewsTypeName(action.newsType);
            let selectedArticles = [];
            if (state.country === NEWS_COUNTRY.ALL) {
                selectedArticles = state.articles.filter(article =>
                    article.category === categoryName &&
                    activeSourceNames.includes(article.source) &&
                    article.type === newsType
                );
            } else {
                selectedArticles = state.articles.filter(article =>
                    article.category === categoryName &&
                    activeSourceNames.includes(article.source) &&
                    article.type === newsType &&
                    article.state === state.country
                );
            }
            if (state.mainType === menu.NEWS) {
                selectedArticles.sort(compareByNid)
            } else if (state.mainType === menu.REDDIT) {
                selectedArticles.sort(compareByRid)
            }

            console.log("action newstype ", newsType, state.country);
            return Object.assign({}, state, {
                newsType: action.newsType,
                selectedArticles: selectedArticles
            });
        }

        case ActionTypes.SELECT_NEWS_COUNTRY: {
            let categoryName = getCategoryName(state.activeCategory);
            let activeSources = state.sources.filter(source =>
                source.category === state.activeCategory && source.selected
            );
            let activeSourceNames = [];
            for (let source of activeSources) {
                if (source.selected) {
                    activeSourceNames.push(source.label);
                }
            }

            let newsType = getNewsTypeName(state.newsType);
            let selectedArticles = [];
            if (action.newsCountry === NEWS_COUNTRY.ALL) {
                selectedArticles = state.articles.filter(article =>
                    article.category === categoryName &&
                    activeSourceNames.includes(article.source) &&
                    article.type === newsType
                );
            } else {
                selectedArticles = state.articles.filter(article =>
                    article.category === categoryName &&
                    activeSourceNames.includes(article.source) &&
                    article.type === newsType &&
                    article.state === action.newsCountry
                );
            }
            if (state.mainType === menu.NEWS) {
                selectedArticles.sort(compareByNid)
            } else if (state.mainType === menu.REDDIT) {
                selectedArticles.sort(compareByRid)
            }

            return Object.assign({}, state, {
                country: action.newsCountry,
                selectedArticles: selectedArticles
            });
        }

        case ActionTypes.GET_NEWS_FIRSTPAGE:
        case ActionTypes.GET_REDDIT_FIRSTPAGE: {
            let selectedArticles = action.page.articles;
            let lastid = action.page.last;

            return Object.assign({}, state, {
                selectedArticles: selectedArticles,
                selectedLastId: lastid
            });
        }

        case ActionTypes.GET_NEWS_NEXTPAGE:
        case ActionTypes.GET_REDDIT_NEXTPAGE: {
            let new_articles = state.selectedArticles.slice();
            new_articles = new_articles.concat(action.page.articles);
            let lastid = action.page.last;

            return Object.assign({}, state, {
                selectedArticles: new_articles,
                selectedLastId: lastid
            });
        }

        case ActionTypes.UPDATE_SEARCH_KEY: {
            return Object.assign({}, state, {
                searchKey: action.searchKey,
                searchResults: []
            });
        }

        case ActionTypes.UPDATE_SEARCH_RESULT: {
            return Object.assign({}, state, {
                searchResults: action.results
            });
        }

        case ActionTypes.SELECT_SEARCH_ARTICLE: {
            let new_article = state.searchResults.find(article => article.objectID === action.id);
            if (new_article === undefined) {
                return state;
            }

            return Object.assign({}, state, {
                selectedSearchArticle: new_article
            });
        }

        case ActionTypes.INIT_SEARCH_SCROLL_POS:
            return Object.assign({}, state, {
                searchScrollPos: { x: 0, y: 0 }
            });

        case ActionTypes.SAVE_SEARCH_SCROLL_POS:
            return Object.assign({}, state, {
                searchScrollPos: action.pos
            });

        case ActionTypes.SHOW_TOP_NAVBAR: {
            let prevShow = state.showTopNavbar;
            if (prevShow === action.show) {
                return state;
            }
            return Object.assign({}, state, {
                showTopNavbar: action.show
            });
        }

        case ActionTypes.SHOW_BOTTOM_NAVBAR: {
            let prevShow = state.showBottomNavbar;
            if (prevShow === action.show) {
                return state;
            }
            return Object.assign({}, state, {
                showBottomNavbar: action.show
            });
        }

        default:
            return state;
    }
}

export default uiReducer;