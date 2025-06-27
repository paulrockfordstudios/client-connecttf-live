import React, { useEffect, useRef, useState } from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { newFlameAvatar, newUnionAvatar, pAEClose } from "../../../Redux/AuthSlice";
import { axiosReq } from '../../../Utils/axiosConfig';
import "./AvatarEditor.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../Utils/photoEditor/cropImage";
import { dataURLtoFile } from "../../../Utils/photoEditor/dataURLtoFile";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import { cancelIcon } from '../../../Lib/mui/icons';
import { Slider } from '@mui/material';


function AvatarEditor({mFirst, fFirst}) {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const inputRef = useRef();

    const dispatch = useDispatch();

    const [ image, setImage ] = useState(null);
    const [ croppedArea, setCroppedArea ] = useState(null);
    const [ crop, setCrop ] = useState({ x: 0, y: 0});
    const [ zoom, setZoom ] = useState(1);

    const filePopupHandler = () => {
        inputRef.current.click();
    }

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

	const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
			});
		}
	};

    const onUpload = async (event) => {
        
        const updateAvatar = user.unionName
            ? {unionId: user._id}
            : {userId: user._id}
        const canvas = await getCroppedImg(image, croppedArea);
        //const fileName = user.firstName[0].toLowerCase() + user.lastName[0].toLowerCase() + "-" + user._id + "-" + Date.now();
        const canvasDataURL = canvas.toDataURL("image/jpg");
        //const convertedURLToFile = dataURLtoFile(canvasDataURL, Date.now() + user._id +"avatar.jpg")
        const folder = `avatars/${user.unionName? "unions" : "flames"}/${user.unionName ? user.spectrum : user.lastName[0].toUpperCase()}`
        const fileName = user.unionName 
            ? mFirst[0].toLowerCase() + fFirst[0].toLowerCase() + "-" + user._id + "-" + Date.now() + ".jpg"
            : user.firstName[0].toLowerCase() + user.lastName[0].toLowerCase() + "-" + user._id + "-" + Date.now() + ".jpg"
        const convertedURLToFile = dataURLtoFile(canvasDataURL, `${fileName}`)
        const fileData = new FormData();
        
        //const fileName = convertedURLToFile.name;
        //convertedURLToFile.folder = folder;
        fileData.append("name", fileName);
        fileData.append("folder", folder);
        fileData.append("file", convertedURLToFile);
        //console.log(fileData)
        console.log(convertedURLToFile)
        user.unionName 
            ? updateAvatar.unionProfilePicture = folder + "/" + fileName 
            : updateAvatar.profilePicture = folder + "/" + fileName;
        try {
            await axiosReq("POST", "/upload", fileData);
        } catch (err) {
            console.log(err);
        }
        if (user.unionName) {
            try {
                event.preventDefault();
                await axiosReq("PUT", `/unions/${user._id}`, updateAvatar);
                dispatch(newUnionAvatar(updateAvatar.unionProfilePicture));
                localStorage.setItem("user", JSON.stringify({...user, unionProfilePicture: updateAvatar.unionProfilePicture}));
                localStorage.setItem("union", JSON.stringify({...user, unionProfilePicture: updateAvatar.unionProfilePicture}));
                //window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                event.preventDefault();
                await axiosReq("PUT", `/users/${user._id}`, updateAvatar);
                dispatch(newFlameAvatar(updateAvatar.profilePicture));
                localStorage.setItem("user", JSON.stringify({...user, profilePicture: updateAvatar.profilePicture}));
                localStorage.setItem("flame", JSON.stringify({...user, profilePicture: updateAvatar.profilePicture}));
                //window.location.reload();
            } catch (err) {
                console.log(err);
            } 
        }
        
    };

    console.log(user)

    const cancelHandler = () => {
        dispatch(pAEClose())
    }

    return ReactDom.createPortal(
        <div className={`avatarEditorPortal`}>
            <div className={`avatarEditorBackdropOverlay POPUP_BACKGROUND ${colorTheme(user)}`} />
            <div className="avatarEditorModal">
                <div className="avatarEditor">
                    <div className="avatarEditorContainer">
                        <div className="avatarEditorContainerTop">
                            <div className="avatarEditorContainerCropper" style={image ? {backgroundColor: "#aeb4b7"} : {backgroundColor: "#565a5b"}}>
                                {image &&
                                    <Cropper
                                        className="cropper" 
                                        image={image}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        cropShape="round"
                                        showGrid={false}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                }
                                {!image && 
                                    <img 
                                        className="avatarEditorBlankAvatar" 
                                        src={user.unionName ? uAvatar : fAvatar} 
                                        //alt="blank-avatar" 
                                    />
                                }
                            </div>
                            <button 
                                className="avatarEditorCancelButton" 
                                onClick={cancelHandler}
                            >
                                {cancelIcon}
                            </button>
                            <div className="avatarEditorContainerSlider">
                                <Slider
                                    size="large"
                                    color="primary"
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    value={zoom}
                                    onChange={(e, zoom) => setZoom(zoom)}
                                />
                            </div>
                        </div>
                        <div className="avatarEditorContainerBottom">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "rainbow" ||
                                        user.spectrum === "silver" ||
                                        user.spectrum === "gold" ||
                                        user.spectrum === "platinum" ||
                                        user.spectrum === "diamond" ?
                                            (
                                                <div className="avatarEditorContainerButtons">
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        ref={inputRef} 
                                                        onChange={onSelectFile}
                                                        style={{display: "none"}} 
                                                    />
                                                    <button 
                                                        className={
                                                            `avatarEditorContainerButton base left
                                                            ${user.spectrum ? user.spectrum : "gray"}`
                                                        } 
                                                        onClick={() => setImage(null)}
                                                    >
                                                        <span
                                                            className={
                                                                `avatarEditorContainerButton font left
                                                                ${user.spectrum ? user.spectrum : "gray"}`
                                                            } 
                                                        >
                                                            Clear
                                                        </span>
                                                    </button>
                                                    <button 
                                                        className={
                                                            `avatarEditorContainerButton base middle
                                                            ${user.spectrum ? user.spectrum : "gray"}`
                                                        } 
                                                        onClick={filePopupHandler} 
                                                    >
                                                        <span
                                                            className={
                                                                `avatarEditorContainerButton font middle
                                                                ${user.spectrum ? user.spectrum : "gray"}`
                                                            } 
                                                        >
                                                            + Upload
                                                        </span>
                                                    </button>
                                                    <button 
                                                        className={
                                                            `avatarEditorContainerButton base right
                                                            ${user.spectrum ? user.spectrum : "gray"}`
                                                        }  
                                                        onClick={(event) => onUpload(event)}
                                                    >
                                                        <span
                                                            className={
                                                                `avatarEditorContainerButton font right
                                                                ${user.spectrum ? user.spectrum : "gray"}`
                                                            } 
                                                        >
                                                            Save
                                                        </span>
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="avatarEditorContainerButtons">
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        ref={inputRef} 
                                                        onChange={onSelectFile}
                                                        style={{display: "none"}} 
                                                    />
                                                    
                                                    <button 
                                                        className={
                                                            `avatarEditorContainerButton base left
                                                            ${user.spectrum ? user.spectrum : "gray"}`
                                                        } 
                                                        onClick={() => setImage(null)}
                                                    >
                                                        Clear
                                                    </button>
                                                    <button 
                                                        className={
                                                            `avatarEditorContainerButton base middle
                                                            ${user.spectrum ? user.spectrum : "gray"}`
                                                        } 
                                                        onClick={filePopupHandler} 
                                                    >
                                                        + Upload
                                                    </button>
                                                    <button 
                                                        className={
                                                            `avatarEditorContainerButton base right
                                                            ${user.spectrum ? user.spectrum : "gray"}`
                                                        }  
                                                        onClick={onUpload}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </>
                                ) : (
                                    <div className="avatarEditorContainerButtons">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            ref={inputRef} 
                                            onChange={onSelectFile}
                                            style={{display: "none"}} 
                                        />
                                        
                                        <button 
                                            className={
                                                `avatarEditorContainerButton base left
                                                ${user.energy ? user.energy : "gray"}`
                                            } 
                                            onClick={() => setImage(null)}
                                        >
                                            Clear
                                        </button>
                                        <button 
                                            className={
                                                `avatarEditorContainerButton base middle
                                                ${user.energy ? user.energy : "gray"}`
                                            } 
                                            onClick={filePopupHandler} 
                                        >
                                            + Upload
                                        </button>
                                        <button 
                                            className={
                                                `avatarEditorContainerButton base right
                                                ${user.energy ? user.energy : "gray"}`
                                            }  
                                            onClick={(event) => onUpload(event)}
                                        >
                                            Save
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal") 
    )
}

export default AvatarEditor;