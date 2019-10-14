import React, {useState, useEffect, useRef} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import grey from '@material-ui/core/colors/grey';

import WaitingDialog from '../UI/waitingdlg';
import { storageRef } from '../../firebase/firebase';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: '10px',
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
});

const AvatarUpload = ({classes, handleAvatarImg, avatarUrl}) => {
    const [avatarImg, updateAvatarImg] = useState(avatarUrl)
    const [loading, updateLoading] = useState(false)
    const filePicker = useRef();

    const openPicker = () => {
        filePicker.current.click()
    }

    const handleFile = (e) => {
        const file = e.target.files[0];
        const uploadImg = storageRef.child(file.name);
        updateLoading(true)
        uploadImg.put(file).then((snapshot) => {
            if (snapshot.state === 'success') {
                uploadImg.getDownloadURL().then((url) => {
                    handleAvatarImg(url)
                    updateAvatarImg(url)
                    updateLoading(false)
                })
            }
        })
        .catch(error => {
            console.log('image upload error:', error)
        })
    }

    useEffect(() => {
        updateAvatarImg(avatarUrl)
    }, [handleAvatarImg])

    return (
        <div className={classes.root}>
            <Box onClick={openPicker}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={filePicker}
                    onChange={handleFile}
                    multiple
                    type="file"
                />
                <img src={avatarImg || '/static/images/avatars/blank_avatar.png'} alt="avatar" className={classes.avatar} />
                <Box className={classes.cameraIcon}>
                    <SvgIcon>
                        <circle cx="12" cy="12" r="3.2" /><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </SvgIcon>
                </Box>
            </Box>
            <WaitingDialog open={loading} />
        </div>
    )
}

export default withStyles(styles)(AvatarUpload);