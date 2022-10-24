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

        // TODO: send email to confirm account creation

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, newEmail, newPassword)
            .then((userCredential) => {
                signInWithEmailAndPassword(auth, newEmail, newPassword)
                    .then((userCredential) => {
                        updateUser(userCredential.user);
                        toggleLoginPage();
                        setNewEmail("");
                        setNewPassword("");
                        toggleCreateAccountPage();
                    }).catch((error) => {
                        console.log(error.code);
                        console.log(error.message);
                    })
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
    }

    const login = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateUser(userCredential.user);
                toggleLoginPage();
                console.log(userCredential.user);
                console.log('logged in!')
            })
            .catch((error) => {
                console.log(error.code);
                console.log(error.message);
            });
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