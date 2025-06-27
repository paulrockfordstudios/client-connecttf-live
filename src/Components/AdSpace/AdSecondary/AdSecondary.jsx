import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./AdSecondary.css";


function AdSecondary() {

    const PS = process.env.PHOTO_STORAGE;

    /*const [adsObj, setAdsObj] =useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            const res = await axiosReq("GET", `/advertisements/ads/all`);
            setAdsObj(res.data);
        }
        fetchAds();
    }, []);

    const ads = adsObj.map((adObj, index) => {
        return (
            <div className="ad" key={index}>
                <Link to={adObj.adLink}>
                    <img className="AdSpacePic" src={adObj.adPhoto} alt="" />
                </Link>
            </div>
        )
    });

    const randumNum = Math.floor(Math.random() * ads.length)*/
    
    return (
        <div className="adSecondary">
            <div className="adSecondary-container">
                <img className="adSecondaryPic" src={PS + "data/dummyData/dummySamplePics/tbadPics/tbad1.jpg"} alt="" />
                {/*ads[randumNum]*/}
            </div>  
        </div> 
    )
};

export default AdSecondary;