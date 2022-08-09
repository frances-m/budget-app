import { useState, useEffect } from 'react';

import firebase from './firebase';
import { getDatabase, onValue, ref, set } from 'firebase/database';

import Header from './components/Header';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Results from './components/Results';

import './App.css';

function App() {
    const [income, setIncome] = useState({
        wages: 0,
        otherIncome: 0
    });
    const [expenses, setExpenses] = useState({
        rent: 0,
        utilities: 0
    });

    const [totalIncome, setTotalIncome] = useState("$0");
    const [totalExpenses, setTotalExpenses] = useState("$0");
    const [netIncome, setNetIncome] = useState("$0");

    useEffect(() => {
        let calcIncome = 0;
        let calcExpenses = 0;
        
        for (let key in income) {
            calcIncome += Number(income[key]);
        }

        for (let key in expenses) {
            calcExpenses += Number(expenses[key]);
        }

        setTotalIncome(calcIncome);
        setTotalExpenses(calcExpenses);
        setNetIncome(calcIncome - calcExpenses);
    }, [income, expenses]);

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        onValue(dbRef, (response) => {
            const data = response.val();
            setIncome(data.income);
            setExpenses(data.expenses);
        })
    }, []);

    const handleInputChange = (e) => {
        const key = e.target.name;
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

        return [key, value];
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

    const updateExpenses = (e) => {
        try {
            const [key, value] = handleInputChange(e);
    
            setExpenses(prev => ({
                ...prev,
                [key]: value
            }));

        } catch (err) {
            return;
        }
    }

    const save = () => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        const saveIconEl = document.querySelector('.saveIcon');
        const successIconEl = document.querySelector('.successIcon');

        saveIconEl.classList.toggle('show');
        successIconEl.classList.toggle('show');

        set(dbRef, {income, expenses})
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

    return (
        <>
            <Header save={save} />
            <main className="wrapper">
                <Income income={income} updateIncome={updateIncome} />
                <Results totalIncome={totalIncome} totalExpenses={totalExpenses} netIncome={netIncome} />
                <Expenses expenses={expenses} updateExpenses={updateExpenses} />
            </main>
        </>
    );
}

export default App;
