import React, { useEffect, useRef, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import "./HashtagEditor.css";
import { axiosReq, axiosInstance } from '../../../Utils/axiosConfig';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import { cancelIcon } from '../../../Lib/mui/icons';


const root = document.getElementById("root");
const inputRoot = document.getElementById("input-root");

function HashtagEditor({ tagValue, setTagValue, color, type, hashtagBox, hashtagInput, flareType, flareId, setHashtagBox }) {

    const { user } = useSelector((state) => state.auth);

    const inputRef = useRef();
    const htListRef = useRef();

    const [ value, setValue ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ tags, setTags ] = useState(tagValue? tagValue : []);
    const [ tagStrings, setTagStrings ] = useState(tagValue? tagValue : []);
    const [ tagObjs, setTagObjs ] = useState([]);
    const [ tagOptions, setTagOptions ] = useState([]);
    const [ margin, setMargin ] = useState({});
    const [ duplicateDisclaimer, setDuplicateDisclaimer ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);

    const flareString = flareType === "reply" ? "repie" : flareType;

    useEffect(() => {
        setTagValue(tags)
    }, [tags]);

    useEffect(() => {
        inputRef.current?.scrollIntoView({behavior: "smooth"});
    }, [tags]);

    useEffect(() => {
        if (htListRef?.current?.clientHeight > 30) {
            setMargin({marginBottom: "9px"})
        } 
        if (htListRef?.current?.clientHeight === 39) {
            setMargin({})
        } 
    }, [tags]);

    
    const removeTags = (idx2Rmv) => {
        const idxTag = tags[idx2Rmv];
        if (idxTag.added) {
            axiosReq("PUT", `/hashtags/${idxTag.value}${flareId}/${flareType}/subtract`);
        }
        setTags(tags.filter((_, index) => index !== idx2Rmv));
    };

    const changeHandler = (e) => {
        if(duplicateDisclaimer) {setDuplicateDisclaimer(false)};
        setValue(e.target.value);
    };

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true)
        setError(false);
        if (value.length > 0) {
            axiosInstance({
                method: "GET",
                url: "/hashtags/search",
                params: {q: value},
                signal: controller.signal,
            }).then(res => {
                setTagOptions(res.data);
                setLoading(false);
            }).catch(e => {
                if(e === "AbortError") return;
                setError(true);
            })
            return () => {controller.abort()}
        }
    }, [value])

    const addTagEnter = async (e) => {
        if (e.key !== "Enter") return;
        if (value[0] !== "#") return;
        if (value.indexOf(" ") >= 0) return;
        if (tags.includes(value)) {
            setDuplicateDisclaimer(true);
        } else {
            const tag = {value: value.substring(1), added: false};
            const exists = await axiosReq("GET", `/hashtags/${value.substring(1).toLowerCase()}/checkExistance`);
            Object.assign(tag, {exists: exists.data});
            setTags([...tags, tag]);
            e.target.value = "";
        }    
    };

    const addTagClick = async (e) => {
        const tag = {value: e.target.value[1], added: false, exists: true};
        setTags([...tags, tag]);
        document.getElementById(`he-${flareType}-${flareId}`).value = "";
    }


    return (
        <>
        <div className='mentionsEditor'>
        <div className="mentionsEditorTop">
            <div 
                className={`hashtagEditorContainer ${type}`}
                //style={type === "cb" && hashtagBox ? {height: "358px"} : {height: "0px"}}
            >
                <div 
                    className={`
                        hashtagEditorHigherSpectrumBackground 
                        HIGHER_BACKGROUND 
                        ${color} 
                        ${type}
                    `}
                    //style={type === "cb" && hashtagBox ? {height: "358px"} : {height: "0px"}} 
                />
                <div 
                    className={`hashtagEditorWhiteBackground ${type}`}
                    //style={type === "cb" && hashtagBox ? {height: "358px"} : {height: "0px"}}
                />
                <div 
                    className={`hashtagEditor INNER_BOX_SHADOW ${color} ${type}`}
                   // style={type === "cb" && hashtagBox ? {height: "358px"} : {height: "0px"}}
                >
                    <div 
                        className={`hashtagEditorContainerContainer ${type}`}
                        //style={type === "cb" && hashtagBox ? {height: "358px"} : {height: "0px"}}
                    >
                        {tags.length > 0 &&
                            <ul 
                                ref={htListRef}
                                className="hashtagList"
                            >
                                {tags.map((tag, index) => (
                                    <li 
                                        className={`hashtagItem HIGHER_BACKGROUND ${color}`}
                                        style={margin}
                                        key={index}
                                    >
                                        <span className={`hashtagItemText ${color}`}>{"#" + tag.value}</span>
                                        <div
                                            className={`hashtagIcon ${color}`}
                                            onClick={() => removeTags(index)}
                                        >
                                            {cancelIcon}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        }
                        {type === "cf" &&
                            <input
                                ref={inputRef}
                                id={`he-${flareType}-${flareId}`}
                                className={`hashtagInput ${type}`}
                                type="text"
                                placeholder="Press # to create Hashtag."
                                onChange={(e) => changeHandler(e)}
                                onKeyUp={(e) => addTagEnter(e)}
                            />
                        }
                    </div>
                    {type === "cf" && <div className="hashtagCount">{`(${tags.length})`}</div>}
                    
                </div>
            </div>
            {type === "cb" &&
                <div 
                    className="hashtagCBInputCntContainer"
                    style={hashtagInput ? {height: "90px"} : {height: "0px"}}
                >
                    <div className="hashtagCBInputCnt">
                        <input
                            ref={inputRef}
                            id={`he-${flareType}-${flareId}`}
                            className={`hashtagInput ${type}`}
                            type="text"
                            placeholder="Press # to create Hashtag."
                            onChange={(e) => changeHandler(e)}
                            onKeyUp={(e) => addTagEnter(e)}
                        />
                        <div className={`hashtagCount ${type}`}>{`(${tags.length})`}</div>
                    </div>
                    <hr 
                        className={`
                            convBarHr 
                            ${color === "diamond" ? "HIGHER_BACKGROUND" : ""}
                            ${color}
                        `} 
                    />
                </div>
            }
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
                    onClick={() => setHashtagBox(false)}
                    onMouseEnter={() => setCancelHov(true)}
                    onMouseLeave={() => setCancelHov(false)}
                    onMouseDown={() => setCancelAct(true)}
                    onMouseUp={() => setCancelAct(false)}
                />
                : <div 
                    className={`mentionsEditorCancelSVGIcon SVG_ICON_REACTIVE ${colorTheme(user)}`} 
                    onClick={() => setHashtagBox(false)}
                >
                    {cancelIcon}
                </div>
            }
        </div>
        </div>
        </>
    )
}


export default HashtagEditor;