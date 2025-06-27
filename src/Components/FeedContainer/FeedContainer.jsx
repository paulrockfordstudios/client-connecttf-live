import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PostFeed from '../Posts/PostFeed/PostFeed';
import QuestionFeed from '../Questions/QuestionFeed/QuestionFeed';
import "./FeedContainer.css";


function FeedContainer({ setCreatePost }) {

    
    const { user, union, actAcc } = useSelector((state) => state.auth);

    const el = useRef();
    const el2 = useRef();
    const postsRef = useRef();

    const posts = <PostFeed setCreatePost={setCreatePost}/>;
    const questions = <QuestionFeed />;

    const [feed, setFeed] = useState(posts);
    const [active, setActive] = useState("posts");
    const [ height, setHeight ] = useState(0);
    const [ clicked, setBoxshadow] = useState(false);


    useEffect(() => {
        if(active === "posts") {
            setFeed(posts);
        } else if(active === "questions") {
            setFeed(questions);
        }
    }, [active]);

    
    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="feedContainerContainer" style={{height: `${height}px`}}>
                            <div 
                                className={`
                                    feedContainerBackgroundTheme
                                    HIGHER_BACKGROUND 
                                    ${user.spectrum}
                                `} 
                                style={{height: `${height}px`}} 
                            />
                            <div className="feedContainer union" 
                                ref={el => {
                                    if (!el) return;
                                    let prevValue = JSON.stringify(el.getBoundingClientRect());
                                    const handle = setInterval(() => {
                                        let nextValue = JSON.stringify(el.getBoundingClientRect());
                                        if (nextValue === prevValue) {
                                            clearInterval(handle);
                                            setHeight(el.getBoundingClientRect().height)
                                            setBoxshadow(true)
                                        } else {
                                            prevValue = nextValue;
                                        }
                                    }, 1000);
                                }} 
                                
                            >
                                <div className={`feedContainer-container BOX_SHADOW ${user.spectrum}`} ref={el2}>
                                    <div className="feedContainerBtns">
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <button 
                                                        className={`
                                                            postFeedBtn
                                                            ${active === "posts" ? "" : "DIAMOND_BTN1"}
                                                        `}
                                                        style={
                                                            active === "posts" 
                                                                ? {background: "white"} 
                                                                : {backgroundSize: "cover"}
                                                            }  
                                                        onClick={() => setActive("posts")}
                                                    >
                                                        <span className="fcDiamondText">Posts</span>
                                                    </button>
                                                    <button 
                                                        className={`
                                                            questionFeedBtn
                                                            ${active === "questions" ? "" : "DIAMOND_BTN5"}
                                                        `}
                                                        style={
                                                            active === "questions" 
                                                                ? {background: "white"} 
                                                                : {backgroundSize: "cover"}
                                                            }  
                                                        onClick={() => setActive("questions")}
                                                    >
                                                        <span className="fcDiamondText">Questions</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        className={
                                                            active === "posts" 
                                                                ? `postFeedBtn-active ${user.spectrum}` 
                                                                : `postFeedBtn ${user.spectrum}`
                                                            } 
                                                        onClick={() => setActive("posts")}
                                                    >
                                                        Posts
                                                    </button> 
                                                    <button 
                                                        className={
                                                            active === "questions" 
                                                                ? `questionFeedBtn-active ${user.spectrum}` 
                                                                : `questionFeedBtn ${user.spectrum}`
                                                            } 
                                                        onClick={() => setActive("questions")}
                                                    >
                                                        Questions
                                                    </button>
                                                </>
                                            )
                                        }    
                                    </div>
                                    <div>  
                                        {feed}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="feedContainer">
                            <div className={`feedContainer-container BOX_SHADOW ${user.energy}`}>
                                <div className="feedContainerBtns">
                                    <button 
                                        className={
                                            active === "posts" 
                                                ? `postFeedBtn-active ${user.energy}` 
                                                : `postFeedBtn ${user.energy}`
                                            } 
                                        onClick={() => setActive("posts")}
                                    >
                                        Posts
                                    </button> 
                                    <button 
                                        className={
                                            active === "questions" 
                                                ? `questionFeedBtn-active ${user.energy}` 
                                                : `questionFeedBtn ${user.energy}`
                                            } 
                                        onClick={() => setActive("questions")}
                                    >
                                        Questions
                                    </button>
                                </div>
                                {feed}
                            </div>
                        </div> 
                    </>
                )
            }
        </>
    )
};

export default FeedContainer;