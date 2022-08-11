const Login = ({ closeLoginPage, toggleCreateAccountPage }) => {

    return (
        <div className="login">
            <div className="loginWrapper">
                <button className="loginClose" type="button" onClick={closeLoginPage}>x</button>
                <form className="loginForm" action="">
                    <h2>Login</h2>
                    <div className="inputContainer">
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <button className="loginSubmit" type="button">Submit</button>
                    <p className="loginNewAccount">Don't have an account? <button type="button" onClick={toggleCreateAccountPage} >click here to create one</button></p>
                </form>
            </div>
        </div>
    )
}

export default Login;