import * as ActionTypes from "../actions/ActionTypes";

const INITIAL_STATE = {
  currentUser: {},
  updatedUser: null,
  users: {},
};

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
});

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'USERS_SET': {
      return applySetUsers(state, action);
    }

    case ActionTypes.GET_CURRENT_USER: {
      return Object.assign({}, state, {
        currentUser: action.currentUser,
      });
    }

    case ActionTypes.SIGN_OUT: {
      return Object.assign({}, state, {
        currentUser: {},
      });
    }

    case ActionTypes.UPDATE_PROFILE: {
      return Object.assign({}, state, {
        updatedUser: action.updatedUser
      })
    }

    default: return state;
  }
}

export default userReducer;