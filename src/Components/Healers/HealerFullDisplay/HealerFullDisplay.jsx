import React, { useEffect, useState, useRef } from 'react';
import { MoreVert, YouTube } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { getStarRating } from "../../../Utils/misc/misc";
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./HealerFullDisplay.css";


function HealerFullDisplay({ healer, index }) {

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
                        <div className="healerFullDisplayContainer" style={{height: `${height}px`}}>
                            {user.spectrum === "rainbow" && <div className={`healerFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "silver" && <div className={`healerFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "gold" && <div className={`healerFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "platinum" && <div className={`healerFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            {user.spectrum === "diamond" && <div className={`healerFullDisplayBackgroundTheme ${user.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "cover", height: `${height}px`}} />}
                            <div className={`healerFullDisplay union BOX_SHADOW ${user.spectrum}`} ref={ref}>
                                <div className="healerFullDisplay-container">
                                    <div className="healerFullDisplayContainer">
                                        <div className="healerFullDisplayContainerTop">
                                            {index % 2 == 0 ? 
                                                (
                                                    <>
                                                        <div className="healerFullDisplayContainerTopLeft indexEven">
                                                            <img className="healerFullDisplayContainerImg" src={healer.linkImg} alt="" />
                                                        </div>
                                                        <div className="healerFullDisplayContainerTopRight indexEven">
                                                            <div className="healerFullDisplayContainerHeader">
                                                                <YouTube className="healerFullDisplayContainerHeaderYouTubeIcon"/> 
                                                                <span className="healerFullDisplayContainerName">{healer.title}</span>
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
                                                            <span className="healerFullDisplayContainerDescription">{healer.description}</span>
                                                            <span className="healerFullDisplayContainerLink">{healer.link}</span>
                                                            <div className="healerFullDisplayContainerStats">
                                                                <div className="healerFullDisplayContainerRating">
                                                                    <span className="healerFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="healerFullDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                                </div>
                                                                <div className="healerFullDisplayContainerReviews">
                                                                    <span className="healerFullDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                    <span className="healerFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </> 
                                                ) : (
                                                    <>
                                                        <div className="healerFullDisplayContainerTopLeft indexOdd">
                                                            <div className="healerFullDisplayContainerHeader">
                                                                <YouTube className="healerFullDisplayContainerHeaderYouTubeIcon"/>
                                                                <span className="healerFullDisplayContainerName">{healer.title}</span>
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
                                                            <span className="healerFullDisplayContainerDescription">{healer.description}</span>
                                                            <span className="healerFullDisplayContainerLink">{healer.link}</span>
                                                            <div className="healerFullDisplayContainerStats">
                                                                <div className="healerFullDisplayContainerRating">
                                                                    <span className="healerFullDisplayContainerStatText">Rating:</span>
                                                                    <span className="healerFullDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                                </div>
                                                                <div className="healerFullDisplayContainerReviews">
                                                                    <span className="healerFullDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                    <span className="healerFullDisplayContainerStatText">Reviews</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="healerFullDisplayContainerTopRight indexOdd">
                                                            <img className="healerFullDisplayContainerImg" src={healer.linkImg} alt="" />    
                                                        </div>
                                                    </>
                                                )
                                            }
                                            </div>
                                        <div className="healerFullDisplayContainerBottom">
                                            <span className="healerFullDisplayContainerFriendRecommendations">
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
                        <div className={`healerFullDisplay BOX_SHADOW ${user.energy}`}>
                            <div className="healerFullDisplay-container">
                                <div className="healerFullDisplayContainer">
                                    <div className="healerFullDisplayContainerTop">
                                        {index % 2 == 0 ? 
                                            (
                                                <>
                                                    <div className="healerFullDisplayContainerTopLeft indexEven">
                                                        <img className="healerFullDisplayContainerImg" src={healer.linkImg} alt="" />
                                                    </div>
                                                    <div className="healerFullDisplayContainerTopRight indexEven">
                                                        <div className="healerFullDisplayContainerHeader">
                                                            <YouTube className="healerFullDisplayContainerHeaderYouTubeIcon"/> 
                                                            <span className="healerFullDisplayContainerName">{healer.title}</span>
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
                                                        <span className="healerFullDisplayContainerDescription">{healer.description}</span>
                                                        <span className="healerFullDisplayContainerLink">{healer.link}</span>
                                                        <div className="healerFullDisplayContainerStats">
                                                            <div className="healerFullDisplayContainerRating">
                                                                <span className="healerFullDisplayContainerStatText">Rating:</span>
                                                                <span className="healerFullDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                            </div>
                                                            <div className="healerFullDisplayContainerReviews">
                                                                <span className="healerFullDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                <span className="healerFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> 
                                            ) : (
                                                <>
                                                    <div className="healerFullDisplayContainerTopLeft indexOdd">
                                                        <div className="healerFullDisplayContainerHeader">
                                                            <YouTube className="healerFullDisplayContainerHeaderYouTubeIcon"/>
                                                            <span className="healerFullDisplayContainerName">{healer.title}</span>
                                                            {/*<MoreVert className="coachDisplayMoreVert" />*/}
                                                        </div>
                                                        {user &&
                                                            (
                                                                <>
                                                                    <Link to={`/flame-profile/${user.userName}`}>
                                                                        <div className="healerFullDisplayContainerProfile">
                                                                            <img className="healerFullDisplayContainerProfilePic" src={user.profilePicture} alt="" />
                                                                            <img className="healerFullDisplayContainerProfileSpectrum" src={energyIcon(user.energy)} alt="" />
                                                                            <span className="healerFullDisplayContainerProfileName">{user.profileName}</span>
                                                                        </div>
                                                                    </Link>
                                                                </>
                                                            )
                                                        }
                                                        <span className="healerFullDisplayContainerDescription">{healer.description}</span>
                                                        <span className="healerFullDisplayContainerLink">{healer.link}</span>
                                                        <div className="healerFullDisplayContainerStats">
                                                            <div className="healerFullDisplayContainerRating">
                                                                <span className="healerFullDisplayContainerStatText">Rating:</span>
                                                                <span className="healerFullDisplayContainerStarField">{getStarRating(healer.rating)}</span>
                                                            </div>
                                                            <div className="healerFullDisplayContainerReviews">
                                                                <span className="healerFullDisplayContainerStatCount">{healer.reviews.length}</span>
                                                                <span className="healerFullDisplayContainerStatText">Reviews</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="healerFullDisplayContainerTopRight indexOdd">
                                                        <img className="healerFullDisplayContainerImg" src={healer.linkImg} alt="" />    
                                                    </div>
                                                </>
                                            )
                                        }
                                        </div>
                                    <div className="healerFullDisplayContainerBottom">
                                        <span className="healerFullDisplayContainerFriendRecommendations">
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

export default HealerFullDisplay;