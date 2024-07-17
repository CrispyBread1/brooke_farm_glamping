import React from "react";
import { useState } from "react";
import {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut} from "../Scripts/authenicationControls";
import LogInForm from "../Components/logInForm";
import { Navigate, useNavigate } from "react-router-dom";
// import { AuthErrorCodes, getAuth } from "firebase/auth";

const LogInPage = ({user, userSignedIn, userSignedOut}) => {

    const navigate = useNavigate()
    

    

    const logIn = async (email, password) => {
        try {
            // console.log('email: '+ email + ' Password: ' + password)
               await logInEmailPassword(email, password)
               .then((res) => userSignedIn(res))
               setTimeout(() => {
                navigate('/')
                }, 1000)
               
            } catch (error) {
                console.log('error logging in: ', error)
            }
    }

    const signOutUser = () => {
        logOut()
        userSignedIn()
    }
    
    const checkUserIn = () => {

        if (user) {
            return user.user.email
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
            <p>{checkUserIn()}</p>
            <button onClick={signOutUser}>Log Out</button>
            
            {/* <button className="log-in" display="none" onClick={switchBetweenRegisterLogIn}>Log in</button> */}
            <LogInForm registerNewAccount={registerNewAccount} logIn={logIn}></LogInForm>
            
    </div>
    ) 

}

export default LogInPage;