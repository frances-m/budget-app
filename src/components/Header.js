const Header = ({ save, toggleLoginPage, isLoggedIn }) => {

    return (
        <>
            <h1>Moneta</h1>
            <div className="btnContainer">
                {!isLoggedIn ? 
                    <button className="loginBtn" onClick={toggleLoginPage} type="button">Login</button> : 
                    <div className="loggedIn">
                        {/* <p>Hey, username!</p> */}
                        <button className="saveBtn" onClick={save} type="button" >
                            <span class="saveIcon show material-symbols-outlined">
                                save
                            </span>
                            <span class="successIcon material-symbols-outlined">
                                check_circle
                            </span>
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default Header;