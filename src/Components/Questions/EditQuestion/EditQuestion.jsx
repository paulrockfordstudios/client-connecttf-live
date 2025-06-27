import React, { useState, useEffect, useRef, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { eFClose } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import { axiosReq } from "../../../Utils/axiosConfig";
import "./EditQuestion.css";
import HashtagEditor from "../../Editors/HashtagEditor/HashtagEditor";
import AudienceVisibilityDropdown from "../../Dropdowns/AudienceVisibilityDropdown/AudienceVisibilityDropdown";
import FlareTypeDropdown from "../../Dropdowns/FlareTypeDropdown/FlareTypeDropdown";
import {useDropzone} from 'react-dropzone';
import VisibilityIcon from "../../../Utils/icons/VisibilityIcon";
import FlareTextEditor from "../../Editors/QuillTextEditors/FlareTextEditor/FlareTextEditor";
import ProfileLink from "../../ProfileLink/ProfileLink";
import { addAPhotoIcon, arrowddIcon, cancelIcon } from "../../../Lib/mui/icons";


function EditQuestion({qn}) {

    const PS = process.env.PHOTO_STORAGE;
    
    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const editor = useRef(); 
    const editQuestionRef = useRef();

    const dispatch = useDispatch();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const [files, setFiles] = useState([]);
    const [photos, setPhotos] = useState(qn.photos);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState(qn.description);
    const [ titleValue, setTitleValue ] = useState(qn.title);
    const [ tagValue, setTagValue ] = useState(qn.hashtags);
    const [ visible, setVisible ] = useState(qn.access);
    const [ visDD, setVisDD ] = useState(false);
    const [ fKind, setFKind ] = useState(qn.feed)
    const [ fTDD, setFTDD ] = useState(false);
    const [ cancelHov, setCancelHov ] = useState(false);
    const [ cancelAct, setCancelAct ] = useState(false);
    const [ imgDrop, setImgDrop ] = useState(false);
    const [ imgBtn, setImgBtn ] = useState(false);
    const [ shareAct, setShareAct ] = useState(false);
    const [ error1, setError1 ] = useState(false);
    const [ error2, setError2 ] = useState(false);
    const [ error3, setError3 ] = useState(false);
    const [ error4, setError4 ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;
    

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

    async function submitQuestion(event) {
        event.preventDefault();
        const newQuestion = user.unionName 
            ? { 
                feed: fKind,
                access: visible,
                title: titleValue, 
                description: value, 
                hashtags: tagValue, 
                photos: photos.concat(fileNames)
            }
            : { 
                feed: fKind,
                access: visible, 
                title: titleValue, 
                description: value, 
                hashtags: tagValue,
                photos: photos.concat(fileNames) 
            }
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
            await axiosReq("PUT", `/questions/${qn._id}`, newQuestion);
            window.location.reload();
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

    function startsWithCapital(str){
        return str.charAt(0) === str.charAt(0).toUpperCase()
    };

    const imgBtnHandler = (event) => {
        if (event.target.files.length !== 0) {
            setFiles(files.concat(Array.from(event.target.files)));
        }
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


    const handleSubmit = (event) => {
        if (titleValue[titleValue.length - 1] !== "?") {
            if (titleValue[titleValue.length - 2] === "?" && titleValue[titleValue.length - 1] === " ") {
                if (titleValue[0] === " ") {
                    setError1(false);
                    setError2(false);
                    setError4(false);
                    setError3(true);
                } else if (!startsWithCapital(titleValue)) {
                    setError1(false);
                    setError2(false);
                    setError3(false);
                    setError4(true);
                } else if (!titleValue.includes(" ") || !titleValue.substring(0, titleValue.length - 2).includes(" ")) {
                    setError1(false);
                    setError3(false);
                    setError4(false);
                    setError2(true);
                } else {
                    setError1(false);
                    setError2(false);
                    setError3(false);
                    setError4(false);
                    submitQuestion(event);
                }
            } else {
                setError2(false);
                setError3(false);
                setError4(false);
                setError1(true);
            }
        } else {
            if (titleValue[0] === " ") {
                setError1(false);
                setError2(false);
                setError4(false);
                setError3(true);
            } else if (!startsWithCapital(titleValue)) {
                setError1(false);
                setError2(false);
                setError3(false);
                setError4(true);
            } else if (!titleValue.includes(" ") || !titleValue.substring(0, titleValue.length - 2).includes(" ")) {
                setError1(false);
                setError3(false);
                setError4(false);
                setError2(true);
            } else {
                setError1(false)
                setError2(false);
                setError3(false);
                setError4(false);
                submitQuestion(event);
            }
        }
    };

    console.log(value)


    return ReactDom.createPortal(
        <div className="editQuestionPortal">
            <div className={`editQuestionBackdropOverlay POPUP_BACKGROUND ${colorTheme}`} />
            <div className="editQuestionModal">
                <div className={`editQuestion flame ${colorTheme}`}>
                    <div className="editQuestion-container" >
                        <div className="editQuestionTop">
                            <div className="editQuestionTopUpper">
                                <img className="editQuestionLogo" src="/logo/ConnectTF-logo-Icon.png" alt="" />    
                                <span className="creatQuestionTitle">Edit Question</span>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" 
                                    ? <img 
                                        className={`editQuestionCancelPNGIcon ${colorTheme}`}  
                                        src={`/icons/cancel/cancel-${colorTheme}${cancelAct ? "-drk" : cancelHov ? "" : "-lgt"}.png`} 
                                        alt="" 
                                        onClick={cancelHandler}
                                        onMouseEnter={() => setCancelHov(true)}
                                        onMouseLeave={() => setCancelHov(false)}
                                        onMouseDown={() => setCancelAct(true)}
                                        onMouseUp={() => setCancelAct(false)}
                                    />
                                    : <div 
                                        className={`editQuestionCancelSVGIcon ${colorTheme}`} 
                                        onClick={cancelHandler}
                                    >
                                        {cancelIcon}
                                    </div>
                                }
                            </div>
                            <hr 
                                className={`editQuestionHr ${colorTheme}`} 
                                style={colorTheme === "diamond" ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} : {}}
                            />
                            <div className="editQuestionTopLower">
                                <ProfileLink user={user} type={"createFlare"}/>
                                <div className="editQuestionDropdownBtns">
                                    <button 
                                        className={`editQuestionDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={flareTypeHandler}
                                    >
                                        <span className="editQuestionDropdownTitle feed">{`${fKind} Questions`}</span>
                                        <div className="editQuestionDropdownIcon">{arrowddIcon}</div>
                                    </button>
                                    <button 
                                        className={`editQuestionDropdownBtn ${colorTheme}`}
                                        style={colorTheme === "diamond"
                                            ? {backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover"} 
                                            : {}
                                        }
                                        onClick={audienceVisibiltyHandler}
                                    >
                                        <div className="editQuestionVisibilityIcon public">
                                            <VisibilityIcon
                                                visible={visible} 
                                                primary={{fontSize: "18px"}}
                                                secondary={{fontSize: "12px"}}
                                            />
                                        </div>
                                        <span className="editQuestionDropdownTitle visibility">{visible}</span>
                                        <div className="editQuestionDropdownIcon">{arrowddIcon}</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="editQuestionCenter">
                            <div className="editQuestionTitleEditorContainer">
                                <div 
                                    className={`editQuestionTitleHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "cover", opacity: ".3"}}
                                />
                                <div className="editQuestionTitleWhiteBackground" />
                                <div 
                                    className={`editQuestionTitleEditor INNER_BOX_SHADOW ${colorTheme}`}
                                    style={
                                        error1 || 
                                        error2 || 
                                        error3 || 
                                        error4
                                            ? {border: "2px solid red", width: "606px", height: "44px"} 
                                            : {width: "610px", height: "48px"}
                                        }
                                >
                                    <input 
                                        className="editQuestionTitleEditorInput"
                                        required
                                        type="text" 
                                        value={titleValue}
                                        placeholder="What is your question?"
                                        onChange={(e) => setTitleValue(e.target.value)}
                                    />
                                    <span 
                                        className="editQuestionTitleRequirementText"
                                        style={
                                            error1 || 
                                            error2 || 
                                            error3 || 
                                            error4 
                                                ? {color: "red", fontWeight: "500"} 
                                                : {color: "#aeb4b7"}
                                        }
                                    >
                                        {"(Required)"}
                                    </span>
                                </div>
                            </div>
                            <div 
                                className="editQuestionEditorContainerContainer editor">
                                <div 
                                    className={`editQuestionHigherSpectrumBackground ${colorTheme}`} 
                                    style={{backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, backgroundSize: "100% 256px", opacity: ".3"}}
                                />
                                <div 
                                    className="editQuestionWhiteBackground" 
                                    
                                />
                                <div 
                                    className={`editQuestionEditor INNER_BOX_SHADOW ${colorTheme}`}
                                    
                                >
                                    <div className="editQuestionEditorContainer" >
                                        <FlareTextEditor 
                                            value={value}
                                            setValue={setValue} 
                                            ph={<span>{" Write a description... "}<span className="phRequirementText">{"(Optional)"}</span></span>}
                                        />
                                        <div className="editQuestionEditorContainerContainer imgDZ">
                                            <div className={`editQuestionHigherSpectrumBackground ${colorTheme}`} />
                                            <div
                                                className={`creatQuestionImgDropzoneContainer INNER_BOX_SHADOW ${colorTheme}`}
                                                style={imgDrop ? {height: "256px"} : {height: "0"}}
                                            >
                                                <div 
                                                    className={`editQuestionImgDZContainer ${colorTheme}`}
                                                >
                                                    {
                                                        colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img className="editQuestionImgDZBorder" src={`/misc/img-dz-border-${colorTheme}.png`} alt="" />
                                                            : null
                                                    }
                                                    <div {...getRootProps({className: `editQuestionImgDropzone ${colorTheme}`})}>
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
                                                            className={`editQuestionImgDZCancelPNGIcon ${colorTheme}`}  
                                                            src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                            alt="" 
                                                            onClick={imgDZCancelHandler}
                                                            />
                                                            : <div
                                                                className={`editQuestionImgDZCancelSVGIcon ${colorTheme}`}
                                                                onClick={imgDZCancelHandler}
                                                            >
                                                                {cancelIcon}
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {photos.length > 0 ? (
                                            <div className="editQuestionImages-container">
                                                {photos.map((photo, index) => (
                                                    <div 
                                                        className={
                                                            `editQuestionImageContainer 
                                                            ${index === 0 ? "top" : ""}`
                                                        } 
                                                        key={index}
                                                    >
                                                        <img 
                                                            className="editQuestionImg" 
                                                            src={PS + photo}
                                                            alt="" 
                                                        />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`editQuestionCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removePhotos(index)}
                                                            />
                                                            : <div 
                                                                className={`editQuestionCancelImgSVGBtn ${colorTheme}`} 
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
                                            <div className="editQuestionImages-container">
                                                {files.map((file, index) => (
                                                    <div 
                                                        className={
                                                            `editQuestionImageContainer 
                                                            ${photos.length === 0 && index === 0 ? "top" : ""}`
                                                        } 
                                                        key={index}
                                                    >
                                                        <img 
                                                            className="editQuestionImg" 
                                                            src={URL.createObjectURL(file)}
                                                            alt="" 
                                                        />
                                                        {colorTheme === "rainbow" ||
                                                        colorTheme === "silver" ||
                                                        colorTheme === "gold" ||
                                                        colorTheme === "platinum" ||
                                                        colorTheme === "diamond" 
                                                            ? <img 
                                                                className={`editQuestionCancelImgPNGBtn ${colorTheme}`}  
                                                                src={`/icons/cancel/cancel-${colorTheme}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div 
                                                                className={`editQuestionCancelImgSVGBtn ${colorTheme}`} 
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
                            <div className="editQuestionHashtagEditor">
                                <HashtagEditor tagValue={tagValue} setTagValue={setTagValue} />
                            </div>
                        </div>
                        <hr 
                            className={`editQuestionHr ${colorTheme}`} 
                            style={
                                colorTheme === "diamond" 
                                    ? {
                                        backgroundImage: `url(/misc/${colorTheme}-background.jpg)`, 
                                        backgroundSize: "cover"
                                    } 
                                    : {}
                            }
                        />
                        <div className="editQuestionBottom">
                            <div className="editQuestionOptions">
                                <label htmlFor="file" className="editQuestionOption">
                                    <div className="editQuestionAddPhotoSVGIcon" onClick={imgDZHandler}>{addAPhotoIcon}</div>
                                    {imgBtn === true &&
                                        <input 
                                            style={{display: "none"}} 
                                            type="file" 
                                            id="file" 
                                            name="files[]"
                                            multiple="multiple"
                                            accept="image/*" 
                                            onChange={(event) => imgBtnHandler(event)}
                                        />
                                    }
                                </label>
                            </div>
                            <div className="editQuestionBottomRight">
                                {error1 && 
                                    <span className="editQuestionError">
                                        Your question must be in the form of a question.
                                    </span>
                                }
                                {error2 && 
                                    <span className="editQuestionError">
                                        Your question must be longer than 1 word.
                                    </span>
                                }
                                {error3 && 
                                    <span className="editQuestionError">
                                        Your question can NOT start with a space.
                                    </span>
                                }
                                {error4 && 
                                    <span className="editQuestionError">
                                        The first Letter of your question must be Capitalized.
                                    </span>
                                }
                                <div 
                                    className={
                                        `editQuestionShareButtonBackground 
                                        ${colorTheme} 
                                        ${titleValue.length === 0 ? "disabled" : ""}`
                                    } 
                                    style={colorTheme === "diamond"
                                        ? {backgroundImage: `url(/misc/${colorTheme}-background${shareAct ? "-drk" : ""}.jpg)`, backgroundSize: "cover"} 
                                        : {}
                                    }
                                >
                                    <button 
                                        className={`editQuestionShareButton ${titleValue.length === 0 ? "disabled" : colorTheme}`} 
                                        disabled={titleValue.length === 0 ? true : false}
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
                        type={"Question"} 
                        fKind={fKind} 
                        setFKind={setFKind}
                        fTDD={fTDD}
                        setFTDD={setFTDD}
                    />
                    <AudienceVisibilityDropdown
                        type={"Question"} 
                        fKind={fKind}
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

export default EditQuestion;