import { useState, useEffect } from 'react';
import firebase from './firebase';

import Header from './components/Header';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Results from './components/Results';

import './App.css';

function App() {
    const [income, setIncome] = useState({});
    const [expenses, setExpenses] = useState({});

    const [totalIncome, setTotalIncome] = useState("$0");
    const [totalExpenses, setTotalExpenses] = useState("$0");
    const [netIncome, setNetIncome] = useState("$0");

    useEffect(() => {

    }, [income, expenses]);

    return (
        <>
            <Header />
            <main className="wrapper">
                <Income />
                <Results />
                <Expenses />
            </main>
        </>
    );
}

export default App;
