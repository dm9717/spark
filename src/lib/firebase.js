import * as firebase from "firebase/app"
import "firebae/firestore"
import Constants from "expo-constants"

if (!firebase.apps.length) {
    firebase.initializeApp(Constants.manifest.extra.firebase)
}