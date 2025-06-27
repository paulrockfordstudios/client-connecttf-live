import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { axiosReq } from '../../../Utils/axiosConfig';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import { getStarRating } from "../../../Utils/misc/misc";
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import "./CoachShortDisplay.css";
import { wallPaperOutlinedIcon } from '../../../Lib/mui/icons';


function CoachShortDisplay({ coach, index }) {

    const ref = useRef();

    const PS = process.env.PHOTO_STORAGE;
    
    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    const [ csdciLoad, setCSDCILoad ] = useState(true);
    const [ color, setColor ] = useState("");

    useEffect(() => {
        setColor(colorTheme(user));
    }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = coach.union 
            ? await axiosReq("GET", `/unions?unionId=${coach.unionId}`)
            : await axiosReq("GET", `/users?userId=${coach.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [coach]);

    useEffect(() => {
        if (user.unionName) {
            const getHeight = () => {
                const coachHeight = ref.current.clientHeight;
                setHeight(coachHeight);
            }
        getHeight();
        }
    }, [user]);

    
    return (
        <div className="coachShortDisplayContainer" style={{height: `${height}px`}}>
            <div 
                className={`
                    coachShortDisplayBackgroundTheme
                    HIGHER_BACKGROUND 
                    ${color}
                `} 
                style={{height: `${height}px`}} 
            />
            <div className={`coachShortDisplay union BOX_SHADOW ${color}`} ref={ref}>
                <Link to={`/coach/${coach._id}`}>
                    <div className="coachShortDisplay-container">
                        <div className="coachShortDisplayContainer">
                            <div className="coachShortDisplayContainerTop">
                                {index % 2 == 0 ? 
                                    (
                                        <>
                                            <div className="coachShortDisplayContainerTopLeft indexEven">
                                                {csdciLoad ?
                                                    (
                                                        <img 
                                                            className="coachShortDisplayContainerImg"
                                                            id={`csdci-${coach._id}`} 
                                                            src={PS + coach.linkImg}
                                                            onLoad={() => setCSDCILoad(true)}
                                                            onError={() => setCSDCILoad(false)} 
                                                            alt="" 
                                                        />     
                                                    ) : (
                                                        <div className={`coachShortDisplayContainerImg BCKGRND_LGT ${color}`}>
                                                            <div className="coachShortDisplayContainerSVGIcon">{wallPaperOutlinedIcon}</div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="coachShortDisplayContainerTopRight indexEven">
                                                <div className="coachShortDisplayContainerHeader">
                                                    <span className="coachShortDisplayContainerName">{coach.title}</span>
                                                </div>
                                                {user &&
                                                    (
                                                        <>
                                                            <Link to={`/union-profile/unionName/${user.unionName}`}>
                                                                <div className="coachShortDisplayContainerProfile">
                                                                    <img 
                                                                        className="coachShortDisplayContainerProfilePic" 
                                                                        src={
                                                                            user.unionName 
                                                                                ? user.unionProfilePicture 
                                                                                    ? PS + user.unionProfilePicture
                                                                                    : uAvatar
                                                                                : user.profilePicture
                                                                                    ? PS + user.profilePicture
                                                                                    : fAvatar
                                                                        }
                                                                        onError={e => {
                                                                            e.currentTarget.src = user.unionName 
                                                                                ? uAvatar 
                                                                                : fAvatar
                                                                        }}
                                                                        alt="union-avatar" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            coachShortDisplayContainerProfileIcon
                                                                            PNG_ICON_SPECTRUM
                                                                            ${color}
                                                                            ${user.unionName ? "union" : "flame"}
                                                                        `} 
                                                                        alt="spectrum-icon" 
                                                                    />
                                                                    <span className="coachShortDisplayContainerProfileName">{user.profileName}</span>
                                                                </div>
                                                            </Link>
                                                        </>
                                                    )
                                                }
                                                <span className="coachShortDisplayContainerDescription">{coach.description}</span>
                                                <span className="coachShortDisplayContainerLink">{coach.link}</span>
                                                <div className="coachShortDisplayContainerStats">
                                                    <div className="coachShortDisplayContainerRating">
                                                        <span className="coachShortDisplayContainerStatText">Rating:</span>
                                                        <span className="coachShortDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                    </div>
                                                    <div className="coachShortDisplayContainerReviews">
                                                        <span className="coachShortDisplayContainerStatCount">{coach.reviews.length}</span>
                                                        <span className="coachShortDisplayContainerStatText">Reviews</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </> 
                                    ) : (
                                        <>
                                            <div className="coachShortDisplayContainerTopLeft indexOdd">
                                                <div className="coachShortDisplayContainerHeader">
                                                    <span className="coachShortDisplayContainerName">{coach.title}</span>
                                                    {/*<MoreVert className="coachShortDisplayContainerMoreVert" />*/}
                                                </div>
                                                {user &&
                                                    (
                                                        <>
                                                            <Link to={`/union-profile/unionName/${user.unionName}`}>
                                                                <div className="coachShortDisplayContainerProfile">
                                                                    <img 
                                                                        className="coachShortDisplayContainerProfilePic" 
                                                                        src={
                                                                            user.unionName 
                                                                                ? user.unionProfilePicture 
                                                                                    ? PS + user.unionProfilePicture
                                                                                    : uAvatar
                                                                                : user.profilePicture
                                                                                    ? PS + user.profilePicture
                                                                                    : fAvatar
                                                                        }
                                                                        onError={e => {
                                                                            e.currentTarget.src = user.unionName 
                                                                                ? uAvatar 
                                                                                : fAvatar
                                                                        }}
                                                                        alt="union-avatar" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            coachShortDisplayContainerProfileIcon
                                                                            PNG_ICON_SPECTRUM
                                                                            ${color}
                                                                            ${user.unionName ? "union" : "flame"}
                                                                        `} 
                                                                        alt="spectrum-icon" 
                                                                    />
                                                                    <span className="coachShortDisplayContainerProfileName">{user.profileName}</span>
                                                                </div>
                                                            </Link>
                                                        </>
                                                    )
                                                }
                                                <span className="coachShortDisplayContainerDescription">{coach.description}</span>
                                                <span className="coachShortDisplayContainerLink">{coach.link}</span>
                                                <div className="coachShortDisplayContainerStats">
                                                    <div className="coachShortDisplayContainerRating">
                                                        <span className="coachShortDisplayContainerStatText">Rating:</span>
                                                        <span className="coachShortDisplayContainerStarField">{getStarRating(coach.rating)}</span>
                                                    </div>
                                                    <div className="coachShortDisplayContainerReviews">
                                                        <span className="coachShortDisplayContainerStatCount">{coach.reviews.length}</span>
                                                        <span className="coachShortDisplayContainerStatText">Reviews</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="coachShortDisplayContainerTopRight indexOdd">
                                                {csdciLoad ?
                                                    (
                                                        <img 
                                                            className="coachShortDisplayContainerImg"
                                                            id={`csdci-${coach._id}`} 
                                                            src={PS + coach.linkImg}
                                                            onLoad={() => setCSDCILoad(true)}
                                                            onError={() => setCSDCILoad(false)} 
                                                            alt="" 
                                                        />     
                                                    ) : (
                                                        <div className={`coachShortDisplayContainerImg BCKGRND_LGT ${color}`}>
                                                            <div className="coachShortDisplayContainerSVGIcon">{wallPaperOutlinedIcon}</div>
                                                        </div>
                                                    )
                                                }    
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <div className="coachShortDisplayContainerBottom">
                                <span className="coachShortDisplayContainerFriendRecommendations">
                                    Recommended by <b>Someone</b> and <b>3 others</b>.
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>         
    )
};

export default CoachShortDisplay;