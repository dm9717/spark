import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';

// Initialize Firebase if it has not been initialized yet.
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getIdeas = async () => {
    const ideasRef = firebase.firestore().collection('ideas').orderBy('updatedAt', 'desc');
    const ideasDoc = await ideasRef.get();
    const ideas = ideasDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return ideas;
};

export const getMyIdeas = async (userId) => {
    const ideasRef = firebase
        .firestore()
        .collection('ideas')
        .where('user.id', '==', userId)
        .orderBy('updatedAt', 'desc');
    const ideasDoc = await ideasRef.get();
    const ideas = ideasDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return ideas;
};

export const createIdeaRef = async () => {
    return await firebase.firestore().collection('ideas').doc();
};

export const uploadMedia = async (uri, path) => {
    // Turn an URI into a Blob
    const localUri = await fetch(uri);
    const blob = await localUri.blob();
    // Upload the image to Cloud Storage
    const ref = firebase.storage().ref().child(path);

    let downloadUrl = '';
    try {
        await ref.put(blob);
        downloadUrl = await ref.getDownloadURL();
    } catch (err) {
        console.log(err);
    }
    return downloadUrl;
};

const config = {
    iosClientId: '547293250087-fu9ug72kb168tt4hrqfg9shutj7lv9fb.apps.googleusercontent.com',
    androidClientId: '547293250087-6df6l77lkvc9i0iphe94kgavvl11q6om.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
};

export const signInWithGoogle = async () => {
    try {
        const result = await Google.logInAsync(config);
        if (result.type === 'success') {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            userCredential = await firebase.auth().signInWithCredential(credential);
            const { uid, email, displayName, photoURL } = userCredential.user;
            const initialUser = {
                name: displayName,
                username: email,
                photoURL: photoURL,
                createdAt: firebase.firestore.Timestamp.now(),
                updatedAt: firebase.firestore.Timestamp.now(),
            };
            const userDoc = await firebase.firestore().collection('users').doc(uid).get();
            if (!userDoc.exists) {
                await firebase.firestore().collection('users').doc(uid).set(initialUser);
                return {
                    id: uid,
                    ...initialUser,
                    accessToken,
                };
            } else {
                await firebase.firestore().collection('users').doc(uid).update({
                    name: displayName,
                    username: email,
                    photoURL: photoURL,
                    updatedAt: firebase.firestore.Timestamp.now(),
                });
                return {
                    id: uid,
                    ...userDoc.data(),
                    accessToken,
                };
            }
        } else {
            console.log('Sign-in cancelled');
        }
    } catch (e) {
        console.log('An error occured');
    }
};

export const signOutWithGoogle = async (accessToken) => {
    await Google.logOutAsync({ accessToken, ...config });
};
