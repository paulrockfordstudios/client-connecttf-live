import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import { higherSpectrumBoxShadow } from '../../../Utils/higherSpectrumBoxShadow';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import PostFullDisplay from '../../../Components/Posts/PostDisplays/PostFullDisplay/PostFullDisplay';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./Post.css";


function Post() {

    const pfdRef = useRef();

    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();

    const [ post, setPost ] = useState();
    const [ height, setHeight ] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axiosReq("GET", `/posts/${id}`);
            setPost(res.data);
        }
        fetchPost();
    }, [id]);

   
    return (
        <>
            <div className="post">
                <div className="post-container">
                    <div className="postAd">
                        <AdSecondary />
                    </div>
                    <div className="postRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    {post && <div className="postDisplayContainer" >
                                        <div 
                                            className={`postDisplayBackgroundTheme HIGHER_BACKGROUND ${colorTheme(currentUser)}`} 
                                            style={{height: `${height}px`}} 
                                        />              
                                        <div className={`postDisplay-container union BOX_SHADOW ${colorTheme(currentUser)}`}
                                       
                                        ref={(el) => higherSpectrumBoxShadow(el, setHeight)}
                                        >
                                            <PostFullDisplay post={post}/>
                                        </div>
                                    </div>}
                                </>
                            ): (
                                <>
                                    {post && 
                                        <div 
                                            className={`postDisplay-container flame BOX_SHADOW ${colorTheme(currentUser)}`}
                                            style={{height: `${height}px`}} 
                                        >
                                            <PostFullDisplay post={post}/>
                                        </div>
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
            </div> 
        </>
    )
};

export default Post;