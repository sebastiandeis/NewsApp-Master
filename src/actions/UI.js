import * as ActionTypes from "./ActionTypes";

export const selectMainType = maintype => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SELECT_MAIN_TYPE, maintype });
  };
}

export const selectMainFeedsType = mainFeedsType => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SELECT_MAIN_FEEDS_TYPE, mainFeedsType });
  };
}

export const changeCategory = value => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.CHANGE_CATEGORY, value });
  };
}

export const toggleCategoryStatus = index => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.TOGGLE_CATEGORY_STATUS, index });
  };
}

export const changeCategoryOrder =  (oldIndex, newIndex) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.CHANGE_CATEGORY_ORDER, oldIndex, newIndex});
  };
}

export const toggleSourceStatus = index => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.TOGGLE_SOURCE_STATUS, index });
  };
}

export const initScrollPos = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.INIT_SCROLL_POS });
  };
}

export const saveScrollPos = (X, Y) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SAVE_SCROLL_POS, pos: {x: X, y: Y} });
  };
}

export const updateSearchKey = (searchKey) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.UPDATE_SEARCH_KEY, searchKey});
  }
}

export const updateSearchResult = (results) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.UPDATE_SEARCH_RESULT, results});
  }
}

export const selectSearchArticle = id => {
  return (dispatch, getState) => {
      dispatch({ type: ActionTypes.SELECT_SEARCH_ARTICLE, id });
  };
}

export const initSearchScrollPos = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.INIT_SEARCH_SCROLL_POS });
  };
}

export const saveSearchScrollPos = (X, Y) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SAVE_SEARCH_SCROLL_POS, pos: {x: X, y: Y} });
  };
}

export const dataRequestPending = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.DATA_REQUEST_PENDING});
  }
}

export const dataRequestSuccess = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.DATA_REQUEST_SUCCESS, sources: null});
  }
}

export const dataRequestFailed = (message) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.DATA_REQUEST_FAIL, message});
  }
}

export const handleShowTopNavbar = (show) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SHOW_TOP_NAVBAR, show});
  }
}

export const handleShowBottomNavbar = (show) => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.SHOW_BOTTOM_NAVBAR, show});
  }
}