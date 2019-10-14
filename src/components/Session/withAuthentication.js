import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { SIGN_OUT } from '../../actions/ActionTypes';

import { firebase } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser, getCurrentUser, handleSignOut } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          onSetAuthUser(authUser)
          getCurrentUser(authUser.uid)
        } else {
          onSetAuthUser(null);
          handleSignOut();
        }
      });
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  const { getCurrentUser } = ActionCreators;
  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
    getCurrentUser: (uid) => getCurrentUser(uid)(dispatch),
    handleSignOut: () => dispatch({type: SIGN_OUT}),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;