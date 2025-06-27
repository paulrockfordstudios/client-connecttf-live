import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { higherSpectrumBoxShadow } from '../../../Utils/higherSpectrumBoxShadow';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import MedShortDisplay from '../../../Components/Mediums/MedShortDisplay/MedShortDisplay';
import "./Mediums.css";


function Mediums() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const color = colorTheme(currentUser);

    const [mediums, setMediums] = useState([]);
    const [ height, setHeight ] = useState();

    useEffect(() => {
        const fetchMediumList = async () => {
            try {
                const res = await axiosReq("GET", "/mediums/list/all");
                setMediums(res.data);
            } catch(err) {console.log(err)}
        }
        fetchMediumList();
    }, []);
    
    return (
        <div className="mediums">
            <div className="mediums-container">
                <div className="mediumsAd">
                    <AdSecondary />
                </div>
                <div className="mediumsRight">
                    <div className="mediumsDisplayContainer" >
                        <div 
                            className={`
                                mediumsDisplayBackgroundTheme 
                                HIGHER_BACKGROUND 
                                ${color}
                            `} 
                            style={{height: `${height}px`}} 
                        />
                        <div 
                            className={`
                                mediumsDisplay-container 
                                ${currentUser.unionName? "union" : "flame"} 
                                BOX_SHADOW 
                                ${color}
                            `} 
                            ref={(el) => higherSpectrumBoxShadow(el, setHeight)}     
                        >
                            <ul className="mediumsDisplayList">
                                {mediums.map((medium, index) => (
                                    <li className="mediumsDisplayListItem" key={medium._id}>
                                        <MedShortDisplay medium={medium} index={index} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>            
                </div>
            </div>
        </div> 
    )
};

export default  Mediums;