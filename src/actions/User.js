import * as ActionTypes from "./ActionTypes";
import {
    GetCurrentUser,
    UpdateUserProfile,
} from '../firebase/user';

export const getCurrentUser = (uid) => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.LOADING_START });
        // get a current user from firebase firestore
        var currentUser = await GetCurrentUser(uid);
        if (currentUser !== null) {
            dispatch({ type: ActionTypes.GET_CURRENT_USER, currentUser: currentUser });
            dispatch({ type: ActionTypes.LOADING_END});   
        } else {
            dispatch({ type: ActionTypes.LOADING_FAIL, message: "Failed to get current user!" });
        }
    };
}

export const updateProfile = (userData) => {
    return async (dispatch, getState) => {
        dispatch({ type: ActionTypes.LOADING_START });
        // update current user profile
        var updatedProfile = await UpdateUserProfile(userData);
        if (updateProfile !== null) {
            dispatch({ type: ActionTypes.UPDATE_PROFILE, updatedUser: updatedProfile });
            dispatch({ type: ActionTypes.LOADING_END});   
        } else {
            dispatch({ type: ActionTypes.LOADING_FAIL, message: "Failed to update current user!" });
        }
    }
}
