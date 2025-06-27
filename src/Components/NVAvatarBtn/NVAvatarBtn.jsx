import React from 'react';
import { useSelector } from 'react-redux';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import "./NVAvatarBtn.css";
import { colorTheme } from '../../Utils/styling/colorTheme';
import { higherOrderNxD } from '../../Utils/styling/higherOrder';


function NVAvatarBtn() {

    const { user, flame, union, screenMode } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    return (
        <div className="nvAvatarBtn">
            {user.inUnion &&
                <div 
                    className={`
                        nvAvatarBtnBackground 
                        cp-bgc-brt
                        static
                        ${colorTheme(user.unionName ? flame : union)}${higherOrderNxD(user) ? "" : "Alt"}
                    `}
                />
            }
            <img 
                className={`nvAvatarBtnAltAvatarImg ${user.inUnion ? "bg" : "nbg"}`} 
                src={`${user.unionName ? uAvatar : fAvatar}`} 
                alt=""
            />
            <div className={`nvAvatarBtnAvatarBg ${screenMode} ${user.inUnion ? "bg" : "nbg"}`}/>
                <img 
                    className={`nvAvatarBtnAvatarImg ${user.inUnion ? "bg" : "nbg"}`} 
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
                    alt="navbar-btn-avatar" 
                />
        </div>
    )
};

export default NVAvatarBtn;