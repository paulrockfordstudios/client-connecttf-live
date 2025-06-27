import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { cReplyClose, setNewReply } from "../../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import {useDropzone} from 'react-dropzone';
import { colorTheme } from "../../../Utils/styling/colorTheme";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import EmojiEditor from "../../Editors/EmojiEditor/EmojiEditor";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import "./CreateReply.css";
import { addAPhotoIcon, cancelIcon } from "../../../Lib/mui/icons";


function CreateReply({data}) {
   
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { user, flare, type } = data;

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const color = colorTheme(user);
    
    const [files, setFiles] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState("");
    //const [ titleValue, setTitleValue ] = useState("");
    const [ tagValue, setTagValue ] = useState([]);
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
    const [ typeReq, setTypeReq ] = useState("");


    const newReply = { 
        flareId: flare._id,
        flareType: type,
        replyCnt: type === "reply" ? flare.replyCnt + 1 : 1,
        body: value, 
        hashtags: tagValue, 
        photos: fileNames.map((fn) => {return `Replies/${type}/${flare._id}/${fn}`}),
        mentions: mentionArr
    };

    const newReplyNot = {
        senderId: user._id,
        receiverId: flare.union ? flare.unionId : flare.userId,
        unionSender: flare.union,
        flareType: type,
        flareId: flare._id,
        flareRetortType: "Reply",
        seen: false,
    };

    useEffect(() => {
        setFiles(files.concat(acceptedFiles));
        setImgDrop(false);
        setImgBtn(false);
    }, [acceptedFiles]);

    useEffect(() => {
        if (mentionPic) {
            setMentionArr([...mentionArr, mentionPic])
            setMentionPic(null)
        }
    }, [mentionPic])
    
    useEffect(() => {
        files.forEach((file) => {
            const fileName = Date.now() + file.name;
            const folder = `Replies/${feed.toLowerCase()}/${visible.toLowerCase()}`;
            const data = new FormData();
            data.append("name", fileName);
            data.append("folder", folder);
            data.append("file", file, fileName);
            dataFiles.push(data);
            fileNames.push(fileName);
        });
    }, [files]);

    async function handleSubmit(event) {
        event.preventDefault();
        Object.assign(newReply, currentUser.unionName ? {unionId: currentUser._id, union: true} : {userId: currentUser._id, union: false});
        Object.assign(newReplyNot, currentUser.unionName ? {union: true} : {union: false});
        if (dataFiles.length > 0) {
            try {
                await Promise.all(
                   dataFiles.map((df) => axiosReq("POST", "/upload", df))
                )
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axiosReq("POST", "/Replies", newReply);
            const comRes = res.data;
            user.unionName
                ? await axiosReq("PUT",`/${type === "reply" ? "replie" : type}s/${flare._id}/unionReply`, {unionId: currentUser._id})
                : await axiosReq("PUT", `/${type === "reply" ? "replie" : type}s/${flare._id}/flameReply`, {userId: currentUser._id});
            Object.assign(comRes, {new: true});
            Object.assign(newReplyNot, {flareRetortId: comRes._id});
            await axiosReq("POST", "/flareNots", newReplyNot)
            dispatch(cReplyClose());
            dispatch(setNewReply(comRes));
        } catch (err) {
            console.log(err);
        }
    };

    const removeFiles = (idx2Rmv) => {
        setFiles(files.filter((_, index) => index !== idx2Rmv));
    };

    const imgDZHandler = () => {
        if (imgDrop === false) {
            setImgDrop(true);
        } else if (imgDrop === true) {
            setImgBtn(true);
        }
    };

    const imgBtnHandler = (event) => {
        setFiles(files.concat(Array.from(event.target.files)));
        setImgDrop(false);
        setImgBtn(false);
    };

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };



    return ReactDom.createPortal(
        <div className="createReplyPortal">
            <div className={`createReplyBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="createReplyModal">
            <div className={`createReply flame ${color}`}>
                    <div className="createReply-container" >
                        <div className="createReplyTop">
                            <div className="createReplyTopUpper">
                                <i  
                                    className="createReplyLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="createReplyTitle">Create Reply</span>
                                {color === "rainbow" ||
                                color === "silver" ||
                                color === "gold" ||
                                color === "platinum" ||
                                color === "diamond" 
                                    ? <i 
                                        className={`
                                            createReplyCancelPNGIcon 
                                            PNG_ICON_CANCEL 
                                            ${color}
                                            ${cancelAct ? "drk" : cancelHov ? "" : "lgt"}
                                        `}  
                                        //alt="cancel-icon" 
                                        onClick={() => dispatch(cReplyClose())}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <div 
                                        className={`createReplyCancelSVGIcon SVG_ICON_REACTIVE ${color}`} 
                                        onClick={() => dispatch(cReplyClose())}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr className={`createReplyHr HIGHER_BACKGROUND ${color}`} />
                        </div>
                        <div className="createReplyCenter">
                            <div 
                                className="createReplyEditorContainerContainer editor">
                                <div 
                                    className={`
                                        createReplyHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${color}
                                    `} 
                                />
                                <div className="createReplyWhiteBackground" />
                                <div className={`createReplyEditor INNER_BOX_SHADOW ${color}`}>
                                    <div 
                                        id={`cp-fte-${currentUser._id}`}
                                        className="createReplyEditorContainer"
                                    >
                                        <FlareTextEditor
                                            editorId={`cp-fte-${currentUser._id}`}
                                            setValue={setValue} 
                                            ph=" Write a description... "
                                            emoji={emoji}
                                            setEmoji={setEmoji}
                                            mentionPic={mentionPic}
                                            setMentionPic={setMentionPic}
                                            mArr={mentionArr}
                                        />
                                        <div 
                                            className="createReplyEditorContainerContainer imgDZ"
                                            style={imgDrop ? {height: "16rem" /*256*/} : {height: "0"}}
                                        >
                                            <div 
                                                className={`createReplyHigherSpectrumBackground ${color}`} 
                                                style={imgDrop ? {height: "16rem" /*256*/} : {height: "0"}}
                                            />
                                            <div
                                                className={`creatReplyImgDropzoneContainer INNER_BOX_SHADOW ${color}`}
                                                style={imgDrop ? {height: "16rem" /*256*/} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`createReplyImgDZContainer ${color}`}
                                                >
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <i className={`createReplyImgDZBorder DZ_BORDER ${color}`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `createReplyImgDropzone ${color}`})}>
                                                        <input {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    </div>
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                            className={`createReplyImgDZCancelPNGIcon ${color}`}  
                                                            src={`/icons/cancel/cancel-${color}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div 
                                                                className={`createReplyImgDZCancelSVGIcon SVG_ICON_REACTIVE ${color}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="createReplyImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createReplyImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createReplyImg" src={URL.createObjectURL(file)} alt="" />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`createReplyCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div 
                                                                className={`createReplyCancelImgSVGBtn SVG_ICON_REACTIVE ${color}`} 
                                                                onClick={() => removeFiles(index)}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}                                
                                    </div>
                                    <div 
                                        id="crpEmojiPickerContainer" 
                                        className={`crpEmojiPickerContainer BOX_SHADOW ${color}`} 
                                        style={emojiBox ? {height: "15.625rem" /*250px*/} : {height: "0px"}}
                                    >
                                        <EmojiEditor 
                                            editorId={"cpEmojiPickerContainer"} 
                                            color={color}
                                            setEmojiBox={setEmojiBox} 
                                            setEmoji={setEmoji} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="createReplyHashtagEditor">
                                <HashtagEditor 
                                    setTagValue={setTagValue}
                                    tagValue={tagValue}
                                    color={color}
                                    type={"cf"} 
                                />
                            </div>
                        </div>
                        <hr className={`createReplyHr HIGHER_BACKGROUND ${color}`} />
                        <div className="createReplyBottom">
                            <div className="createReplyOptions">
                                <label htmlFor="file" className="createReplyOption">
                                    <div className="createReplyAddPhotoSVGIcon" onClick={imgDZHandler}>{addAPhotoIcon}</div>
                                    {imgBtn === true &&
                                        <input 
                                            style={{display: "none"}} 
                                            type="file" 
                                            id="file" 
                                            multiple="multiple"
                                            accept="image/*" 
                                            onChange={(event) => imgBtnHandler(event)} 
                                        />
                                    }
                                </label>
                                <i
                                    className="crpEmojiPickerBtn PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="createReplyBottomRight">
                                <div 
                                    className={`
                                        createReplyShareButtonBackground 
                                        ${color === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${sBtnBckgrnd ? "drk" : ""}
                                        ${color} 
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
                                            createReplyShareButton 
                                            ${value === null || value === "" || value === "<p><br></p>" 
                                                ? `${color} lgt`
                                                : color
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
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default CreateReply;