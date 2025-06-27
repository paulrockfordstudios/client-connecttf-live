import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import { colorTheme } from '../../../../Utils/styling/colorTheme';
import fAvatar from "../../../../Assets/picBlanks/no-avatar.jpg";
import "./MyTFRequest.css";


function MyTFRequest({flame}) {

    const dispatch = useDispatch();

    const { user, PS, folMDD } = useSelector((state) => state.auth);

    const { TF, setTF } = useState();
    const { tfSeen, setTFSeen } = useState();
    const { retort, setRetort } = useState();
    const { retortChange, setRetortChange } = useState();

    useEffect(() => {
        const getTF = async () => {
            try {
                const res = await axiosReq("GET", `/users?userId=${flame.flameRequesterId}`)
                setTF(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getTF();
    }, []);

    useEffect(() => {
        if (folMDD && tfSeen === false) {
            setTFSeen(true);
        }
    },[folMDD, tfSeen]);

    const handleAcceptRequestClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            await axiosReq("PUT", `/users/${user._id}/flame-flame/follow`, { userId: flame._id })
            dispatch(flameFollower(flame._id));
        } catch(err) {
            console.log(err);
        }
        try {
            await axiosReq("PUT", `/users/${user._id}/flame-flame/unrequestFollow`, { userId: flame._id })
            dispatch(flameUnrequestFollow(user._id));
        } catch(err) {
            console.log(err);
        }
        try {
            await axiosReq("PUT", `/friendRequests/${fr._id}/requestAccepted`)
        } catch(err) {
            console.log(err);
        }
        setTFAccepted(true);
        setRetortChange(true);
    }
   


    return (
        <>
            {TF &&
                <Link className={`myTFRequest`} to={TF.isAnonymous ? `/flame-profile/id/${TF._id}` : `/flame-profile/userName/${TF.userName}`}>
                    <div className={`myTFRequestBackgroundTheme ${tfSeen? "seen" : "unseen"} gold`} />
                    <hr className={`myTFRequestHr top ${TF?.energy}`} />
                    <div className={`myTFRequestContainer`}>
                        <div className="myTFRequestLeft">
                            <img 
                                className={`myTFRequestProfilePic`} 
                                src={TF?.isAnonymous 
                                    ? fAvatar 
                                    : TF?.profilePicture 
                                        ? PS + TF.profilePicture 
                                        : fAvatar
                                }
                                onError={(e) => {e.currentTarget.src = fAvatar}}
                                //alt="tf-avatar" 
                            />
                            <i className={`myTFRequestIcon PNG_ICON_ENERGY ${TF?.energy}`} 
                            //alt="energy-icon" 
                            />
                        </div>
                        <div className={`myTFRequestRight ${TF?.energy}`}>
                            <div className="myTFRequestRightTop">
                                <div className="myTFRequestTitle">
                                    <div className="myTFRequestTitleLeft">
                                        <span className="myTFRequestName">{TF?.profileName}</span> 
                                        <span className="myTFRequestAction">
                                            {`has ${retort === "request" ? "requested to befriend" : "befriended"} you!`}
                                        </span>
                                    </div>
                                    <div className={`myTFRequestTitleRight ${TF?.energy}`}>
                                        <i  
                                            className="myTFRequestTitleLogo PNG_LOGO_THREE"
                                            alt="connecttf-logo-three" 
                                        />  
                                    </div>
                                </div>
                            </div>                                                      
                            <div className="myTFRequestRightBottom" style={{ opacity: `${fade}%`}}>
                                    {retortDisplay}                  
                            </div>
                        </div>
                    </div>
                    <hr className={`myTFRequestHr bottom ${TF?.energy}`} />
                </Link>
            }
        </>
    );
};

export default MyTFRequest;