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
                savedIdeaIds: [],
                likedIdeaIds: [],
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

export const getAllIdeas = async () => {
    const ideasRef = firebase.firestore().collection('ideas').orderBy('updatedAt', 'desc');
    const ideasDoc = await ideasRef.get();
    const ideas = ideasDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return ideas;
};

export const getUsersIdeas = async (userId) => {
    const ideasRef = firebase
        .firestore()
        .collection('ideas')
        .where('poster.id', '==', userId)
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

export const saveIdea = async (ideaId, userId) => {
    const userRef = await firebase.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    const user = userDoc.data();

    let savedIdeaIds = user.savedIdeaIds;
    // if the user has not saved the idea yet
    if (!savedIdeaIds.includes(ideaId)) {
        savedIdeaIds.push(ideaId);
        userRef.update({ savedIdeaIds });
        return 'saved';
    }
    // if the user has already saved the idea
    else {
        const indexToRemove = savedIdeaIds.indexOf(ideaId);
        savedIdeaIds.splice(indexToRemove, 1);
        userRef.update({ savedIdeaIds });
        return 'unsaved';
    }
};

export const getSavedIdeas = async (userId) => {
    const userRef = await firebase.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    const user = userDoc.data();
    let savedIdeaIds = user.savedIdeaIds;
    let ideas = [];
    for (const ideaId of savedIdeaIds) {
        const ideaRef = await firebase.firestore().collection('ideas').doc(ideaId);
        const ideaDoc = await ideaRef.get();
        const idea = ideaDoc.data();
        ideas.push({ ...idea, id: ideaDoc.id });
    }
    return ideas;
};

export const unsaveIdea = async (ideaId, userId) => {
    const userRef = await firebase.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    const user = userDoc.data();

    let savedIdeaIds = user.savedIdeaIds;
    const indexToRemove = savedIdeaIds.indexOf(ideaId);
    savedIdeaIds.splice(indexToRemove, 1);
    userRef.update({ savedIdeaIds });
};

export const likeIdea = async (ideaId, userId) => {
    const userRef = await firebase.firestore().collection('users').doc(userId);
    const userDoc = await userRef.get();
    const user = userDoc.data();

    const ideaRef = await firebase.firestore().collection('ideas').doc(ideaId);
    const ideaDoc = await ideaRef.get();
    const idea = ideaDoc.data();
    let usersLiked = idea.likedBy;
    let likedIdeaIds = user.likedIdeaIds;
    // if the user has not liked the idea yet
    if (!usersLiked.includes(userId)) {
        usersLiked.push(userId);
        ideaRef.update({ likedBy: usersLiked });

        likedIdeaIds.push(ideaId);
        userRef.update({ likedIdeaIds });

        return 'liked';
    }
    // if the user has already liked the idea
    else {
        const userIndexToRemove = usersLiked.indexOf(userId);
        usersLiked.splice(userIndexToRemove, 1);
        ideaRef.update({ likedBy: usersLiked });

        const ideaIndexToRemove = likedIdeaIds.indexOf(ideaId);
        likedIdeaIds.splice(ideaIndexToRemove, 1);
        userRef.update({ likedIdeaIds });

        return 'unliked';
    }
};

export const deleteMyIdea = async (ideaId) => {
    const ideaRef = await firebase.firestore().collection('ideas').doc(ideaId);
    await ideaRef.delete();
};
