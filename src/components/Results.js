const Results = () => {

    return (
        <section className="results">
            <div className="wrapper">
                <div className="totals">
                    <h3>Total Income</h3>
                    <p className="total">$3,000</p>
                    <h3>Total Expenses</h3>
                    <p className="total">$2,800</p>
                </div>
                <div className="netIncome">
                    <h2>Net Income</h2>
                    <p className="net">$200</p>
                </div>
            </div>
        </section>
    )
}

export default Results;