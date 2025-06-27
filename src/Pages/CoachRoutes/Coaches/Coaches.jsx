import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosReq } from '../../../Utils/axiosConfig';
import { higherSpectrumBoxShadow } from '../../../Utils/higherSpectrumBoxShadow';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import CoachShortDisplay from '../../../Components/Coaches/CoachShortDisplay/CoachShortDisplay';
import "./Coaches.css";


function Coaches() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const color = colorTheme(currentUser);

    const [coaches, setCoaches] = useState([]);
    const [ height, setHeight ] = useState();

    useEffect(() => {
        const fetchCoachList = async () => {
            try {
                const res = await axiosReq("GET", "/coaches/list/all");
                setCoaches(res.data);
            } catch(err) {console.log(err)}
        }
        fetchCoachList();
    }, []);

    
    return (
        <div className="coaches">
            <div className="coaches-container">
                <div className="coachesAd">
                    <AdSecondary />
                </div>
                <div className="coachesRight">
                    <div className="coachesDisplayContainer" >
                        <div 
                            className={`
                                coachesDisplayBackgroundTheme
                                HIGHER_BACKGROUND 
                                ${color}
                            `} 
                            style={{height: `${height}px`}} 
                        />
                        <div 
                            className={`
                                coachesDisplay-container 
                                ${currentUser.unionName ? "union" : "flame"} 
                                BOX_SHADOW 
                                ${color}
                            `} 
                            ref={(el) => higherSpectrumBoxShadow(el, setHeight)}
                        >
                            <ul className="coachesDisplayList">
                                {coaches.map((coach, index) => (
                                    <li className="coachesDisplayListItem" key={coach._id}>
                                        <CoachShortDisplay coach={coach} index={index} />
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

export default Coaches;