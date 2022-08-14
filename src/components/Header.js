const Header = ({ save, toggleLoginPage, isLoggedIn }) => {

    return (
        <>
            <h1>Moneta</h1>
            <div className="btnContainer">
                {!isLoggedIn ? 
                    <button className="loginBtn" onClick={toggleLoginPage} type="button">Login</button> : 
                    <div className="loggedIn">
                        <button className="saveBtn" onClick={save} type="button" aria-label="save current budget" >
                            <span className="saveIcon show material-symbols-outlined">
                                save
                            </span>
                            <span className="successIcon material-symbols-outlined">
                                check_circle
                            </span>
                        </button>
                        <button className="userBtn" type="button" >
                            <span className="material-symbols-outlined">
                                account_circle
                            </span>
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default Header;