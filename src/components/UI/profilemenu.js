import React from 'react';
import { connect } from 'react-redux';
import { SIGN_OUT } from '../../actions/ActionTypes';

import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import grey from '@material-ui/core/colors/grey';

import CustomImgIcon from '../CustomIcons/customimgicon';
import * as ROUTES from '../../constants/routes';

import { auth } from '../../firebase';

const styles = {
    menu_list: {
        paddingTop: 0,
        paddingBottom: 0
    },
    menu_item: {
        padding: 0,
        marginLeft: 10,
        marginTop: 0,
        minHeight: 24
    },
    userMenuAvatar: {
        padding: 0
    },
    listItemText: {
        '& span': {
            fontSize: '1.25rem',
        }
    },
    listItemTextSmall: {
        fontSize: '0.825rem !important',
    },
    divider: {
        backgroundColor: grey[500]
    }
};

class ProfileMenu extends React.Component {

    handleLogout = () => {
        this.props.onSelected('/');
        auth.doSignOut();
        this.props.handleSignOut();
    }

    render() {
        const { onSelected, onClosed, classes, currentUser } = this.props;

        return (
            <React.Fragment>
                <MenuItem onClick={onClosed}>
                    <List>
                        <ListItem className={classes.userMenuAvatar} alignItems="flex-start">
                            <ListItemText
                                className={classes.listItemText}
                                primary="Dr. Nick Riviera"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.listItemTextSmall}
                                            color="textPrimary"
                                        >
                                            Emergency Physician
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                            <ListItemAvatar>
                                <Avatar 
                                    style={{ marginLeft: '10px' }} 
                                    size="small" 
                                    alt="Remy Sharp" 
                                    src={(currentUser && currentUser.avatar) || "/static/images/avatars/blank_avatar.png"}
                                />
                            </ListItemAvatar>
                        </ListItem>
                    </List>
                </MenuItem>
                <Divider light={true} className={classes.divider} />
                <MenuItem onClick={onSelected(ROUTES.ACCOUNT)}>
                    <CustomImgIcon
                        imgSrc={'/static/images/icons/profile.png'}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Account
                </MenuItem>
                <MenuItem onClick={onSelected(ROUTES.USER_PROFILE)}>
                    <CustomImgIcon
                        imgSrc={'/static/images/icons/profile.png'}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Profile
                </MenuItem>
                <MenuItem onClick={onSelected(ROUTES.USER_PROFILE)}>
                    <CustomImgIcon
                        imgSrc={'/static/images/icons/note_transparent.gif'}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Moderation
                </MenuItem>
                <MenuItem onClick={onSelected('/')}>
                    <CustomImgIcon
                        imgSrc={'/static/images/icons/bookmark_unfilled2.gif'}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Saved
                </MenuItem>
                <MenuItem onClick={onSelected('/')}>
                    <CustomImgIcon
                        imgSrc={''}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Settings
                </MenuItem>
                <MenuItem onClick={onSelected('/')}>
                    <CustomImgIcon
                        imgSrc={''}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    About
                </MenuItem>
                <MenuItem onClick={onSelected('/')}>
                    <CustomImgIcon
                        imgSrc={''}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Legal
                </MenuItem>
                <Divider light={true} className={classes.divider} />
                <MenuItem onClick={this.handleLogout}>
                    <CustomImgIcon
                        imgSrc={'/static/images/icons/exit.gif'}
                        height={18}
                        width={18}
                        padding={'2px 6px 6px 6px'}
                    />
                    Logout
                </MenuItem>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    currentUser: state.userState.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
    handleSignOut: () => dispatch({ type: SIGN_OUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileMenu));
