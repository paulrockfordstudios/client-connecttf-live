import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { cCClose, eFClose, setEditedCom } from "../../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import {useDropzone} from 'react-dropzone';
import { colorTheme } from "../../../Utils/styling/colorTheme";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import EmojiEditor from "../../Editors/EmojiEditor/EmojiEditor";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import "./EditComment.css";
import { addAPhotoIcon, cancelIcon } from "../../../Lib/mui/icons";


function EditComment({data}) {
   
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const {user, flare, type} = data;

    const color = colorTheme(user);
    
    const [files, setFiles] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState(flare.body);
    const [ tagValue, setTagValue ] = useState(flare.hashtags);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);
    const [ emojiBox, setEmojiBox ] = useState(false);
    const [ emoji, setEmoji ] = useState("");
    const [ mentionPic, setMentionPic ] = useState(null);
    const [ mentionArr, setMentionArr ] = useState(flare.mentions);
    const [ sBtnBckgrnd, setSBtnBckgrnd ] = useState(false);

    const editedComment = {
        _id: flare._id, 
        body: value, 
        hashtags: tagValue, 
        photos: fileNames.map((fn) => {return `comments/${type}/${flare._id}/${fn}`;}),
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
        Object.assign(editedComment, currentUser.unionName ? {unionId: currentUser._id, union: true} : {userId: currentUser._id, union: false});
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
            await axiosReq("PUT", `/comments/${flare._id}`, editedComment);
            dispatch(setEditedCom(editedComment));
            dispatch(eFClose());
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
        <div className="editCommentPortal">
            <div className={`editCommentBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="editCommentModal">
            <div className={`editComment flame ${color}`}>
                    <div className="editComment-container" >
                        <div className="editCommentTop">
                            <div className="editCommentTopUpper">
                                <i  
                                    className="editCommentLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="creatCommentTitle">Edit Comment</span>
                                {color === "rainbow" ||
                                color === "silver" ||
                                color === "gold" ||
                                color === "platinum" ||
                                color === "diamond" 
                                    ? <i 
                                        className={`
                                            editCommentCancelPNGIcon 
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
                                        className={`editCommentCancelSVGIcon ${color}`} 
                                        onClick={() => dispatch(eFClose())}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr className={`editCommentHr HIGHER_BACKGROUND ${color}`} />
                        </div>
                        <div className="editCommentCenter">
                            <div 
                                className="editCommentEditorContainerContainer editor">
                                <div 
                                    className={`
                                        editCommentHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${color}
                                    `} 
                                />
                                <div className="editCommentWhiteBackground" />
                                <div className={`editCommentEditor INNER_BOX_SHADOW ${color}`}>
                                    <div 
                                        id={`cp-fte-${user._id}`}
                                        className="editCommentEditorContainer"
                                    >
                                        <FlareTextEditor
                                            editorId={`cp-fte-${currentUser._id}`}
                                            setValue={setValue} 
                                            value={value}
                                            ph=" Write a description... "
                                            emoji={emoji}
                                            setEmoji={setEmoji}
                                            mentionPic={mentionPic}
                                            setMentionPic={setMentionPic}
                                            mArr={mentionArr}
                                        />
                                        <div 
                                            className="editCommentEditorContainerContainer imgDZ"
                                            style={imgDrop ? {height: "256px"} : {height: "0"}}
                                        >
                                            <div 
                                                className={`editCommentHigherSpectrumBackground ${color}`} 
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            />
                                            <div
                                                className={`creatCommentImgDropzoneContainer INNER_BOX_SHADOW ${color}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`editCommentImgDZContainer ${color}`}
                                                >
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <i className={`editCommentImgDZBorder DZ_BORDER ${color}`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `editCommentImgDropzone ${color}`})}>
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
                                                            className={`editCommentImgDZCancelPNGIcon ${color}`}  
                                                            src={`/icons/cancel/cancel-${color}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div 
                                                                className={`editCommentImgDZCancelSVGIcon ${color}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="editCommentImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`editCommentImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="editCommentImg" src={URL.createObjectURL(file)} alt="" />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`editCommentCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div 
                                                                className={`editCommentCancelImgSVGBtn ${color}`} 
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
                                        id="ecEmojiPickerContainer" 
                                        className={`ecEmojiPickerContainer BOX_SHADOW ${color}`} 
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
                            <div className="editCommentHashtagEditor">
                                <HashtagEditor 
                                    setTagValue={setTagValue}
                                    tagValue={tagValue}
                                    color={color}
                                    type={"cf"} 
                                />
                            </div>
                        </div>
                        <hr className={`editCommentHr HIGHER_BACKGROUND ${color}`} />
                        <div className="editCommentBottom">
                            <div className="editCommentOptions">
                                <label htmlFor="file" className="editCommentOption">
                                    <div 
                                        className="editCommentAddPhotoSVGIcon" 
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
                                    className="ecEmojiPickerBtn PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="editCommentBottomRight">
                                <div 
                                    className={`
                                        editCommentShareButtonBackground 
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
                                            editCommentShareButton 
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

export default EditComment;