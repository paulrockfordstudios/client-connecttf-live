import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newProfileName, newAbout, newHereFor } from "../../Redux/AuthSlice";
//import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { axiosReq } from '../../Utils/axiosConfig';
import "./IntroInfo.css";



function IntroInfo() {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    //const navigate = useNavigate();

    const [ nameVal, setNameVal ] = useState(user.profileName);
    const [ aboutVal, setAboutVal ] = useState(user.about);
    const [ reasons, setReasons ] = useState(user.hereFor);

    const cbChoice = [
        {value: "guidance", column: 1},
        {value: "friendship", column: 1},
        {value: "curiousity", column: 1},
        {value: "shine my light", column: 1},
        {value: "insight", column: 2},
        {value: "acceptance", column: 2},
        {value: "emotional support", column: 2},
        {value: "be a guide", column: 2},
        {value: "I have questions", column: 3},
        {value: "hoping to meet someone special", column: 3},
        {value: "share my story", column: 3},
        {value: "meet others", column: 3},
    ];

    useEffect(() => {
        setReasons(user.hereFor)
    }, [user]);

    const handleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setReasons([...reasons, value]);
        } else {
            setReasons(reasons.filter((r) => r !== value));
        }
    };

    const handleSubmit =  async (event) => {
        event.preventDefault();
        const newIntro = {
            userId: user._id,
            profileName: nameVal,
            about: aboutVal,
            hereFor: reasons,
        }
        try {
            await axiosReq("PUT", `/users/${user._id}`, newIntro);
        } catch (err) {console.log(err);}
        dispatch(newProfileName(nameVal));
        dispatch(newAbout(aboutVal));
        dispatch(newHereFor(reasons));
        localStorage.setItem("user", JSON.stringify({...user, profileName: nameVal, about: aboutVal, hereFor: reasons}));
    };
    
    return (
        <div className="introInfo">
            <div className="introInfo-container">
                <div className="introInfoRight"> 
                    <div className={`introInfoDisplay-container BOX_SHADOW gray`}>
                        <div className="introInfoGreeting one">
                            {"Hi "} 
                            <span className="introInfoFirstName">{user.firstName}</span>
                            {"!"}
                        </div>
                        <div className="introInfoGreeting two">
                            {"Welcome to "}
                            <span className="iigConnect">Connect</span>
                            <span className="iigTF">TF</span>
                            {"!"}
                        </div>
                        <div className="introInfoAboutStatement">
                            <span className="iigConnect">Connect</span>
                            <span className="iigTF">TF</span>
                            {" is a community of like minded individuals who are on the Twin Flame Journey. "}
                            {"As anyone who knows, the twin flame journey is a long and arduous one. "}
                            {"We are here to help each other and guide each other while we are on this life long journey. "}
                            {"We are happy you are joining us and we cannot wait to meet you and befriend you!"}
                        </div>
                        <div className="introInfoFirstStep">
                            First, Let's set up your introduction on your profile!  
                        </div>
                        <div className="introInfoFirstStepRequest">
                            (Please fill this information out as it will help you to connect to others
                            that may be on a similar path as you. You will be able to set your account to anonymous if you wish and this information will be hidden.) 
                        </div>
                        <div className="introInfoAction One">
                            <div className="introInfoActionTitle">Create a Profile Name.</div>
                            <div className="introInfoActionDesc">This will be the name displayed on your profile, posts, questions, blogs, as well as in searches.</div>
                            <div className="introInfoActionDisclaimer">(If your account is set to anonymous, this will show up as "Anonymous User" and will not show up in searches.)</div>
                            <input 
                                className="introInfoActionInput profileName"
                                required
                                value={nameVal}
                                placeholder="Required (25 characters or less.)" 
                                onChange={(e) => setNameVal(e.target.value)}
                            />
                        </div>
                        <div className="introInfoAction two">
                            <div className="introInfoActionTitle">Write an Introduction Sentence.</div>
                            <div className="introInfoActionDesc">This will help us get to know you! It will be displayed on your profile.</div>
                            <div className="introInfoActionDisclaimer">(e.g. I am an energy healer who works as a store manager and I love to cook!)</div>
                            <input 
                                className="introInfoActionInput sentence" 
                                value={aboutVal}
                                onChange={(e) => setAboutVal(e.target.value)}
                            />
                        </div>
                        <div className="introInfoAction three">
                            <div className="introInfoActionTitle">Why are you here?</div>
                            <div className="introInfoActionDesc">Check all that apply.</div>
                            
                            <div className="introInfoCheckboxField">
                                <div className="introInfoCheckboxFieldColumn one">
                                    {cbChoice.filter((choice) => choice.column === 1).map((choice, index) => (
                                        <div className="introInfoCheckboxItem">
                                            <input 
                                                key={`introInfoCheckbox-c2-${index}`}
                                                className="introInfoCheckboxSelection" 
                                                type="checkbox" 
                                                name="reasons"
                                                value={choice.value}
                                                checked={reasons.includes(choice.value)}
                                                onChange={handleChange}
                                            />
                                            <span className="introInfoCheckboxText">{`${choice.value}`}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="introInfoCheckboxFieldColumn two">
                                    {cbChoice.filter((choice) => choice.column === 2).map((choice, index) => (
                                        <div className="introInfoCheckboxItem">
                                            <input 
                                                key={`introInfoCheckbox-c2-${index}`}
                                                className="introInfoCheckboxSelection" 
                                                type="checkbox" 
                                                name="reasons"
                                                value={choice.value}
                                                checked={reasons.includes(choice.value)}
                                                onChange={handleChange}
                                            />
                                            <span className="introInfoCheckboxText">{`${choice.value}`}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="introInfoCheckboxFieldColumn three">
                                    {cbChoice.filter((choice) => choice.column === 2).map((choice, index) => (
                                        <div className="introInfoCheckboxItem">
                                            <input 
                                                key={`introInfoCheckbox-c2-${index}`}
                                                className="introInfoCheckboxSelection" 
                                                type="checkbox" 
                                                name="reasons"
                                                value={choice.value}
                                                checked={reasons.includes(choice.value)}
                                                onChange={handleChange}
                                            />
                                            <span className="introInfoCheckboxText">{`${choice.value}`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>   
                        </div>
                        <div className="IntroInfoBottom">
                            <Link to="">
                                <button 
                                    className={`introInfoNextBtn ${nameVal < 3 ? "disabled" : ""}`} 
                                    type="submit" 
                                    disabled={nameVal.length < 3 ? true : false}
                                    onClick={handleSubmit}
                                >
                                    Next
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
};

export default  IntroInfo;