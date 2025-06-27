import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosReq } from '../../../Utils/axiosConfig';
import { higherSpectrumBoxShadow } from '../../../Utils/higherSpectrumBoxShadow';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import ChannelShortDisplay from '../../../Components/Channels/ChannelShortDisplay/ChannelShortDisplay';
import "./Channels.css";


function Channels() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const color = colorTheme(currentUser);

    const [channels, setChannels] = useState([]);
    const [ height, setHeight ] = useState();

    useEffect(() => {
        const fetchChannelList = async () => {
            const res = await axiosReq("GET", "/channels/list/all");
            setChannels(res.data);
        }
        fetchChannelList();
    }, []);

    
    return (
        <div className="channels">
            <div className="channels-container">
                <div className="channelsAd">
                    <AdSecondary />
                </div>
                <div className="channelsRight">
                    <div className="channelsDisplayContainer" >
                        <div 
                            className={`
                                channelsDisplayBackgroundTheme 
                                HIGHER_BACKGROUND 
                                ${color}
                            `} 
                            style={{height: `${height}px`}} 
                        />
                        <div 
                            className={`
                                channelsDisplay-container 
                                ${currentUser.unionName? "union" : "flame"} 
                                BOX_SHADOW 
                                ${color}
                            `} 
                            ref={(el) => higherSpectrumBoxShadow(el, setHeight)}     
                        >
                            <ul className="channelsDisplayList">
                                {channels.map((channel, index) => (
                                    <li className="channelsDisplayListItem" key={channel._id}>
                                        <ChannelShortDisplay channel={channel} index={index} />
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

export default Channels;