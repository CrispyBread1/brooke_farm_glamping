import React from "react";
import './homPage.css'
import backGround1 from '../JPGs/Background/IMG_2978.JPG'
import backGround2 from '../JPGs/Background/IMG_3211.JPG'

const HomePage = ({}) => {
    
    


    return (
        <div className="Home">
            {/* <p>home page bro</p> */}
            <div className="Background">
            <img id="book-Image"  src={backGround2}  />
            </div>
            
    </div>
    )
}

export default HomePage