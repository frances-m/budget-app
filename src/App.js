import { useState, useEffect } from 'react';

import firebase from './firebase';
import { getDatabase, onValue, ref, set } from 'firebase/database';

import Header from './components/Header';
import LoginPage from './components/LoginPage';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Results from './components/Results';

import './App.css';

function App() {
    const [income, setIncome] = useState({
        wages: 0,
        otherIncome: 0
    });

    const [expenses, setExpenses] = useState([
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
            categoryName: "Personal",
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
    ]);

    const [expenseValues, setExpenseValues] = useState([[0,0,0,0],[0,0,0,0,0],[0,0],[0,0,0,0,0],[0]]);

    const [totalIncome, setTotalIncome] = useState("$0");
    const [totalExpenses, setTotalExpenses] = useState("$0");
    const [netIncome, setNetIncome] = useState("$0");

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        let calcIncome = 0;
        let calcExpenses = 0;
        
        for (let key in income) {
            calcIncome += Number(income[key]);
        }

        expenseValues.forEach((category) => {
            category.forEach((value) => {
                calcExpenses += value;
            })
        })

        setTotalIncome(calcIncome);
        setTotalExpenses(calcExpenses);
        setNetIncome(calcIncome - calcExpenses);
    }, [income, expenseValues]);

    const updateUserInfo = (username = userId) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${username}/`);

        onValue(dbRef, (response) => {
            if (response.exists()) {
                const data = response.val();
                setIncome(data.income);
                setExpenses(data.expenses);
                setExpenseValues(data.expenseValues);
            }
        });

    };
    
    useEffect(() => {
        if (window.localStorage.userId) {
            // setUserId(window.localStorage.userId);
            // setIsLoggedIn(true);
            //updateUserInfo();
        }
    }, []);

    const handleInputChange = (e, needKey = true) => {
        let value;
        
        if (e.target.value !== "$") {
            value = Number(e.target.value.replace(/[,$]/g, ''));
        } 
        
        if (!value) {
            value = 0;
        }
        
        if (value > 99999) {
            return;
        }
        if (needKey) {
            const key = e.target.name;
            return [key, value];
        } else {
            return value;
        }
    }

    const updateIncome = (e) => {
        try {
            const [key, value] = handleInputChange(e);
    
            setIncome(prev => ({
                ...prev,
                [key]: value
            }));

        } catch (err) {
            return;
        }
    }

    const updateExpenses = (e, categoryIndex, subcategoryIndex) => {
        const value = handleInputChange(e, false);
        let i = 0;

        if (value === undefined) {
            return;
        }

        setExpenseValues(prev => {
            return prev.map((categoryValue) => {
                if (i === categoryIndex) {
                    categoryValue[subcategoryIndex] = value;
                    i++
                } else {
                    i++;
                }
                return categoryValue;
            })
        })
    }

    const save = () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `${userId}/`);

        const saveIconEl = document.querySelector('.saveIcon');
        const successIconEl = document.querySelector('.successIcon');

        saveIconEl.classList.toggle('show');
        successIconEl.classList.toggle('show');

        set(dbRef, {income, expenses, expenseValues})
            .then(() => {
                setTimeout(() => {
                    saveIconEl.classList.toggle('show');
                    successIconEl.classList.toggle('show');
                }, 2000)
                
            })
            .catch((err) => {
                alert('failed to save! please try again later.');
            });
    }

    const toggleLoginPage = () => {
        const loginPageEl = document.querySelector('.loginScreen');
        loginPageEl.classList.toggle('show');
    }

    const updateUserId = (username) => {
        if (window.localStorage) {
            window.localStorage.userId = username;
        }

        setUserId(username);
        setIsLoggedIn(true);
        updateUserInfo(username);
    }

    return (
        <>
            <Header save={save} toggleLoginPage={toggleLoginPage} isLoggedIn={isLoggedIn} />
            <main className="wrapper">
                <LoginPage updateUserId={updateUserId} toggleLoginPage={toggleLoginPage} />
                <Income income={income} updateIncome={updateIncome} />
                <Results totalIncome={totalIncome} totalExpenses={totalExpenses} netIncome={netIncome} />
                <Expenses expenses={expenses} updateExpenses={updateExpenses} expenseValues={expenseValues} />
            </main>
        </>
    );
}


export default App;
