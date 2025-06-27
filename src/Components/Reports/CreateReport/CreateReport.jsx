import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { cReportClose } from "../../../Redux/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import { colorTheme } from "../../../Utils/styling/colorTheme";
import "./CreateReport.css";
import GeneralTextEditor from "../../Editors/QuillTextEditors/GeneralTextEditor/GeneralTextEditor";
import { cancelIcon } from "../../../Lib/mui/icons";


function CreateReport({data}) {
   
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const color = colorTheme(data.user);

    const [files, setFiles] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ value, setValue ] = useState("");
    const [ shareAct, setShareAct ] = useState(false);
    

    const newReport = { 
        auto: false,
        plaintiffType: user.unionName ? "union" : "flame",
        plaintiffId: user._id,
        defendentType: data.flare.union ? "union" : "flame",
        defendentId: data.user._id,
        reportType: data.flare ? "flare" : "user",
        flareType: data.type,
        flareId: data.flare._id,
        description: value,  
        photos: fileNames.map((fn) => {return `reports/${data.flare ? "flare" : "user"}/${type}/${data.flare._id}` + "/" + fn}),
    };

    const newSuspension = { 
        accountType: data.flare.union ? "union" : "flare",
        accountId: data.user._id,
        description: "<p>Auto report, too many flags on flare.</p>",  
    };
    
    useEffect(() => {
        files.forEach((file) => {
            const fileName = Date.now() + file.name;
            const folder = `reports/${newReport.reportType}/${newReport.flareType}/${newReport.flareId}`;
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
            const reportRes = await axiosReq("POST", "/reports", newReport);
            await axiosReq("PUT",`/${data.type}s/${data.flare._id}/report`, {reportId: reportRes.data._id})
            const reportArr = [];
            reportArr.push(reportRes.data._id)
            Object.assign(newSuspension, {reports: reportArr});
            const suspensionRes = await axiosReq("POST", "/suspensions", newSuspension);
            await axiosReq("PUT", `/${data.flare.union ? "unions" : "users"}/${data.user._id}/suspend`, {suspensionId: suspensionRes.data._id});
        } catch (err) {
            console.log(err);
        }
        navigate("/");
        dispatch(cReportClose());
    };

    const removeFiles = (idx2Rmv) => {
        setFiles(files.filter((_, index) => index !== idx2Rmv));
    };

    const imgBtnHandler = (event) => {
        setFiles(files.concat(Array.from(event.target.files)));
    };


    return ReactDom.createPortal(
        <div className="createReportPortal">
            <div className={`createReportBackdropOverlay POPUP_BACKGROUND ${color}`} />
            <div className="createReportModal">
            <div className={`createReport flame ${color}`}>
                    <div className="createReport-container" >
                        <div className="createReportTop">
                            <div className="createReportTopUpper">
                                <i  
                                    className="createReportLogo PNG_LOGO_THREE"
                                    alt="connecttf-logo-three" 
                                />    
                                <span className="creatReportTitle">Create Report</span>
                                <div 
                                    className={`createReportCancelSVGIcon ${color}`} 
                                    onClick={() => dispatch(cReportClose())}
                                >
                                    {cancelIcon}
                                </div>
                            </div>
                            <hr className="createReportHr" />
                        </div>
                        <div className="createReportCenter">
                            <div className="createReportDisclaimer">
                                <span className="createReportDisclaimerTitle">{"Writing a report is a serious matter!"}</span>
                                <div>
                                    <span>{"Only write a report if this user is violating the "}</span>
                                    <Link 
                                        className="createReportTOULink"
                                        to="/terms_of_use"
                                    >
                                        terms of use
                                    </Link>
                                    <span>{" in a harmful way."}</span> 
                                </div> 
                                
                                <span>{"(i.e. harrassing, threatening, posting violent or sexually offensive material)"}</span>
                                <span>{"Otherwise, flag this content if it is inappropriate."}</span>
                                <span>{"False reporting could lead to a strike against your account."}</span>
                                <div>
                                    <span>{"For reference and resource, please review our "}</span>
                                    <Link 
                                        className="createReportTOULink"
                                        to="/terms_of_use"
                                    >
                                        terms of use
                                    </Link>
                                    <span>{"."}</span>
                                </div>
                            </div>
                            <div 
                                className="createReportEditorContainerContainer editor">
                                <div className="createReportEditor">
                                    <div 
                                        id={`cp-fte-${user._id}`}
                                        className="createReportEditorContainer"
                                    >
                                        <GeneralTextEditor
                                            editorId={`cReport-gte-${user._id}`}
                                            value={value}
                                            setValue={setValue}    
                                        />                             
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="createReportDisclaimer photoSection">
                            {"Share a screenshot. Having evidence backs your claim in the report."}
                        </span>
                        <div className="createReportPhotoSection">
                            <label htmlFor="file" className="createReportButton">
                                <span>Add Photos</span>
                                <input 
                                    style={{display: "none"}} 
                                    type="file" 
                                    id="file" 
                                    multiple="multiple"
                                    accept="image/*" 
                                    onChange={(event) => imgBtnHandler(event)} 
                                />
                            </label>
                            <div className="createReportPhotoContainer">
                                {files.length > 0 ? (
                                    <div className="createReportImages-container">
                                        {files.map((file, index) => (
                                            <div className={`createReportImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                <text className="createReportImageText">{file.name}</text>
                                                <div 
                                                    className={`createReportCancelImgSVGBtn ${color}`} 
                                                    onClick={() => removeFiles(index)}
                                                >
                                                    {cancelIcon}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}   
                            </div>
                        </div>
                        <hr className="createReportHr" />
                        <div className="createReportBottom">
                                <button 
                                    className="createReportShareButton" 
                                    style={value === null || value === "" || value === "<p><br></p>" ? {opacity: "30%"} : {opacity: "100%"}}
                                    disabled={value === null || value === "" || value === "<p><br></p>" ? true : false}
                                    type="button|submit|reset" 
                                    onClick={handleSubmit}
                                    onMouseDown={() => setShareAct(true)}
                                    onMouseUp={() => setShareAct(false)}
                                >
                                    Report
                                </button>
                        </div>
                    </div>
                </div>
        </div>
        </div>,
        document.getElementById("portal")
    )
}

export default CreateReport;