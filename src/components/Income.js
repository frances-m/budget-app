const Income = ({income, updateIncome}) => {

    return (
        <section className="income">
            <h2>Income</h2>
            <form action="">
                <div className="input-container">
                    <label htmlFor="wages">salary / wages</label>
                    <input type="text" name="wages" id="wages" value={`$${income.wages.toLocaleString()}`} onChange={updateIncome} />
                </div>

                <div className="input-container">
                    <label htmlFor="otherIncome">other income</label>
                    <input type="text" name="otherIncome" id="otherIncome" value={`$${income.otherIncome.toLocaleString()}`} onChange={updateIncome} />
                </div>
            </form>
        </section>
    )
}

export default Income;