import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { axiosReq } from '../../Utils/axiosConfig';
import { higherSpectrumBoxShadow } from '../../Utils/higherSpectrumBoxShadow';
import { colorTheme } from '../../Utils/styling/colorTheme';
import ShareFullDisplay from '../../Components/Shares/ShareDisplays/ShareFullDisplay/ShareFullDisplay';
import AdSecondary from '../../Components/AdSpace/AdSecondary/AdSecondary';
import "./share.css";


function Share() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();

    const [ share, setShare ] = useState();
    const [ height, setHeight ] = useState();
    

    useEffect(() => {
        const fetchShare = async () => {
            const res = await axiosReq("GET", `/shares/${id}`);
            setShare(res.data);
        }
        fetchShare();
    }, [id]);


    return (
        <>
            <div className="share">
                <div className="share-container">
                    <div className="shareAd">
                        <AdSecondary />
                    </div>
                    <div className="shareRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    {share && <div className="shareDisplayContainer" >
                                        <div 
                                            className={`shareDisplayBackgroundTheme HIGHER_BACKGROUND ${colorTheme(currentUser)}`} 
                                            style={{height: `${height}px`}} 
                                        />              
                                        <div className={`shareDisplay-container union BOX_SHADOW ${colorTheme(currentUser)}`}
                                        ref={(el) => higherSpectrumBoxShadow(el, setHeight)}
                                        >
                                            <ShareFullDisplay share={share} />
                                        </div>
                                    </div>}
                                </>
                            ): (
                                <>
                                    {share && <div className={`shareDisplay-container flame BOX_SHADOW ${colorTheme(currentUser)}`}>
                                        <ShareFullDisplay share={share} />
                                    </div>}
                                </>
                            )
                        }
                    </div>
                </div>
            </div> 
        </>
    )
};

export default Share;