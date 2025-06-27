import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useScrollLock } from '../../Utils/crHooks/useScrollLock';
import { syncDate } from '../../Utils/misc/syncDate';
import Middlebar from '../../Components/PageBars/Middlebar/Middlebar';
import Rightbar from '../../Components/PageBars/Rightbar/Rightbar';
import CreatePost from '../../Components/Posts/CreatePost/CreatePost';
import CreateQuestion from '../../Components/Questions/CreateQuestion/CreateQuestion';
import "./Home.css";
import { birthdayList } from '../../Redux/AuthSlice';


function Home({flameFriends}) {

    const dispatch = useDispatch();

    const { cPost, cQN } = useSelector((state) => state.auth);

    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        return cPost || cQN ? lockScroll() : unlockScroll();
    }, [cPost, cQN]);

    useEffect(() => {
        if (flameFriends) {
            let birthdays = [];
            const date = new Date();
            const dateDay = date.getDate();
            const dateMonth = date.getMonth() + 1;
            for (let i = 0; i < flameFriends.length; i++) {
                const friend = flameFriends[i];
                const fdob = syncDate(friend.dob);
                const fdobDay = fdob.getDate();
                const fdobMonth = fdob.getMonth() + 1;
                if (dateDay === fdobDay && dateMonth === fdobMonth) {
                    birthdays.push(friend);
                }
            }
            dispatch(birthdayList(birthdays));       
        } 
    }, [flameFriends]);
    
    return (
        <>
            <div 
                className="home-container"
            >   
                <Middlebar />
                <Rightbar />        
            </div> 
        </>
    )
};

export default memo(Home);