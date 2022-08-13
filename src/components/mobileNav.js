import Header from "./Header";

const MobileNav = ({ save, toggleLoginPage, isLoggedIn }) => {
    const toggleMobileNav = () => {
        const navEl = document.querySelector('nav');
        const navBtnEl = document.querySelector('.mobileNavBtn');

        navEl.classList.toggle('open');
        navBtnEl.classList.toggle('toggle');
    }
    return (
        <nav className="mobileNav">
            <button className="mobileNavBtn" onClick={toggleMobileNav} aria-label="open navigation sidebar">
                <span className="material-symbols-outlined">
                    keyboard_double_arrow_left
                </span>
            </button>
            <section className="sidebar">
                <Header save={save} toggleLoginPage={toggleLoginPage} isLoggedIn={isLoggedIn} />
            </section>
        </nav>
    )
}

export default MobileNav;