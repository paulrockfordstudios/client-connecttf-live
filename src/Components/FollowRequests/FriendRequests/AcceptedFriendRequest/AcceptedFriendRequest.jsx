import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat, { masks } from "dateformat";
import { axiosReq } from '../../../../Utils/axiosConfig';
import "./AcceptedFriendRequest.css";
import uAvatar from "../../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../../Assets/picBlanks/no-avatar.jpg";
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import { 
    acceptedFollowing, 
    acceptedFollower, 
    acceptedUnrequestFollow,
    
    setCv1, 
    cv1Up,   
    cv1Open, 
    setCv2, 
    cv2Up, 
    cv2Open, 
    setCv3, 
    cv3Up, 
    cv3Open, 
} from "../../../../Redux/AuthSlice";
import { checkIcon, peopleIcon, personIcon } from '../../../../Lib/mui/icons';


function AcceptedRequest({ fr }) {

    const dispatch = useDispatch();
    const { user: currentUser, folMDD } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [user, setUser] = useState({});
    const [ frSeen, setFrSeen ] = useState(fr.initialSeen);
    const [ frAccepted, setFrAccepted ] = useState(fr.requestAccepted);
    const [ frRejected, setFrRejected ] = useState(fr.requestRejected);
    const [ retort, setRetort ] = useState("");
    const [ retortDisplay, setRetortDisplay ] = useState("");
    
    const [ fade, setFade ] = useState(100);
    const [ retortChange, setRetortChange ] = useState(false);
    const [ initialize, setInitialize ] = useState(false);
    const [ conv, setConv ] = useState({});
    const conversation = conv
    const [ loading, setLoading ] = useState(true);

    const colorTheme = user 
        ? user.unionName 
            ? currentUser.spectrum 
                ? currentUser.spectrum 
                : "gray"
            : currentUser.energy
                ? currentUser.energy
                : "gray"
        : null
   
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = fr.unionRequesteeId
                    ? await axiosReq("GET", `/unions?unionId=${fr.unionRequesteeId}`)
                    : await axiosReq("GET", `/users?userId=${fr.flameRequesteeId}`)
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
                                <Link className={`acceptedRequest`} to={user.isAnonymous ? `/union-profile/id/${user._id}` : `/union-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedRequestBackgroundTheme ${frSeen? "seen" : "unseen"} ${user?.spectrum}`} />
                                    <hr className={`acceptedRequestHr top ${user?.spectrum}`} />
                                    <div className={`acceptedRequestContainer`}>
                                        <div className="acceptedRequestLeft">
                                            <img 
                                                className={`acceptedRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? uAvatar
                                                    : user?.unionProfilePicture 
                                                        ? PS + user?.unionProfilePicture 
                                                        : uAvatar
                                                }
                                                onError={(e) => {e.currentTarget.src = uAvatar}}
                                                //alt="union-avatar" 
                                            />
                                            <i 
                                                className={`acceptedRequestIcon union PNG_ICON_SPECTRUM ${user?.spectrum}`}
                                                //alt="spectrum-icon" 
                                            />
                                        </div>
                                        <div className={`acceptedRequestRight ${user?.spectrum}`}>
                                            <div className="acceptedRequestRightTop">
                                                <div className="acceptedRequestTitle">
                                                    <div className="acceptedRequestTitleLeft">
                                                        <span className="acceptedRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedRequestAction">
                                                            have accepted your befriend request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestTitleRight ${user?.spectrum}`}>
                                                        <div className="acceptedRequestRetortIcon people">{peopleIcon}</div>
                                                        <div className="acceptedRequestRetortIcon check">{checkIcon}</div>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedRequestRightBottom">
                                                <div className="acceptedRequestRetort">
                                                    <div className="acceptedRequestRetortLeft friendship">
                                                        <span>
                                                            {`You and ${user.profileName} are now `}
                                                            <b style={{ color: "#4a76fd" }}>connected</b>
                                                            <b style={{ color: "#e639af" }}>!</b>
                                                            {/*` Send ${accepted?.sex ? accepted.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestRetortRight friendship ${user?.spectrum}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedRequestHr bottom ${user?.spectrum}`} />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className={`acceptedRequest`} to={user.isAnonymous ? `/flame-profile/id/${user._id}` : `/flame-profile/userName/${user.unionName}`}>
                                    <div className={`acceptedRequestBackgroundTheme ${frSeen? "seen" : "unseen"} ${user?.energy}`} />
                                    <hr className={`acceptedRequestHr top ${user?.energy}`} />
                                    <div className={`acceptedRequestContainer`}>
                                        <div className="acceptedRequestLeft">
                                            <img 
                                                className={`acceptedRequestProfilePic`} 
                                                src={user?.isAnonymous 
                                                    ? fAvatar 
                                                    : user?.profilePicture 
                                                        ? PS + user.profilePicture 
                                                        : fAvatar
                                                }
                                                onError={(e) => {e.currentTarget.src = fAvatar}}
                                                //alt="flame-avatar"  
                                            />
                                            <i 
                                                className={`acceptedRequestIcon flame PNG_ICON_ENERGY ${user?.energy}`}
                                                //alt="energy-icon" 
                                            />
                                        </div>
                                        <div className={`acceptedRequestRight ${user?.energy}`}>
                                            <div className="acceptedRequestRightTop">
                                                <div className="acceptedRequestTitle">
                                                    <div className="acceptedRequestTitleLeft">
                                                        <span className="acceptedRequestName">{user?.profileName}</span> 
                                                        <span className="acceptedRequestAction">
                                                            has accepted your befriend request!
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestTitleRight ${user.energy}`}>
                                                        <div className="acceptedRequestRetortIcon people">{personIcon}</div>
                                                        <div className="acceptedRequestRetortIcon check">{checkIcon}</div>  
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            <div className="acceptedRequestRightBottom">
                                                <div className="acceptedRequestRetort">
                                                    <div className="acceptedRequestRetortLeft friendship">
                                                        <span>
                                                            {`You and ${user.profileName} are now `}
                                                            <b style={{ color: "#4a76fd" }}>connected</b>
                                                            <b style={{ color: "#e639af" }}>!</b>                                                                {/*` Send ${accepted?.sex ? accepted.sex === "male" ? "him" : "her" : "them"} a message.`*/}
                                                        </span>
                                                    </div>
                                                    <div className={`acceptedRequestRetortRight friendship ${user.energy}`}>
                                                        {/*<button className={`acceptedRequestBtn message ${accepted.energy}`} type="submit" onClick={handleMessageClick}>
                                                            Message
                                                        </button>*/}
                                                    </div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr className={`acceptedRequestHr bottom ${user?.energy}`} />
                                </Link>
                            </>
                        )
                    }
                </>
            }
        </>
    )
}

export default AcceptedRequest;