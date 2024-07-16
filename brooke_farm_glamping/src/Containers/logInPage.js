import React from "react";
import { useState } from "react";
import {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut} from "../Scripts/authenicationControls";
// import { AuthErrorCodes, getAuth } from "firebase/auth";

const LogInPage = ({}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmEmail, setConfirmEamil] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [registering, setRegistering] = useState(false)
    // const[hiddenPassword, setHiddenPassword] = useState("")

    const handleEmailChange = (evt) => {
        setEmail(evt.target.value);
    }

    const handlePasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const showPassword = () => {
        var x = document.querySelector(".password");
        x.type = "text"
        setTimeout(function() {x.type = "password"}, 1000); 
        // console.log(x.type)
    }

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

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if (registering){
            registerNewAccount();
        } else {
            logIn();
        }
        // logIn(logInAttempt(email, password))
        
    }

    const logIn = () => {
        // console.log(error)
         
        // console.log(logInAttempt(email, password))
        // var response = logInAttempt(email, password)
        // if (response) {
        //     console.log("log in page: " + response)
        // }
        logInEmailPassword(email, password).then((res) => {
            if (res) {
            console.log("log in attempt " + res)
            }
        })

        // console.log(response)
        // console.log(message)
        // if (message == AuthErrorCodes.INVALID_EMAIL){
            // console.log("invalid email")
        // } else {
            // console.log("dontlike you")
            // console.log(message);
        // }
        // .then((res) => if(res.code == AuthErrorCodes.INVALID_EMAIL){
        //     console.log('hello');
        // })
        // console.log(message)
        
        // if (error == AuthErrorCodes.INVALID_EMAIL) {
        //     console.log("InvalidEmail")
        // }
    }

    const registerNewAccount = async () => {
        // registerNewAccountEmailPassword(email, password).then((res) => console.log("register attempt "+ res.user))
        try {
            const userCredential = await registerNewAccountEmailPassword(email, password);
            // setBookings(bookings);
            console.log(userCredential.user)
            
          } catch (error) {
            console.error('Error loggin in user ', error);
          }
    }



    return (
        <div>
            <p>Log in page</p>

            <button className="register" id="register" display="block" onClick={switchBetweenRegisterLogIn}>Register new account</button>
            {/* <button className="log-in" display="none" onClick={switchBetweenRegisterLogIn}>Log in</button> */}

            <form onSubmit={handleFormSubmit}>
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                />
                <input
                className="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                />
                <div
                id="show-password"
                value="Show password"
                onClick={showPassword}
                >Show Password</div>
            <button
            id="post-button"
            type="submit"
            style={{ width: "60px", height: "100px" }}
            >Submit
            </button>
            </form>
    </div>
    ) 

}

export default LogInPage;