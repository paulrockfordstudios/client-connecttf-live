import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    cPClose,
    cQNClose,
    cCClose,
    cAClose,
    cReplyClose,
    cReviewClose,
    accessOpen,
    registerOpen,
    register
} from './Redux/AuthSlice';

import CreateReport from "./Components/Reports/CreateReport/CreateReport";
import ConfirmFlagPopup from "./Components/Popups/ConfirmFlagPopup/ConfirmFlagPopup";
import CreateShare from "./Components/Shares/CreateShare/CreateShare";
import CreatePost from "./Components/Posts/CreatePost/CreatePost";
import CreateQuestion from "./Components/Questions/CreateQuestion/CreateQuestion";
import CreateComment from "./Components/Comments/CreateComment/CreateComment";
import EditPost from "./Components/Posts/EditPost/EditPost";
import CDPPost from "./Components/Popups/ConfirmDeletePopups/CDPPost/CDPPost";
import EditQuestion from "./Components/Questions/EditQuestion/EditQuestion";
import CDPQuestion from "./Components/Popups/ConfirmDeletePopups/CDPQuestion/CDPQuestion";
import CreateReply from "./Components/Replies/CreateReply/CreateReply";
import EditComment from "./Components/Comments/EditComment/EditComment";
import EditReply from "./Components/Replies/EditReply/EditReply";
import CreateAnswer from "./Components/Answers/CreateAnswer/CreateAnswer";
import EditAnswer from "./Components/Answers/EditAnswer/EditAnswer";
import SuspensionPopup from "./Components/Popups/SuspensionPopup/SuspensionPopup";
import BlacklistPopup from "./Components/Popups/BlacklistPopup/BlacklistPopup";
//import CTFWiki from "./Pages/CTFWiki/CTFWiki";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Advertising from "./Pages/Advertising/Advertising";
import LoadLogo from "./Components/LoadLogo/LoadLogo";
import UserAgreement from "./Layout/Auxiliary/Portals/UserAgreement/UserAgreement";
import AccessGate from "./Layout/Auxiliary/Portals/AccessGate/AccessGate";
import RegistrationGate from "./Layout/Auxiliary/Portals/RegistrationGate/RegistrationGate";
import LanguageSelect from "./Layout/Auxiliary/Portals/LanguageSelect/LanguageSelect";


const Home = lazy(() => import("./Pages/Home/Home"));
const Registration = lazy(() => import("./Pages/Registration/Registration"));
const Login = lazy(() => import("./Pages/Login/Login"));
const AppealForm = lazy(() => import("./Pages/AppealForm/AppealForm"));
const FlameProfile = lazy(() => import("./Pages/Profiles/FlameProfile/FlameProfile"));
const UnionProfile = lazy(() => import("./Pages/Profiles/UnionProfile/UnionProfile"));
const TFCAbout = lazy(() => import("./Pages/TFCAbout/TFCAbout"));
const AdSpaceInfo = lazy(() => import("./Pages/AdSpaceInfo/AdSpaceInfo"));
const Messenger = lazy(() => import("./Pages/Messenger/Messenger"));
const Coaches = lazy(() => import("./Pages/CoachRoutes/Coaches/Coaches"));
const Coach = lazy(() => import("./Pages/CoachRoutes/Coach/Coach"));
const Channels = lazy(() => import("./Pages/ChannelRoutes/Channels/Channels"));
const Channel = lazy(() => import("./Pages/ChannelRoutes/Channel/Channel"));
const Questions = lazy(() => import("./Pages/QuestionRoutes/Questions/Questions"));
const Question = lazy(() => import("./Pages/QuestionRoutes/Question/Question"));
const Posts = lazy(() => import("./Pages/PostRoutes/Posts/Posts"));
const Post = lazy(() => import("./Pages/PostRoutes/Post/Post"));
const Connect = lazy(() => import("./Pages/Connect/Connect"));
const Blogs = lazy(() => import("./Pages/BlogRoutes/Blogs/Blogs"));
const Blog = lazy(() => import("./Pages/BlogRoutes/Blog/Blog"));
const Events = lazy(() => import("./Pages/EventRoutes/Events/Events"));
const Event = lazy(() => import("./Pages/EventRoutes/Event/Event"));
const Popular = lazy(() => import("./Pages/Popular/Popular"));
const Groups = lazy(() => import("./Pages/Groups/Groups"));
const Mediums = lazy(() => import("./Pages/MediumRoutes/Mediums/Mediums"));
const Medium = lazy(() => import("./Pages/MediumRoutes/Medium/Medium"));
const NoMatch = lazy(() => import("./Pages/NoMatch/NoMatch"));
const Share = lazy(() => import("./Pages/Share/Share"));
const FriendRequests = lazy(() => import("./Pages/FriendRequests/FriendRequests"));
const Notifications = lazy(() => import("./Pages/Notifications/Notifications"));
const Hashtags = lazy(() => import("./Pages/HashtagRoutes/Hashtags/Hashtags"));
const Hashtag = lazy(() => import("./Pages/HashtagRoutes/Hashtag/Hashtag"));
const IntroInfo = lazy(() => import("./Pages/IntroInfo/IntroInfo"));
const PageAmenitiesOne = lazy(() => import("./PageAmenities/PageAmenitiesOne"));
const PageAmenitiesTwo = lazy(() => import("./PageAmenities/PageAmenitiesTwo"));
const GroupProfile = lazy(() => import("./Pages/Profiles/GroupProfile/GroupProfile"));
const Healers = lazy(() => import("./Pages/HealerRoutes/Healers/Healers"));
const Healer = lazy(() => import("./Pages/HealerRoutes/Healer/Healer"));
const SearchResults = lazy(() => import("./Pages/SearchResults/SearchResults"));
const News = lazy(() => import("./Pages/News/News"));
const CreateCoach = lazy(() => import("./Pages/CoachRoutes/CreateCoach/CreateCoach"));
const EditCoach = lazy(() => import("./Pages/CoachRoutes/EditCoach/EditCoach"));
const CreateMedium = lazy(() => import("./Pages/MediumRoutes/CreateMedium/CreateMedium"));
const EditMedium = lazy(() => import("./Pages/MediumRoutes/EditMedium/EditMedium"));
const CreateHealer = lazy(() => import("./Pages/HealerRoutes/CreateHealer/CreateHealer"));
const EditHealer = lazy(() => import("./Pages/HealerRoutes/EditHealer/EditHealer"));
const CreateChannel = lazy(() => import("./Pages/ChannelRoutes/CreateChannel/CreateChannel"));
const EditChannel = lazy(() => import("./Pages/ChannelRoutes/EditChannel/EditChannel"));
const CreateBlog = lazy(() => import("./Pages/BlogRoutes/CreateBlog/CreateBlog"));
const EditBlog = lazy(() => import("./Pages/BlogRoutes/EditBlog/EditBlog"));
const CreateEvent = lazy(() => import("./Pages/EventRoutes/CreateEvent/CreateEvent"));
const EditEvent = lazy(() => import("./Pages/EventRoutes/EditEvent/EditEvent"));
const TermsOfUse = lazy(() => import("./Pages/TermsOfUse/TermsOfUse"));
const CTFWiki = lazy(() => import("./Pages/CTFWiki/CTFWiki"));

function Directory({ fValues, uValues }) {

    const { 
        user, 
        
        cPost,
        cQN,
        cComment,
        cAnswer,
        cReply,
        cReview,
        cShare,

        pAEditor, 
        pBEditor, 
        cdpAvatar, 
        cdpBackground, 
        fBOptions, 
        tfcPos, 
        fiiEdit,

        flagFlare,
        editFlare,
        deleteFlare,
        cReport,

        access,
        register,
        lngSelect,

        ctfdpp, 
        blpp, 
        suspp,

    } = useSelector((state) => state.auth);

    const [ liberty, setLiberty ] = useState(false);

    useEffect(() => {
        if (user && !user.blacklist && !user.suspended) {
            setLiberty(true);
        }
    }, [user]);

    useEffect(() => {
        if (cPost) dispatch(cPClose());
        if (cQN) dispatch(cQNClose());
        if (cComment) dispatch(cCClose());
        if (cAnswer) dispatch(cAClose());
        if (cReply) dispatch(cReplyClose());
        if (cReview) dispatch(cReviewClose());
    }, [location.pathname]);


    return (
        <>
            <Routes> 
                <Route path="/terms_of_use" element={<Suspense fallback={<>loading...</>}><TermsOfUse /></Suspense>} />
                <Route path="aboutctf" element={<Suspense fallback={<>loading...</>}><TFCAbout /></Suspense>} />
                
                <Route path="/privacy_policy" element={<Suspense fallback={<>loading...</>}><PrivacyPolicy /></Suspense>} /> 
                <Route path="/advertising" element={<Suspense fallback={<>loading...</>}><Advertising /></Suspense>} /> 
                <Route path="/registration" element={<Suspense fallback={<>loading...</>}><Registration /></Suspense>} />
                <Route path="/registration/:id/introInfo" element={liberty ? <Suspense fallback={<>loading...</>}><IntroInfo /></Suspense> : <Navigate to="/"/>} />
                <Route path="/appeals/request-form" element={<Suspense fallback={<>loading...</>}><AppealForm /></Suspense>} />
                {!user && <Route path="/" element={<Suspense fallback={<LoadLogo/>}><Login blacklist={user?.blacklist} suspension={user?.suspended}/></Suspense>}/>}
                <Route 
                    path="/login" 
                    element={liberty 
                        ? <Navigate to="/"/> 
                        : <Suspense fallback={<LoadLogo/>}><Login blacklist={user?.blacklist} suspension={user?.suspended}/></Suspense>
                    }
                /> 
                <Route path="/ctfwiki" element={<Suspense fallback={<>loading...</>}><CTFWiki /></Suspense>} />
                
                <Route element={<Suspense fallback={<>loading...</>}><PageAmenitiesOne /></Suspense>}>
                    <Route path="/messenger" element={liberty ? <Suspense fallback={<>loading...</>}><Messenger/></Suspense> : <Navigate to="/login" />}/>
                    <Route element={<Suspense fallback={<>loading...</>}><PageAmenitiesTwo /></Suspense>}>
                        <Route path="/" element={liberty ? <Suspense fallback={<>loading...</>}><Home flameFriends={fValues} /></Suspense> : <Navigate to="/login" />}/>
                        <Route path="/coaches" element={liberty ? <Suspense fallback={<>loading...</>}><Coaches /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/coach/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Coach /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/createCoach" element={liberty ? <Suspense fallback={<>loading...</>}><CreateCoach /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/editCoach/:id" element={liberty ? <Suspense fallback={<>loading...</>}><EditCoach /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/news" element={liberty ? <Suspense fallback={<>loading...</>}><News /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/mediums" element={liberty ? <Suspense fallback={<>loading...</>}><Mediums /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/medium/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Medium /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/createMedium" element={liberty ? <Suspense fallback={<>loading...</>}><CreateMedium /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/editMedium/:id" element={liberty ? <Suspense fallback={<>loading...</>}><EditMedium /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/healers" element={liberty ? <Suspense fallback={<>loading...</>}><Healers /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/healer/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Healer /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/createHealer" element={liberty ? <Suspense fallback={<>loading...</>}><CreateHealer /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/editHealer/:id" element={liberty ? <Suspense fallback={<>loading...</>}><EditHealer /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/connect" element={liberty ? <Suspense fallback={<>loading...</>}><Connect /></Suspense> : <Navigate to="/login" />} />    
                        <Route path="/groups" element={liberty ? <Suspense fallback={<>loading...</>}><Groups /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/channels" element={liberty ? <Suspense fallback={<>loading...</>}><Channels /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/channel/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Channel /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/createChannel" element={liberty ? <Suspense fallback={<>loading...</>}><CreateChannel /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/editChannel/:id" element={liberty ? <Suspense fallback={<>loading...</>}><EditChannel /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/blogs" element={liberty ? <Suspense fallback={<>loading...</>}><Blogs /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/blog/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Blog /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/createBlog" element={liberty ? <Suspense fallback={<>loading...</>}><CreateBlog /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/editBlog/:id" element={liberty ? <Suspense fallback={<>loading...</>}><EditBlog /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/notifications" element={liberty ? <Suspense fallback={<>loading...</>}><Notifications /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/posts" element={liberty ? <Suspense fallback={<>loading...</>}><Posts /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/post/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Post /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/questions" element={liberty ? <Suspense fallback={<>loading...</>}><Questions /></Suspense> : <Navigate to="/login" />} /> 
                        <Route path="/question/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Question /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/share/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Share /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/popular" element={liberty ? <Suspense fallback={<>loading...</>}><Popular /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/searchResults" element={liberty ? <Suspense fallback={<>loading...</>}><SearchResults /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/events" element={liberty ? <Suspense fallback={<>loading...</>}><Events /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/event/:id" element={liberty ? <Suspense fallback={<>loading...</>}><Event /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/createEvent" element={liberty ? <Suspense fallback={<>loading...</>}><CreateEvent /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/editEvent/:id" element={liberty ? <Suspense fallback={<>loading...</>}><EditEvent /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/hashtags" element={liberty ? <Suspense fallback={<>loading...</>}><Hashtags /></Suspense> : <Navigate to="/login" />} />   
                        <Route path="/hashtag/:hashtag" element={liberty ? <Suspense fallback={<>loading...</>}><Hashtag /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/about" element={liberty ? <Suspense fallback={<>loading...</>}><TFCAbout /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/terms_of_use" element={liberty ? <Suspense fallback={<>loading...</>}><TermsOfUse /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/adspaceinformation" element={liberty ? <Suspense fallback={<>loading...</>}><AdSpaceInfo /></Suspense> : <Navigate to="/login" />} />
                        <Route path="/friendRequests" element={liberty ? <Suspense fallback={<>loading...</>}><FriendRequests /></Suspense> : <Navigate to="/login" />} />                            
                        <Route path="*" element={liberty ? <Suspense fallback={<>loading...</>}><NoMatch /></Suspense> : <Navigate to="/login" />} />
                        <Route 
                            path="/flame-profile/userName/:userName"
                            element={liberty ? <Suspense fallback={<>loading...</>}><FlameProfile /></Suspense> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/union-profile/unionName/:unionName" 
                            element={liberty ? <Suspense fallback={<>loading...</>}><UnionProfile /></Suspense> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/group-profile/:groupName" 
                            element={liberty ? <Suspense fallback={<>loading...</>}><GroupProfile /></Suspense> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/flame-profile/id/:id" 
                            element={liberty ? <Suspense fallback={<>loading...</>}><FlameProfile /></Suspense> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/union-profile/id/:id" 
                            element={liberty ? <Suspense fallback={<>loading...</>}><UnionProfile /></Suspense> : <Navigate to="/login" />} 
                        />
                        <Route 
                            path="/group-profile/:id" 
                            element={liberty ? <Suspense fallback={<>loading...</>}><GroupProfile /></Suspense> : <Navigate to="/login" />} 
                        />
                        {/*["/flame-profile/userName/:userName/:follow", "/flame-profile/id/:id/:follow", "/union-profile/unionName/:unionName/:follow", "/union-profile/id/:id/:follow"].map((path, index) => (
                            <Route path={path} key={index} element={user ? <FriendList /> : <Navigate to="/login" />} />
                        ))*/}
                    </Route>
                    
                </Route>
                
            </Routes>
            {lngSelect && <Suspense fallback={<>loading...</>}><LanguageSelect/></Suspense>}
            {access && <Suspense fallback={<>loading...</>}><AccessGate/></Suspense>}
            {register && <Suspense fallback={<>loading...</>}><RegistrationGate/></Suspense>}
            {ctfdpp && <Suspense fallback={<>loading...</>}><UserAgreement /></Suspense>}
            {blpp && <Suspense fallback={<>loading...</>}><BlacklistPopup /></Suspense>}
            {/*suspp && <SuspensionPopup />*/}
            {cPost && <CreatePost/>}
            {cQN && <CreateQuestion />}
            {cAnswer && <CreateAnswer data={cAnswer}/>}
            {cComment && <CreateComment data={cComment}/>}
            {cReply && <CreateReply data={cReply} />}
            {cReport && <CreateReport data={cReport}/>}
            {cShare && <CreateShare data={cShare}/>}
            {flagFlare && <ConfirmFlagPopup data={flagFlare}/>}
            {editFlare && editFlare.type === "answer" && <EditAnswer data={editFlare}/>}
            {editFlare && editFlare.type === "comment" && <EditComment data={editFlare}/>}
            {editFlare && editFlare.type === "post" && <EditPost data={editFlare}/>}
            {editFlare && editFlare.type === "question" && <EditQuestion data={editFlare}/>}
            {editFlare && editFlare.type === "reply" && <EditReply data={editFlare}/>}
            {deleteFlare && deleteFlare.type === "post" && <CDPPost data={deleteFlare}/>}
            {deleteFlare && deleteFlare.type === "question" && <CDPQuestion data={deleteFlare}/>}
        </>            
    );
};

export default Directory;