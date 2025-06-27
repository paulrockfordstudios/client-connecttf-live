import React, {useRef, useState} from 'react';
import HashtagEditor from '../../Components/Editors/HashtagEditor/HashtagEditor';
import CreatePost from '../../Components/Posts/CreatePost/CreatePost';
import EditQuestion from '../../Components/Questions/EditQuestion/EditQuestion';
import IntroInfo from '../IntroInfo/IntroInfo';
import FlameProfilePics from '../ProfilePictures/FlameProfilePics/FlameProfilePics';
import { useSelector, useDispatch } from 'react-redux';
import { axiosReq } from '../../Utils/axiosConfig';
import "./TFCAbout.css";
import SecondaryNavBar from '../../Components/PageBars/SecondaryNavBar/SecondaryNavBar';
import CTFCalendar from '../../Components/CTFCalendar/CTFCalendar';

function TFCAbout() {

    const { user } = useSelector((state) => state.auth);

    const [ date, setDate ] = useState(new Date())

    const dob = useRef();
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        //event.preventDefault();
        try {
            const userData = {
                userId: user._id,
                dob: dob.current.value,  
            }  
            axiosReq("PUT", `/users/${user._id}`, userData)
        } catch(err) {console.log(err)}
    }


    //dob.max = new Date().toISOString().split("T")[0];

    console.log(date)

    return (
        <div className="appAbout">
            <SecondaryNavBar prompt={"about"} />
            <div className="appAbout-container">
               {/*<CTFCalendar />*/}
               
               {/*About Us*/} 
              {/*<HashtagEditor />*/}
                {/*<CreatePost />*/}
                {/*<EditQuestion />*/}
                {/*<IntroInfo />*/}
                {/*<FlameProfilePics />*/}
                
              {/*<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/9C8IcuFO44Y?showinfo=0"></iframe><p></p>*/}
               {/*<div className="rainbowSquare"></div>*/}
            </div>    
        </div> 
    )
};

export default TFCAbout;