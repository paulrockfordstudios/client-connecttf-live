import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./HealerShortDisplay.css";
import { youtubeIcon } from '../../../Lib/mui/icons';


function HealerShortDisplay({ healer, index }) {

    const ref = useRef()

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    

    useEffect(() => {
        const fetchUser = async () => {
            const res = healer.union 
            ? await axiosReq("GET", `/unions?unionId=${healer.unionId}`)
            : await axiosReq("GET", `/users?userId=${healer.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [healer]);

    useEffect(() => {
        if (user.unionName) {
            const getHeight = () => {
                const healerHeight = ref.current.clientHeight;
                setHeight(healerHeight);
            }
        getHeight();
        }
    }, [user]);

    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="healerShortDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`healerShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`healerShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`healerShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`healerShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`healerShortDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`healerShortDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <div className="healerShortDisplay-container">
                                    <div className="healerShortDisplayContainer">
                                        <div className="healerShortDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="healerShortDisplayContainerTopLeft indexEven">
                                                            <img className="healerShortDisplayContainerImg" src={healer.linkImg} alt="" />
                                                        </div>
                                                        <div className="healerShortDisplayContainerTopRight indexEven">
                                                            <div className="healerShortDisplayContainerHeader">
                                                                <div className="healerShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div> 
                                                                <span className="healerShortDisplayContainerName">{healer.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="coachDisplayProfile">
                                                                                <img className="coachDisplayProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="coachDisplayProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="coachDisplayProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="healerShortDisplayContainerDescription">{healer.description}</span>
                                                            <span className="healerShortDisplayContainerLink">{healer.link}</span>
                                                            <div className="healerShortDisplayContainerStats">
                                                                <div className="healerShortDisplayContainerRating">
                                                                    <span className="healerShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="healerShortDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                                </div>
                                                                <div className="healerShortDisplayContainerReviews">
                                                                    <span className="healerShortDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                    <span className="healerShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="healerShortDisplayContainerTopLeft indexOdd">
                                                            <div className="healerShortDisplayContainerHeader">
                                                                <div className="healerShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div>
                                                                <span className="healerShortDisplayContainerName">{healer.title}</span>
                                                                {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                            </div>
                                                            {user &&
                                                                (
                                                                    <>
                                                                        <Link to={`/union-profile/${user.unionName}`}>
                                                                            <div className="coachDisplayProfile">
                                                                                <img className="coachDisplayProfilePic" src={user.unionProfilePicture} alt="" />
                                                                                <img className="coachDisplayProfileSpectrum" src={spectrumIcon(user.spectrum)} alt="" />
                                                                                <span className="coachDisplayProfileName">{user.profileName}</span>
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )
                                                            }
                                                            <span className="healerShortDisplayContainerDescription">{healer.description}</span>
                                                            <span className="healerShortDisplayContainerLink">{healer.link}</span>
                                                            <div className="healerShortDisplayContainerStats">
                                                                <div className="healerShortDisplayContainerRating">
                                                                    <span className="healerShortDisplayContainerStatText">Rating:</span>
                                                                    <span className="healerShortDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                                </div>
                                                                <div className="healerShortDisplayContainerReviews">
                                                                    <span className="healerShortDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                    <span className="healerShortDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="healerShortDisplayContainerTopRight indexOdd">
                                                            <img className="healerShortDisplayContainerImg" src={healer.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="healerShortDisplayContainerBottom">
                                            <span className="healerShortDisplayContainerFriendRecommendations">
                                                Recommended by <b>Someone</b> and <b>3 others</b>.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`healerShortDisplay BOX_SHADOW ${user.energy}`}>
                            <div className="healerShortDisplay-container">
                                <div className="healerShortDisplayContainer">
                                    <div className="healerShortDisplayContainerTop">
                                        {index % 2 == 0 ? 
                                            (
                                                <>
                                                    <div className="healerShortDisplayContainerTopLeft indexEven">
                                                        <img className="healerShortDisplayContainerImg" src={healer.linkImg} alt="" />
                                                    </div>
                                                    <div className="healerShortDisplayContainerTopRight indexEven">
                                                        <div className="healerShortDisplayContainerHeader">
                                                            <div className="healerShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div> 
                                                            <span className="healerShortDisplayContainerName">{healer.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="coachDisplayProfile">
                                                                            <img className="coachDisplayProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="coachDisplayProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="coachDisplayProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="healerShortDisplayContainerDescription">{healer.description}</span>
                                                        <span className="healerShortDisplayContainerLink">{healer.link}</span>
                                                        <div className="healerShortDisplayContainerStats">
                                                            <div className="healerShortDisplayContainerRating">
                                                                <span className="healerShortDisplayContainerStatText">Rating:</span>
                                                                <span className="healerShortDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                            </div>
                                                            <div className="healerShortDisplayContainerReviews">
                                                                <span className="healerShortDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                <span className="healerShortDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> 
                                            ) : (
                                                <>
                                                    <div className="healerShortDisplayContainerTopLeft indexOdd">
                                                        <div className="healerShortDisplayContainerHeader">
                                                            <div className="healerShortDisplayContainerHeaderYouTubeIcon">{youtubeIcon}</div>
                                                            <span className="healerShortDisplayContainerName">{healer.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="healerShortDisplayContainerProfile">
                                                                            <img className="healerShortDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="healerShortDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="healerShortDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="healerShortDisplayContainerDescription">{healer.description}</span>
                                                        <span className="healerShortDisplayContainerLink">{healer.link}</span>
                                                        <div className="healerShortDisplayContainerStats">
                                                            <div className="healerShortDisplayContainerRating">
                                                                <span className="healerShortDisplayContainerStatText">Rating:</span>
                                                                <span className="healerShortDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                            </div>
                                                            <div className="healerShortDisplayContainerReviews">
                                                                <span className="healerShortDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                <span className="healerShortDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="healerShortDisplayContainerTopRight indexOdd">
                                                        <img className="healerShortDisplayContainerImg" src={healer.linkImg} alt="" />    
                                                    </div>
                                                </>
                                            )
                                        }
                                        </div>
                                    <div className="healerShortDisplayContainerBottom">
                                        <span className="healerShortDisplayContainerFriendRecommendations">
                                            Recommended by <b>Someone</b> and <b>3 others</b>.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
};

export default HealerShortDisplay;