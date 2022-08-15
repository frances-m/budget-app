const Header = ({ save, toggleLoginPage, isLoggedIn, logout, deleteAccount }) => {

    const toggleUserMenu = () => {
        const userMenuEl = document.querySelector('.userMenu');
        userMenuEl.classList.toggle('show');
    }

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
                        <button className="userBtn" onClick={toggleUserMenu} type="button" >
                            <span className="material-symbols-outlined show">
                                account_circle
                            </span>
                        </button>
                        <div className="userMenu">
                            <button onClick={logout}>logout</button>
                            <button className="delAccountBtn" onClick={deleteAccount}>delete account</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Header;