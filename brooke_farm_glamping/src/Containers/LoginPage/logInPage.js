import React from "react";
import { useState } from "react";
import {logInEmailPassword, registerNewAccountEmailPassword, monitorAuthState, logOut, addNamePhoneToUser} from "../../Scripts/authenticationControls";
import LogInForm from "../../Components/LogInPage/logInForm";
import { useNavigate, useLocation } from "react-router-dom";
import { addUser } from "../../Scripts/databaseControls/userControls";

const LogInPage = ({userLoggedIn}) => {

    const navigate = useNavigate()
    const location = useLocation()
    

    const returnHome = () => {
        userLoggedIn()
        setTimeout(() => {
            navigate('/')
            }, 1000)
    }
    
    const accountPage = () => {
        userLoggedIn()
        setTimeout(() => {
            navigate('/account-page')
            }, 1000)
    }

    const navigateToConfirmBooking = () => {
        setTimeout(() => {
            navigate('/book/confirm-booking')
            }, 1000)
    }

    const logIn = async (email, password) => {
        try {
               await logInEmailPassword(email, password)
               .then((res) => {
                    // returnHome()
                    if (location.state) {
                        navigateToConfirmBooking()
                        
                    } else (accountPage())
                })
            } catch (error) {
                console.log('error logging in: ', error)
            }
    }

    const registerNewAccount = async (email, password, fullName, phone) => {
        try {
            await registerNewAccountEmailPassword(email, password)
            .then((res) => {
                var user = {
                    'email': email,
                    'fullName': fullName,
                    'phone': phone,
                    'id': res.user.uid,
                    'admin': false
                }
                addUser(user, res.user.uid)
                if (location.state) {
                    navigateToConfirmBooking()
                    
                } else (accountPage())
                
            })
            
          } catch (error) {
            console.error('Error loggin in user ', error);
          }
    }

    // const addUserDetail = async (user,  fullName, phone) => {
    //     try {
    //         await addNamePhoneToUser(user, fullName, phone)
    //     } catch (error) {
    //         console.error('Error adding name and phone to user ', error);
    //       }
    // }
    

    const signOutUser = () => {
        logOut()
        // userSignedIn()
    }
    


    return (
        <div>
            <p>Log in page</p>
            {/* <p>{checkUserIn()}</p> */}
            <button onClick={signOutUser}>Log Out</button>
            
            {/* <button className="log-in" display="none" onClick={switchBetweenRegisterLogIn}>Log in</button> */}
            <LogInForm registerNewAccount={registerNewAccount} logIn={logIn}></LogInForm>
            
    </div>
    ) 

}

export default LogInPage;