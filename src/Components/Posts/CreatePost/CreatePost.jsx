import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cPClose, setNewPost } from "../../../Redux/AuthSlice";
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
import "./CreatePost.css";
import { colorTheme } from "../../../Utils/styling/colorTheme";
import MentionsEditor from "../../Editors/MentionsEditor/MentionsEditor";
import { hashtagFlareAxiosHandler } from "../../../Utils/hashtagFlareAxiosHandler";
import { addAPhotoIcon, arrowddIcon, cancelIcon } from "../../../Lib/mui/icons";
  

function CreatePost() {
    
    const { user } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState("");
    const [ titleValue, setTitleValue ] = useState("");
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
    const [ mentionsBox, setMentionsBox ] = useState(false);
    const [ hashtagBox, setHashtagBox ] = useState(false);
    const [ emoji, setEmoji ] = useState("");
    const [ mentionPic, setMentionPic ] = useState(null);
    const [ mentionArr, setMentionArr ] = useState([]);
    const [ sBtnBckgrnd, setSBtnBckgrnd ] = useState(false);

    const newPost = { 
        feed: feed,
        access: visible,
        title: titleValue, 
        description: value, 
        hashtags: tagValue, 
        mentions: mentionArr
    }

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
    
    async function handleSubmit(event) {
        event.preventDefault();
        Object.assign(newPost, user.unionName ? {union: true, unionId: user._id} : {union: false, userId: user._id});
        try {
            const res = await axiosReq("POST", "/posts", newPost);
            if (files.length > 0) {
                try {
                    await Promise.all(
                        files.map((file) => {
                            const fileName = Date.now() + file.name;
                            const folder = `posts/${res.data._id}`;
                            const data = new FormData();
                            data.append("name", fileName);
                            data.append("folder", folder);
                            data.append("file", file, fileName);
                            setFileNames([...fileNames, `${folder}/${fileName}`]);
                            axiosReq("POST", "/upload", data);
                        })
                    )
                    const res = axiosReq("PUT", "/posts", {photos: fileNames});
                    hashtagFlareAxiosHandler(newPost.hashtags, res.data.id, "post");
                } catch (err) {
                    console.log(err);
                }
            }
            dispatch(cPClose());
            dispatch(setNewPost(res.data));
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
        dispatch(cPClose())
    };

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };

    const cpPickerBtnHandler = (type) => {
        switch (type) {
            case "photo":
                setEmojiBox(false);
                setMentionsBox(false);
                setHashtagBox(false);
                imgDZHandler();
                break;
            case "emoji":
                imgDZCancelHandler();
                setMentionsBox(false);
                setEmojiBox(true);
                setHashtagBox(false);
                break;
            case "mentions":
                imgDZCancelHandler();
                setEmojiBox(false);
                setMentionsBox(true);
                setHashtagBox(false);
                break;
            case "hashtag":
                imgDZCancelHandler();
                setEmojiBox(false);
                setMentionsBox(false);
                setHashtagBox(true);
                break;
            default: null;
        }
    };

    console.log(files)

  
    return ReactDom.createPortal(
        <div className="createPostPortal">
            <div className={`createPostBackdropOverlay POPUP_BACKGROUND ${colorTheme(user)}`} />
            <div className="createPostModal">
                <div className={`createPost flame ${colorTheme(user)}`}>
                    <div className="createPost-container" >
                        <div className="createPostTop">
                            <div className="createPostTopUpper">
                                <i  
                                    className="createPostLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="creatPostTitle">Create Post</span>
                                {colorTheme(user) === "rainbow" ||
                                colorTheme(user) === "silver" ||
                                colorTheme(user) === "gold" ||
                                colorTheme(user) === "platinum" ||
                                colorTheme(user) === "diamond" 
                                    ? <i 
                                        className={`
                                            createPostCancelPNGIcon 
                                            PNG_ICON_CANCEL 
                                            ${colorTheme(user)}
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
                                        className={`createPostCancelSVGIcon SVG_ICON_REACTIVE ${colorTheme(user)}`} 
                                        onClick={cancelHandler}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr className={`createPostHr COLOR_HR ${colorTheme(user)}`} />
                            <div className="createPostTopLower">
                                <ProfileLink user={user} type={"createFlare"}/>
                                <div className="createPostDropdownBtns">
                                    <button 
                                        className={`
                                            createPostDropdownBtn 
                                            ${colorTheme(user)}
                                            ${colorTheme(user) === "diamond" ? "DIAMOND_BTN3" : ""}
                                        `}
                                        onClick={flareTypeHandler}
                                    >
                                        <span className={`createPostDropdownTitle feed ${colorTheme(user)}`}>{`${feed} Posts`}</span>
                                        <div className={`createPostDropdownIcon ${colorTheme(user)}`}>{arrowddIcon}</div>
                                    </button>
                                    <button 
                                        className={`
                                            createPostDropdownBtn 
                                            ${colorTheme(user)}
                                            ${colorTheme(user) === "diamond" ? "DIAMOND_BTN6" : ""}
                                        `}
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div  className={`createPostVisibilityIcon public ${colorTheme(user)}`}>
                                            <VisibilityIcon 
                                                visible={visible} 
                                                primary={{fontSize: "1.125rem" /*18px*/}}
                                                secondary={{fontSize: "0.75rem" /*12px*/}}
                                            />
                                        </div>
                                        <span className={`createPostDropdownTitle visibility ${colorTheme(user)}`}>{visible}</span>
                                        <div className={`createPostDropdownIcon ${colorTheme(user)}`}>{arrowddIcon}</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="createPostCenter">
                            <div className="createPostTitleEditorContainer">
                                <div 
                                    className={`
                                        createPostTitleHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${colorTheme(user)}
                                    `} 
                                />
                                <div className="createPostTitleWhiteBackground" />
                                <div className={`createPostTitleEditor INNER_BOX_SHADOW ${colorTheme(user)}`}>
                                    <input 
                                        className="createPostTitleEditorInput"
                                        type="text" 
                                        placeholder=" Add a title."
                                        onChange={(e) => setTitleValue(e.target.value)}
                                    />
                                    <span className="createPostTitleRequirementText">{"(Optional)"}</span>
                                </div>
                            </div>
                            <div 
                                className="createPostEditorContainerContainer editor">
                                <div 
                                    className={`
                                        createPostHigherSpectrumBackground 
                                        HIGHER_BACKGROUND 
                                        ${colorTheme(user)}
                                    `} 
                                />
                                <div className="createPostWhiteBackground" />
                                <div className={`createPostEditor INNER_BOX_SHADOW ${colorTheme(user)}`}>
                                    <div 
                                        id={`cp-fte-${user._id}`}
                                        className="createPostEditorContainer"
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
                                            className="createPostEditorContainerContainer imgDZ"
                                            style={imgDrop ? {height: "16rem" /*256px*/} : {height: "0"}}
                                        >
                                            <div 
                                                className={`createPostHigherSpectrumBackground ${colorTheme(user)}`} 
                                                style={imgDrop ? {height: "16rem" /*256px*/} : {height: "0"}}
                                            />
                                            <div
                                                className={`creatPostImgDropzoneContainer INNER_BOX_SHADOW ${colorTheme(user)}`}
                                                style={imgDrop ? {height: "16rem" /*256px*/} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`createPostImgDZContainer ${colorTheme(user)}`}
                                                >
                                                    {
                                                        colorTheme(user) === "rainbow" ||
                                                        colorTheme(user) === "silver" ||
                                                        colorTheme(user) === "gold" ||
                                                        colorTheme(user) === "platinum" ||
                                                        colorTheme(user) === "diamond" 
                                                            ? <i className={`createPostImgDZBorder DZ_BORDER ${colorTheme(user)}`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `createPostImgDropzone ${colorTheme(user)}`})}>
                                                        <input {...getInputProps()} />
                                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                                    </div>
                                                    {
                                                        colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                            className={`createPostImgDZCancelPNGIcon ${colorTheme(user)}`}  
                                                            src={`/icons/cancel/cancel-${colorTheme(user)}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div 
                                                                className={`createPostImgDZCancelSVGIcon SVG_ICON ${colorTheme(user)}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {files.length > 0 ? (
                                            <div className="createPostImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`createPostImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img 
                                                            id={`cfip-${file.name}-${index}`} //cfip = create flare image preview 
                                                            className="createPostImg" 
                                                            src={URL.createObjectURL(file)} 
                                                            alt="" 
                                                        />
                                                        {colorTheme(user) === "rainbow" ||
                                                        colorTheme(user) === "silver" ||
                                                        colorTheme(user) === "gold" ||
                                                        colorTheme(user) === "platinum" ||
                                                        colorTheme(user) === "diamond" 
                                                            ? <img 
                                                                className={`createPostCancelImgPNGBtn ${colorTheme(user)}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme(user)}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div 
                                                                className={`createPostCancelImgSVGBtn SVG_ICON ${colorTheme(user)}`} 
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
                                        id="cpPickerContainer" 
                                        className={`cpPickerContainer BOX_SHADOW ${colorTheme(user)}`} 
                                        style={emojiBox ? {height: "15.625rem" /*250px*/} : {height: "0rem" /*0px*/}}
                                    >
                                        <EmojiEditor 
                                            editorId={"cpPickerContainer"} 
                                            color={colorTheme(user)}
                                            setEmojiBox={setEmojiBox} 
                                            setEmoji={setEmoji} 
                                        />
                                    </div>
                                    <div 
                                        id="cpPickerContainer" 
                                        className={`cpPickerContainer BOX_SHADOW ${colorTheme(user)}`} 
                                        style={mentionsBox ? {height: "15.625rem" /*250px*/} : {height: "0rem" /*0px*/}}
                                    >
                                        <MentionsEditor
                                            mentionArr={mentionArr}
                                            setMentionPic={setMentionPic}
                                            setMentionsBox={setMentionsBox}
                                            mentionsBox={mentionsBox}
                                        />
                                    </div>
                                    <div 
                                        id="cpPickerContainer" 
                                        className={`cpPickerContainer BOX_SHADOW ${colorTheme(user)}`} 
                                        style={hashtagBox ? {height: "15.625rem" /*250px*/} : {height: "0rem" /*0px*/}}
                                    >
                                        <HashtagEditor 
                                            setTagValue={setTagValue}
                                            tagValue={tagValue}
                                            color={colorTheme(user)}
                                            type={"cf"}
                                            flareType={"post"}
                                            flareId={""} 
                                            setHashtagBox={setHashtagBox}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`createPostEditorBtnsContainer BOX_SHADOW ${colorTheme(user)}`}>
                                <div className="createPostOptions">
                                    <label htmlFor="file" className="createPostOption">
                                        <div 
                                            className="createPostAddPhotoSVGIcon" 
                                            onClick={() => cpPickerBtnHandler("photo")}
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
                                        className="cpPickerBtn PNG_ICON_EMOJI"
                                        alt="emoji-picker-icon" 
                                        onClick={() => cpPickerBtnHandler("emoji")}
                                    />
                                    <i
                                        className={`cpPickerBtn PNG_ICON_MENTIONS ${colorTheme(user)}`}
                                        alt="mentions-picker-icon" 
                                        onClick={() => cpPickerBtnHandler("mentions")}
                                    />
                                    <i
                                        className={`cpPickerBtn PNG_ICON_HASHTAG ${colorTheme(user)}`}
                                        alt="mentions-picker-icon" 
                                        onClick={() => cpPickerBtnHandler("hashtag")}
                                    />
                                </div>
                            </div>
                            {/*
                                <div className="createPostHashtagEditor">
                                    <HashtagEditor 
                                        setTagValue={setTagValue}
                                        tagValue={tagValue}
                                        color={colorTheme(user)}
                                        type={"cf"} 
                                    />
                                </div>
                            */}
                        </div>
                        <hr className={`createPostHr COLOR_HR ${colorTheme(user)}`} />
                        <div className="createPostBottom">
                            <div className="createPostOptions">
                                <label htmlFor="file" className="createPostOption">
                                    <div 
                                        className="createPostAddPhotoSVGIcon" 
                                        onClick={() => cpPickerBtnHandler("photo")}
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
                                    className="cpPickerBtn PNG_ICON_EMOJI"
                                    alt="emoji-picker-icon" 
                                    onClick={() => cpPickerBtnHandler("emoji")}
                                />
                                <i
                                    className={`cpPickerBtn PNG_ICON_MENTIONS ${colorTheme(user)}`}
                                    alt="mentions-picker-icon" 
                                    onClick={() => cpPickerBtnHandler("mentions")}
                                />
                                <i
                                    className={`cpPickerBtn PNG_ICON_HASHTAG ${colorTheme(user)}`}
                                    alt="mentions-picker-icon" 
                                    onClick={() => cpPickerBtnHandler("hashtag")}
                                />
                            </div>
                            <div className="createPostBottomRight">
                                <div 
                                    className={`
                                        createPostShareButtonBackground 
                                        ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${sBtnBckgrnd ? "drk" : ""}
                                        ${colorTheme(user)} 
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
                                            createPostShareButton 
                                            ${value === null || value === "" || value === "<p><br></p>" 
                                                ? `${colorTheme(user)} lgt`
                                                : colorTheme(user)
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
                                        Post
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

export default CreatePost;