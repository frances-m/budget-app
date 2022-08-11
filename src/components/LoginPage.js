import { useState } from "react";
import CreateAccount from "./CreateAccount";
import Login from "./Login";

const LoginPage = () => {
    const closeLoginPage = () => {
        const loginPageEl = document.querySelector('.loginPage');
        loginPageEl.classList.toggle('show');
    }

    const [needsAccount, setNeedsAccount] = useState(false);

    const toggleCreateAccountPage = () => {
        setNeedsAccount(!needsAccount);
    }

    return (
        <section className="loginPage">
            {
                needsAccount ? 
                <CreateAccount /> :
                <Login closeLoginPage={closeLoginPage} toggleCreateAccountPage={toggleCreateAccountPage} />
            }
        </section>
    )
}

export default LoginPage;