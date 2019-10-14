import { firestoreDB, auth } from './firebase';

// create user in firestore

export const doCreateUser = (uid, email) => {
    return new Promise((resolve, reject) => {
        let userInfo = {
            avatar: '',
            first_name: '',
            last_name: '',
            fullname: '',
            email: email,
            occupation: '',
            biography: '',
            websites: {
                
            },
            authentication_method: '',
            social_lists_followed: 0,
            news_lists_followed: 0,
            social_lists_moderated: 0,
            news_lists_moderated: 0,
            news_lists_owner: '',
            social_lists_owner: '',
            flagged: '',
            created_date: Date.now(),
            last_login_date: Date.now(),
        };
        let docRef = firestoreDB.collection('Users').doc(uid);
        docRef.get().then(function (thisDoc) {
            if (thisDoc.exists) {
                //user is already there, write only last login
                userInfo.last_login_date = Date.now();
                docRef.update(userInfo)
                    .then(() => {
                        resolve('updated user!');
                    })
                    .catch(err => {
                        reject(`Error: ${err}`);
                    });
            }
            else {
                //new user
                docRef.set(userInfo)
                    .then(() => {
                        resolve('success create user!');
                    })
                    .catch(err => {
                        reject(`Error: ${err}`);
                    });
            }
        })
    });
}

export const UpdateUserProfile = (userData) => {
    const userInfo = Object.assign({}, userData)
    return new Promise((resolve, reject) => {
        let docRef = firestoreDB.collection('Users').doc(auth.currentUser.uid);
        docRef.get().then(function(thisDoc) {
            if (thisDoc.exists) {
                //user is already there, write only last login
                userInfo.last_login_date = Date.now();
                docRef.update(userInfo)
                .then(() => {
                    resolve('success update user profile !')
                })
                .catch(err => {
                    reject(`Error: ${err}`);
                });
            }
            else {
                // doesn't exist current user
                reject(`Doesn't exist current user !`);
            }
        });
    })
}

export const GetCurrentUser = (uid) => {
    return new Promise((resolve, reject) => {
        let user = firestoreDB.collection('Users').doc(uid);
        user.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    resolve(null);
                }

                resolve(snapshot.data());
            })
            .catch(err => {
                reject(`Error: ${err}`);
            });
    });
}

export const DeleteUserProfile = (uid) => {
    return new Promise((resolve, reject) => {
        let user = firestoreDB.collection('Users').doc(uid);
        user.delete()
        .then(snapshot => {
            resolve('Successfully deleted user profile')
        })
        .catch(err => {
            reject(`Error: ${err}`);
        });
    })
}
