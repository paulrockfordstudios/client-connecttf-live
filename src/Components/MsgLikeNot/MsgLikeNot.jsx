import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../Utils/icons/icons';
import "./MsgLikeNots.css";

function MsgLikeNots({ not }) {

    const { chatMDD } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const msgLikeNot = not;
    
    const [ message, setMessage ] = useState({});
    const [ conversation, setConversation ] = useState({});
    const [ seen, setSeen ] = useState(msgLikeNot?.seen);

    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axiosReq("GET", `/messages/${msgLikeNot.messageId}`)
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
                const res = await axiosReq("GET", `/conversations/${msgLikeNot.conversationId}`)
                setConversation(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getConversation();
    }, []);

    useEffect(() => {
        if(msgLikeNot) {
            setSeen(msgLikeNot.seen)
        }
    }, [msgLikeNot])

    useEffect(() => {
        if (chatMDD && seen === false) {
            setSeen(true);
        }
    },[chatMDD, seen]);

    
    return (
        <Link className={`MsgLikeNots`} to="/messenger" state={conversation}>
            <div 
                className={`
                    MsgLikeNotsBackgroundTheme 
                    ${msgLikeNot.liker.color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen ? "seen" : "unseen"} 
                    ${msgLikeNot.liker.color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    MsgLikeNotsHr 
                    top 
                    ${msgLikeNot.liker.color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${msgLikeNot.liker.color}
                `} 
            />
            <div className={`MsgLikeNotsContainer`}>
                <div className="MsgLikeNotsLeft">
                    <img 
                        className={`MsgLikeNotsProfilePic`} 
                        src={msgLikeNot.liker.avatar 
                            ? PS + msgLikeNot.liker.avatar
                            : msgLikeNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`MsgLikeNotsIcon ${msgLikeNot.union ? "union" : "flame"}`} 
                        src={msgLikeNot.union
                            ? spectrumIcon(msgLikeNot.liker.color)
                            : energyIcon(msgLikeNot.liker.color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`MsgLikeNotsRight ${msgLikeNot.liker.color}`}>
                    <div className="MsgLikeNotsRightTop"> 
                        <div className="MsgLikeNotsTitle">
                            <div className="MsgLikeNotsTitleLeft">
                                <span className="MsgLikeNotsTitleLeftPhrase">
                                    <span className={`MsgLikeNotsName ${msgLikeNot.liker.color}`}>{`${msgLikeNot.liker.profileName} `}</span>     
                                    <span className="MsgLikeNotsAction">{`liked your message!`}</span>
                                </span>
                            </div>
                            <div className="MsgLikeNotsTitleRight">
                                <i 
                                    className={`MsgLikeNotsTitleRightPNGIcon PNG_ICON_LIKED_LGT`} 
                                    alt="MsgLike/MsgLiked" 
                                />
                            </div>
                        </div>
                    </div>                                                      
                    <div className="MsgLikeNotsRightBottom">
                        <span
                            className="MsgLikeNotsRetort description"
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message?.description)}} 
                        />               
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    MsgLikeNotsHr 
                    bottom 
                    ${msgLikeNot.likers.color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${msgLikeNot.likers.color}
                `} 
            />
        </Link>
    )
}

export default MsgLikeNots;