import { useState } from "react";

const PriceGuide = ({campingPitchChoice, campingSpotsNeeded, pricesArrayPerNightPerSpot}) => {
    
    

    return (
      
        <div id="price-guide">
            {
                campingPitchChoice &&
                (<>
                <h3>Price guide:</h3>
                <ul id="price-guide-list">
                    {campingSpotsNeeded > 1 && <b><li className="ui-label">{campingSpotsNeeded} Camping spots are needed for your party size</li></b>}  
                    {pricesArrayPerNightPerSpot}
                </ul>
                
                </>
                )
            }
        </div>
                
        
    )

};

export default PriceGuide