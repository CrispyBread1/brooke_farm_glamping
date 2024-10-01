import React from "react";
import { useState, useEffect } from "react";
import './logInForm.css'




const LogInForm = ({registerNewAccount, logIn}) => {

    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEamil] = useState("")
    const [emailConfirmed, setEmailConfirmed] = useState(false)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState(false)
    const [passwordTooShort, setPasswordTooShort] = useState(true)

    const [fullName, setFullName] = useState("")
    const [confirmFullName, setConfirmFullName] = useState("")

    const [phoneNumber, setPhoneNumber] = useState("")
    const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("")
    
    
    const [registering, setRegistering] = useState(false)


    
    // Handle the switching of between registering and logging in functionality *------------- *------------- *------------- 
    const switchBetweenRegisterLogIn = () => {
        var x = document.querySelector(".register");
        // var y = document.querySelector(".log-in");
        if (x.id == "register") {
            setRegistering(true)
            x.id = "log-in";
            x.innerHTML = '<p>Log in</p>';
        } else {
            setRegistering(false)
            x.id = "register";
            x.innerHTML = '<p>Register new account</p>';
        }
        
    }



    // Handle the submitting of the form *------------- *------------- *------------- 
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if (registering){
            registerNewAccount(email, password, fullName, phoneNumber);
        } else {
            // logIn();
            logIn(email, password)
        }
        
        
    }



    // Handle all the email functionality *------------- *------------- *------------- 
    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handleConfirmEmailChange = (evt) => {
        var typingEmail = evt.target.value
        if (typingEmail === email) {
            setEmailConfirmed(true)
        }
        setConfirmEamil(typingEmail)
    }



    // Handle all the password functionality *------------- *------------- *------------- 
    const handleConfirmPasswordChange = (evt) => {
        var typingPassword = evt.target.value
        if (typingPassword === password) {
            setPasswordConfirmed(true)
        }
        setConfirmPassword(typingPassword)
    }

    const handlePasswordChange = (evt) => {
        var typingPassword = evt.target.value
        if(typingPassword.length >= 6) {
            setPasswordTooShort(false)
        }
        setPassword(typingPassword);
    }

    const showPassword = () => {
        var x = document.querySelector(".password");
        x.type = "text"
        setTimeout(function() {x.type = "password"}, 1000); 
        // console.log(x.type)
    }
    

    // Handle the full name functionality *------------- *------------- *------------- 
    const handleFullNameChange = (evt) => {
        setFullName(evt.target.value)
    }



    // Handle the full name functionality *------------- *------------- *------------- 
    const handlePhoneNumberChange = (evt) => {
        setPhoneNumber(evt.target.value)
    }
    

    return (
        <div className="form-container">
        
        <form className="logIn-Form" onSubmit={handleFormSubmit}>
                {/* Email inputs *------------- *------------- *-------------  */}
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                style={{ width: "100%", height: "2vw", textAlign: "center", fontSize: "2vw"  }}
                />
                <br></br>

                {registering && <input
                type="text"
                placeholder="Confirm email"
                value={confirmEmail}
                onChange={handleConfirmEmailChange}
                style={{ width: "100%", height: "2vw", textAlign: "center", fontSize: "2vw"  }}
                />}
                {/* {emailConfirmed &&<p>Matching!</p>} */}

                {/* Password inputs *------------- *------------- *-------------  */}
                <input
                className="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                style={{ width: "100%", height: "2vw", textAlign: "center", fontSize: "2vw"  }}
                />
                {passwordTooShort && registering && <p>Password must be at least 6 characters long</p>}

                {registering && <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={{ width: "100%", height: "2vw", textAlign: "center", fontSize: "2vw"  }}
                />}
                <br></br>
                
                {/* Full name inputs *------------- *------------- *-------------  */}
                {registering && <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={handleFullNameChange}
                style={{ width: "100%", height: "2vw", textAlign: "center", fontSize: "2vw"  }}
                />}
                <br></br>

                {/* Phone number inputs *------------- *------------- *-------------  */}
                {registering && <input
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                style={{ width: "100%", height: "2vw", textAlign: "center", fontSize: "2vw"  }}
                />}
                <br></br>

                <button className="register" id="register" display="block" type="button" onClick={switchBetweenRegisterLogIn}>Register new account</button>
                <div
                id="show-password"
                value="Show password"
                onClick={showPassword}
                >Show Password</div>
                
            <button
            className="logIn-Form-Button"
            type="submit"
            style={{ width: "60px", height: "100px" }}
            >Submit
            </button>
        </form>
        </div>

    )
}


export default LogInForm;