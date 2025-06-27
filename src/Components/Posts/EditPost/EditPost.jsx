import React, { useState, useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { eFClose, setEditedPost } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import { axiosReq } from "../../../Utils/axiosConfig";
import "./EditPost.css";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import AudienceVisibilityDropdown from "../../Dropdowns/AudienceVisibilityDropdown/AudienceVisibilityDropdown";
import FlareTypeDropdown from "../../Dropdowns/FlareTypeDropdown/FlareTypeDropdown";
import {useDropzone} from 'react-dropzone';
import VisibilityIcon from "../../../Utils/icons/VisibilityIcon";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import ProfileLink from "../../ProfileLink/ProfileLink";
import { colorTheme } from "../../../Utils/styling/colorTheme";
import { addAPhotoIcon, arrowddIcon, cancelIcon } from "../../../Lib/mui/icons";

   
function EditPost({data}) {

    const PS = process.env.PHOTO_STORAGE;

    const { user: currentUser, flame, union, actAcc } = useSelector((state) => state.auth);

    const editor = useRef(); 
    const editPostRef = useRef();

    const dispatch = useDispatch();

    const color = colorTheme(currentUser);

    const {user, flare, type} = data;

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [photos, setPhotos] = useState(flare.photos);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState(flare.description);
    const [ titleValue, setTitleValue ] = useState(flare.title);
    const [ tagValue, setTagValue ] = useState(flare.hashtags);
    const [ visible, setVisible ] = useState(flare.access);
    const [ visDD, setVisDD ] = useState(false);
    const [ fKind, setFKind ] = useState(flare.feed)
    const [ fTDD, setFTDD ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);

    const editPost = { 
        _id: flare._id,
        feed: fKind,
        access: visible,
        title: titleValue, 
        description: value, 
        hashtags: tagValue, 
        photos: photos.concat(fileNames),
    };
    
    useEffect(() => {
        setFiles(files.concat(acceptedFiles));
        setImgDrop(false);
        setImgBtn(false);
    }, [acceptedFiles]);

    useEffect(() => {
        files.map((file) => {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            dataFiles.push(data);
            fileNames.push(fileName);
        });
    }, [files]);

    async function submitPost(event) {
        event.preventDefault();
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
            await axiosReq("PUT", `/posts/${flare._id}`, editPost);
            dispatch(setEditedPost(editPost));
            dispatch(eFClose());
        } catch (err) {
            console.log(err);
        }
    };

    const removePhotos = (idx2Rmv) => {
        setPhotos(photos.filter((_, index) => index !== idx2Rmv));
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
        dispatch(eFClose())
    };

    const imgDZCancelHandler = () => {
        setImgDrop(false);
        setImgBtn(false);
    };


    return ReactDom.createPortal(
        <div className="editPostPortal">
            <div className={`editPostBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="editPostModal">
                <div className={`editPost flame ${color}`}>
                    <div className="editPost-container" >
                        <div className="editPostTop">
                            <div className="editPostTopUpper">
                                <img className="editPostLogo" src="/logo/ConnectTF-logo-Icon.png" alt="" />    
                                <span className="creatPostTitle">Edit Post</span>
                                {color === "rainbow" ||
                                color === "silver" ||
                                color === "gold" ||
                                color === "platinum" ||
                                color === "diamond" 
                                    ? <img 
                                        className={`editPostCancelPNGIcon ${color}`}  
                                        src={`/icons/cancel/cancel-${color}${cancelAct ? "-drk" : cancelHov ? "" : "-lgt"}.png`} 
                                        alt="" 
                                        onClick={cancelHandler}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <div 
                                        className={`editPostCancelSVGIcon SVG_ICON_REACTIVE ${color}`} 
                                        onClick={cancelHandler}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr 
                                className={`editPostHr COLOR_HR ${color}`} 
                                style={color === "diamond" ? {backgroundImage: `url(/misc/${color}-background.jpg)`, backgroundSize: "cover"} : {}}
                            />
                            <div className="editPostTopLower">
                                <ProfileLink user={user} type={"createFlare"} />
                                <div className="editPostDropdownBtns">
                                    <button 
                                        className={`editPostDropdownBtn ${color}`}
                                        style={color === "diamond"
                                            ? {backgroundImage: `url(/misc/${color}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={flareTypeHandler}
                                    >
                                        <span className="editPostDropdownTitle feed">{`${fKind} Posts`}</span>
                                        <div className="editPostDropdownIcon">{arrowddIcon}</div>
                                    </button>
                                    <button 
                                        className={`editPostDropdownBtn ${color}`}
                                        style={color === "diamond"
                                            ? {backgroundImage: `url(/misc/${color}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div  className="editPostVisibilityIcon public">
                                            <VisibilityIcon 
                                                visible={visible} 
                                                primary={{fontSize: "1.125rem" /*18px*/}}
                                                secondary={{fontSize: "0.75rem" /*12px*/}}
                                            />
                                        </div>
                                        <span className="editPostDropdownTitle visibility">{visible}</span>
                                        <div className="editPostDropdownIcon">{arrowddIcon}</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="editPostCenter">
                            <div className="editPostTitleEditorContainer">
                                <div 
                                    className={`editPostTitleHigherSpectrumBackground ${color}`} 
                                    style={{backgroundImage: `url(/misc/${color}-background.jpg)`, backgroundSize: "cover", opacity: ".3"}}
                                />
                                <div className="editPostTitleWhiteBackground" />
                                <div className={`editPostTitleEditor INNER_BOX_SHADOW ${color}`}>
                                    <input 
                                        className="editPostTitleEditorInput"
                                        type="text" 
                                        placeholder=" Add a title."
                                        value={titleValue}
                                        onChange={(e) => setTitleValue(e.target.value)}
                                    />
                                    <span className="editPostTitleRequirementText">{"(Optional)"}</span>
                                </div>
                            </div>
                            <div 
                                className="editPostEditorContainerContainer editor">
                                <div 
                                    className={`editPostHigherSpectrumBackground ${color}`} 
                                    style={{backgroundImage: `url(/misc/${color}-background.jpg)`, backgroundSize: "100% 16rem" /*256px*/, opacity: ".3"}}
                                />
                                <div className="editPostWhiteBackground" />
                                <div className={`editPostEditor INNER_BOX_SHADOW ${color}`}>
                                    <div className="editPostEditorContainer" >
                                        <FlareTextEditor 
                                            value={value}
                                            setValue={setValue} 
                                            ph=" Write a description... "
                                            //emoji={emoji}
                                            //setEmoji={setEmoji}
                                            //mentionPic={mentionPic}
                                            //setMentionPic={setMentionPic}
                                            //mArr={mentionArr}
                                        />
                                        <div className="editPostEditorContainerContainer imgDZ">
                                            <div className={`editPostHigherSpectrumBackground ${color}`} />
                                            <div
                                                className={`creatPostImgDropzoneContainer INNER_BOX_SHADOW ${color}`}
                                                style={imgDrop ? {height: "16rem" /*256px*/} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`editPostImgDZContainer ${color}`}
                                                >
                                                    {
                                                        color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img className="editPostImgDZBorder" src={`/misc/img-dz-border-${color}.png`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `editPostImgDropzone ${color}`})}>
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
                                                            className={`editPostImgDZCancelPNGIcon ${color}`}  
                                                            src={`/icons/cancel/cancel-${color}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div 
                                                                className={`editPostImgDZCancelSVGIcon SVG_ICON ${color}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {photos.length > 0 ? (
                                            <div className="editPostImages-container">
                                                {photos.map((photo, index) => (
                                                    <div 
                                                        className={
                                                            `editPostImageContainer 
                                                            ${index === 0 ? "top" : ""}`
                                                        } 
                                                        key={index}
                                                    >
                                                        <img 
                                                            className="editPostImg" 
                                                            src={PS + photo}
                                                            alt="" 
                                                        />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`editPostCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removePhotos(index)}
                                                            />
                                                            : <div
                                                                className={`editPostCancelImgSVGBtn ${color}`} 
                                                                onClick={() => removePhotos(index)}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}     
                                        {files.length > 0 ? (
                                            <div className="editPostImages-container">
                                                {files.map((file, index) => (
                                                    <div className={`editPostImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="editPostImg" src={URL.editObjectURL(file)} alt="" />
                                                        {color === "rainbow" ||
                                                        color === "silver" ||
                                                        color === "gold" ||
                                                        color === "platinum" ||
                                                        color === "diamond" 
                                                            ? <img 
                                                                className={`editPostCancelImgPNGBtn ${color}`}  
                                                                src={`/icons/cancel/cancel-${color}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div 
                                                                className={`editPostCancelImgSVGBtn SVG_ICON ${color}`} 
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
                                </div>
                            </div>
                            <div className="editPostHashtagEditor">
                                <HashtagEditor 
                                    tagValue={tagValue} 
                                    setTagValue={setTagValue}
                                    color={color}
                                    type={"cf"} 
                                />
                            </div>
                        </div>
                        <hr 
                            className={`editPostHr COLOR_HR ${color}`} 
                            style={
                                color === "diamond" 
                                    ? {
                                        backgroundImage: `url(/misc/${color}-background.jpg)`, 
                                        backgroundSize: "cover"
                                    } 
                                    : {}
                            }
                        />
                        <div className="editPostBottom">
                            <div className="editPostOptions">
                                <label htmlFor="file" className="editPostOption">
                                    <div className="editPostAddPhotoSVGIcon" onClick={imgDZHandler}>{addAPhotoIcon}</div>
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
                                    className="epEmojiPickerBtn emoji PNG_ICON_EMOJI"
                                    //alt="emoji-picker-icon" 
                                    onClick={() => setEmojiBox(!emojiBox)}
                                />
                            </div>
                            <div className="editPostBottomRight">
                                <div 
                                    className={
                                        `editPostShareButtonBackground 
                                        ${color} 
                                        ${value === null || value === "" || value === "<p><br></p>" 
                                            ? "disabled" 
                                            : ""
                                        }`
                                    } 
                                    style={color === "diamond"
                                        ? {backgroundImage: `url(/misc/${color}-background${shareAct ? "-drk" : ""}.jpg)`, backgroundSize: "cover"} 
                                        : {}
                                    }
                                >
                                    <button 
                                        className={`
                                            editPostShareButton 
                                            ${value === null || value === "" || value === "<p><br></p>" 
                                                ? "disabled" 
                                                : color
                                            }`
                                        } 
                                        disabled={
                                            value === null || value === "" || value === "<p><br></p>" 
                                                ? true 
                                                : false
                                            }
                                        type="button|submit|reset" 
                                        onClick={submitPost}
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
                        fKind={fKind} 
                        setFKind={setFKind}
                        fTDD={fTDD}
                        setFTDD={setFTDD}
                    />
                    <AudienceVisibilityDropdown
                        type={"Post"} 
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

export default EditPost;