const Results = ({ totalIncome, totalExpenses, netIncome }) => {

    return (
        <section className="results">
            <div className="totals">
                <h3>Total Income</h3>
                <p className="total"><span>$</span>{totalIncome.toLocaleString()}</p>
                <h3>Total Expenses</h3>
                <p className="total"><span>$</span>{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="net-income">
                <h2>Net Income</h2>
                <p className="net"><span>$</span>{netIncome.toLocaleString()}</p>
            </div>
        </section>
    )
}

export default Results;