import React, { useState } from 'react';
import { Link } from "react-router-dom";
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import ProfileLinkBubble from '../InfoBubbles/ProfileLinkBubble/ProfileLinkBubble';
import "./ProfileLink.css";
import { colorTheme } from '../../Utils/styling/colorTheme';


function ProfileLink({ user, type, display, bubble, disabled=false }) {

    const PS = process.env.PHOTO_STORAGE;

    const color = colorTheme(user);

    const [ plBubble, setPLBubble ] = useState(false);

    return (
        <div className="profileLink" >
            <Link
                className="profileLinkContainer"
                to={user.unionName 
                    ? user.isAnonymous
                        ? `/union-profile/id/${user._id}`
                        : `/union-profile/unionName/${user.unionName}`
                    : user.isAnonymous
                        ? `/flame-profile/id/${user._id}`
                        : `/flame-profile/userName/${user.userName}`
                }
                onMouseOver={() => setPLBubble(true)}
                onMouseLeave={() => setPLBubble(false)}
            >
                <img 
                    className={`profileLinkAvatar ${type} ${display}`} 
                    src={user.isAnonymous
                        ? user.unionName
                            ? uAvatar
                            : fAvatar
                        : user.unionName 
                            ? user.unionProfilePicture
                                ? PS + user.unionProfilePicture
                                : uAvatar
                                  
                            : user.profilePicture
                                ? PS + user.profilePicture
                                : fAvatar
                    }  
                    onError={(e) => {
                        e.currentTarget.src = user.unionName
                            ? uAvatar
                            : fAvatar
                    }}
                    alt="profile-link-avatar" 
                />
                {color !== "grey" &&
                    <i 
                        className={`
                            profileLinkIcon 
                            ${type}
                            ${user.unionName ? "union" : "flame"}
                            PNG_ICON_${user.unionName ? "SPECTRUM" : "ENERGY"} 
                            ${color}
                        `}
                        alt="profile-link-icon" 
                    />
                }
                <span className={`profileLinkName ${type}`}>
                    {user.isAnonymous 
                        ? user.unionName 
                            ? "Anonymous Union" 
                            : "Anonymous User" 
                        : user.profileName
                    }
                </span>
            </Link>
            {bubble &&
                <div 
                    className={`
                        profileLinkInfoBubble
                        ${type}
                        ${display}
                        ${user.unionName ? "union" : "flame"}
                    `} 
                    style={plBubble ? {opacity: "100%"} : {opacity: "0%"}}
                >
                    <ProfileLinkBubble user={user} type={type} display={display}/>
                </div>
            }
        </div>
    )
};

export default ProfileLink;