import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { cCClose, setNewComment } from "../../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import {useDropzone} from 'react-dropzone';
import { colorTheme } from "../../../Utils/styling/colorTheme";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import EmojiEditor from "../../Editors/EmojiEditor/EmojiEditor";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import "./CreateComment.css";
import { addAPhotoIcon, cancelIcon } from "../../../Lib/mui/icons";


function CreateComment({data}) {
   
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState("");
    const [ tagValue, setTagValue ] = useState([]);
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

    const {user, flare, type} = data;

    const color = colorTheme(currentUser);

    const newComment = { 
        flareType: type,
        flareId: flare._id,
        body: value, 
        hashtags: tagValue, 
        photos: fileNames.map((fn) => {return `comments/${type}/${flare._id}/${fn}`;}),
        mentions: mentionArr
    };

    const newCommentNot = {
        senderId: currentUser._id,
        receiverId: flare.union ? flare.unionId : flare.userId,
        unionSender: currentUser.inUnion,
        flareType: "post",
        flareId: flare._id,
        flareRetortType: "comment",
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
            const folder = `comments/${flare.type}/${flare._id}`;
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
        Object.assign(newComment, currentUser.unionName ? {unionId: currentUser._id, union: true} : {userId: currentUser._id, union: false});
        Object.assign(newCommentNot, currentUser.unionName ? {union: true} : {union: false});
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
            const res = await axiosReq("POST", "/comments", newComment);
            const comRes = res.data;
            user.unionName
                ? await axiosReq("PUT",`/${type}s/${flare._id}/unionComment`, {unionId: currentUser._id})
                : await axiosReq("PUT", `/${type}s/${flare._id}/flameComment`, {userId: currentUser._id});
            Object.assign(comRes, {new: true});
            Object.assign(newCommentNot, {flareRetortId: comRes._id});
            await axiosReq("POST", "/flareNots", newCommentNot)
            dispatch(cCClose());
            dispatch(setNewComment(comRes));
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
        <div className="createCommentPortal">
            <div className={`createCommentBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="createCommentModal">
            <div className={`createComment flame ${color}`}>
                    <div className="createComment-container" >
                        <div className="createCommentTop">
                            <div className="createCommentTopUpper">
                                <i  
                                    className="createCommentLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="creatCommentTitle">Create Comment</span>
                                {color === "rainbow" ||
                                color === "silver" ||
                                color === "gold" ||
                                color === "platinum" ||
                                color === "diamond" 
                                    ? <i 
                                        className={`
                                            createCommentCancelPNGIcon 
                                            PNG_ICON_CANCEL 
                                            ${color}
                                            ${cancelAct ? "drk" : cancelHov ? "" : "lgt"}
                                        `}  
                                        //alt="cancel-icon" 
                                        onClick={() => dispatch(cCClose())}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <div 
                                        className={`createCommentCancelSVGIcon ${color}`} 
                                        onClick={() => dispatch(cCClose())}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr className={`createCommentHr HIGHER_BACKGROUND ${color}`} />
                        </div>
                        <div className="createCommentCenter">
                            <div 
                                className="createCommentEditorContainerContainer editor">
                                <div 
                                    className={`
                                        createCommentHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${color}
                                    `} 
                                />
                                <div className="createCommentWhiteBackground" />
                                <div className={`createCommentEditor INNER_BOX_SHADOW ${color}`}>
                                    <div 
                                        id={`cp-fte-${user._id}`}
                                        className="createCommentEditorContainer"
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
                                            className="createCommentEditorContainerContainer imgDZ"
                                            style={imgDrop ? {height: "256px"} : {height: "0"}}
                                        >
                                            <div 
                                                className={`createCommentHigherSpectrumBackground ${color}`} 
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            />
                                            <div
                                                className={`creatCommentImgDropzoneContainer INNER_BOX_SHADOW ${color}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`createCommentImgDZContainer ${color}`}
                                                >
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <i className={`createCommentImgDZBorder DZ_BORDER ${color}`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `createCommentImgDropzone ${color}`})}>
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
                                                            className={`createCommentImgDZCancelPNGIcon ${color}`}  
                                                            src={`/icons/cancel/cancel-${color}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div
                                                                className={`createCommentImgDZCancelSVGIcon ${color}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="createCommentImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createCommentImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createCommentImg" src={URL.createObjectURL(file)} alt="" />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`createCommentCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div 
                                                                className={`createCommentCancelImgSVGBtn ${color}`} 
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
                                        id="ccEmojiPickerContainer" 
                                        className={`ccEmojiPickerContainer BOX_SHADOW ${color}`} 
                                        style={emojiBox ? {height: "250px"} : {height: "0px"}}
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
                            <div className="createCommentHashtagEditor">
                                <HashtagEditor 
                                    setTagValue={setTagValue}
                                    tagValue={tagValue}
                                    color={color}
                                    type={"cf"} 
                                />
                            </div>
                        </div>
                        <hr className={`createCommentHr HIGHER_BACKGROUND ${color}`} />
                        <div className="createCommentBottom">
                            <div className="createCommentOptions">
                                <label htmlFor="file" className="createCommentOption">
                                    <div
                                        className="createCommentAddPhotoSVGIcon" 
                                        onClick={imgDZHandler}
                                    >
                                        {addAPhotoIcon}
                                    </div>
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
                                    className="ccEmojiPickerBtn PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="createCommentBottomRight">
                                <div 
                                    className={`
                                        createCommentShareButtonBackground 
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
                                            createCommentShareButton 
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
                                        Share
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

export default CreateComment;