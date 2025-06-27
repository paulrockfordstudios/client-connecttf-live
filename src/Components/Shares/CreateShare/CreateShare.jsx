import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cSClose, setNewShare } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import AudienceVisibilityDropdown from "../../Dropdowns/AudienceVisibilityDropdown/AudienceVisibilityDropdown";
import FlareTypeDropdown from "../../Dropdowns/FlareTypeDropdown/FlareTypeDropdown";
import {useDropzone} from 'react-dropzone';
import VisibilityIcon from "../../../Utils/icons/VisibilityIcon";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import EmojiEditor from "../../Editors/EmojiEditor/EmojiEditor";
import { axiosReq } from "../../../Utils/axiosConfig";
import ProfileLink from "../../ProfileLink/ProfileLink";
import "./CreateShare.css";
import PostShortDisplay from "../../Posts/PostDisplays/PostShortDisplay/PostShortDisplay";
import { arrowddIcon, cancelIcon } from "../../../Lib/mui/icons";
  

function CreateShare({data}) {
    
    const { user, union } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const dispatch = useDispatch();
    
    
    const [ value, setValue ] = useState("");
    const [ visible, setVisible ] = useState(user.defaultAudience ? user.defaultAudience : "Public");
    const [ visDD, setVisDD ] = useState(false);
    const [ feed, setFeed ] = useState(user.defaultFeed ? user.defaultFeed : "Journey")
    const [ fTDD, setFTDD ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);
    const [ emojiBox, setEmojiBox ] = useState(false);
    const [ emoji, setEmoji ] = useState("");
    const [ mentionPic, setMentionPic ] = useState(null);
    const [ mentionArr, setMentionArr ] = useState([]);
    const [ sBtnBckgrnd, setSBtnBckgrnd ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    const newShare = {
        flareId: data.flare._id, 
        feed: feed,
        access: visible,
        description: value, 
        mentions: mentionArr,
    }

    useEffect(() => {
        if (mentionPic) {
            setMentionArr([...mentionArr, mentionPic])
            setMentionPic(null)
        }
    }, [mentionPic])

    async function handleSubmit(event) {
        event.preventDefault();
        Object.assign(newShare, user.unionName ? {union: true, unionId: user._id} : {union: false, userId: user._id});
        try {
            await axiosReq("POST", "/shares", newShare);
            user.unionName
                ? await axiosReq("PUT",`/${data.type}s/${data.flare._id}/unionShare`, {unionId: user._id})
                : await axiosReq("PUT", `/${data.type}s/${data.flare._id}/flameShare`, {userId: user._id});
            dispatch(cSClose());
            dispatch(setNewShare(newShare));
        } catch (err) {
            console.log(err);
        }
    };

    const flareTypeHandler = () => {
        setFTDD(true)
        setImgDrop(false);
        setImgBtn(false);
    };

    const audienceVisibiltyHandler = () => {
        setVisDD(true)
        setImgDrop(false);
        setImgBtn(false);
    };

    const cancelHandler = () => {
        dispatch(cSClose())
    };

    
    return ReactDom.createPortal(
        <div className="createSharePortal">
            <div className={`createShareBackdropOverlay POPUP_BACKGROUND ${colorTheme}`} />
            <div className="createShareModal">
                <div className={`createShare flame ${colorTheme}`}>
                    <div className="createShare-container" >
                        <div className="createShareTop">
                            <div className="createShareTopUpper">
                                <i className="createShareLogo PNG_LOGO_THREE" alt="connecttf-logo-three"/>    
                                <span className="creatPostTitle">Create Share</span>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" 
                                    ? <i 
                                        className={`
                                            createShareCancelPNGIcon 
                                            PNG_ICON_CANCEL 
                                            ${colorTheme}
                                            ${cancelAct ? "drk" : cancelHov ? "" : "lgt"}
                                        `}  
                                        //alt="cancel-icon" 
                                        onClick={cancelHandler}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <div 
                                        className={`createShareCancelSVGIcon ${colorTheme}`} 
                                        onClick={cancelHandler}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr className={`createShareHr HIGHER_BACKGROUND ${colorTheme}`} />
                            <div className="createShareTopLower">
                                <ProfileLink user={user} type={"createFlare"}/>
                                <div className="createShareDropdownBtns">
                                    <button 
                                        className={`
                                            createShareDropdownBtn 
                                            ${colorTheme}
                                            ${colorTheme === "diamond" ? "DIAMOND_BTN3" : ""}
                                        `}
                                        onClick={flareTypeHandler}
                                    >
                                        <span className={`createShareDropdownTitle feed ${colorTheme}`}>{`${feed} Posts`}</span>
                                        <div className={`createShareDropdownIcon ${colorTheme}`}>{arrowddIcon}</div>
                                    </button>
                                    <button 
                                        className={`
                                            createShareDropdownBtn 
                                            ${colorTheme}
                                            ${colorTheme === "diamond" ? "DIAMOND_BTN6" : ""}
                                        `}
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div  className={`createShareVisibilityIcon public ${colorTheme}`}>
                                            <VisibilityIcon 
                                                visible={visible} 
                                                primary={{fontSize: "18px"}}
                                                secondary={{fontSize: "12px"}}
                                            />
                                        </div>
                                        <span className={`createShareDropdownTitle visibility ${colorTheme}`}>{visible}</span>
                                        <div className={`createShareDropdownIcon ${colorTheme}`}>{arrowddIcon}</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="createShareCenter">
                            <div 
                                className="createShareEditorContainerContainer editor">
                                <div 
                                    className={`
                                        createShareHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${colorTheme}
                                    `} 
                                />
                                <div className="createShareWhiteBackground" />
                                <div className={`createShareEditor INNER_BOX_SHADOW ${colorTheme}`}>
                                    <div 
                                        id={`cp-fte-${user._id}`}
                                        className="createShareEditorContainer"
                                    >
                                        <FlareTextEditor
                                            editorId={`cp-fte-${user._id}`}
                                            setValue={setValue} 
                                            ph=" Write a description... "
                                            emoji={emoji}
                                            setEmoji={setEmoji}
                                            mentionPic={mentionPic}
                                            setMentionPic={setMentionPic}
                                            mArr={mentionArr}
                                        />                          
                                    </div>
                                    <div 
                                        id="cpEmojiPickerContainer" 
                                        className={`cpEmojiPickerContainer BOX_SHADOW ${colorTheme}`} 
                                        style={emojiBox ? {height: "250px"} : {height: "0px"}}
                                    >
                                        <EmojiEditor 
                                            editorId={"cpEmojiPickerContainer"} 
                                            color={colorTheme}
                                            setEmojiBox={setEmojiBox} 
                                            setEmoji={setEmoji} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="createShareFlareDisplayContainer">
                                <PostShortDisplay post={data.flare}  sDisable={true}/>
                            </div>
                        </div>
                        <hr className={`createShareHr HIGHER_BACKGROUND ${colorTheme}`} />
                        <div className="createShareBottom">
                            <div className="createShareOptions">
                                <i
                                    className="csEmojiPickerBtn PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="createShareBottomRight">
                                <div 
                                    className={`
                                        createShareShareButtonBackground 
                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${sBtnBckgrnd ? "drk" : ""}
                                        ${colorTheme} 
                                        ${value === null || value === "" || value === "<p><br></p>" 
                                            ? "disabled" 
                                            : ""
                                        }
                                    `} 
                                    onMouseDown={() => setSBtnBckgrnd(true)}
                                    onMouseUp={() => setSBtnBckgrnd(false)}
                                >
                                    <button 
                                        className={`
                                            createShareShareButton 
                                            ${value === null || value === "" || value === "<p><br></p>" 
                                                ? `${colorTheme} lgt`
                                                : colorTheme
                                            }`
                                        } 
                                        disabled={
                                            value === null || value === "" || value === "<p><br></p>" 
                                                ? true 
                                                : false
                                            }
                                        type="button|submit|reset" 
                                        onClick={handleSubmit}
                                        onMouseDown={() => setShareAct(true)}
                                        onMouseUp={() => setShareAct(false)}
                                    >
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FlareTypeDropdown
                        type={"Post"} 
                        feed={feed} 
                        setFeed={setFeed}
                        fTDD={fTDD}
                        setFTDD={setFTDD}
                    />
                    <AudienceVisibilityDropdown
                        type={"Post"}
                        feed={feed} 
                        visible={visible} 
                        setVisible={setVisible}
                        visDD={visDD}
                        setVisDD={setVisDD}
                    />
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default CreateShare;