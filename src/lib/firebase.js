import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';

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

export const signin = async () => {};
