const Login = ({ toggleCreateAccountPage, username, password, updateLoginInputs, login }) => {

    return (
        <form onSubmit={login} className="loginForm" action="">
            <h2>Login</h2>
            <div className="inputContainer">
                <label htmlFor="username">username</label>
                <input value={username} onChange={updateLoginInputs} type="text" name="username" id="username" />
            </div>
            <div className="inputContainer">
                <label htmlFor="password">password</label>
                <input value={password} onChange={updateLoginInputs}  type="password" name="password" id="password" />
            </div>
            <button className="loginSubmit" type="submit">Submit</button>
            <p className="loginNotice">Don't have an account? <button type="button" onClick={toggleCreateAccountPage}>click here to create one</button></p>
        </form>
    )
}

export default Login;