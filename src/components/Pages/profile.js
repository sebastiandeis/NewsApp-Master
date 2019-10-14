import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { withRouter } from 'react-router-dom';
import { loadCSS } from 'fg-loadcss';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import grey from '@material-ui/core/colors/grey';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import AvatarUpload from '../UI/avatarupload';
import SocialDetectInput from '../UI/socialdetectinput';
import WaitingDialog from '../UI/waitingdlg';
import ConfirmDialog from '../UI/confirmdailog';
import CheckIcon from '../CustomIcons/checkicon';
import AddIcon from '../CustomIcons/addicon';
import * as globalStyles from '../../constants/globalstyles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    profile: {
        width: '100%',
        '& .MuiPaper-root': {
            border: 'solid 1px',
            borderColor: grey[500],
            margin: '16px',
            width: '100%',
            backgroundColor: '#000',
        }
    },
    headerBar: {
        position: 'fixed',
        top: 0
    },
    backBtn: {
    },
    appbarTitle: {
        flexGrow: 1,
        textAlign: 'left',
    },
    profileContainer: {
        marginRight: 16,
        marginLeft: 16,
        marginTop: 66,
        [theme.breakpoints.up('md')]: {
            marginTop: 74,
        },
    },
    profileHeader: {
        minHeight: 56,
    },
    profileActionBtns: {
        position: 'absolute',
        top: 6,
        right: 6,
    },
    profileHeaderTitle: {
        ...globalStyles.TITLE_MID,
    },
    profileItem: {
        margin: '16px 16px 32px 16px',
        padding: '6px 6px 4px 6px',
        backgroundColor: grey[900],
        borderRadius: '5px',
    },
    avatar: {
        height: 80,
        width: 80
    },
    cameraIcon: {
        height: 24,
        width: 30,
        backgroundColor: '#fff',
        color: '#000',
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        borderRadius: '5px',
        position: 'absolute',
        marginTop: -30,
        marginLeft: 50,
        borderColor: grey[500],
        border: 'solid 1px'
    },
    sourceInfo: {
        paddingLeft: 20,
        width: '100%'
    },
    sourceName: {
        width: '100%',
        backgroundColor: grey[900],
        padding: 0,
        border: 0,
        fontSize: '1rem',
        color: '#fff',
        '&:focus': {
            outline: '0px',
        },
        '&::placeholder': {
            color: '#fff'
        },
        '&::-webkit-input-placeholder': {
            color: '#fff'
        },
        '&:-ms-input-placeholder': {
            color: '#fff'
        }
    },
    description: {
        width: '100%',
        height: 50,
        backgroundColor: grey[900],
        color: grey[500],
        border: 0,
        fontSize: 14,
        padding: 0,
        fontFamily: 'Roboto',
        '&:focus': {
            outline: '0px',
        }
    },
    iconButton: {
        padding: 4,
    },
    addSourceBlankItem: {
        backgroundColor: grey[900],
        marginTop: 8,
    },
    addSourceBlankItemTxt: {
        fontSize: 12,
        color: grey[500],
        alignItems: 'center',
        display: 'flex'
    },
    selectControl: {
        '& svg': {
            color: '#fff',
        }
    },
    listsContainer: {
        marginTop: 30
    },
    socialLists: {
        paddingBottom: 20
    },
    listTitleBar: {
        display: 'flex',
        marginBottom: 20,
    },
    listTitle: {
        color: '#fff',
    },
    listSeeAll: {
        color: grey[500],
        fontSize: 14,
        position: 'absolute',
        right: 16,
        alignItems: 'center',
        lineHeight: '24px',
    },
    listImg: {
        width: '100%',
        height: 'auto',
        borderRadius: '24px'
    },
    listLabel: {

    },
    listLabelTxt: {
        color: grey[500],
        lineHeight: 1,
        paddingLeft: '5px',
        paddingRight: '5px',
        textAlign: 'center',
        fontSize: 14
    }
});

const newsLists = [
    {
        label: 'Health and Fitness Experts',
        image: 'greater_china.png',
    },
    {
        label: 'Heart Researchers',
        image: 'localnews.png',
    },
    {
        label: 'Health Journalists',
        image: 'west_europe.png',
    },
    {
        label: 'Africa',
        image: 'localnews.png',
    },
];

const socialLists = [
    {
        label: 'Allergy',
        image: 'west_europe.png',
    },
    {
        label: 'World Trade Research',
        image: 'localnews.png',
    },
    {
        label: 'Vacation Inspiration',
        image: 'west_europe.png',
    },
    {
        label: 'Learning',
        image: 'localnews.png',
    },
]


const Profile = ({ classes, currentUser = { websites: {} }, updateProfile, updatedUser, getCurrentUser, authUser, history, isRequesting }) => {
    const [seeAllNews, updateSeeAllNews] = useState(false)
    const [seeAllSocials, updateSeeAllSocials] = useState(false)
    const [websiteUrls, updateWebsiteUrls] = useState({})
    const [tempWebsiteUrls, updateTempWebsiteUrls] = useState({})
    const [userData, updateUserData] = useState(currentUser);
    const [confirmDialogOpen, updateConfirmDialogOpen] = useState(false);

    const handleBack = () => {
        history.push('/');
    }

    const handleSeeAll = (type) => () => {
        if (type === 'social') {
            updateSeeAllSocials(!seeAllSocials)
        } else {
            updateSeeAllNews(!seeAllNews)
        }
    }

    const handleAddWebsite = () => {
        const key = `website_${Object.keys(websiteUrls).length + 1}`;
        var newWebsiteUrls = Object.assign({}, websiteUrls, { [key]: '' })
        updateWebsiteUrls(newWebsiteUrls)
    }

    const handleChange = (e) => {
        const userInfo = Object.assign({}, userData);
        const { name, value } = e.target;
        if (name) {
            if (name.search('_url') !== -1) {
                userInfo.websites[name] = value
            }

            if (name === 'fullname') {
                userInfo['fullname'] = value
                userInfo['first_name'] = value.split(' ')[0]
                userInfo['last_name'] = value.split(' ')[1]
            }

            if (name === 'biography') {
                userInfo['biography'] = value
            }
        }
        updateUserData(userInfo)
    }

    const handleAvatarImg = (url) => {
        const userInfo = Object.assign({}, userData);
        userInfo['avatar'] = url
        updateUserData(userInfo)
    }

    const handleSubmitProfile = () => {
        updateProfile(userData)
    }

    const handleRemoveSocialItem = (itemName) => () => {
        let tempWebsiteUrls = Object.assign({}, websiteUrls)
        delete tempWebsiteUrls[itemName]
        updateTempWebsiteUrls(tempWebsiteUrls)
        updateConfirmDialogOpen(true)
    }

    const confirmRemoveSocialItem = () => {
        updateWebsiteUrls(tempWebsiteUrls)
        const userInfo = Object.assign({}, userData);
        userInfo['websites'] = tempWebsiteUrls;
        updateUserData(userInfo)
        updateConfirmDialogOpen(false)
    }

    useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, [])

    useEffect(() => {
        const websiteUrls = Object.assign({}, currentUser.websites)
        updateWebsiteUrls(websiteUrls)
        updateUserData(currentUser)
    }, [currentUser])

    useEffect(() => {
        if (authUser) {
            getCurrentUser(authUser.uid);
        }
    }, [updatedUser])

    return (
        (
            <div className={classes.root}>
                <AppBar position="static" className={classes.headerBar}>
                    <Toolbar>
                        <IconButton onClick={handleBack} edge="start" className={classes.backBtn} color="inherit" aria-label="Menu">
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Typography className={classes.appbarTitle}>
                            Profile
                        </Typography>
                        <IconButton className={classes.iconButton} onClick={handleSubmitProfile}>
                            <CheckIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box m={1} className={classes.profileContainer}>
                    <Box className={classes.profileContent}>
                        <Box display="flex" className={classes.profileItem}>
                            <AvatarUpload avatarUrl={userData.avatar}  handleAvatarImg={handleAvatarImg} />
                            <Box className={classes.sourceInfo}>
                                <input 
                                    name='fullname'
                                    placeholder="Full Name" 
                                    onChange={handleChange} 
                                    value={userData.fullname || ''}
                                    className={classes.sourceName} 
                                />
                                <textarea
                                    name='biography'
                                    onChange={handleChange}
                                    placeholder="Descripton"
                                    value={userData.biography}
                                    className={classes.description}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Box>
                                {
                                    websiteUrls &&
                                    Object.keys(websiteUrls).map((itemName, index) => (
                                        <SocialDetectInput
                                            key={index} 
                                            websiteUrl={websiteUrls[itemName]} 
                                            handleChange={handleChange}
                                            handleRemoveSocialItem={handleRemoveSocialItem}
                                            itemName={itemName}
                                        />
                                    ))
                                }
                            </Box>
                            <Box 
                                display={'flex'} 
                                className={classes.addSourceBlankItem}
                                onClick={handleAddWebsite}
                            >
                                <IconButton className={classes.iconButton}>
                                    <AddIcon />
                                </IconButton>
                                <Typography className={classes.addSourceBlankItemTxt}>
                                    Link a social media account or website
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.listsContainer}>
                        <Box className={classes.socialLists}>
                            <Box className={classes.listTitleBar}>
                                <Typography className={classes.listTitle}>My Social Lists</Typography>
                                <Typography
                                    className={classes.listSeeAll}
                                    onClick={handleSeeAll("social")}
                                >
                                    {seeAllSocials ? 'See ...' : 'See All'}
                                </Typography>
                            </Box>
                            <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
                                {socialLists.map((item, index) => (
                                    (!seeAllSocials ? index < 3 : true) &&
                                    <GridListTile key={index} cols={1}>
                                        <img className={classes.listImg} src={`/static/images/icons/${item.image}`} alt={item.label} />
                                        <Box className={classes.listLabel}>
                                            <Typography className={classes.listLabelTxt}>{item.label}</Typography>
                                        </Box>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Box>
                        <Box className={classes.socialLists}>
                            <Box className={classes.listTitleBar}>
                                <Typography className={classes.listTitle}>My News Lists</Typography>
                                <Typography
                                    className={classes.listSeeAll}
                                    onClick={handleSeeAll("news")}
                                >
                                    {seeAllNews ? 'See ...' : 'See All'}
                                </Typography>
                            </Box>
                            <GridList cellHeight={'auto'} className={classes.gridList} cols={3}>
                                {newsLists.map((item, index) => (
                                    (!seeAllNews ? index < 3 : true) &&
                                    <GridListTile key={index} cols={1}>
                                        <img className={classes.listImg} src={`/static/images/icons/${item.image}`} alt={item.label} />
                                        <Box className={classes.listLabel}>
                                            <Typography className={classes.listLabelTxt}>{item.label}</Typography>
                                        </Box>
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Box>
                    </Box>
                </Box>
                <WaitingDialog open={isRequesting} />
                <ConfirmDialog 
                    confirmDialogOpen={confirmDialogOpen} 
                    handleConfirmItem={confirmRemoveSocialItem} 
                    dialogMessage={'Do you want delete social website url?'}
                    dialogContentMessage={'To continune delete action, you should click save button in the top right.'}
                />
            </div>
        )
    )
}
const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    currentUser: state.userState.currentUser,
    updatedUser: state.userState.updatedUser,
    isRequesting: state.uiState.isRequesting,
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Profile)))