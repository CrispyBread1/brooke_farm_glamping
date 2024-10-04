import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retreiveUser } from "../Scripts/databaseControls";
import { useNavigate } from "react-router-dom";

const AccountContainer = ({userLoggedOut}) => {

    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        checkAuth()
      }, [])

    const checkAuth = () => {
        const auth = getAuth();
          onAuthStateChanged(auth, (doc) => {
            if (doc) {
              retreiveUser(doc.uid)
              .then((res) => setUser(res))
              console.log(user)
          } else {
            userLoggedOut()
            returnHome()
          }
        });
    }

    const returnHome = () => {
        setTimeout(() => {
            navigate('/')
            }, 1000)
    }


    return (
        <h2>{user.fullName}'s' Account page</h2>
    )
}

export default AccountContainer