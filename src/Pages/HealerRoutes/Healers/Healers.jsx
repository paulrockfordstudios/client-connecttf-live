import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosReq } from '../../../Utils/axiosConfig';
import { higherSpectrumBoxShadow } from '../../../Utils/higherSpectrumBoxShadow';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import HealerShortDisplay from '../../../Components/Healers/HealerShortDisplay/HealerShortDisplay';
import "./Healers.css";


function Healers() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const color = colorTheme(currentUser);

    const [healers, setHealers] = useState([]);
    const [ height, setHeight ] = useState();

    useEffect(() => {
        const fetchHealerList = async () => {
            try {
                const res = await axiosReq("GET", "/healers/list/all");
                setHealers(res.data);
            } catch(err) {console.log(err)}
        }
        fetchHealerList();
    }, []);

    
    return (
        <div className="healers">
            <div className="healers-container">
                <div className="healersAd">
                    <AdSecondary />
                </div>
                <div className="healersRight">
                    <div className="healersDisplayContainer" >
                        <div 
                            className={`
                                healersDisplayBackgroundTheme 
                                HIGHER_BACKGROUND 
                                ${color}
                            `} 
                            style={{height: `${height}px`}} 
                        />
                        <div 
                            className={`
                                healersDisplay-container 
                                ${currentUser.unionName? "union" : "flame"} 
                                BOX_SHADOW 
                                ${color}
                            `} 
                            ref={(el) => higherSpectrumBoxShadow(el, setHeight)}     
                        >
                            <ul className="healersDisplayList">
                                {healers.map((healer, index) => (
                                    <li className="healersDisplayListItem" key={healer._id}>
                                        <HealerShortDisplay healer={healer} index={index} />
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

export default  Healers;