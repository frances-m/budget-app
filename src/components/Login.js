const Login = ({ toggleCreateAccountPage, email, password, updateLoginInputs, login }) => {

    return (
        <form onSubmit={login} className="loginForm" action="">
            <h2>Login</h2>
            <div className="inputContainer">
                <label htmlFor="email">email</label>
                <input value={email} onChange={updateLoginInputs} type="text" name="email" id="email" />
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