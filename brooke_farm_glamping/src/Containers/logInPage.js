import React from "react";
import { useState } from "react";
import {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut} from "../Scripts/authenicationControls";
import LogInForm from "../Components/logInForm";
// import { AuthErrorCodes, getAuth } from "firebase/auth";

const LogInPage = ({user, userSignedIn}) => {

    
    

    

    const logIn = async (email, password) => {
        try {
            // console.log('email: '+ email + ' Password: ' + password)
               await logInEmailPassword(email, password)
            } catch (error) {
                console.log('error logging in: ', error)
            }
        }

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
    

    const registerNewAccount = async (email, password) => {
        // registerNewAccountEmailPassword(email, password).then((res) => console.log("register attempt "+ res.user))
        try {
            const userCredential = await registerNewAccountEmailPassword(email, password);
            // setBookings(bookings);
            console.log(userCredential.user)
            userSignedIn(userCredential)
            
          } catch (error) {
            console.error('Error loggin in user ', error);
          }
    }



    return (
        <div>
            <p>Log in page</p>
            <p>{user}</p>
            
            {/* <button className="log-in" display="none" onClick={switchBetweenRegisterLogIn}>Log in</button> */}
            <LogInForm registerNewAccount={registerNewAccount} logIn={logIn}></LogInForm>
            
    </div>
    ) 

}

export default LogInPage;