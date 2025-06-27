import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import CommentDisplay from '../CommentDisplay/CommentDisplay';
import { blockString } from '../../../Utils/blockString';
import "./CommentFeed.css";


function CommentFeed({ setCommentAmount }) {

    const scrollRef = useRef();

    const { id } = useParams();

    const { user, newComment } = useSelector((state) => state.auth);

    const [comments, setComments] = useState([]);
    const [ displayedComments, setDisplayedComments ] = useState([]);
    const [commentCnt, setCommentCnt] = useState(0);
    const [ displayedCommentCnt, setDisplayedCommentCnt ] = useState(0);
    const [ btnDisplay, setBtnDisplay ] = useState("Show More");
    const [ pageNum, setPageNum ] = useState(2);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ hasMore, setHasMore ] = useState(true);
    const [ commentsAll, setCommentsAll ] = useState(false);

    useEffect(() => {
        const fetchCommentCnt = async () => { 
            try {
                const res = await axiosReq("GET", `/comments/post/${id}/count/${user._id}/${blockString(user)}`); 
                setCommentCnt(res.data);
            } catch(err) {console.log(err)}
        }
        fetchCommentCnt();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axiosReq("GET", `/comments/post/${id}/initial/${user._id}/${blockString(user)}/${commentCnt}`); 
                setDisplayedCommentCnt(res.data?.length)
                setComments(res.data?.sort((c1, c2) => {
                        return new Date(c1.createdAt) - new Date(c2.createdAt);
                    })
                );
            } catch(err) {console.log(err)}
        }
        fetchComments();
    }, [commentCnt]);
    
    useEffect(() => {
        if (commentsAll) return;
        setDisplayedCommentCnt(comments.length);
        setDisplayedComments(comments)
        setCommentAmount(comments)
        setHasMore(commentCnt > pageNum);
        setBtnDisplay(
            commentCnt !== comments.length
                ? commentCnt - comments.length <= 10 
                    ? "Show All"
                    : displayedCommentCnt <= 12 ? "Show More" : "Show 10 More"
                : "Show Less"
        )
    }, [comments.length]);

    useEffect(() => {
        if (newComment) {
            setPageNum(pageNum + 1);
            setComments((prev) => [...prev, newComment]);
            setDisplayedComments((prev) => [...prev, newComment]);
            setCommentCnt(commentCnt + 1);
            setDisplayedCommentCnt(displayedCommentCnt + 1);
        }
    }, [newComment]);

    useEffect(() => {
        if (pageNum !== 0) return;
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [comments]);

    const displayHandler = async () => {
        if (commentCnt === comments.length) {
            if (btnDisplay === "Show Less") {
                setDisplayedComments(comments.slice(comments.length - 2, comments.length));
                setDisplayedCommentCnt(2);
                setBtnDisplay("Show More");
                setCommentAmount(displayedComments)
                if (!commentsAll) {setCommentsAll(true)};
            } else if (commentCnt -  displayedCommentCnt >= 20 ) {
                setDisplayedCommentCnt(displayedCommentCnt + 10);
                setDisplayedComments(comments.slice(comments.length - displayedCommentCnt - 10, comments.length));
                setCommentAmount(displayedComments)
            } else if (commentCnt -  displayedCommentCnt <= 20 && commentCnt -  displayedCommentCnt >= 10) {
                setDisplayedCommentCnt(displayedCommentCnt + 10);
                setDisplayedComments(comments.slice(comments.length - displayedCommentCnt - 10, comments.length));
                setBtnDisplay("Show All");
                setCommentAmount(displayedComments)
            } else {
                const lastCnt = commentCnt - displayedCommentCnt;
                setDisplayedCommentCnt(displayedCommentCnt + lastCnt);
                setDisplayedComments(comments.slice(comments.length - displayedCommentCnt - lastCnt, comments.length))
                setBtnDisplay("Show Less");
                setCommentAmount(displayedComments)
            }
        } else {
            try {
                const res = await axiosReq("GET", `/comments/post/${id}/paginate/${pageNum}/${user._id}/${blockString(user)}`);
                setComments(prev => { 
                    return [...new Set([...res.data
                        .sort((c1, c2) => {
                            return new Date(c1.createdAt) - new Date(c2.createdAt);
                        })
                        , ...prev
                    ])]
                });
                setPageNum(pageNum + 10);
                setLoading(false);
            } catch(err) {setError(true)} 
        }
    };


    return (
        <div className="commentFeed">
            <div className="commentFeedController">
                <div className="commentFeedControllerLeft">
                    <span className="commentFeedTitle">Comments</span>
                    <span className="commentFeedCount">Showing 
                        <span style={{fontSize: "0.938rem" /*15px*/}}> {displayedCommentCnt} </span>
                        of 
                        <span style={{fontSize: "0.938rem" /*15px*/}}> {commentCnt} </span>
                    </span>
                </div>
                <div className="commentFeedControllerRight">
                    {commentCnt > 3 
                        ? <button className="commentFeedControllerBtn" onClick={displayHandler}>{btnDisplay}</button>
                        : <></>
                    }
                </div>
            </div>
            <div className="commentFeed-container">
                {displayedComments.map((comment) => (
                    <CommentDisplay ref={scrollRef} key={comment._id} comment={comment} />
                ))}

            </div>
        </div>
    )
};

export default CommentFeed;