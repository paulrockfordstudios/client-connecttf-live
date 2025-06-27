import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Conversation from '../../Conversation/Conversation';
import { axiosReq } from '../../../Utils/axiosConfig';
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import "./MessageBar.css";
import { 
    cvBxOpen, cvBxClose,
    userConv1, userConv2, userConv3,
    setCv1, cv1Up, cv1Open, 
    setCv2, cv2Up, cv2Open, 
    setCv3, cv3Up,  cv3Open, 
} from '../../../Redux/AuthSlice';
import { moreHorizIcon } from '../../../Lib/mui/icons';


function Messagebar() {

    const { 
        user, convBox,
        c1Open, c2Open, c3Open, 
        onlineFlames, onlineUnions,
        newMsg, newArrFlameMsg, newArrUnionMsg,
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const PS = process.env.PHOTO_STORAGE;

    const [ cCOpen, setCCOpen ] = useState(convBox);
    const [ convs, setConvs ] = useState([]);
    const [ fConvs, setFConvs ] = useState([]);
    const [ drkIcon, setDrkIcon ] = useState(false);
    const [ diamondHover, setDiamondHover ] = useState(false);
    const [ diamondActive, setDiamondActive ] = useState(false);
    const [ chatConvHover, setChatConvHover ] = useState(false);
    const [ chatConvActive, setChatConvActive ] = useState(false);
    const [ chatWriteHover, setChatWriteHover ] = useState(false);
    const [ chatWriteActive, setChatWriteActive ] = useState(false);
    const [ chatOptionsHover, setChatOptionsHover ] = useState(false);
    const [ chatOptionsActive, setChatOptionsActive ] = useState(false);

    const colorTheme = user?.unionName ? user?.spectrum : user?.energy;


    useEffect(() => {
        if (convBox) {
        setCCOpen(convBox);
        }
    }, [convBox]);


    useEffect(() => {
        if (user) {
            const getConversations = async () => {
                try {
                    const res = user.unionName 
                        ? await axiosReq("GET", `/conversations/union/${user._id}`)
                        : await axiosReq("GET", `/conversations/flame/${user._id}`)
                    setConvs(res.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getConversations();
        }
    }, [user?.conversation1, user?.conversation2, user?.conversation3, user?.messenger]);

    const convBoxOpen = () => {
        setCCOpen(true)
        dispatch(cvBxOpen());
        localStorage.setItem("convBox", JSON.stringify(true));
    };

    const convBoxClose = () => {
        setCCOpen(false);
        dispatch(cvBxClose());
        localStorage.removeItem("convBox");
    };

    const handleClick = async (conv) => {
        let newConv = {}
        if (c1Open && !c2Open) {
            user.unionName 
                ? newConv = {
                    unionId: user._id,
                    conversation2: {
                        convo: conv,
                        openActive: true,
                        prevMessages: true,
                    }
                }
                : newConv = {
                    userId: user._id,
                    conversation2: {
                        convo: conv,
                        openActive: true,
                        prevMessages: true,
                    }
                }
            dispatch(userConv2(newConv.conversation2))
            dispatch(setCv2(conv));
            dispatch(cv2Open());
            dispatch(cv2Up());
            localStorage.setItem("conv2", JSON.stringify(conv))
            localStorage.setItem("c2Open", JSON.stringify(true))
            localStorage.setItem("c2Up", JSON.stringify(false))
            try {
                user.unionName
                    ? await axiosReq("PUT", `/unions/${user._id}`, newConv)
                    : await axiosReq("PUT", `/users/${user._id}`, newConv)
            } catch (err) {
                console.log(err);
            }
        } else if (c1Open && c2Open && !c3Open) {
            user.unionName 
                ? newConv = {
                    unionId: user._id,
                    conversation3: {
                        convo: conv,
                        openActive: true,
                        prevMessages: true,
                    }
                }
                : newConv = {
                    userId: user._id,
                    conversation3: {
                        convo: conv,
                        openActive: true,
                        prevMessages: true,
                    }
                }
            dispatch(userConv3(newConv.conversation3))
            dispatch(setCv3(conv));
            dispatch(cv3Open());
            dispatch(cv3Up());
            localStorage.setItem("conv3", JSON.stringify(conv))
            localStorage.setItem("c3Open", JSON.stringify(true))
            localStorage.setItem("c3Up", JSON.stringify(false))
            try {
                user.unionName
                    ? await axiosReq("PUT", `/unions/${user._id}`, newConv)
                    : await axiosReq("PUT", `/users/${user._id}`, newConv)
            } catch (err) {
                console.log(err);
            }
        } else {
            user.unionName 
                ? newConv = {
                    unionId: user._id,
                    conversation1: {
                        convo: conv,
                        openActive: true,
                        prevMessages: true,
                    }
                }
                : newConv = {
                    userId: user._id,
                    conversation1: {
                        convo: conv,
                        openActive: true,
                        prevMessages: true,
                    }
                }
            dispatch(userConv1(newConv.conversation1))
            dispatch(setCv1(conv));
            dispatch(cv1Open());
            dispatch(cv1Up());
            localStorage.setItem("conv1", JSON.stringify(conv))
            localStorage.setItem("c1Open", JSON.stringify(true))
            localStorage.setItem("c1Up", JSON.stringify(false))
            try {
                user.unionName
                    ? await axiosReq("PUT", `/unions/${user._id}`, newConv)
                    : await axiosReq("PUT", `/users/${user._id}`, newConv)
            } catch (err) {
                console.log(err);
            }
        }
    };


    const newConversationBoxHandler = () => {
        if (c1Open && c2Open) {
            dispatch(cv3Open())
            dispatch(cv3Up())
        } else if (c1Open && !c2Open) {
            dispatch(cv2Open())
            dispatch(cv2Up())
        } else {
            dispatch(cv1Open())
            dispatch(cv1Up())
        }
    }

   

    return (
        <>
            {user &&
                <div className="messageBar">
                    <div 
                        className={`
                            chatConvBackgroundTheme 
                            HIGHER_BACKGROUND
                            ${colorTheme} 
                            ${cCOpen ? "open" : "close"}
                        `} 
                    />   
                    <div 
                        className={`
                            chatConv-container 
                            BOX_SHADOW
                            ${!cCOpen && diamondHover ? 'HIGHER_BACKGROUND' : ""}
                            ${colorTheme}
                            ${!cCOpen && diamondHover ? drkIcon ? 'drk lgt' : 'lgt' : ""}
                            ${cCOpen ? "open" : "close"}
                        `}
                        onClick={cCOpen ? null : convBoxOpen}
                        onMouseEnter={() => setDiamondHover(true)}
                        onMouseLeave={() => setDiamondHover(false)}
                        onMouseDown={() => setDrkIcon(true)}
                        onMouseUp={() => setDrkIcon(false)}
                    >
                        {cCOpen ?
                            (
                                <div className={`chatConvContainer ${colorTheme}`}>
                                    <div className={`chatConvContainerTop ${colorTheme}`}>
                                        <div className="chatConvContainerTopLeft">
                                            <div className={`chatConvAvatarContainer ${cCOpen ? "open" : "close"} ${colorTheme}`}>
                                                <img 
                                                    className="chatConvAvatar" 
                                                    src={
                                                        user.unionName
                                                            ? user.unionProfilePicture 
                                                                ? PS + user.unionProfilePicture 
                                                                : uAvatar 
                                                            : user.profilePicture 
                                                                ? PS + user.profilePicture 
                                                                : fAvatar
                                                    } 
                                                    onError={(e) => {
                                                        e.currentTarget.src = user.unionName
                                                            ? uAvatar 
                                                            : fAvatar
                                                    }}
                                                    alt="" 
                                                />
                                            </div> 
                                        </div>
                                        <div className="chatConvContainerTopRight">
                                            <div className="chatConvBtnContainer">
                                                <div 
                                                    className={`
                                                        chatConvBtnContainerBackgroundTheme 
                                                        HIGHER_BACKGROUND
                                                        ${colorTheme}
                                                    `} 
                                                />  
                                                <div 
                                                    className={`
                                                        chatConvContainerBtn
                                                        BOX_SHADOW
                                                        ${chatWriteHover ? 'HIGHER_BACKGROUND' : ""}
                                                        ${colorTheme}
                                                        ${chatWriteActive ? "drk" : ""}
                                                        lgt
                                                    `}
                                                    onMouseEnter={() => setChatWriteHover(true)}
                                                    onMouseLeave={() => setChatWriteHover(false)}
                                                    onMouseDown={() => setChatWriteActive(true)}
                                                    onMouseUp={() => setChatWriteActive(false)}
                                                    onClick={newConversationBoxHandler}
                                                >
                                                    <i 
                                                        className={`
                                                            chatConvWriteIcon
                                                            PNG_ICON_WRITE
                                                            ${colorTheme}
                                                            ${chatWriteActive ? "drk" : ""}
                                                        `} 
                                                        alt="write-icon" 
                                                    />
                                                </div>              
                                            </div>
                                            <div className="chatConvBtnContainer" style={{opacity: "0.3"}}>
                                                <div 
                                                    className={`
                                                        chatConvBtnContainerBackgroundTheme
                                                        HIGHER_BACKGROUND
                                                        ${colorTheme}
                                                    `} 
                                                /> 
                                                <div 
                                                    className={`
                                                        chatConvContainerBtn
                                                        BOX_SHADOW
                                                        ${chatOptionsHover ? 'HIGHER_BACKGROUND' : ""}
                                                        ${colorTheme}
                                                        ${chatOptionsActive ? "drk" : ""}
                                                    `}
                                                    onMouseEnter={() => setChatOptionsHover(true)}
                                                    onMouseLeave={() => setChatOptionsHover(false)}
                                                    onMouseDown={() => setChatOptionsActive(true)}
                                                    onMouseUp={() => setChatOptionsActive(false)}
                                                >
                                                    <div className="chatConvOptionsIcon">{moreHorizIcon}</div>
                                                </div>                  
                                            </div>
                                        </div>
                                    </div>
                                    <hr 
                                        className={`
                                            chatConvHr
                                            HIGHER_BACKGROUND
                                            ${colorTheme}
                                        `}
                                    />
                                    <div className={`chatConvContainerCenter ${colorTheme}`}>
                                        <div className={`chatConvContainerCenterUnion ${colorTheme}`}>
                                            <span className={`chatConvContainerTitle ${colorTheme}`}>Union Messages</span>
                                            <hr 
                                                className={`
                                                    chatConvTitleHr 
                                                    HIGHER_BACKGROUND
                                                    ${colorTheme}
                                                    union
                                                `}
                                            />                                                            
                                            <div className="chatConvlist">
                                                {convs &&
                                                    convs.map((conv) => user?.unionName ? 
                                                        (
                                                            conv.unionMembers.length === 2 &&
                                                                <div 
                                                                    key={conv._id} 
                                                                    onClick={() => handleClick(conv)}
                                                                >
                                                                    <Conversation 
                                                                        conversation={conv} 
                                                                        currentUser={user} 
                                                                        cn={"mb"}
                                                                        //arrivalFlameMessage={arrivalFlameMessage}
                                                                        //arrivalUnionMessage={arrivalUnionMessage}
                                                                        //newMessage={newMessage}
                                                                    />
                                                                </div>
                                                        ) : (
                                                            conv.unionMembers.length === 1 && 
                                                                <div 
                                                                    key={conv._id} 
                                                                    onClick={() => handleClick(conv)}
                                                                >
                                                                    <Conversation 
                                                                        conversation={conv} 
                                                                        currentUser={user} 
                                                                        cn={"mb"}
                                                                        //arrivalFlameMessage={arrivalFlameMessage}
                                                                        //arrivalUnionMessage={arrivalUnionMessage}
                                                                        //newMessage={newMessage}
                                                                    />
                                                                </div>
                                                        )
                                                    )
                                                } 
                                            </div>
                                        </div>
                                        <hr 
                                            className={`
                                                chatConvHr
                                                HIGHER_BACKGROUND
                                                ${colorTheme}
                                            `}
                                        /> 
                                        <div className={`chatConvContainerCenterFlame ${colorTheme}`}>
                                            <span className={`chatConvContainerTitle ${colorTheme}`}>Flame Messages</span>
                                            <hr 
                                                className={`
                                                    chatConvTitleHr
                                                    HIGHER_BACKGROUND
                                                    ${colorTheme} 
                                                    flame
                                                `}
                                            /> 
                                            <div className="chatConvlist">
                                                {convs &&
                                                    convs.map((conv) => user?.unionName ?
                                                        (
                                                            conv.flameMembers.length === 1 &&
                                                                <div 
                                                                    key={conv._id} 
                                                                    onClick={() => handleClick(conv)}
                                                                >
                                                                    <Conversation 
                                                                        conversation={conv} 
                                                                        currentUser={user} 
                                                                        cn={"mb"}
                                                                        //arrivalFlameMessage={arrivalFlameMessage}
                                                                        //arrivalUnionMessage={arrivalUnionMessage}
                                                                        //newMessage={newMessage}
                                                                    />
                                                                </div>
                                                        ) : (
                                                            conv.flameMembers.length === 2 &&
                                                                <div 
                                                                    key={conv._id}
                                                                    onClick={() => handleClick(conv)}
                                                                >
                                                                    <Conversation 
                                                                        conversation={conv} 
                                                                        currentUser={user} 
                                                                        cn={"mb"}
                                                                        //arrivalFlameMessage={arrivalFlameMessage}
                                                                        //arrivalUnionMessage={arrivalUnionMessage}
                                                                        //newMessage={newMessage}
                                                                    />
                                                                </div>
                                                        )
                                                    )
                                                } 
                                            </div>
                                        </div>
                                    </div>
                                    <hr 
                                        className={`
                                            chatConvHr
                                            HIGHER_BACKGROUND
                                            ${colorTheme}
                                        `}
                                    /> 
                                    <div className={`chatConvContainerBottom ${colorTheme}`}>
                                        <div className="chatConvBottomBtnContainer">
                                            <div 
                                                className={`
                                                    chatConvBottomBtnContainerBackgroundTheme
                                                    HIGHER_BACKGROUND
                                                    ${colorTheme}
                                                `} 
                                            />           
                                            <div 
                                                className={`
                                                    chatConvBtn
                                                    BOX_SHADOW
                                                    ${chatConvHover ? 'HIGHER_BACKGROUND' : ""}
                                                    ${colorTheme}
                                                    ${chatConvActive ? "drk" : ""}
                                                    lgt
                                                `}
                                                onClick={convBoxClose}
                                                onMouseEnter={() => setChatConvHover(true)}
                                                onMouseLeave={() => setChatConvHover(false)}
                                                onMouseDown={() => setChatConvActive(true)}
                                                onMouseUp={() => setChatConvActive(false)}
                                            >
                                                <i 
                                                    className={`
                                                        chatConvBtnPNGIcon
                                                        ${chatConvActive ? 'PNG_ICON_CHAT_DRK' : 'PNG_ICON_CHAT'}
                                                        ${colorTheme}
                                                    `} 
                                                    alt="chat-icon" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <i 
                                    className={`
                                        chatConvIcon
                                        ${drkIcon ? 'PNG_ICON_CHAT_DRK' : 'PNG_ICON_CHAT'}
                                        ${colorTheme}
                                        container
                                    `} 
                                    alt="chat-icon" 
                                />
                            )
                        }
                    </div>
                </div>        
            }
        </>
    )
}

export default memo(Messagebar);