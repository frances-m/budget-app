const Expenses = () => {

    return (
        <section className="expenses">
            <div className="wrapper">
                <h2>Expenses</h2>
                <form action="">
                    <div className="input-container">
                        <label htmlFor="cat1">category</label>
                        <input type="text" name="cat1" id="cat1" />
                    </div>

                    <div className="input-container">
                        <label htmlFor="cat2">category</label>
                        <input type="text" name="cat2" id="cat2" />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Expenses;