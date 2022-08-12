const MobileResults = ({ totalIncome, totalExpenses, netIncome }) => {
    return (
        <section className="results">
            <div className="totals wrapper">
                <div className="total totalIncome">
                    <h3>Total Income</h3>
                    <p><span>$</span>{totalIncome.toLocaleString()}</p>
                </div>

                <div className="total totalExpenses">
                    <h3>Total Expenses</h3>
                    <p><span>$</span>{totalExpenses.toLocaleString()}</p>
                </div>
            </div>
            
            <div className="netIncome">
                <div className="wrapper">
                    <h2>Net Income</h2>
                    <p className="net"><span>$</span>{netIncome.toLocaleString()}</p>
                </div>
            </div>

        </section>
    )
}

export default MobileResults;