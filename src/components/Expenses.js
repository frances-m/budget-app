const Expenses = ({ expenses, updateExpenses }) => {

    return (
        <section className="expenses">
            <h2>Expenses</h2>
            <form action="">
                <div className="input-container">
                    <label htmlFor="rent">rent</label>
                    <input type="text" name="rent" id="rent" value={`$${expenses.rent.toLocaleString()}`} onChange={updateExpenses} />
                </div>

                <div className="input-container">
                    <label htmlFor="utilities">utilities</label>
                    <input type="text" name="utilities" id="utilities" value={`$${expenses.utilities.toLocaleString()}`} onChange={updateExpenses} />
                </div>
            </form>
        </section>
    )
}

export default Expenses;