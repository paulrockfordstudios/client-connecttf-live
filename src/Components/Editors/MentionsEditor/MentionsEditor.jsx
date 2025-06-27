import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import './MentionsEditor.css';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import { cancelIcon } from '../../../Lib/mui/icons';

function MentionsEditor({ setMentionPic, setMentionsBox, mentionsBox }) {


    const { user, mentions } = useSelector((state) => state.auth);

    const inputRef = useRef();

    const PS = process.env.PHOTO_STORAGE;

    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ query, setQuery ] = useState("");
    const [ mentionSuggestions, setMentionSuggestions ] = useState([]);

    useEffect(() => {
        if (mentionsBox) {
            return inputRef.current.focus();
        }
    }, [mentionsBox]);

    useEffect(() => {
        if (query.length > 0) {
            const fMentions = mentions.filter((m) => m.profileName[0].toLowerCase() === query[0].toLowerCase());
            setMentionSuggestions(fMentions.filter((m) => m.profileName.toLowerCase().includes(query.toLowerCase())));
        } else {
            setMentionSuggestions(mentions);
        }
    }, [query]);

    const picHandler = (pick) => {
        setMentionsBox(false);
        setMentionPic(pick);
    }

    return (
        <div className='mentionsEditor'>
            <div className="mentionsEditorTop">
                <input 
                    className={`mentionsEditorInput INNER_BOX_SHADOW ${colorTheme(user)}`}
                    ref={inputRef}
                    type="text"
                    placeholder='@ Search freinds.'
                    onChange={(e) => setQuery(e.target.value)}
                />
                {colorTheme(user) === "rainbow" ||
                colorTheme(user) === "silver" ||
                colorTheme(user) === "gold" ||
                colorTheme(user) === "platinum" ||
                colorTheme(user) === "diamond" 
                    ? <i 
                        className={`
                            mentionsEditorCancelPNGIcon 
                            PNG_ICON_CANCEL 
                            ${colorTheme(user)}
                            ${cancelAct ? "drk" : cancelHov ? "" : "lgt"}
                        `}  
                        alt="cancel-icon" 
                        onClick={() => setMentionsBox(false)}
                        onMouseEnter={() => setCancelHov(true)}
                        onMouseLeave={() => setCancelHov(false)}
                        onMouseDown={() => setCancelAct(true)}
                        onMouseUp={() => setCancelAct(false)}
                    />
                    : <div 
                        className={`mentionsEditorCancelSVGIcon SVG_ICON_REACTIVE ${colorTheme(user)}`} 
                        onClick={() => setMentionsBox(false)}
                    >
                        {cancelIcon}
                    </div>
                }
            </div>
            <div 
                className="mentionsEditorBottom"
                style={mentionSuggestions.length > 4 ? {overflow: "auto"} : {overflow: "hidden"}}
            >
                <ul className="mentionsEditorList">
                    {mentionSuggestions.map((m) => (
                        <div className={`mentionsEditorItem ${m.color}`} key={m.id} id={m.id} onClick={() => picHandler(m)}>
                            <img 
                                className="mentionsEditorAvatar" 
                                src={m.unionName ? m.avatar ? PS + m.avatar : uAvatar : m.avatar ? PS + m.avatar : fAvatar}
                                onLoad={(e) => {e.currentTarget.src = PS + m.avatar}}
                                onError={(e) => {e.currentTarget.src = m.unionName ? uAvatar : fAvatar}} 
                                alt="mention-avatar"
                            />
                            <i 
                                className={`
                                    mentionsEditorIcon
                                    ${m.unionName ? "union" : "flame"} 
                                    PNG_ICON_${m.unionName ? "SPECTRUM" : "ENERGY"}
                                    ${m.color}
                                `} 
                            />
                            <div className="mentionsEditorName">{m.profileName}</div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default MentionsEditor;