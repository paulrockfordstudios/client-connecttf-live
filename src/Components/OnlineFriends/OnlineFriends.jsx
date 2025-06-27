import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../Utils/axiosConfig';
import "./OnlineFriends.css";


function OnlineFriends({user}) {

    const [friends, setFriends] =useState([]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axiosReq("GET", "/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch(err) {
                console.log(err);
            }
        }
        getFriends();
    }, [user._id]);

    return (
        <div className="onlineFriends">
            <div className="onlineFriends-container">
                <h4 className="onlinefriendsTitle">Online Friends</h4>
                <ul className="onlinefriendsList">
                {friends.map((friend) => (
                        <li className="onlineFriend" key={friend._id}>
                            <div className="onlineFriendProfilePic-container">
                                <img className="onlineFriendProfilePic" src={friend.profilePic} alt="" />
                                <span className="friendOnline"></span>
                            </div>
                            <span className="onlineFriendEnergy">{friend.energy}</span>
                            <span className="onlineFriendName">{friend.profileName}</span>  
                        </li>
                    ))}    
                </ul>
            </div>
        </div>
    )
};

export default OnlineFriends;