import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { pBEOpen, cdpBackgroundOpen } from '../../../../Redux/AuthSlice';
import "./BackgroundEditorDropdown.css";

function BackgroundEditorDropdown({ setEditBPActive }) {

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
        dispatch(pBEOpen());
    };

    const cdpBackgroundHandler = () => {
        dispatch(cdpBackgroundOpen());
    };


    return (
        <div className="backgroundEditorDropdownContainer">
            <div className={`backgroundEditorDropdownBackgroundTheme HIGHER_BACKGROUND ${colorTheme}`}/>
            <div className={`backgroundEditorDropdown-Container union BOX_SHADOW ${colorTheme}`}>
                <span className="backgroundEditorDropdownOption hov edit" onClick={editHandler}>
                    Edit
                </span>
                <hr className={`backgroundEditorDropdownHr HIGHER_BACKGROUND ${colorTheme}`} />
                <span 
                    className={`backgroundEditorDropdownOption ${user.backgroundPicture ? "hov" : "disabled"} remove`} 
                    onClick={user.backgroundPicture ? cdpBackgroundHandler : null}
                >
                    Remove
                </span>
                <hr className={`backgroundEditorDropdownHr HIGHER_BACKGROUND ${colorTheme}`} />
                <span 
                    className="backgroundEditorDropdownOption hov cancel" 
                    onClick={() => setEditBPActive(false)}
                >
                    Cancel
                </span>
            </div>
        </div>
    )
}

export default BackgroundEditorDropdown;