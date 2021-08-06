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
