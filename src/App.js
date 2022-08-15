import { useState, useEffect } from 'react';

import firebase from './firebase';
import { getDatabase, onValue, ref, set, remove, get, child } from 'firebase/database';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Results from './components/Results';
import MobileResults from './components/MobileResults';
import Nav from './components/Nav';
import MobileNav from './components/MobileNav';

import './App.css';


// Creating variables to hold inital state values
// These variables are used againg when resetting the page to its defaults
const initalIncome = {
    wages: 0,
    otherIncome: 0
};

const initialExpenses = [
    {
        categoryName: "Housing",
        subcategories: [
            {name: "Rent", id: "housing-1", index: 0},
            {name: "Utilities", id: "housing-2", index: 1},
            {name: "Internet", id: "housing-3", index: 2},
            {name: "Phone", id: "housing-4", index: 3}
        ],
        id: 0
    },
    {
        categoryName: "Transportation",
        subcategories: [
            {name: "Car Payment", id: "transportation-1", index: 0},
            {name: "Gas / Fuel", id: "transportation-2", index: 1},
            {name: "Car Insurance", id: "transportation-3", index: 2},
            {name: "Car Repairs", id: "transportation-4", index: 3},
            {name: "Transit / Rideshare", id: "transportation-5", index: 4},
        ],
        id: 1
    },
    {
        categoryName: "Education",
        subcategories: [
            {name: "Student Loan", id: "education-1", index: 0},
            {name: "Tuition", id: "education-2", index: 1}
        ],
        id: 2
    },
    {
        categoryName: "Personal & Household",
        subcategories: [
            {name: "Groceries", id: "personal-1", index: 0},
            {name: "Clothing", id: "personal-2", index: 1},
            {name: "Entertainment", id: "personal-3", index: 2},
            {name: "Medical", id: "personal-4", index: 3},
            {name: "Pet Supplies", id: "personal-5", index: 4},
        ],
        id: 3
    },
    {
        categoryName: "Other",
        subcategories: [
            {name: "Other", id: "other-1", index: 0}
        ],
        id: 4
    }
];

const initialExpenseValues = [[0,0,0,0],[0,0,0,0,0],[0,0],[0,0,0,0,0],[0]];


function App() {
    // holds income categories and values
    const [income, setIncome] = useState(initalIncome);
    // holds expense categories
    const [expenses, setExpenses] = useState(initialExpenses);
    // holds the values of the expenses in each category
    const [expenseValues, setExpenseValues] = useState(initialExpenseValues);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");

    const [isMobileView, setIsMobileView] = useState(false);


    useEffect(() => {
        // checks the window's current width
        // determine if the user needs the mobile view
            // set isMobileView in state to the appropriate boolean
        const checkWindowSize = () => {
            if (window.innerWidth <= 580) {
                setIsMobileView(true);
            } else {
                setIsMobileView(false);
            }
        }

        window.addEventListener('resize', checkWindowSize);

        // if the user has previously logged in and their userId is stored in localStorage...
        if (window.localStorage.userId) {
            // set the userId in state to the userId of the previous session
            // and change isLoggedIn to true
            setUserId(window.localStorage.userId);
            setIsLoggedIn(true);
        }
    }, []);

    // when userId is updated...
    useEffect(() => {
        // if window.localStorage exists...
        if (window.localStorage) {
            // store the userId in localStorage
            window.localStorage.userId = userId;
        }

        // if no userId exists in state...
        if (!userId) {
            // do nothing else
            return;
        }

        // reference the user's data stored in the database
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${userId}/`);

        // when the user logs in & when the user's data is updated...
        onValue(dbRef, (response) => {
            // if the user's database exists and has values
            if (response.exists()) {
                // use the data returned from the database to set the income and expense state variables
                const data = response.val();
                setIncome(data.income);
                setExpenses(data.expenses);
                setExpenseValues(data.expenseValues);
            }
        });
    }, [userId]);


    const handleInputChange = (e, needKey = true) => {
        // initialize value variable
        let value;

        // if the user has not deleted all numerical values from the target input
        if (e.target.value !== "$") {
            // set the value variable to the value of the target input after removing commas and dollar signs
            value = Number(e.target.value.replace(/[,$]/g, ''));
        } 
        
        // if the target input has no numerical value
        if (!value) {
            // set the value target to 0
            value = 0;
        }
        
        // if the numerical value of the target input exceeds the value cap
        if (value > 99999) {
            // do not set a new value
            return;
        }

        // if the function call asks for a key (used to reference the key of an object)
        if (needKey) {
            // grab the key from the target input's name attribute
            // and return the key and the value
            const key = e.target.name;
            return [key, value];
        } else {
            // otherwise, just return the value
            return value;
        }
    }

    // when an input inside of <Income /> is updated...
    const updateIncome = (e) => {
        try {
            // get the key needed to reference the location in state that will be updated and the new value for that key
            const [key, value] = handleInputChange(e);
    
            // update the income state variable with the new value
            setIncome(prev => ({
                ...prev,
                [key]: value
            }));

        } catch (err) {
            console.log(err);
            return;
        }
    }

    // when an input inside of <Expenses /> is updated...
    const updateExpenses = (e, categoryIndex, subcategoryIndex) => {
        // get the value that will be used to update the expenseValues state variable
        const value = handleInputChange(e, false);
        let i = 0;

        // if no value was returned by handleInputChange...
        if (value === undefined) {
            // do not update expenseValues
            return;
        }

        // update the expenseValues state variable by using the prev state
        setExpenseValues(prev => {
            // for each category in the prev expenseValues state...
            return prev.map((categoryValue) => {
                // if the current category matches the category that the target input is attempting to update
                if (i === categoryIndex) {
                    // use the index of the subcategory to update the category of the prev state
                    categoryValue[subcategoryIndex] = value;
                    i++
                } else {
                    i++;
                }

                // return the updated array to setExpenseValues
                return categoryValue;
            })
        })
    }

    const save = () => {
        // reference the user's data stored in the database
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${userId}/`);

        const saveIconEl = document.querySelector('.saveIcon');
        const successIconEl = document.querySelector('.successIcon');

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

    const toggleLoginPage = () => {
        const loginPageEl = document.querySelector('.loginScreen');
        loginPageEl.classList.toggle('show');
    }

    const updateUserId = (username) => {
        setUserId(username);
        setIsLoggedIn(true);
    }

    const logout = () => {
        // set state values to their defaults
        setIncome(initalIncome);
        setExpenses(initialExpenses);
        setExpenseValues(initialExpenseValues);

        setUserId("");
        setIsLoggedIn(false);
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
        !isMobileView ? (
            <>
                <Nav />
                <header>
                    <div className="wrapper">
                        <Header save={save} toggleLoginPage={toggleLoginPage} isLoggedIn={isLoggedIn} logout={logout} deleteAccount={deleteAccount} /> 
                    </div>
                </header>
                <main className="wrapper">
                    <LoginPage updateUserId={updateUserId} toggleLoginPage={toggleLoginPage} />
                    <Income income={income} updateIncome={updateIncome} />
                    <Results income={income} expenseValues={expenseValues} />
                    <Expenses expenses={expenses} updateExpenses={updateExpenses} expenseValues={expenseValues} />
                </main>
            </>
        ) :
            <>
                <MobileResults income={income} expenseValues={expenseValues} /> 
                <MobileNav save={save} toggleLoginPage={toggleLoginPage} isLoggedIn={isLoggedIn} /> 
                <main className="wrapper">
                    <LoginPage updateUserId={updateUserId} toggleLoginPage={toggleLoginPage} />
                    <Income income={income} updateIncome={updateIncome} />
                    <Expenses expenses={expenses} updateExpenses={updateExpenses} expenseValues={expenseValues} />
                </main>
            </>
    );
}


export default App;
