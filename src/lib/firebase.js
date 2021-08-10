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
    const ideasRef = firebase.firestore().collection('ideas');
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

export const signin = async () => {
    try {
        const result = await Google.logInAsync({
            iosClientId: '547293250087-fu9ug72kb168tt4hrqfg9shutj7lv9fb.apps.googleusercontent.com',
            androidClientId:
                '547293250087-6df6l77lkvc9i0iphe94kgavvl11q6om.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            const { email, displayName } = userCredential.user;
            const initialUser = {
                name: displayName,
                createdAt: firebase.firestore.Timestamp.now(),
            };
            const userDoc = await firebase.firestore().collection('users').doc(email).get();
            if (!userDoc.exists) {
                await firebase.firestore().collection('users').doc(email).set(initialUser);
                return {
                    id: email,
                    ...initialUser,
                };
            } else {
                return {
                    id: email,
                    ...userDoc.data(),
                };
            }
        } else {
            console.log('Sign-in cancelled');
        }
    } catch (e) {
        console.log('An error occured');
    }
};
