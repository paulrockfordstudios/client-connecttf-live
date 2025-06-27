import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { pAEOpen, cdpAvatarOpen } from '../../../../Redux/AuthSlice';
import "./AvatarEditorDropdown.css";

function AvatarEditorDropdown({ setEditPPActive }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const colorTheme = user.unionName
        ? user.spectrum
            ? user.spectrum
            : "gray"
        : user.energy
            ? user.energy
            : "gray"

    const editHandler = () => {
        dispatch(pAEOpen());
    };

    const cdpAvatarHandler = () => {
        dispatch(cdpAvatarOpen());
    };

    
    return (
        <div className="avatarEditorDropdownContainer">
            <div className={`avatarEditorDropdownBackgroundTheme HIGHER_BACKGROUND ${colorTheme}`}/>
            <div className={`avatarEditorDropdown-Container union BOX_SHADOW ${colorTheme}`}>
                <span className="avatarEditorDropdownOption hov edit" onClick={editHandler}>
                    Edit
                </span>
                <hr className={`avatarEditorDropdownHr HIGHER_BACKGROUND ${colorTheme}`} />
                <span 
                    className={`
                        avatarEditorDropdownOption 
                        ${user.unionName 
                            ? user.unionProfilePicture 
                                ? "hov" 
                                : "disabled"
                            : user.profilePicture 
                                ? "hov" 
                                : "disabled" 
                        }
                    `} 
                    onClick={user.unionName 
                        ? user.unionProfilePicture 
                            ? cdpAvatarHandler 
                            : null
                        : user.profilePicture 
                            ? cdpAvatarHandler 
                            : null 
                    }
                >
                    Remove
                </span>
                <hr className={`avatarEditorDropdownHr HIGHER_BACKGROUND ${colorTheme}`} />
                <span 
                    className="avatarEditorDropdownOption hov cancel" 
                    onClick={() => setEditPPActive(false)}
                >
                    Cancel
                </span>
            </div>
        </div>
    )
}

export default AvatarEditorDropdown;