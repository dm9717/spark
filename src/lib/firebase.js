import * as firebase from 'firebase/app';
import 'firebae/firestore';
import Constants from 'expo-constants';

// Initialize Firebase if it has not been initialized yet
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(Constants.manifest.extra.firebase);
}
