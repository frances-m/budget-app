

const Expenses = ({ expenses, updateExpenses, expenseValues, updateExpenseLabel, addSubcategory }) => {

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
                                    const expenseVal = expenseValues[category.id][subcategory.index] ?? 0;
                                    return (
                                        <div className="inputContainer" key={subcategory.id}>
                                            <label className="sr-only" htmlFor={subcategory.name}>{subcategory.name}</label>
                                            <input className="label" type="text" name={subcategory.name} id={`${category.categoryName}-${subcategory.index}-label`} value={subcategory.name} onChange={(e) => updateExpenseLabel(e, category.id, subcategory.index)} />
                                            <input 
                                            type="text" 
                                            name={subcategory.index} 
                                            id={`${category.categoryName}-${subcategory.index}`}
                                            value={`$${expenseVal.toLocaleString()}`} 
                                            onChange={event => updateExpenses(event, category.id, subcategory.index)}
                                            inputMode="numeric" />
                                        </div>
                                    )
                                })
                            }
                            <button className="add" onClick={() => addSubcategory(category.id)} type="button">
                                <span className="material-symbols-outlined">Add</span>
                            </button>
                        </fieldset>
                    )
                })}
            </form>
        </section>
    )
}

export default Expenses;