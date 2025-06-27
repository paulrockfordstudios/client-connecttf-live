import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { cPOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import PostShortDisplay from '../PostDisplays/PostShortDisplay/PostShortDisplay';
import "./PostFeed.css";
import AdPrimary from '../../AdSpace/AdPrimary/AdPrimary';
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import { circleProgress } from '../../../Lib/mui/misc';


function PostFeed({ dc, id }) {

    
    const { user, flame, union, actAcc, newPost } = useSelector((state) => state.auth);

    const { userName } = useParams();
    const { unionName } = useParams();

    const dispatch = useDispatch();

    const observer = useRef();

    const PS = process.env.PHOTO_STORAGE;

    const [ posts, setPosts ] = useState([]);
    const [ active, setActive ] = useState("journey");
    const [ pageNum, setPageNum ] = useState(0);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ hasMore, setHasMore ] = useState(false);
    const [ adInsert, setAdInsert ] = useState([10]);
    const [ btnHover, setBtnHover ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;
    

    useEffect(() => {
        setPosts([]);
    }, [active])

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(false);
            if (userName || unionName) { 
                try {  
                    const res = await axiosReq("GET", `/posts/${userName ? "flame" : "union"}-profile/${id}/${active}/${pageNum}`);
                    setPosts(prevPostS => {return [...new Set([...prevPostS, ...res.data.postArr])]});
                    setHasMore(res.data.postCnt > pageNum + 20);
                    setLoading(false);
                } catch(err) {setError(true)}       
            } else {
                try {
                    const res = await axiosReq("GET", `/posts/feed/${active}/${pageNum}`)
                    setPosts(prevPostS => { 
                        return [...new Set([...prevPostS, ...res.data.postArr
                            .filter((f) => !user.flameBlockers.includes(f.userId))
                            .filter((f) => !user.unionBlockers.includes(f.unionId))
                        ])]
                    });
                    setHasMore(res.data.postCnt > pageNum + 20);
                    setLoading(false);
                } catch(err) {setError(true)} 
            }
        }
        fetchPosts();
    }, [pageNum, active]);

    useEffect(() => {
        if (newPost) {
            setPosts((prev) => [newPost, ...prev]);
        }
    }, [newPost]);

    const lastDQElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect(); 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prev => prev + 20); 
            }
        })
        if (node) observer.current.observe(node)
    })

    useEffect(() => {
        setAdInsert(prev => {return [...prev, pageNum + 10]});
    }, [pageNum])
    
    const journeyHandler = () => {
        setActive("journey");
        setPageNum(0);
    }

    const groupHandler = () => {
        setActive("group");
        setPageNum(0);
    }

    const coachingHandler = () => {
        setActive("coaching");
        setPageNum(0);
    }


    return (
        <>
        <div className="postFeed">
            <div className="postFeed-container">
            {actAcc === "union" ? 
                    (
                        <>
                            {!unionName || unionName === user.unionName ? userName ? 
                                (
                                    <></> 
                                ) : (
                                    <div className={`pfCreatePostBtn-container ${colorTheme}`}>
                                        <div 
                                            className={`
                                                pfCreatePostBtnHigherSpectrumBackground
                                                HIGHER_BACKGROUND 
                                                ${colorTheme}
                                            `} 
                                        />
                                        <div className="pfCreatePostBtnWhiteBackground" />
                                        <div className={`pfCreatePostBtn union INNER_BOX_SHADOW ${colorTheme}`} onClick={() => dispatch(cPOpen())}>
                                            <div className="pfCreatePostBtnLeft">
                                                <Link 
                                                    to={`/union-profile/unionName/${user.unionName}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <img 
                                                        className="pfCreatePostBtnAvatar" 
                                                        src={user.unionProfilePicture ? PS + user.unionProfilePicture : uAvatar} 
                                                        onError={e => {e.currentTarget.src = uAvatar}}
                                                        alt="" 
                                                    />
                                                </Link>
                                                <label className="pfCreatePostBtnPlaceHolder">
                                                    <span className="pfCreatePostBtnText intangible">{`What do you want to share with us today, `}</span>
                                                    <Link 
                                                        to={`/flame-profile/userName/${flame.userName}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`pfCreatePostBtnText tangible ${flame.energy}`}>
                                                            {`${flame.firstName} `}
                                                        </span>
                                                    </Link>
                                                    <span className="pfCreatePostBtnText intangible">{" of "}</span>
                                                    <Link 
                                                        to={`/union-profile/unionName/${user.unionName}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`pfCreatePostBtnText tangible ${colorTheme}`}>
                                                            {`${user.profileName}`}
                                                        </span>
                                                    </Link>                            
                                                    <span className="pfCreatePostBtnText intangible">{"?"}</span>
                                                </label>
                                            </div>
                                            <div className="pfCreatePostBtnRight">
                                                <div 
                                                    className={`
                                                        pfCreatePostAskBtn
                                                        HIGHER_BACKGROUND
                                                        ${colorTheme}
                                                    `}
                                                >
                                                    <i
                                                        className={`
                                                            pfCreatePostPNGIcon 
                                                            PNG_ICON_AIRPLANE
                                                            ${btnHover ? colorTheme : ""}
                                                            lgt
                                                        `}
                                                        alt="airplane"
                                                        onMouseEnter={() => setBtnHover(true)}
                                                        onMouseLeave={() => setBtnHover(false)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                ) : (
                                    <></>
                                )
                            }
                        </>
                    ) : (
                        <>
                            {!userName || userName === user.userName ?  unionName ? 
                                (
                                    <></> 
                                ) : (
                                    <div className={`pfCreatePostBtn INNER_BOX_SHADOW ${colorTheme}`} onClick={() => dispatch(cPOpen())}>
                                        <div className="pfCreatePostBtnLeft">
                                            <Link 
                                                to={`/flame-profile/userName/${user.userName}`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <img 
                                                    className="pfCreatePostBtnAvatar" 
                                                    src={user.profilePicture ? PS + user.profilePicture : fAvatar} 
                                                    onError={e => {e.currentTarget.src = fAvatar}}
                                                    alt="" 
                                                />
                                            </Link>
                                            <label className="pfCreatePostBtnPlaceHolder">
                                                    <span className="pfCreatePostBtnText intangible">{`What do you want to share with us today, `}</span>
                                                    <Link 
                                                        to={`/flame-profile/userName/${user.userName}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`pfCreatePostBtnText tangible ${colorTheme}`}>
                                                            {`${user.firstName}`}
                                                        </span>
                                                    </Link>
                                                    <span className="pfCreatePostBtnText intangible">{"?"}</span>
                                                </label>
                                        </div>
                                        <div className="pfCreatePostBtnRight">
                                            <div className={`pfCreatePostAskBtn ${colorTheme}`}>
                                                <i
                                                    className={`
                                                        pfCreatePostPNGIcon 
                                                        PNG_ICON_AIRPLANE
                                                        ${btnHover ? colorTheme : ""}
                                                        lgt
                                                    `}
                                                    alt="airplane"
                                                    onMouseEnter={() => setBtnHover(true)}
                                                    onMouseLeave={() => setBtnHover(false)}
                                                />
                                            </div>
                                        </div>
                                    </div> 
                                ) : (
                                    <></>
                                )
                            }
                        </>
                    )
                }
                {unionName || actAcc === "union" ?
                    (
                        <>
                            {colorTheme === "diamond" ?
                                (
                                    <>
                                        <div className="postFeedContainerBtns">
                                            <div 
                                                className={active === "journey"
                                                    ? `postFeedContainerBtnBase-active HIGHER_BACKGROUND journey ${colorTheme}`
                                                    : `postFeedContainerBtnBase HIGHER_BACKGROUND journey ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`postFeedContainerBtnFont journey ${colorTheme}`}
                                                    onClick={journeyHandler}
                                                >
                                                    Journey Posts
                                                </button>
                                            </div>
                                            <div 
                                                className={active === "group"
                                                    ? `postFeedContainerBtnBase-active HIGHER_BACKGROUND group ${colorTheme}`
                                                    : `postFeedContainerBtnBase HIGHER_BACKGROUND group ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`postFeedContainerBtnFont group ${colorTheme}`}
                                                    onClick={groupHandler}
                                                >
                                                    Group Posts
                                                </button>
                                            </div>
                                            <div 
                                                className={active === "coaching"
                                                    ? `postFeedContainerBtnBase-active HIGHER_BACKGROUND coaching ${colorTheme}`
                                                    : `postFeedContainerBtnBase HIGHER_BACKGROUND coaching ${colorTheme}`
                                                }
                                            >
                                                <button 
                                                    className={`postFeedContainerBtnFont coaching ${colorTheme}`}
                                                    onClick={coachingHandler}
                                                >
                                                    Coaching Posts
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {colorTheme === "rainbow" || colorTheme === "silver" || colorTheme === "gold" || colorTheme === "platinum" ?
                                            (
                                                <>
                                                    <div className="postFeedContainerBtns">
                                                        <div 
                                                            className={active === "journey"
                                                                ? `postFeedContainerBtnBase-active journey ${colorTheme}`
                                                                : `postFeedContainerBtnBase journey ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "journey"
                                                                    ? `postFeedContainerBtnFont-active journey ${colorTheme}`
                                                                    : `postFeedContainerBtnFont journey ${colorTheme}`
                                                                }
                                                                onClick={journeyHandler}
                                                            >
                                                                Journey Posts
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={active === "group"
                                                                ? `postFeedContainerBtnBase-active group ${colorTheme}`
                                                                : `postFeedContainerBtnBase group ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "group"
                                                                    ? `postFeedContainerBtnFont-active group ${colorTheme}`
                                                                    : `postFeedContainerBtnFont group ${colorTheme}`
                                                                }
                                                                onClick={groupHandler}
                                                            >
                                                                Group Posts
                                                            </button>
                                                        </div>
                                                        <div 
                                                            className={active === "coaching"
                                                                ? `postFeedContainerBtnBase-active coaching ${colorTheme}`
                                                                : `postFeedContainerBtnBase coaching ${colorTheme}`
                                                            }
                                                        >
                                                            <button 
                                                                className={active === "coaching"
                                                                    ? `postFeedContainerBtnFont-active coaching ${colorTheme}`
                                                                    : `postFeedContainerBtnFont coaching ${colorTheme}`
                                                                }
                                                                onClick={coachingHandler}
                                                            >
                                                                Coaching Posts
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="postFeedContainerBtns">
                                                        <button 
                                                            className={active === "journey"
                                                                ? `postFeedContainerBtn-active journey ${colorTheme}`
                                                                : `postFeedContainerBtn journey ${colorTheme}`
                                                            }
                                                            onClick={journeyHandler}
                                                        >
                                                            Journey Posts
                                                        </button>
                                                        <button 
                                                            className={active === "group"
                                                                ? `postFeedContainerBtn-active group ${colorTheme}`
                                                                : `postFeedContainerBtn group ${colorTheme}`
                                                            }
                                                            onClick={groupHandler}
                                                        >
                                                            Group Posts
                                                        </button>
                                                        <button 
                                                            className={active === "coaching"
                                                                ? `postFeedContainerBtn-active coaching ${colorTheme}`
                                                                : `postFeedContainerBtn coaching ${colorTheme}`
                                                            }
                                                            onClick={coachingHandler}
                                                        >
                                                            Coaching Posts
                                                        </button>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <div className="postFeedContainerBtns">
                                <button 
                                    className={active === "journey"
                                        ? `postFeedContainerBtn-active journey ${colorTheme}`
                                        : `postFeedContainerBtn journey ${colorTheme}`
                                    }
                                    onClick={journeyHandler}
                                >
                                    Journey Posts
                                </button>
                                <button 
                                    className={active === "group"
                                        ? `postFeedContainerBtn-active group ${colorTheme}`
                                        : `postFeedContainerBtn group ${colorTheme}`
                                    }
                                    onClick={groupHandler}
                                >
                                    Group posts
                                </button>
                                <button 
                                    className={active === "coaching"
                                        ? `postFeedContainerBtn-active coaching ${colorTheme}`
                                        : `postFeedContainerBtn coaching ${colorTheme}`
                                    }
                                    onClick={coachingHandler}
                                >
                                    Coaching Posts
                                </button>
                            </div>
                        </>
                    )
                }
                
                {posts.map((post, index) => {
                    if (posts.length === index + 1) {
                        return <div key={index} ref={lastDQElementRef}><PostShortDisplay key={post._id} post={post} /></div>
                    } else {
                        return (
                            <div key={index}>
                                {adInsert.includes(index) && <AdPrimary key={`ad-${index}`} feed/>}
                                <PostShortDisplay key={post._id} post={post} />
                            </div>
                        )
                    }
                })}
                {loading 
                    ? <div size="3.125rem" /*50px*/>{circleProgress}</div>
                    : <img className="postFeedConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                }
            </div>
        </div>

        </>
    )
};

export default PostFeed;