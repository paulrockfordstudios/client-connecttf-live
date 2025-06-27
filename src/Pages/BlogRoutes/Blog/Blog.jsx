import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
//import blogFullDisplay from '../../../Components/blogs/blogFullDisplay/blogFullDisplay';
import "./Blog.css";


function Blog() {

    const [ blog, setblog ] = useState();
    const [ height, setHeight ] = useState();
    const [ clicked, setclicked] = useState(0);

    
    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();


    useEffect(() => {
        const fetchblog = async () => {
            const res = await axiosReq("GET", `/bloges/${id}`);
            setblog(res.data);
        }
        fetchblog();
    }, [id]);


    return (
        <>
            <div className="blog">
                <div className="blog-container">
                    <div className="blogRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    {blog && <div className="blogDisplayContainer" >
                                        <div 
                                            className={`
                                                blogDisplayBackgroundTheme
                                                HIGHER_BACKGROUND 
                                                ${currentUser.spectrum}
                                            `} 
                                            style={{height: `${height}px`}} 
                                        /> 
                                        <div className={`blogDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} onClick={() => setclicked((click) => click + 1)}
                                        
                                        ref={el => {
                                            if (clicked >= 0 || clicked <= 9999) {
                                            if (!el) return;
                                            /*console.log("initial height", el.getBoundingClientRect().height);*/
                                            let prevValue = JSON.stringify(el.getBoundingClientRect());
                                            const start = Date.now();
                                            const handle = setInterval(() => {
                                            let nextValue = JSON.stringify(el.getBoundingClientRect());
                                            if (nextValue === prevValue) {
                                                clearInterval(handle);
                                                /*console.log(
                                                `height stopped changing in ${Date.now() - start}ms. final height:`,
                                                el.getBoundingClientRect().height
                                                );*/
                                                setHeight(el.getBoundingClientRect().height)
                                            } else {
                                                prevValue = nextValue;
                                            }
                                            }, 1000);
                                            }
                                        }} 
                                        
                                        >
                                            <blogFullDisplay blog={blog} />
                                        </div>
                                    </div>}
                                </>
                            ): (
                                <>
                                    {blog && <div className={`blogDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <blogFullDisplay blog={blog}/>
                                    </div>}
                                </>
                            )
                        }
                    </div>
                </div>
            </div> 
        </>
    )
};

export default Blog;