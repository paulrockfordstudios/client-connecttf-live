import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./ConversationBar.css";
import { 
    userConv1, userConv2, userConv3,
    setCv1, cv1Close, cv1Down, cv1Up,
    setCv2, cv2Close, cv2Down, cv2Up, 
    setCv3, cv3Close, cv3Down, cv3Up, 
} from "../../../Redux/AuthSlice";
import ChatBox from '../../ChatBox/ChatBox';


function ConversationBar() {

    const { 
        user, convBox,
        conv1, c1Open, c1Up, 
        conv2, c2Open, c2Up, 
        conv3, c3Open, c3Up,
        onlineFlames, onlineUnions,
        newMsg, newArrFlameMsg, newArrUnionMsg, 
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ message1, setMessage1 ] = useState("");
    const [ message2, setMessage2 ] = useState("");
    const [ message3, setMessage3 ] = useState("");


    useEffect(() => {
        if (newArrFlameMsg) {
            if (conv1?.flameMembers.includes(newArrFlameMsg.flameSenderId)) {
                setMessage1(newArrFlameMsg);
            } else if (conv2?.flameMembers.includes(newArrFlameMsg.flameSenderId)) {
                setMessage2(newArrFlameMsg);
            } else if (conv3?.flameMembers.includes(newArrFlameMsg.flameSenderId)) {
                setMessage3(newArrFlameMsg);
            } else {
                return;
            }
        }
    }, [newArrFlameMsg]);


    useEffect(() => {
        if (newArrUnionMsg) {
            if (conv1?.unionMembers.includes(newArrUnionMsg.unionSenderId)) {
                setMessage1(newArrUnionMsg);
            } else if (conv2?.unionMembers.includes(newArrUnionMsg.unionSenderId)) {
                setMessage2(newArrUnionMsg);
            } else if (conv3?.unionMembers.includes(newArrUnionMsg.unionSenderId)) {
                setMessage3(newArrUnionMsg);
            } else {
                return;
            }
        } 
    }, [newArrUnionMsg]);


    const handle1Up = async () => {
        dispatch(cv1Up());
        localStorage.setItem("c1Up", JSON.stringify(true));
        const conv1Up = user.unionName
            ? {
                unionId: user._id,
                conversation1: {
                    convo: conv1,
                    openActive: true,
                    prevMessages: user.conversation1.prevMessages
                        ? user.conversation1.prevMessages
                        : false,
                }
            }
            : {
                userId: user._id,
                conversation1: {
                    convo: conv1,
                    openActive: true,
                    prevMessages: user.conversation1.prevMessages
                        ? user.conversation1.prevMessages
                        : false,
                }
            }
        dispatch(userConv1(conv1Up.conversation1))
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, conv1Up)
                : await axiosReq("PUT", `/users/${user._id}`, conv1Up)
        } catch (err) {
            console.log(err);
        }
    };

    const handle1Down = async () => {
        dispatch(cv1Down());
        localStorage.setItem("c1Up", JSON.stringify(false));
        const conv1Down = user.unionName
            ? {
                unionId: user._id,
                conversation1: {
                    convo: conv1,
                    openActive: false,
                    prevMessages: user.conversation1.prevMessages
                        ? user.conversation1.prevMessages
                        : false,
                }
            }
            : {
                userId: user._id,
                conversation1: {
                    convo: conv1,
                    openActive: false,
                    prevMessages: user.conversation1.prevMessages
                        ? user.conversation1.prevMessages
                        : false,
                }
            }
        dispatch(userConv1(conv1Down.conversation1)) 
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, conv1Down)
                : await axiosReq("PUT", `/users/${user._id}`, conv1Down)
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleUnion1Close = async () => {
        let closeConv1 = {};
        let closeConv2 = {};
        let closeConv3 = {};
        if (c2Open) {
            if (c3Open) {
                closeConv3 = {
                    unionId: user._id,
                    conversation3: {}
                }
                closeConv2 = {
                    unionId: user._id,
                    conversation2: {
                        convo: conv3,
                        openActive: c3Up,
                        prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                    }
                }
                closeConv1 = {
                    unionId: user._id,
                    conversation1: {
                        convo: conv2,
                        openActive: c2Up,
                        prevMessages: user.conversation2.prevMessages
                            ? user.conversation2.prevMessages
                            : false,
                    }
                }   
                try {
                    await axiosReq("PUT", `/unions/${user._id}`, closeConv1);
                } catch (err) {
                    console.log(err);
                }
                try {
                    await axiosReq("PUT", `/unions/${user._id}`, closeConv2);
                } catch (err) {
                    console.log(err);
                }
                try {
                    await axiosReq("PUT", `/unions/${user._id}`, closeConv3);
                } catch (err) {
                    console.log(err);
                }
                dispatch(userConv1(closeConv1.conversation1))
                dispatch(setCv1(conv2));
                localStorage.setItem("conv1", JSON.stringify(conv2));
                localStorage.setItem("c1Open", JSON.stringify(c2Open));
                localStorage.setItem("c1Up", JSON.stringify(c2Up));
                localStorage.setItem("conv2", JSON.stringify(conv3));
                localStorage.setItem("c2Open", JSON.stringify(c3Open));
                localStorage.setItem("c2Up", JSON.stringify(c3Up));
                dispatch(userConv2(closeConv2.conversation2))
                dispatch(setCv2(conv3));
                dispatch(userConv3({}))
                dispatch(setCv3(null));
                dispatch(cv3Close());
                dispatch(cv3Down());
                localStorage.removeItem("conv3");
                localStorage.removeItem("c3Open");
                localStorage.removeItem("c3Up");
            } else {
                closeConv2 = {
                    unionId: user._id,
                    conversation2: {}
                }
                closeConv1 = {
                    unionId: user._id,
                    conversation1: {
                        convo: conv2,
                        openActive: c2Up,
                        prevMessages: user.conversation2.prevMessages
                            ? user.conversation2.prevMessages
                            : false,
                    }
                }
                try {
                    await axiosReq("PUT", `/unions/${user._id}`, closeConv1);
                } catch (err) {
                    console.log(err);
                }
                try {
                    await axiosReq("PUT", `/unions/${user._id}`, closeConv2);
                } catch (err) {
                    console.log(err);
                } 
                dispatch(userConv1(closeConv1.conversation1));
                dispatch(setCv1(conv2));
                localStorage.setItem("conv1", JSON.stringify(conv2));
                localStorage.setItem("c1Open", JSON.stringify(c2Open));
                localStorage.setItem("c1Up", JSON.stringify(c2Up));
                dispatch(userConv2({}));
                dispatch(cv2Close());
                dispatch(cv2Down());
                localStorage.removeItem("conv2");
                localStorage.removeItem("c2Open");
                localStorage.removeItem("c2Up");
            }
        } else {
            closeConv1 = {
                unionId: user._id,
                conversation1: {}
            }
            dispatch(userConv1({}))
            dispatch(setCv1(null));
            dispatch(cv1Close());
            dispatch(cv1Down());
            localStorage.removeItem("conv1");
            localStorage.removeItem("c1Open");
            localStorage.removeItem("c1Up"); 
            try {
                await axiosReq("PUT", `/unions/${user._id}`, closeConv1);
            } catch (err) {
                console.log(err);
            }
            
        }
    }

    const handleFlame1Close = async () => {
        let closeConv1 = {};
        let closeConv2 = {};
        let closeConv3 = {};
        if (c2Open) {
            if (c3Open) {
                closeConv3 = {
                    userId: user._id,
                    conversation3: {}
                }
                closeConv2 = {
                    userId: user._id,
                    conversation2: {
                        convo: conv3,
                        openActive: c3Up,
                        prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                    }
                }
                closeConv1 = {
                    userId: user._id,
                    conversation1: {
                        convo: conv2,
                        openActive: c2Up,
                        prevMessages: user.conversation2.prevMessages
                            ? user.conversation2.prevMessages
                            : false,
                    }
                }
                try {
                    await axiosReq("PUT", `/users/${user._id}`, closeConv1);
                } catch (err) {
                    console.log(err);
                }
                try {
                    await axiosReq("PUT", `/users/${user._id}`, closeConv2);
                } catch (err) {
                    console.log(err);
                }
                try {
                    await axiosReq("PUT", `/users/${user._id}`, closeConv3);
                } catch (err) {
                    console.log(err);
                }
                dispatch(userConv1(closeConv1.conversation1))
                dispatch(setCv1(conv2));
                localStorage.setItem("conv1", JSON.stringify(conv2));
                localStorage.setItem("c1Open", JSON.stringify(c2Open));
                localStorage.setItem("c1Up", JSON.stringify(c2Up));
                localStorage.setItem("conv2", JSON.stringify(conv3));
                localStorage.setItem("c2Open", JSON.stringify(c3Open));
                localStorage.setItem("c2Up", JSON.stringify(c3Up));
                dispatch(userConv2(closeConv2.conversation2))
                dispatch(setCv2(conv3));
                dispatch(userConv3({}))
                dispatch(setCv3(null));
                dispatch(cv3Close());
                dispatch(cv3Down());
                localStorage.removeItem("conv3");
                localStorage.removeItem("c3Open");
                localStorage.removeItem("c3Up");
            } else {
                closeConv2 = {
                    userId: user._id,
                    conversation2: {}
                }
                closeConv1 = {
                    userId: user._id,
                    conversation1: {
                        convo: conv2,
                        openActive: c2Up,
                        prevMessages: user.conversation2.prevMessages
                            ? user.conversation2.prevMessages
                            : false,
                    }
                }
                try {
                    await axiosReq("PUT", `/users/${user._id}`, closeConv1);
                } catch (err) {
                    console.log(err);
                }
                try {
                    await axiosReq("PUT", `/users/${user._id}`, closeConv2);
                } catch (err) {
                    console.log(err);
                }
                dispatch(userConv1(closeConv1.conversation1));
                dispatch(setCv1(conv2));
                localStorage.setItem("conv1", JSON.stringify(conv2));
                localStorage.setItem("c1Open", JSON.stringify(c2Open));
                localStorage.setItem("c1Up", JSON.stringify(c2Up));
                dispatch(userConv2({}));
                dispatch(cv2Close());
                dispatch(cv2Down());
                localStorage.removeItem("conv2");
                localStorage.removeItem("c2Open");
                localStorage.removeItem("c2Up");
            }
        } else {
            closeConv1 = {
                userId: user._id,
                conversation1: {}
            }
            dispatch(userConv1({}));
            dispatch(setCv1(null));
            dispatch(cv1Close());
            dispatch(cv1Down());
            localStorage.removeItem("conv1");
            localStorage.removeItem("c1Open");
            localStorage.removeItem("c1Up"); 
            try {
                await axiosReq("PUT", `/users/${user._id}`, closeConv1);
            } catch (err) {
                console.log(err);
            }
            
        }
    }

  
    const handle2Up = async () => {
        dispatch(cv2Up());
        localStorage.setItem("c2Up", JSON.stringify(true));
        const conv2Up = user.unionName
            ? {
                unionId: user._id,
                conversation2: {
                    convo: conv2,
                    openActive: true,
                    prevMessages: user.conversation2.prevMessages
                    ? user.conversation3.prevMessages
                    : false,
                }
            }
            : {
                userId: user._id,
                conversation2: {
                    convo: conv2,
                    openActive: true,
                    prevMessages: user.conversation2.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
        dispatch(userConv2(conv2Up.conversation2));
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, conv2Up)
                : await axiosReq("PUT", `/users/${user._id}`, conv2Up)
        } catch (err) {
            console.log(err);
        }
    };

    const handle2Down = async () => {
        dispatch(cv2Down());
        localStorage.setItem("c2Up", JSON.stringify(false));
        const conv2Down = user.unionName
            ? {
                unionId: user._id,
                conversation2: {
                    convo: conv2,
                    openActive: false,
                    prevMessages: user.conversation2.prevMessages
                            ? user.conversation2.prevMessages
                            : false,
                }
            }
            : {
                userId: user._id,
                conversation2: {
                    convo: conv2,
                    openActive: false,
                    prevMessages: user.conversation2.prevMessages
                            ? user.conversation2.prevMessages
                            : false,
                }
            }
        dispatch(userConv2(conv2Down.conversation2))
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, conv2Down)
                : await axiosReq("PUT", `/users/${user._id}`, conv2Down)
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnion2Close = async () => {
        let closeConv2 = {};
        let closeConv3 = {};
        if (c3Open) {
            closeConv3 = {
                unionId: user._id,
                conversation3: {}
            }
            closeConv2 = {
                unionId: user._id,
                conversation2: {
                    convo: conv3,
                    openActive: c3Up,
                    prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
            try {
                await axiosReq("PUT", `/unions/${user._id}`, closeConv2);
            } catch (err) {
                console.log(err);
            }
            try {
                await axiosReq("PUT", `/unions/${user._id}`, closeConv3);
            } catch (err) {
                console.log(err);
            }
            localStorage.setItem("conv2", JSON.stringify(conv3));
            localStorage.setItem("c2Open", JSON.stringify(c3Open));
            localStorage.setItem("c2Up", JSON.stringify(c3Up));
            dispatch(userConv2(closeConv2.conversation2));
            dispatch(setCv2(conv3));
            dispatch(userConv3({}));
            dispatch(setCv3(null));
            dispatch(cv3Close());
            dispatch(cv3Down());
            localStorage.removeItem("conv3");
            localStorage.removeItem("c3Open");
            localStorage.removeItem("c3Up");
        } else {
            closeConv2 = {
                unionId: user._id,
                conversation2: {}
            }
            dispatch(userConv2({}))
            dispatch(setCv2(null));
            dispatch(cv2Close());
            dispatch(cv2Down());
            localStorage.removeItem("conv2");
            localStorage.removeItem("c2Open");
            localStorage.removeItem("c2Up");
            try {
                await axiosReq("PUT", `/unions/${user._id}`, closeConv2);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleFlame2Close = async () => {
        let closeConv2 = {};
        let closeConv3 = {};
        if (c3Open) {
            closeConv3 = {
                userId: user._id,
                conversation3: {}
            }
            closeConv2 = {
                userId: user._id,
                conversation2: {
                    convo: conv3,
                    openActive: c3Up,
                    prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
            try {
                await axiosReq("PUT", `/users/${user._id}`, closeConv2);
            } catch (err) {
                console.log(err);
            }
            try {
                await axiosReq("PUT", `/users/${user._id}`, closeConv3);
            } catch (err) {
                console.log(err);
            }
            localStorage.setItem("conv2", JSON.stringify(conv3));
            localStorage.setItem("c2Open", JSON.stringify(c3Open));
            localStorage.setItem("c2Up", JSON.stringify(c3Up));
            dispatch(userConv2(closeConv2.conversation2));
            dispatch(setCv2(conv3));
            dispatch(userConv3({}));
            dispatch(setCv3(null));
            dispatch(cv3Close());
            dispatch(cv3Down());
            localStorage.removeItem("conv3");
            localStorage.removeItem("c3Open");
            localStorage.removeItem("c3Up");
        } else {
            closeConv2 = {
                userId: user._id,
                conversation2: {}
            }
            dispatch(userConv2({}))
            dispatch(setCv2(null));
            dispatch(cv2Close());
            dispatch(cv2Down());
            localStorage.removeItem("conv2");
            localStorage.removeItem("c2Open");
            localStorage.removeItem("c2Up");
            try {
                await axiosReq("PUT", `/users/${user._id}`, closeConv2);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handle3Up = async () => {
        dispatch(cv3Up());
        localStorage.setItem("c3Up", JSON.stringify(true));
        const conv3Up = user.unionName
            ? {
                unionId: user._id,
                conversation3: {
                    convo: conv3,
                    openActive: true,
                    prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
            : {
                userId: user._id,
                conversation3: {
                    convo: conv3,
                    openActive: true,
                    prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
        dispatch(userConv3(conv3Up.conversation3))
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, conv3Up)
                : await axiosReq("PUT", `/users/${user._id}`, conv3Up)
        } catch (err) {
            console.log(err);
        }
    };

    const handle3Down = async () => {
        dispatch(cv3Down());
        localStorage.setItem("c3Up", JSON.stringify(false));
        const conv3Down = user.unionName
            ? {
                unionId: user._id,
                conversation3: {
                    convo: conv3,
                    openActive: false,
                    prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
            : {
                userId: user._id,
                conversation3: {
                    convo: conv3,
                    openActive: false,
                    prevMessages: user.conversation3.prevMessages
                            ? user.conversation3.prevMessages
                            : false,
                }
            }
        dispatch(userConv3(conv3Down.conversation3))
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, conv3Down)
                : await axiosReq("PUT", `/users/${user._id}`, conv3Down)
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnion3Close = async () => {
        const closeConv = {
            unionId: user._id,
            conversation3: {}
        }
        dispatch(userConv3({}))
        dispatch(setCv3(null));
        dispatch(cv3Close());
        dispatch(cv3Down());
        localStorage.removeItem("conv3");
        localStorage.removeItem("c3Open");
        localStorage.removeItem("c3Up");
        try {
            await axiosReq("PUT", `/unions/${user._id}`, closeConv);
        } catch (err) {
            console.log(err);
        }
    }

    const handleFlame3Close = async () => {
        const closeConv = {
            userId: user._id,
            conversation3: {}
        }
        dispatch(userConv3({}))
        dispatch(setCv3(null));
        dispatch(cv3Close());
        dispatch(cv3Down());
        localStorage.removeItem("conv3");
        localStorage.removeItem("c3Open");
        localStorage.removeItem("c3Up");
        try {
            await axiosReq("PUT", `/users/${user._id}`, closeConv);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {user && 
                <div className="conversationBar">
                    <div className={`convBarRight ${convBox ? "open" : "close"}`}></div>
                    <div className="convBarConvContainers">
                        {c1Open &&
                            <ChatBox 
                                cBox={"cb1"}
                                conv={conv1}
                                cOpen={c1Open}
                                cUp={c1Up}
                                newArrivalMessage={message1}
                                //newMessage={newMessage}
                                //setNewMessage={setNewMessage}
                                handleUp={handle1Up}
                                handleDown={handle1Down}
                                handleClose={user.unionName ? handleUnion1Close : handleFlame1Close}
                            />
                        }
                        {c2Open &&
                            <ChatBox 
                                cBox={"cb2"}
                                conv={conv2}
                                cOpen={c2Open}
                                cUp={c2Up}
                                newArrivalMessage={message2}
                                //newMessage={newMessage}
                                //setNewMessage={setNewMessage}
                                handleUp={handle2Up}
                                handleDown={handle2Down}
                                handleClose={user.unionName ? handleUnion2Close : handleFlame2Close}
                            />
                        }
                        {c3Open &&
                            <ChatBox
                                cBox={"cb3"}
                                conv={conv3}
                                cOpen={c3Open}
                                cUp={c3Up}
                                newArrivalMessage={message3}
                                //newMessage={newMessage}
                                //setNewMessage={setNewMessage}
                                handleUp={handle3Up}
                                handleDown={handle3Down}
                                handleClose={user.unionName ? handleUnion3Close : handleFlame3Close}
                            />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default ConversationBar;