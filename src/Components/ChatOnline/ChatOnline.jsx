import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./ChatOnline.css";
import { axiosReq } from '../../Utils/axiosConfig';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";

function ChatOnline({ setCurrentChat }) {

    const { user, actAcc, onlineFlames, onlineUnions } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [flameFriends, setFlameFriends] = useState([]);
    const [unionFriends, setUnionFriends] = useState([]);
    const [onlineFlameFriends, setOnlineFlameFriends] = useState([]);
    const [onlineUnionFriends, setOnlineUnionFriends] = useState([]);

    
    useEffect(() => {
        const getFriends = async () => {
            const flameRes = await axiosReq("GET", `/${user.unionName ? "unions" : "users"}/flame-following/${user._id}`);
            setFlameFriends(flameRes.data);
            const unionRes = await axiosReq("GET", `/${user.umionName ? "unions" : "users"}/union-following/${user._id}`);
            setUnionFriends(unionRes.data);
        }
        getFriends();
    }, [user]);

    useEffect(() => {
        setOnlineFlameFriends(flameFriends.filter((fFriend) => onlineFlames.includes(fFriend._id)));
        setOnlineUnionFriends(unionFriends.filter((uFriend) => onlineUnions.includes(uFriend._id)));
    }, [flameFriends, unionFriends, onlineFlames, onlineUnions]);

    const handleClick = async (receiver) => {
        const senderStatus = user.unionName? "union" : "flame";
        const receiverStatus = receiver.unionName? "union" : "flame";
        const senderId = user._id;
        const receiverId = receiver._id;
        const res = await axiosReq("GET", `/conversations/findOne/${senderStatus}/${receiverStatus}/${senderId}/${receiverId}`);
        setCurrentChat(res.data);
    };


    return (
        <div className="chatOnline">
            <div className="chatOnlineContainer union">
                <span className={`chatOnlineContainerText ${user.unionName ? user.spectrum : user.energy}`}>Union Friends Online</span>
                <hr className={`chatOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />
                {onlineUnionFriends.map((ouf) => (
                    <div className="chatOnlineFriend" key={ouf._id} onClick={() => handleClick(ouf)}>
                        <div className="chatOnlineImg-container">
                            <img 
                                className={`chatOnlineImg ${ouf.spectrum}`} 
                                src={ouf.unionProfilePicture? PS + ouf.unionProfilePicture : uAvatar} 
                                onError={(e) => {e.currentTarget.src = uAvatar}}
                                //alt="union-avatar" 
                            />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineProfileName">{ouf.profileName}</span>
                    </div>
                ))}
           </div>
           <div className="chatOnlineContainer flame">
                <span className={`chatOnlineContainerText ${user.unionName ? user.spectrum : user.energy}`}>Flame Friends Online</span>
                <hr className={`chatOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />
                {onlineFlameFriends.map((off) => (
                    <div className="chatOnlineFriend" key={off._id} onClick={() => handleClick(off)}>
                        <div className="chatOnlineImg-container">
                            <img 
                                className={`chatOnlineImg ${off.energy}`} 
                                src={off.isAnonymous 
                                    ? fAvatar 
                                    : off.profilePicture
                                        ? PS + off.profilePicture 
                                        : fAvatar
                                } 
                                onError={(e) => {e.currentTarget.src = fAvatar}}
                                //alt="flame-avatar"
                            />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineProfileName">{off.profileName}</span>
                    </div>
            ))}
           </div>
        </div> 
    )
};

export default ChatOnline;