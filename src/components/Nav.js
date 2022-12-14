const Nav = () => {
    const toggleNav = () => {
        const navEl = document.querySelector('nav');
        const navBtnEl = document.querySelector('.navBtn');
        const mobileNavBtnEl = document.querySelector('.navBtnMobile');

        navEl.classList.toggle('open');
        navBtnEl.classList.toggle('transition');
        mobileNavBtnEl.classList.toggle('toggle');

        setTimeout(() => {
            navBtnEl.classList.toggle('toggle');
            navBtnEl.classList.toggle('transition');
        }, 600);
    }

    return (
        <>
            <button className="navBtnMobile" onClick={toggleNav} aria-label="toggle navigation sidebar">
                <span className="material-symbols-outlined">
                    keyboard_double_arrow_left
                </span>
            </button>
            <nav>
                <button className="navBtn" onClick={toggleNav} aria-label="toggle navigation sidebar">
                    <span className="material-symbols-outlined">
                        keyboard_double_arrow_right
                    </span>
                </button>
                <footer>
                    <p className="attrJuno">Made at <a href="https://junocollege.com/">Juno College</a></p>
                    <p className="attrMe">Created by <a href="https://francesm.dev">Frances McKenzie</a></p>
                </footer>
            </nav>
        </>
    )
}

export default Nav;