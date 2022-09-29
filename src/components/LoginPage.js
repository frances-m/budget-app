import { useState } from "react";

// import firebase from "../firebase";
// import { getDatabase, ref, get, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import CreateAccount from "./CreateAccount";
import Login from "./Login";

const LoginPage = ({updateUser, toggleLoginPage}) => {
    const [needsAccount, setNeedsAccount] = useState(false);

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleCreateAccountPage = () => {
        setNeedsAccount(!needsAccount);
    }

    const updateLoginInputs = (e) => {
        let value = e.target.value;

        switch (e.target.name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'newEmail':
                setNewEmail(value);
                break;
            case 'newPassword':
                setNewPassword(value);
                break;
            default: 
                return;
        }
    }

    const createAccount = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, newEmail, newPassword)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
        // // reference the root of the database and the object containing all users in the database
        // const database = getDatabase(firebase);
        // const dbRef = ref(database);
        // const usersRef = ref(database, '/users');

        // let usernames = [];

        // // get an object containing all of the users in the database
        // get(child(dbRef, '/users')).then((response) => {

        //     const users = response.val();
            
        //     // loop through the users object and store the usernames of each user in an array
        //     for (let user in users) {
        //         usernames.push(users[user].username);
        //     }
            
        //     const newUsernameErrorEl = document.querySelector("#newUsernameError");
        //     // if the array of all usernames includes the current users chosen username...
        //     if (usernames.includes(newUsername)) {
        //         // let the user know that the username has already been taken
        //         // do nothing else
        //         newUsernameErrorEl.classList.add('show');
        //         return;
        //     } else {
        //         // otherwise...
        //         // remove the message letting the user know that the username has already been taken (if it is currently visible)
        //         newUsernameErrorEl.classList.remove('show');
        //         // add the new user's username and password to the users object in the database
        //         push(usersRef, {"username": newUsername, "password": newPassword});
        //         // reset the create account inputs
        //         setNewUsername("");
        //         setNewPassword("");
        //         return;
        //     }
        //  });
    }

    const login = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateUser(userCredential.user);
            console.log(userCredential.user);
            console.log('logged in!')
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
        // // reference the root of the database
        // const database = getDatabase(firebase);
        // const dbRef = ref(database);

        // // get an object containing all of the users in the database
        // get(child(dbRef, '/users')).then((response) => {
        //     let users = response.val();

        //     // loop through the users object...
        //     for (let user in users) {
        //         // if the users object contains an object with the username and password that the current user has submitted...
        //         if (users[user].username === username && users[user].password === password) {
        //             // store the username in state as the userId
        //             updateUserId(username);
        //             // close the login page
        //             toggleLoginPage();
        //             // reset the login page inputs
        //             setUsername("");
        //             setPassword("");
        //             return;
        //         } 
        //     }
        //     // if the user's login info is not found in the database, alert the user
        //     alert('user not found');
        // });
    }

    return (
        <section className="loginScreen">
            <div className="login">
                <div className="loginWrapper">
                    <button className="loginCloseBtn" type="button" onClick={toggleLoginPage}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                    {
                        needsAccount ? 
                        <CreateAccount 
                            toggleCreateAccountPage={toggleCreateAccountPage} 
                            updateLoginInputs={updateLoginInputs} 
                            createAccount={createAccount} 
                            newEmail={newEmail} 
                            newPassword={newPassword} 
                        /> 
                        :
                        <Login toggleCreateAccountPage={toggleCreateAccountPage} email={email} password={password} updateLoginInputs={updateLoginInputs} login={login} />
                    }
                </div>
            </div>
        </section>
    )
}

export default LoginPage;