import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./ChannelShortDisplay.css";
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import { wallPaperOutlinedIcon, youtubeIcon } from '../../../Lib/mui/icons';



function ChannelShortDisplay({ channel, index }) {

    const ref = useRef();

    const PS = process.env.PHOTO_STORAGE;

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    const [ csdciLoad, setCSDCILoad ] = useState(true);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    const csdcImg = document.getElementById(`csdci-${channel._id}`)
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = channel.union 
            ? await axiosReq("GET", `/unions?unionId=${channel.unionId}`)
            : await axiosReq("GET", `/users?userId=${channel.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [channel]);

    useEffect(() => {
        if (user.unionName) {
            const getHeight = () => {
                const channelHeight = ref.current.clientHeight;
                setHeight(channelHeight);
            }
        getHeight();
        }
    }, [user]);

    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="channelShortDisplayContainer" style={{height: `${height}px`}}>
                            <div 
                                className={`
                                    channelShortDisplayBackgroundTheme
                                    HIGHER_BACKGROUND 
                                    ${user.spectrum}
                                `} 
                                style={{height: `${height}px`}} 
                            />
                            <div className={`channelShortDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <Link to={`/channel/${channel._id}`}>
                                    <div className="channelShortDisplay-container">
                                        <div className="channelShortDisplayContainer">
                                            <div className="channelShortDisplayContainerTop">
                                                {index % 2 == 0 ? 
                                                    (
                                                        <>
                                                            <div className="channelShortDisplayContainerTopLeft indexEven">
                                                                {csdciLoad ?
                                                                    (
                                                                        <img 
                                                                            className="channelShortDisplayContainerImg"
                                                                            id={`csdci-${channel._id}`} 
                                                                            src={PS + channel.linkImg}
                                                                            onLoad={() => setCSDCILoad(true)}
                                                                            onError={() => setCSDCILoad(false)} 
                                                                            alt="" 
                                                                        />     
                                                                    ) : (
                                                                        <div className={`channelShortDisplayContainerImg BCKGRND_LGT ${colorTheme}`}>
                                                                            <div className="channelShortDisplayContainerSVGIcon">{wallPaperOutlinedIcon}</div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="channelShortDisplayContainerTopRight indexEven">
                                                                <div className="channelShortDisplayContainerHeader">
                                                                    <div className="channelShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div> 
                                                                    <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                    {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                                </div>
                                                                {user &&
                                                                    (
                                                                        <>
                                                                            <Link to={`/union-profile/unionName/${user.unionName}`}>
                                                                                <div className="channelShortDisplayContainerProfile">
                                                                                    <img 
                                                                                        className="channelShortDisplayContainerProfilePic" 
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
                                                                                        alt="channel-avatar" 
                                                                                    />
                                                                                    <i 
                                                                                        className={`
                                                                                            channelShortDisplayContainerProfileIcon
                                                                                            PNG_ICON_SPECTRUM
                                                                                            ${colorTheme}
                                                                                            ${user.unionName ? "union" : "flame"}
                                                                                        `} 
                                                                                        alt="spectrum-icon" 
                                                                                    />
                                                                                    <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }
                                                                <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                                <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                                <div className="channelShortDisplayContainerStats">
                                                                    <div className="channelShortDisplayContainerRating">
                                                                        <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                        <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                    </div>
                                                                    <div className="channelShortDisplayContainerReviews">
                                                                        <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                        <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </> 
                                                    ) : (
                                                        <>
                                                            <div className="channelShortDisplayContainerTopLeft indexOdd">
                                                                <div className="channelShortDisplayContainerHeader">
                                                                    <div className="channelShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div>
                                                                    <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                    {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                                </div>
                                                                {user &&
                                                                    (
                                                                        <>
                                                                            <Link to={`/union-profile/unionName/${user.unionName}`}>
                                                                                <div className="channelShortDisplayContainerProfile">
                                                                                    <img 
                                                                                        className="channelShortDisplayContainerProfilePic" 
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
                                                                                        alt="coach-avatar" 
                                                                                    />
                                                                                    <i 
                                                                                        className={`
                                                                                            channelShortDisplayContainerProfileIcon
                                                                                            PNG_ICON_SPECTRUM
                                                                                            ${colorTheme}
                                                                                            ${user.unionName ? "union" : "flame"}
                                                                                        `} 
                                                                                        alt="spectrum-icon" 
                                                                                    />
                                                                                    <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }
                                                                <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                                <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                                <div className="channelShortDisplayContainerStats">
                                                                    <div className="channelShortDisplayContainerRating">
                                                                        <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                        <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                    </div>
                                                                    <div className="channelShortDisplayContainerReviews">
                                                                        <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                        <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="channelShortDisplayContainerTopRight indexOdd">
                                                                {csdciLoad ?
                                                                    (
                                                                        <img 
                                                                            className="channelShortDisplayContainerImg"
                                                                            id={`csdci-${channel._id}`} 
                                                                            src={PS + channel.linkImg}
                                                                            onLoad={() => setCSDCILoad(true)}
                                                                            onError={() => setCSDCILoad(false)} 
                                                                            alt="" 
                                                                        />     
                                                                    ) : (
                                                                        <div className={`channelShortDisplayContainerImg BCKGRND_LGT ${colorTheme}`}>
                                                                            <div className="channelShortDisplayContainerSVGIcon">{wallPaperOutlinedIcon}</div>
                                                                        </div>
                                                                    )
                                                                }    
                                                            </div>
                                                        </>
                                                    )
                                                }
                                                </div>
                                            <div className="channelShortDisplayContainerBottom">
                                                <span className="channelShortDisplayContainerFriendRecommendations">
                                                    Recommended by <b>Someone</b> and <b>3 others</b>.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`channelShortDisplay BOX_SHADOW ${user.energy}`}>
                            <Link to={`/channel/${channel._id}`}>
                                <div className="channelShortDisplay-container">
                                    <div className="channelShortDisplayContainer">
                                        <div className="channelShortDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="channelShortDisplayContainerTopLeft indexEven">
                                                            <img className="channelShortDisplayContainerImg" src={channel.linkImg} alt="" />
                                                        </div>
                                                        <div className="channelShortDisplayContainerTopRight indexEven">
                                                            <div className="channelShortDisplayContainerHeader">
                                                                <div className="channelShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div>
                                                                <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/flame-profile/userName/${user.userName}`}>
                                                                            <div className="channelShortDisplayContainerProfile">
                                                                                <img className="channelShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                                <img className="channelShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                                <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                            <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                            <div className="channelShortDisplayContainerStats">
                                                                <div className="channelShortDisplayContainerRating">
                                                                    <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                </div>
                                                                <div className="channelShortDisplayContainerReviews">
                                                                    <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                    <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="channelShortDisplayContainerTopLeft indexOdd">
                                                            <div className="channelShortDisplayContainerHeader">
                                                                <div className="channelShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div>
                                                                <span className="channelShortDisplayContainerName">{channel.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/flame-profile/userName/${user.userName}`}>
                                                                            <div className="channelShortDisplayContainerProfile">
                                                                                <img className="channelShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                                <img className="channelShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                                <span className="channelShortDisplayContainerProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="channelShortDisplayContainerDescription">{channel.description}</span>
                                                            <span className="channelShortDisplayContainerLink">{channel.link}</span>
                                                            <div className="channelShortDisplayContainerStats">
                                                                <div className="channelShortDisplayContainerRating">
                                                                    <span className="channelShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="channelShortDisplayContainerStarField">{getStarRating(channel.rating)}</span>
                                                                </div>
                                                                <div className="channelShortDisplayContainerReviews">
                                                                    <span className="channelShortDisplayContainerStatCount">{channel.reviews.length}</span>
                                                                    <span className="channelShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="channelShortDisplayContainerTopRight indexOdd">
                                                            <img className="channelShortDisplayContainerImg" src={channel.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="channelShortDisplayContainerBottom">
                                            <span className="channelShortDisplayContainerFriendRecommendations">
                                                Recommended by <b>Someone</b> and <b>3 others</b>.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </>
                )
            }
        </>
    )
};

export default ChannelShortDisplay;