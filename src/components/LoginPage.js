import { useState } from "react";

import firebase from "../firebase";
import { getDatabase, ref, push, onValue } from "firebase/database";

import CreateAccount from "./CreateAccount";
import Login from "./Login";

const LoginPage = ({updateUserId, toggleLoginPage}) => {
    const [needsAccount, setNeedsAccount] = useState(false);

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const toggleCreateAccountPage = () => {
        setNeedsAccount(!needsAccount);
    }

    const updateLoginInputs = (e) => {
        let value = e.target.value;

        switch (e.target.name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'newUsername':
                setNewUsername(value);
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
        const database = getDatabase(firebase);
        const dbRef = ref(database, '/users');

        push(dbRef, {"username": newUsername, "password": newPassword});
    }

    const login = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database, '/users');

        onValue(dbRef, (response) => {
            let users = response.val();
            for (let user in users) {
                if (users[user].username === username && users[user].password === password) {
                    updateUserId(username);
                    toggleLoginPage();
                    return;
                } 
            }
            alert('user not found');
        })
    }

    return (
        <section className="loginScreen">
            <div className="login">
                <div className="loginWrapper">
                    <button className="loginClose" type="button" onClick={toggleLoginPage}>x</button>
                    {
                        needsAccount ? 
                        <CreateAccount toggleCreateAccountPage={toggleCreateAccountPage} createAccount={createAccount} newUsername={newUsername} newPassword={newPassword} updateLoginInputs={updateLoginInputs} /> :
                        <Login toggleCreateAccountPage={toggleCreateAccountPage} username={username} password={password} updateLoginInputs={updateLoginInputs} login={login} />
                    }
                </div>
            </div>
        </section>
    )
}

export default LoginPage;