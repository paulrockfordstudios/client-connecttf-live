import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import "./AcceptedSubscribeRequest.css";
import uAvatar from "../../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../../Assets/picBlanks/no-avatar.jpg";
import { checkIcon, peopleIcon, personIcon } from '../../../../Lib/mui/icons';


function AcceptedSubscribeRequest({ sr }) {

    const { folMDD } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [user, setUser] = useState({});
    const [ srSeen, setSrSeen ] = useState(sr.initialSeen);
    
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = sr.unionRequesteeId
                    ? await axiosReq("GET", `/unions?unionId=${sr.unionRequesteeId}`)
                    : await axiosReq("GET", `/users?userId=${sr.flameRequesteeId}`)
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, []);


    return (
        <>
            {user &&
                <>
                    {user.unionName ?
                        (
                            <>
                                <Link className={`acceptedSubRequest`} to={user.isAnonymous ? `/union-profile/id/${user._id}` : `/union-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedSubRequestBackgroundTheme ${srSeen? "seen" : "unseen"} ${user?.spectrum}`} />
                                    <hr className={`acceptedSubRequestHr top ${user?.spectrum}`} />
                                    <div className={`acceptedSubRequestContainer`}>
                                        <div className="acceptedSubRequestLeft">
                                            <img 
                                                className={`acceptedSubRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? uAvatar 
                                                    : user?.unionProfilePicture 
                                                        ? PS + user.unionProfilePicture 
                                                        : uAvatar
                                                }
                                                onError={(e) => {e.currentTarget.src = uAvatar}}
                                                //alt="union-avatar" 
                                            />
                                            <i
                                                className={`acceptedSubRequestIcon union PNG_ICON_SPECTRUM ${user?.spectrum}`} 
                                                //alt="spectrum-icon" 
                                            />
                                        </div>
                                        <div className={`acceptedSubRequestRight ${user?.spectrum}`}>
                                            <div className="acceptedSubRequestRightTop">
                                                <div className="acceptedSubRequestTitle">
                                                    <div className="acceptedSubRequestTitleLeft">
                                                        <span className="acceptedSubRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedSubRequestAction">
                                                            have accepted your subscribe request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestTitleRight ${user?.spectrum}`}>
                                                        <div className="acceptedSubRequestRetortIcon people">{peopleIcon}</div>
                                                        <div className="acceptedSubRequestRetortIcon check">{checkIcon}</div>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedSubRequestRightBottom">
                                                <div className="acceptedSubRequestRetort">
                                                    <div className="acceptedSubRequestRetortLeft friendship">
                                                        <span>
                                                            {`You are now subscribed to ${user?.profileName}. `}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestRetortRight friendship ${user.spectrum}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedSubRequestHr bottom ${user?.spectrum}`} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className={`acceptedSubRequest`} to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedSubRequestBackgroundTheme ${srSeen? "seen" : "unseen"} ${user?.energy}`} />
                                    <hr className={`acceptedSubRequestHr top ${user?.energy}`} />
                                    <div className={`acceptedSubRequestContainer`}>
                                        <div className="acceptedSubRequestLeft">
                                            <img 
                                                className={`acceptedSubRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? fAvatar 
                                                    : user?.profilePicture 
                                                        ? user.profilePicture 
                                                        : fAvatar
                                                }
                                                onError={(e) => {e.currentTarget.src = fAvatar}}
                                                //alt="flame-avatar"  
                                            />
                                            <i
                                                className={`acceptedSubRequestIcon flame PNG_ICON_ENERGY ${user?.energy}`}
                                                alt="energy-icon" 
                                            />
                                        </div>
                                        <div className={`acceptedSubRequestRight ${user?.energy}`}>
                                            <div className="acceptedSubRequestRightTop">
                                                <div className="acceptedSubRequestTitle">
                                                    <div className="acceptedSubRequestTitleLeft">
                                                        <span className="acceptedSubRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedSubRequestAction">
                                                            has accepted your subscribe request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestTitleRight ${user?.energy}`}>
                                                        <div className="acceptedSubRequestRetortIcon people">{personIcon}</div>
                                                        <div className="acceptedSubRequestRetortIcon check">{checkIcon}</div>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedSubRequestRightBottom">
                                                <div className="acceptedSubRequestRetort">
                                                    <div className="acceptedSubRequestRetortLeft friendship">
                                                        <span>
                                                            {`You are now subscribed to ${user?.profileName}. `}                                                             {/*` Send ${accepted?.sex ? accepted.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedSubRequestRetortRight friendship ${user.energy}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedSubRequestHr bottom ${user?.energy}`} />
                                </Link>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}

export default AcceptedSubscribeRequest;