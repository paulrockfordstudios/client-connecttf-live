import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import "./MsgLoveNots.css";

function MsgLoveNots({ not }) {

    const { chatMDD } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const msgLoveNot = not;
    
    const [ message, setMessage ] = useState({});
    const [ conversation, setConversation ] = useState({});
    const [ seen, setSeen ] = useState(msgLoveNot?.seen);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axiosReq("GET", `/messages/${msgLoveNot.messageId}`)
                setMessage(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getMessage();
    }, []);

    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axiosReq("GET", `/conversations/${msgLoveNot.conversationId}`)
                setConversation(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getConversation();
    }, []);

    useEffect(() => {
        if(msgLoveNot) {
            setSeen(msgLoveNot.seen)
        }
    }, [msgLoveNot])

    useEffect(() => {
        if (chatMDD && seen === false) {
            setSeen(true);
        }
    },[chatMDD, seen]);

    
    return (
        <Link className={`MsgLoveNots`} to="/messenger" state={conversation}>
            <div 
                className={`
                    MsgLoveNotsBackgroundTheme 
                    ${msgLoveNot.lover.color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen ? "seen" : "unseen"} 
                    ${msgLoveNot.lover.color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    MsgLoveNotsHr 
                    top 
                    ${msgLoveNot.lover.color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${msgLoveNot.lover.color}
                `} 
            />
            <div className={`MsgLoveNotsContainer`}>
                <div className="MsgLoveNotsLeft">
                    <img 
                        className={`MsgLoveNotsProfilePic`} 
                        src={msgLoveNot.lover.avatar 
                            ? PS + msgLoveNot.lover.avatar
                            : msgLoveNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`MsgLoveNotsIcon ${msgLoveNot.union ? "union" : "flame"}`} 
                        src={msgLoveNot.union
                            ? spectrumIcon(msgLoveNot.lover.color)
                            : energyIcon(msgLoveNot.lover.color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`MsgLoveNotsRight ${msgLoveNot.lover.color}`}>
                    <div className="MsgLoveNotsRightTop"> 
                        <div className="MsgLoveNotsTitle">
                            <div className="MsgLoveNotsTitleLeft">
                                <span className="MsgLoveNotsTitleLeftPhrase">
                                    <span className={`MsgLoveNotsName ${msgLoveNot.lover.color}`}>{`${msgLoveNot.lover.profileName} `}</span>     
                                    <span className="MsgLoveNotsAction">{`loved your message!`}</span>
                                </span>
                            </div>
                            <div className="MsgLoveNotsTitleRight">
                                <i 
                                    className={`MsgLoveNotsTitleRightPNGIcon PNG_ICON_LovED_LGT`} 
                                    alt="MsgLove/MsgLoved" 
                                />
                            </div>
                        </div>
                    </div>                                                      
                    <div className="MsgLoveNotsRightBottom">
                        <span
                            className="MsgLoveNotsRetort description"
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message?.description)}} 
                        />               
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    MsgLoveNotsHr 
                    bottom 
                    ${msgLoveNot.lovers.color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${msgLoveNot.lovers.color}
                `} 
            />
        </Link>
    )
}

export default MsgLoveNots;