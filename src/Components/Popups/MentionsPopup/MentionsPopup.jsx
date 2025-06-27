import React, { useEffect, useState } from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import "./MentionsPopup.css";
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";

function MentionsPopup({ MS, mentionPic, setMentionPic, setMentionBox, carPos }) {

    const { user } = useSelector((state) => state.auth);

    const [ longitude, setLongitude ] = useState(0);
    const [ latitude, setLatitude ] = useState(0);
    const [ height, setHeight ] = useState(0);
    const [ width, setWidth ] = useState(0);
    const [ results, setResults ] = useState([]);

    const PS = process.env.PHOTO_STORAGE;

    useEffect(() => {
        setResults(MS)
    }, [MS]);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    function getCaretCoordinates() {
        let x = 0;
        let y = 0;
        const isSupported = typeof window.getSelection !== "undefined";
        if (isSupported) {
          const selection = window.getSelection();
          // Check if there is a selection (i.e. cursor in place)
          if (selection.rangeCount !== 0) {
            // Clone the range
            const range = selection.getRangeAt(0).cloneRange();
            // Collapse the range to the start, so there are not multiple chars selected
            range.collapse(true);
            // getCientRects returns all the positioning information we need
            const rect = range.getClientRects()[0];
            if (rect) {
              x = rect.left; // since the caret is only 1px wide, left == right
              y = rect.top; // top edge of the caret
            }
          }
        }
        return { x, y };
      }

    useEffect(() => {
        const { x, y } = getCaretCoordinates();
        setLatitude(x ? x : 0);
        setLongitude(y? y : 0);
    }, [carPos]);

    const picHandler = (pick) => {
        setMentionBox(false);
        setMentionPic(pick);
    }

    return ReactDom.createPortal(
        <>
            {results.length > 0 ?
                <div 
                    className={`mentionsPopup ${colorTheme}`} 
                    style={{
                        left: `${latitude}px`, 
                        top: `${longitude - 50}px`,
                        height: `${height}px`,
                        width: `${width}px`
                    }}    
                >
                    <div className={`mentionsPopupBackgroundTheme HIGHER_BACKGROUND ${colorTheme}`} />
                    <div 
                        className={`mentionsPopupContainer BOX_SHADOW ${colorTheme}`}
                        ref={el => {
                            if (!el) return;
                            let prevValue = JSON.stringify(el.getBoundingClientRect());
                            const handle = setInterval(() => {
                                let nextValue = JSON.stringify(el.getBoundingClientRect());
                                if (nextValue === prevValue) {
                                    clearInterval(handle);
                                    setHeight(el.getBoundingClientRect().height)
                                    setWidth(el.getBoundingClientRect().width)
                                } else {
                                    prevValue = nextValue;
                                }
                            }, 10);
                        }} 
                    >
                        <ul className="mentionsPopupList">
                            {results.map((m, index) => (
                                <div className={`mentionsPopupItem ${m.color}`} key={m.id} id={m.id} onClick={() => picHandler(m)}>
                                    <img 
                                        className="mentionsPopupAvatar" 
                                        src={m.unionName ? m.avatar ? PS + m.avatar : uAvatar : m.avatar ? PS + m.avatar : fAvatar}
                                        onLoad={(e) => {e.currentTarget.src = PS + m.avatar}}
                                        onError={(e) => {e.currentTarget.src = m.unionName ? uAvatar : fAvatar}} 
                                        //alt="mention-avatar"
                                    />
                                    <i 
                                        className={`
                                            mentionsPopupIcon
                                            ${m.unionName ? "union" : "flame"} 
                                            PNG_ICON_${m.unionName ? "SPECTRUM" : "ENERGY"}
                                            ${m.color}
                                        `} 
                                    />
                                    <div className="mentionsPopupName">{m.profileName}</div>
                                </div>
                            )).slice(0/5)}
                        </ul>
                    </div>
                </div>
            : null}
        </>,
        document.getElementById("portal-two")
    )
}

export default MentionsPopup;