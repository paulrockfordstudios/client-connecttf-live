import React, { useEffect, useRef, useState } from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { pBEClose } from "../../../Redux/AuthSlice";
import { axiosReq } from '../../../Utils/axiosConfig';
import "./BackgroundPicEditor.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../Utils/photoEditor/cropImage";
import { dataURLtoFile } from "../../../Utils/photoEditor/dataURLtoFile";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import { cancelIcon } from '../../../Lib/mui/icons';
import { Slider } from '@mui/material';


function BackgroundPicEditor() {

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

    const onUpload = async () => {
        const updateBackgroundPic = user.unionName
            ? {unionId: user._id}
            : {userId: user._id}
        const canvas = await getCroppedImg(image, croppedArea);
        const canvasDataURL = canvas.toDataURL("image/jpg");
        const convertedURLToFile = dataURLtoFile(canvasDataURL, Date.now() + user._id + "BackgroundPic.jpg")
        const fileData = new FormData();
        const fileName = convertedURLToFile.name;
        fileData.append("name", fileName);
        fileData.append("file", convertedURLToFile);
        updateBackgroundPic.backgroundPicture = PF + fileName
        try {
            await axiosReq("POST", "/upload", fileData);
        } catch (err) {
            console.log(err);
        }
        if (user.unionName) {
            try {
                await axiosReq("PUT", `/unions/${user._id}`, updateBackgroundPic);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                localStorage.setItem("union", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axiosReq("PUT", `/users/${user._id}`, updateBackgroundPic);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                localStorage.setItem("flame", JSON.stringify({...user, backgroundPicture: updateBackgroundPic.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const cancelHandler = () => {
        dispatch(pBEClose())
    }

    return ReactDom.createPortal(
        <div className={`backgroundPicEditorPortal`}>
            <div className={`backgroundPicEditorBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="backgroundPicEditorModal">
                <div className="backgroundPicEditor">
                    <div className="backgroundPicEditorContainer">
                        <div className="backgroundPicEditorContainerTop">
                            <div className="backgroundPicEditorContainerCropper" style={image ? {backgroundColor: "#aeb4b7"} : {backgroundColor: "#565a5b"}}>
                                {image &&
                                    <Cropper
                                        className="cropper" 
                                        image={image}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1}
                                        cropSize={{width: 550, height: 200}}
                                        showGrid={false}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                }
                            </div>
                            <button 
                                className="backgroundPicEditorCancelButton" 
                                onClick={cancelHandler}
                            >
                                {cancelIcon}
                            </button>
                            <div className="backgroundPicEditorContainerSlider">
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
                        <div className="backgroundPicEditorContainerBottom">
                            <div className="backgroundPicEditorContainerButtons">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    ref={inputRef} 
                                    onChange={onSelectFile}
                                    style={{display: "none"}} 
                                />
                                
                                <button 
                                    className={`backgroundPicEditorContainerButton ${user.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`} 
                                    onClick={() => setImage(null)}
                                >
                                    Clear
                                </button>
                                <button 
                                    className={`backgroundPicEditorContainerButton ${user.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`} 
                                    onClick={filePopupHandler} 
                                >
                                    + Upload
                                </button>
                                <button 
                                    className={`backgroundPicEditorContainerButton ${user.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`}  
                                    onClick={onUpload}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default BackgroundPicEditor;