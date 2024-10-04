import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { retreiveUser } from "../Scripts/databaseControls";

const AccountContainer = ({userLoggedOut}) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const auth = getAuth();
          onAuthStateChanged(auth, (doc) => {
            if (doc) {
              retreiveUser(doc.uid)
              .then((res) => setUser(res))
              console.log(user)
          } else {
            userLoggedOut()
            console.log("User logged out")
          }
        });
      }, [])




    return (
        <h2>{user.fullName}'s' Account page</h2>
    )
}

export default AccountContainer