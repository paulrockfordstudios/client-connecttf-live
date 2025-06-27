import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dFOpen, eFOpen, fFOpen, cReportOpen } from "../../../Redux/AuthSlice";
import "./FlareOptionsDropdown.css";
import { colorTheme } from '../../../Utils/styling/colorTheme';

function flareOptionsDropdown({ data }) {

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    const { user, flare, type, flagged} = data;

    const editHandler = () => {
        dispatch(eFOpen(data));
    };

    const deleteHandler = () => {
        dispatch(dFOpen(data));
    };

    const flagHandler = () => {
        dispatch(fFOpen(data));
    };

    const reportHandler = () => {
        dispatch(cReportOpen(data));
    };


    return (
        <div className="flareOptionsDropdownContainer">
            <div className={`flareOptionsDropdownBackgroundTheme HIGHER_BACKGROUND ${colorTheme(user)}`}/>
            <div className={`flareOptionsDropdown-Container union BOX_SHADOW ${colorTheme(user)}`}>
                {currentUser._id === user._id ?
                    (
                        <>
                            <span className="flareOptionsDropdownOption" onClick={editHandler}>Edit</span>
                            <hr className={`flareOptionsDropdownHr ${colorTheme(user) === "diamond" && "HIGHER_BACKGROUND"} ${colorTheme(user)}`} />
                            <span className="flareOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                        </>
                    ) : (
                        <>
                            <span className="flareOptionsDropdownOption" onClick={flagHandler}>{flagged ? "Unflag" : "Flag"}</span>
                            <hr className={`flareOptionsDropdownHr ${colorTheme(user) === "diamond" && "HIGHER_BACKGROUND"} ${colorTheme(user)}`} />
                            <span className="flareOptionsDropdownOption" onClick={reportHandler}>Report</span>
                            {/*prompt === "comment" || prompt === "answer" || prompt === "reply" ?
                                (
                                    <>
                                        <hr className={`flareOptionsDropdownHr ${colorTheme(user) === "diamond" && "HIGHER_BACKGROUND"} ${colorTheme(user)}`} />
                                        <span className="flareOptionsDropdownOption" onClick={deleteHandler}>Delete</span>
                                    </>
                                ) : (<></>)
                                */}
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default flareOptionsDropdown;