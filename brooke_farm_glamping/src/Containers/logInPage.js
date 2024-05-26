import React from "react";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const LogInPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        if (registering){
            // registerNewAccount();
            return
        }
        
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