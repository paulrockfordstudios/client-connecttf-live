import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig';
import ReplyDisplay from '../ReplyDisplay/ReplyDisplay';
import "./ReplyFeed.css";
import { blockString } from '../../../Utils/blockString';


function ReplyFeed({ prompt, promptId, rCntNum }) {

    const scrollRef = useRef();

    const { user, newReply } = useSelector((state) => state.auth);
    
    const [ replies, setReplies ] = useState([]);
    const [ displayedReplies, setDisplayedReplies ] = useState([]);
    const [replyCnt, setReplyCnt] = useState(0);
    const [ displayedReplyCnt, setDisplayedReplyCnt ] = useState(0);
    const [ btnDisplay, setBtnDisplay ] = useState("Show More");
    const [ cntRender, setCntRender ] = useState(false);
    const [ rCntString, setRCntString ] = useState("");
    const [ pageNum, setPageNum ] = useState(2);
    const [ repliesAll, setRepliesAll ] = useState(false);

    useEffect(() => {
        if (!newReply) return;
        if (newReply?.flareId !== promptId) return;
        setReplies((prev) => [...prev, newReply]);
        setReplyCnt(replyCnt + 1);
    }, [newReply]);

    useEffect(() => {
        if (pageNum !== 0) return;
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [replies]);

    useEffect(() => {
        const fetchReplyCnt = async () => {
            try {
                const res = await axiosReq("GET", `/replies/flare/${promptId}/count/${user._id}/${blockString(user)}`);
                setReplyCnt(res.data);
            } catch(err) {console.log(err)}
        }
        fetchReplyCnt();
    }, [prompt, promptId]);

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const res = await axiosReq("GET", `/replies/flare/${promptId}/initial/${user._id}/${blockString(user)}/${replyCnt}`);
                setDisplayedReplyCnt(res.data.length)
                setReplies(res.data.sort((p1, p2) => {
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                }));
            } catch(err) {console.log(err)}
        }
        fetchReplies();
    }, [prompt, promptId]);

    useEffect(() => {
        const rCountHandler = () => {
            if(rCntNum) {
                switch(rCntNum) {
                    case 2:
                        setRCntString("two");
                        setCntRender(true);
                        break;
                    case 3:
                        setRCntString("three");
                        setCntRender(true);
                        break;
                    case 4:
                        setRCntString("four");
                        setCntRender(true);
                        break;
                    default:
                        setRCntString("one");
                        setCntRender(true);
                } 
            }
        }
        rCountHandler();
    }, [rCntNum]);

    useEffect(() => {
        if (repliesAll) return;
        setDisplayedReplyCnt(replies.length);
        setDisplayedReplies(replies)
        setBtnDisplay(
            replyCnt !== replies.length
                ? replyCnt - replies.length <= 10 
                    ? "Show All"
                    : displayedReplyCnt <= 12 ? "Show More" : "Show 10 More"
                : "Show Less"
        )
    }, [replies.length]);

    const displayHandler = async () => {
        if (replyCnt === replies.length) {
            if (btnDisplay === "Show Less") {
                setDisplayedReplies(replies.slice(replies.length - 2, replies.length));
                setDisplayedReplyCnt(2);
                setBtnDisplay(replyCnt <= 10 ? "Show All" : "Show More");
                if (!repliesAll) {setRepliesAll(true)};
            } else if (replyCnt -  displayedReplyCnt >= 20 ) {
                setDisplayedReplyCnt(displayedReplyCnt + 10);
                setDisplayedReplies(replies.slice(replies.length - displayedReplyCnt - 10, replies.length));
            } else if (replyCnt -  displayedReplyCnt <= 20 && replyCnt -  displayedReplyCnt >= 10) {
                setDisplayedReplyCnt(displayedReplyCnt + 10);
                setDisplayedReplies(replies.slice(replies.length - displayedReplyCnt - 10, replies.length));
                setBtnDisplay("Show All");
            } else {
                const lastCnt = replyCnt - displayedReplyCnt;
                setDisplayedReplyCnt(displayedReplyCnt + lastCnt);
                setDisplayedReplies(replies.slice(replies.length - displayedReplyCnt - lastCnt, replies.length));
                setBtnDisplay("Show Less");
            }
        } else {
            try {
                const res = await axiosReq("GET", `/replies/flare/${promptId}/paginate/${pageNum}/${user._id}/${blockString(user)}`);
                setReplies(prev => { 
                    return [...new Set([...res.data
                        .sort((c1, c2) => {
                            return new Date(c1.createdAt) - new Date(c2.createdAt);
                        })
                        , ...prev
                    ])]
                });
                setPageNum(pageNum + 10);
                setLoading(false);
            } catch(err) {console.log(err)} 
        }
    };


    return (
        <div className="replyFeed">
            <div className={`replyFeedController ${rCntString}`}>
                <div className="replyFeedControllerLeft">
                    <span className="replyFeedCount">Showing 
                        <span style={{fontSize: "13px"}}> {displayedReplyCnt} </span>
                        of 
                        <span style={{fontSize: "13px"}}> {replyCnt} </span>
                    </span>
                </div>
                <div className="replyFeedControllerRight">
                    {replyCnt > 3 
                        ? <button className="replyFeedControllerBtn" onClick={displayHandler}>{btnDisplay}</button>
                        : <></>
                    }
                </div>
            </div>
        <div className="replyfeed-container">
            {displayedReplies.map((reply) => (
                <ReplyDisplay ref={scrollRef} key={reply._id} reply={reply} />
            ))}
        </div>
    </div>
    )
};

export default ReplyFeed;