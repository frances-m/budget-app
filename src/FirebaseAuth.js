import { useEffect } from "react";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";

const FirebaseAuth = () => {
    useEffect(() => {
        const ui = firebase.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        ui.start(".firebase-auth-container", {
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    //requireDisplayName: false,
                }
            ]
        })
    })
}

export default FirebaseAuth;