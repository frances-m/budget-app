

const Expenses = ({ expenses, updateExpenses, expenseValues }) => {

    return (
        <section className="expenses">
            <h2>Expenses</h2>
            <form action="">
                { expenses.map((category) => {
                    return (
                        <fieldset key={category.id}>
                            <h3>{category.categoryName}</h3>
                            {
                                category.subcategories.map((subcategory) => {
                                    return (
                                        <div className="input-container" key={subcategory.id}>
                                            <label htmlFor={subcategory.name}>{subcategory.name}</label>
                                            <input type="text" name={subcategory.name} id={subcategory.name} value={`$${expenseValues[category.id][subcategory.index].toLocaleString()}`} onChange={event => updateExpenses(event, category.id, subcategory.index)} />
                                        </div>
                                    )
                                })
                            }
                        </fieldset>
                    )
                })}
            </form>
        </section>
    )
}

export default Expenses;