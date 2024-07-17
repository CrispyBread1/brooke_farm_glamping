import React from "react";
import { useState } from "react";
import {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut, addNamePhoneToUser} from "../Scripts/authenicationControls";
import LogInForm from "../Components/logInForm";
import { Navigate, useNavigate } from "react-router-dom";
// import { AuthErrorCodes, getAuth } from "firebase/auth";

const LogInPage = ({user, userSignedIn, userSignedOut}) => {

    const navigate = useNavigate()
    

    const returnHome = () => {
        setTimeout(() => {
            navigate('/')
            }, 1000)
    }    

    const logIn = async (email, password) => {
        try {
            // console.log('email: '+ email + ' Password: ' + password)
               await logInEmailPassword(email, password)
               .then((res) => {
                    userSignedIn(res)
                    returnHome()
                    
                })
               
               
            } catch (error) {
                console.log('error logging in: ', error)
            }
    }

    const registerNewAccount = async (email, password, fullName, phone) => {
        try {
            await registerNewAccountEmailPassword(email, password)
            .then((res) => {
                userSignedIn(res)
                addUserDetail(res, fullName, phone)
                
            })
            

            
          } catch (error) {
            console.error('Error loggin in user ', error);
          }
    }

    const addUserDetail = async (user,  fullName, phone) => {
        try {
            await addNamePhoneToUser(user, fullName, phone)
        } catch (error) {
            console.error('Error adding name and phone to user ', error);
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