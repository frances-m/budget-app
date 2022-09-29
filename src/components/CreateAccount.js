import { useState } from "react";

const CreateAccount = ({ toggleCreateAccountPage, updateLoginInputs, createAccount, newEmail, newPassword }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <form onSubmit={createAccount} className="loginForm" action="">
            <h2>Create a New Account</h2>
            <div className="inputContainer">
                <div className="inputLabel">
                    <label htmlFor="newEmail">email</label>
                    <p className="errorMessage" id="newEmailError">account already exists</p>
                </div>

                <input value={newEmail} onChange={updateLoginInputs} type="text" name="newEmail" id="newEmail" />
            </div>
            <div className="inputContainer">
                <label htmlFor="newPassword">password</label>
                <input value={newPassword} onChange={updateLoginInputs} type={isPasswordVisible ? "text" : "password"} name="newPassword" id="newPassword" />
                <button className="loginVisibilityBtn" onClick={togglePasswordVisibility} type="button" aria-label="toggle password visibility">
                    {
                        isPasswordVisible ?
                            <span className="material-symbols-outlined">visibility_off</span> : 
                            <span className="material-symbols-outlined">visibility</span>
                        
                    }
                </button>
            </div>
            <button className="loginSubmit" type="submit">Submit</button>
            <p className="loginNotice">Already have an account? <button type="button" onClick={toggleCreateAccountPage} >click here to login</button></p>
        </form>
    )
}

export default CreateAccount;