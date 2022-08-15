import { useState, useEffect } from "react";

const Results = ({ income, expenseValues }) => {
    const [totalIncome, setTotalIncome] = useState("$0");
    const [totalExpenses, setTotalExpenses] = useState("$0");
    const [netIncome, setNetIncome] = useState("$0");

    // when the income or expenseValues are updated in state...
    useEffect(() => {
        let calcIncome = 0;
        let calcExpenses = 0;
        
        // calculate the total of all income values
        for (let key in income) {
            calcIncome += Number(income[key]);
        }

        // calculate the total of all expense values
        expenseValues.forEach((category) => {
            category.forEach((value) => {
                calcExpenses += value;
            })
        })

        // update the totals to be displayed on the page
        setTotalIncome(calcIncome);
        setTotalExpenses(calcExpenses);
        setNetIncome(calcIncome - calcExpenses);
    }, [income, expenseValues]);

    return (
        <section className="results">
            <div className="netIncome">
                <h2>Net Income</h2>
                <p className="net"><span>$</span>{netIncome.toLocaleString()}</p>
            </div>

            <div className="total totalIncome">
                <h3>Total Income</h3>
                <p><span>$</span>{totalIncome.toLocaleString()}</p>
            </div>

            <div className="total totalExpenses">
                <h3>Total Expenses</h3>
                <p><span>$</span>{totalExpenses.toLocaleString()}</p>
            </div>
        </section>
    )
}

export default Results;