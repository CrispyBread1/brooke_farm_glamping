import React from "react";
import { useState } from "react";

const LogInPage = () => {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
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

    return (
        <div>
            <p>Log in page</p>

            <form >
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
            >
            </button>
            </form>
    </div>
    ) 

}

export default LogInPage;