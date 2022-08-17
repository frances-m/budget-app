import firebase from "../firebase";
import { getDatabase, ref, set, remove, child, get } from "firebase/database";

const Header = ({ toggleLoginPage, isLoggedIn, logout, userId, income, expenses, expenseValues }) => {

    const toggleUserMenu = () => {
        const userMenuEl = document.querySelector('.headerUserMenu');
        userMenuEl.classList.toggle('show');
    }

    const save = () => {
        // reference the user's data stored in the database
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${userId}/`);

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
            // reference the user's data stored in the database
            const database = getDatabase(firebase);
            const userIdRef = ref(database, `${userId}/`);
            // remove their data from the database
            remove(userIdRef);


            // reference the object containing all users in the database
            const dbRef = ref(database);
            const usersRef = ref(database, '/users');

            // get an object containing all of the users in the database
            get(child(dbRef, '/users')).then((response) => {
                const users = response.val();
                const newUsersObject = {};

                // loop through the users object, adding each user to a new users object unless the user's username matches the current userId in state
                for (let user in users) {
                    if (users[user].username !== userId) {
                        newUsersObject[user] = users[user];
                    }
                }
                
                // set the users object in the database to the new users object
                set(usersRef, newUsersObject);
            });

            logout();
        }
    }

    return (
        <header>
            <div className="wrapper">
                <h1>Moneta</h1>
                <div className="headerBtnContainer">
                    {!isLoggedIn ? 
                        <button className="headerLoginBtn" onClick={toggleLoginPage} type="button">Login</button> : 
                        <div className="headerLoggedIn">
                            <button className="headerSaveBtn" onClick={save} type="button" aria-label="save current budget" >
                                <span className="headerSaveIcon show material-symbols-outlined">
                                    save
                                </span>
                                <span className="headerSuccessIcon material-symbols-outlined">
                                    check_circle
                                </span>
                            </button>
                            <button className="headerUserBtn" onClick={toggleUserMenu} type="button" aria-label="toggle user menu" >
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