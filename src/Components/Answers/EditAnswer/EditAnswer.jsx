import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { cCClose, eFClose, setEditedAns } from "../../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import {useDropzone} from 'react-dropzone';
import { colorTheme } from "../../../Utils/styling/colorTheme";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import EmojiEditor from "../../Editors/EmojiEditor/EmojiEditor";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import "./EditAnswer.css";
import { addAPhotoIcon, cancelIcon } from "../../../Lib/mui/icons";


function EditAnswer({data}) {
   
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const {user, flare, type} = data;

    const color = colorTheme(currentUser);
    
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

    const editedAnswer = {
        _id: flare._id, 
        body: value, 
        hashtags: tagValue, 
        photos: fileNames.map((fn) => {return `Answers/${type}/${flare._id}/${fn}`;}),
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
            const folder = `answers/${flare.type}/${flare._id}`;
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
        Object.assign(editedAnswer, currentUser.unionName ? {unionId: currentUser._id, union: true} : {userId: currentUser._id, union: false});
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
            await axiosReq("PUT", `/answers/${flare._id}`, editedAnswer);
            dispatch(setEditedAns(editedAnswer));
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
        <div className="editAnswerPortal">
            <div className={`editAnswerBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="editAnswerModal">
            <div className={`editAnswer flame ${color}`}>
                    <div className="editAnswer-container" >
                        <div className="editAnswerTop">
                            <div className="editAnswerTopUpper">
                                <i  
                                    className="editAnswerLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="creatAnswerTitle">Edit Answer</span>
                                {color === "rainbow" ||
                                color === "silver" ||
                                color === "gold" ||
                                color === "platinum" ||
                                color === "diamond" 
                                    ? <i 
                                        className={`
                                            editAnswerCancelPNGIcon 
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
                                    : <div className={`editAnswerCancelSVGIcon ${color}`} onClick={() => dispatch(eFClose())}>{cancelIcon}</div>
                                }
                            </div>
                            <hr className={`editAnswerHr HIGHER_BACKGROUND ${color}`} />
                        </div>
                        <div className="editAnswerCenter">
                            <div 
                                className="editAnswerEditorContainerContainer editor">
                                <div 
                                    className={`
                                        editAnswerHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${color}
                                    `} 
                                />
                                <div className="editAnswerWhiteBackground" />
                                <div className={`editAnswerEditor INNER_BOX_SHADOW ${color}`}>
                                    <div 
                                        id={`ea-fte-${user._id}`}
                                        className="editAnswerEditorContainer"
                                    >
                                        <FlareTextEditor
                                            editorId={`ea-fte-${currentUser._id}`}
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
                                            className="editAnswerEditorContainerContainer imgDZ"
                                            style={imgDrop ? {height: "256px"} : {height: "0"}}
                                        >
                                            <div 
                                                className={`editAnswerHigherSpectrumBackground ${color}`} 
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            />
                                            <div
                                                className={`creatAnswerImgDropzoneContainer INNER_BOX_SHADOW ${color}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`editAnswerImgDZContainer ${color}`}
                                                >
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <i className={`editAnswerImgDZBorder DZ_BORDER ${color}`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `editAnswerImgDropzone ${color}`})}>
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
                                                            className={`editAnswerImgDZCancelPNGIcon ${color}`}  
                                                            src={`/icons/cancel/cancel-${color}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div 
                                                                className={`editAnswerImgDZCancelSVGIcon ${color}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="editAnswerImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`editAnswerImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="editAnswerImg" src={URL.createObjectURL(file)} alt="" />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`editAnswerCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div
                                                                className={`editAnswerCancelImgSVGBtn ${color}`} 
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
                                        id="eaEmojiPickerContainer" 
                                        className={`eaEmojiPickerContainer BOX_SHADOW ${color}`} 
                                        style={emojiBox ? {height: "250px"} : {height: "0px"}}
                                    >
                                        <EmojiEditor 
                                            editorId={"eaEmojiPickerContainer"} 
                                            color={color}
                                            setEmojiBox={setEmojiBox} 
                                            setEmoji={setEmoji} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="editAnswerHashtagEditor">
                                <HashtagEditor 
                                    setTagValue={setTagValue}
                                    tagValue={tagValue}
                                    color={color}
                                    type={"cf"} 
                                />
                            </div>
                        </div>
                        <hr className={`editAnswerHr HIGHER_BACKGROUND ${color}`} />
                        <div className="editAnswerBottom">
                            <div className="editAnswerOptions">
                                <label htmlFor="file" className="editAnswerOption">
                                    <div className="editAnswerAddPhotoSVGIcon" onClick={imgDZHandler}>{addAPhotoIcon}</div>
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
                                    className="eaEmojiPickerBtn PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="editAnswerBottomRight">
                                <div 
                                    className={`
                                        editAnswerShareButtonBackground 
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
                                            editAnswerShareButton 
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

export default EditAnswer;