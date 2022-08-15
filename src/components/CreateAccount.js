import { useState } from "react";

const CreateAccount = ({ toggleCreateAccountPage, createAccount, newUsername, newPassword, updateLoginInputs }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <form onSubmit={createAccount} className="loginForm" action="">
            <h2>Create a New Account</h2>
            <div className="inputContainer">
                <div className="inputLabel">
                    <label htmlFor="newUsername">username</label>
                    <p className="errorMessage" id="newUsernameError">username not available</p>
                </div>

                <input value={newUsername} onChange={updateLoginInputs} type="text" name="newUsername" id="newUsername" />
            </div>
            <div className="inputContainer">
                <label htmlFor="newPassword">password</label>
                <input value={newPassword} onChange={updateLoginInputs} type={isPasswordVisible ? "text" : "password"} name="newPassword" id="newPassword" />
                <button className="visibilityBtn" onClick={togglePasswordVisibility} type="button" aria-label="toggle password visibility">
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