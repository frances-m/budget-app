import firebase from "../firebase";
import { getDatabase, ref, set, remove } from "firebase/database";
import { reauthenticateWithCredential, getAuth, deleteUser, EmailAuthProvider } from "firebase/auth";

const Header = ({ toggleLoginPage, isLoggedIn, logout, user, income, expenses, expenseValues }) => {

    const toggleUserMenu = () => {
        const userMenuEl = document.querySelector('.headerUserMenu');
        userMenuEl.classList.toggle('show');
    }

    const save = () => {
        // reference the user's data stored in the database
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${user.uid}/`);

        const saveIconEl = document.querySelector('.headerSaveIcon');
        const successIconEl = document.querySelector('.headerSuccessIcon');

        // use the current state values (income, expenses, expenseValues) to update the corresponding values in the user's database
        set(dbRef, {income, expenses, expenseValues})
        // if database updates successfully...
        .then(() => {
            // show the success icon to the user, then...
                saveIconEl.classList.toggle('show');
                successIconEl.classList.toggle('show');
                // wait 2s before showing the save icon to the user again
                setTimeout(() => {
                    saveIconEl.classList.toggle('show');
                    successIconEl.classList.toggle('show');
                }, 2000)
            })
            // otherwise...
            .catch((err) => {
                // alert the user of the issue
                alert('failed to save! please try again later.');
            });
    }

    const deleteAccount = () => {
        // confirm that the user wants to delete their account
        const isConfirmed = window.confirm('Are you sure you want to delete you account?');
        
        // if the user confirms...
        if (isConfirmed) {
            // store the current user's auth info
            const auth = getAuth();
            const user = auth.currentUser;
            // reference the user's data stored in the database
            const database = getDatabase(firebase);
            const userRef = ref(database, `${user.uid}/`);
            

            // remove their data from the database
            // NOTE: there is a possibilty for the user's data to be deleted but not their account - the app would be able to use admin privleges to delete the data after the user has deleted their account, but app does not currently have access to admin privleges 
            // https://firebase.google.com/docs/database/admin/
            remove(userRef);

            // prompt the user to re-provide their sign-in credentials
            const userPassword = prompt('to delete your account, please re-enter password');
            
            // re-authenticate user
            const credential = EmailAuthProvider.credential(user.email, userPassword);
            reauthenticateWithCredential(user, credential)
                .then(() => {
                    // remove user auth profile
                    deleteUser(user)
                        .then(() => {

                            alert('user deleted');
                            logout();
                        }).catch((error) => {
                            console.log(error.code);
                            console.log(error.message);
                        });
                })
                .catch((error) => {
                    alert(error.message);
                })
        }
    }

    const toggleDarkMode = () => {
        const headerBtnEls = document.querySelectorAll('.headerBtn');
        headerBtnEls.forEach(btn => {
            btn.classList.toggle('dark');
        })

        document.querySelector('body').classList.toggle('darkTheme');

        const storedTheme = localStorage?.getItem('darkMode');
        if(storedTheme && storedTheme === 'false'){
            localStorage.setItem('darkMode', 'true');
        } else {
            localStorage?.setItem('darkMode', 'false');
        }

    }

    return (
        <header>
            <div className="wrapper">
                <h1>Moneta</h1>
                <div className="headerBtnContainer">
                    <button className="headerThemeBtn headerBtn" onClick={toggleDarkMode} type="button" aria-label="toggle dark mode" >
                        <span className="material-symbols-outlined show">
                            brightness_4
                        </span>
                    </button>
                    {!isLoggedIn ? 
                        <button className="headerLoginBtn headerBtn" onClick={toggleLoginPage} type="button">Login</button> : 
                        <div className="headerLoggedIn">
                            <button className="headerSaveBtn headerBtn" onClick={save} type="button" aria-label="save current budget" >
                                <span className="headerSaveIcon show material-symbols-outlined">
                                    save
                                </span>
                                <span className="headerSuccessIcon material-symbols-outlined">
                                    check_circle
                                </span>
                            </button>
                            <button className="headerUserBtn headerBtn" onClick={toggleUserMenu} type="button" aria-label="toggle user menu" >
                                <span className="material-symbols-outlined show">
                                    account_circle
                                </span>
                            </button>
                            <div className="headerUserMenu">
                                <button onClick={logout}>logout</button>
                                <button className="headerDelAccountBtn" onClick={deleteAccount}>delete account</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;