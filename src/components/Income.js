const Income = () => {

    return (
        <section class="income">
            <div className="wrapper">
                <h2>Income</h2>
                <form action="">
                    <div class="input-container">
                        <label htmlFor="cat1">category</label>
                        <input type="text" name="cat1" id="cat1" />
                    </div>

                    <div class="input-container">
                        <label htmlFor="cat2">category</label>
                        <input type="text" name="cat2" id="cat2" />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Income;