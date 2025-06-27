import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { cAClose, setNewAnswer } from "../../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import {useDropzone} from 'react-dropzone';
import { colorTheme } from "../../../Utils/styling/colorTheme";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import EmojiEditor from "../../Editors/EmojiEditor/EmojiEditor";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import "./CreateAnswer.css";
import { addAPhotoIcon, cancelIcon } from "../../../Lib/mui/icons";


function CreateAnswer({question}) {
   
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const color = colorTheme(user);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
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

    const newAnswer = { 
        questionId: question._id,
        description: value, 
        hashtags: tagValue, 
        photos: fileNames.map((fn) => {return `answers/${feed.toLowerCase()}/${visible.toLowerCase()}` + "/" + fn}),
        mentions: mentionArr
    };

    const newAnswerNot = {
        senderId: user._id,
        receiverId: question.union ? question.unionId : question.userId,
        unionSender: question.union,
        flareType: "question",
        flareId: question._id,
        flareRetortType: "Answer",
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
            const folder = `Answers/${feed.toLowerCase()}/${visible.toLowerCase()}`;
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
        Object.assign(newAnswer, user.unionName ? {unionId: user._id, union: true} : {userId: user._id, union: false});
        Object.assign(newAnswerNot, user.unionName ? {union: true} : {union: false});
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
            const res = await axiosReq("POST", "/answers", newAnswer);
            const comRes = res.data;
            user.unionName
                ? await axiosReq("PUT",`/questions/${question._id}/unionAnswer`, {unionId: user._id})
                : await axiosReq("PUT", `/questions/${question._id}/flameAnswer`, {userId: user._id});
            Object.assign(comRes, {new: true});
            Object.assign(newAnswerNot, {flareRetortId: comRes._id});
            await axiosReq("POST", "/flareNots", newAnswerNot)
            dispatch(cAClose());
            dispatch(setNewAnswer(comRes));
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
        <div className="createAnswerPortal">
            <div className={`createAnswerBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="createAnswerModal">
            <div className={`createAnswer flame ${color}`}>
                    <div className="createAnswer-container" >
                        <div className="createAnswerTop">
                            <div className="createAnswerTopUpper">
                                <i  
                                    className="createAnswerLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="creatAnswerTitle">Create Answer</span>
                                {color === "rainbow" ||
                                color === "silver" ||
                                color === "gold" ||
                                color === "platinum" ||
                                color === "diamond" 
                                    ? <i 
                                        className={`
                                            createAnswerCancelPNGIcon 
                                            PNG_ICON_CANCEL 
                                            ${color}
                                            ${cancelAct ? "drk" : cancelHov ? "" : "lgt"}
                                        `}  
                                        //alt="cancel-icon" 
                                        onClick={() => dispatch(cAClose())}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <div className={`createAnswerCancelSVGIcon ${color}`} onClick={() => dispatch(cAClose())}>{cancelIcon}</div>
                                }
                            </div>
                            <hr className={`createAnswerHr HIGHER_BACKGROUND ${color}`} />
                        </div>
                        <div className="createAnswerCenter">
                            <div 
                                className="createAnswerEditorContainerContainer editor">
                                <div 
                                    className={`
                                        createAnswerHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${color}
                                    `} 
                                />
                                <div className="createAnswerWhiteBackground" />
                                <div className={`createAnswerEditor INNER_BOX_SHADOW ${color}`}>
                                    <div 
                                        id={`cp-fte-${user._id}`}
                                        className="createAnswerEditorContainer"
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
                                        <div 
                                            className="createAnswerEditorContainerContainer imgDZ"
                                            style={imgDrop ? {height: "256px"} : {height: "0"}}
                                        >
                                            <div 
                                                className={`createAnswerHigherSpectrumBackground ${color}`} 
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            />
                                            <div
                                                className={`creatAnswerImgDropzoneContainer INNER_BOX_SHADOW ${color}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`createAnswerImgDZContainer ${color}`}
                                                >
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <i className={`createAnswerImgDZBorder DZ_BORDER ${color}`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `createAnswerImgDropzone ${color}`})}>
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
                                                            className={`createAnswerImgDZCancelPNGIcon ${color}`}  
                                                            src={`/icons/cancel/cancel-${color}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div 
                                                                className={`createAnswerImgDZCancelSVGIcon ${color}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="createAnswerImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createAnswerImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createAnswerImg" src={URL.createObjectURL(file)} alt="" />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`createAnswerCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div
                                                                className={`createAnswerCancelImgSVGBtn ${color}`} 
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
                                        id="caEmojiPickerContainer" 
                                        className={`caEmojiPickerContainer BOX_SHADOW ${color}`} 
                                        style={emojiBox ? {height: "250px"} : {height: "0px"}}
                                    >
                                        <EmojiEditor 
                                            editorId={"caEmojiPickerContainer"} 
                                            color={color}
                                            setEmojiBox={setEmojiBox} 
                                            setEmoji={setEmoji} 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="createAnswerHashtagEditor">
                                <HashtagEditor 
                                    setTagValue={setTagValue}
                                    tagValue={tagValue}
                                    color={color}
                                    type={"cf"} 
                                />
                            </div>
                        </div>
                        <hr className={`createAnswerHr HIGHER_BACKGROUND ${color}`} />
                        <div className="createAnswerBottom">
                            <div className="createAnswerOptions">
                                <label htmlFor="file" className="createAnswerOption">
                                    <div className="createAnswerAddPhotoSVGIcon" onClick={imgDZHandler}>{addAPhotoIcon}</div>
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
                                    className="caEmojiPickerBtn PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="createAnswerBottomRight">
                                <div 
                                    className={`
                                        createAnswerShareButtonBackground 
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
                                            createAnswerShareButton 
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

export default CreateAnswer;