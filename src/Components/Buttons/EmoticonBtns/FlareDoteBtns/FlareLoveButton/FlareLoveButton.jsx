import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosReq } from '../../../../../Utils/axiosConfig';
import "./FlareLoveButton.css";


function FlareLoveButton({ user, flare, type, popup, setIsFLoved, setIsULoved, isFLiked, isULiked, lovesCount, setLovesCount, flagged }) {

    const dispatch = useDispatch();

    const { user: currentUser, arrAddFNUser, arrFlareNot } = useSelector((state) => state.auth);

    const [ isFlameLiked, setIsFlameLiked ] = useState(flare.flameLikes.includes(currentUser._id));
    const [ isUnionLiked, setIsUnionLiked ] = useState(flare.unionLikes.includes(currentUser._id));
    const [ isFlameLoved, setIsFlameLoved ] = useState(false);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
    const [ flameLoves, setFlameLoves ] = useState(flare.flameLoves.length);
    const [ unionLoves, setUnionLoves ] = useState(flare.unionLoves.length);
    const [isUnLoved, setIsUnLoved] = useState(false);
    const [ xlkfn, setXLKFN ] = useState(false);
    const [ xlkfnfh, setXLKFNFH ] = useState(false);
    const [ xlkfnd, setXLKFND ] = useState({});
    const [ loveBtnStyle, setLoveBtnStyle ] = useState({});

    const typeReq = type === "reply" ? "replie" : type;

    const newFNUser = {
        userId: currentUser._id,
        profileName: currentUser.profileName,
        avatar: currentUser.unionName ? currentUser.unionProfilePicture : currentUser.profilePicture,
        color: currentUser.unionName ? currentUser.spectrum : currentUser.energy
    };

    const newLoveNot = {
        notType: "love",
        flareType: type,
        flareId: flare._id,
        flareStarterId: flare.unionId ? flare.unionId : flare.userId,
        union: currentUser.unionName ? true : false,
        users: [newFNUser]
    };

    useEffect(() => {
        setIsFlameLiked(isFLiked)
    }, [isFLiked])

    useEffect(() => {
        setIsUnionLiked(isULiked)
    }, [isULiked])

    useEffect(() => {
        setLovesCount(flameLoves + unionLoves);
    }, [flameLoves, unionLoves])

    useEffect(() => {
        if (!xlkfnfh) return;
        handleLoveNots(); 
    }, [xlkfnfh]);

    useEffect(() => {
        if (arrFlareNot?.flareId === flare._id && arrFlareNot.notType === "love") {
            if (arrFlareNot?.users[0].userId === currentUser._id) return;
            setLovesCount(lovesCount + 1);
        }
    }, [arrFlareNot]);

    useEffect(() => {
        if (arrAddFNUser?.flareId === flare._id && arrAddFNUser.notType === "love") {
            if (arrAddFNUser?.userId === currentUser._id) return;
            setLovesCount(lovesCount + 1);
        }
    }, [arrAddFNUser]);

    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(flare.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(flare.flameLoves.includes(currentUser._id))
    }, [currentUser._id]);

    useEffect(() => {
        setIsUnLoved(flare.unLoves?.includes(currentUser._id))   
    }, [currentUser._id]);

    useEffect(() => {
        flagged || isFlameLiked || isUnionLiked || flare.unionId === currentUser._id || flare.userId === currentUser._id 
            ? setLoveBtnStyle({opacity: "30%"})
            : setLoveBtnStyle({opacity: "100%"})
    }, [isFlameLiked, isUnionLiked, flare, currentUser, flagged]);

    const loveHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();  
        if (currentUser.unionName) {
            if (isUnionLoved === false && isUnLoved === false && currentUser._id !== user._id) {
                try {
                    const existingLoveNot = await axiosReq("GET", `/flareNots/${type}/${flare._id}/${true}/${false}`);
                    setXLKFN(existingLoveNot.data.exists);
                    setXLKFND(existingLoveNot.data.lfn);
                    setXLKFNFH(true);
                } catch(err) {} 
            }
            try {
                axiosReq("PUT", `/${typeReq}s/${flare._id}/unionLove`, {unionId: currentUser._id});
            } catch(err) {}    
            setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
            if (isUnionLoved) {setIsUnLoved(true)}
            setIsUnionLoved(!isUnionLoved);
            setIsULoved(!isUnionLoved);
        } else {
            if (isFlameLoved === false && isUnLoved === false && currentUser._id !== user._id) {
                try {
                    const existingLoveNot = await axiosReq("GET", `/flareNots/${type}/${flare._id}/${false}/${false}`);
                    setXLKFN(existingLoveNot.data.exists);
                    setXLKFND(existingLoveNot.data.lfn);
                    setXLKFNFH(true);
                } catch(err) {} 
            }
            try {
                axiosReq("PUT", `/${typeReq}s/${flare._id}/flameLove`, {userId: currentUser._id});
            } catch(err) {}   
            setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
            if (isFlameLoved) {setIsUnLoved(true)}
            setIsFlameLoved(!isFlameLoved);
            setIsFLoved(!isFlameLoved);
        }           
    };

    const handleLoveNots = async () => {
        if (xlkfn) {
            try {
                axiosReq("PUT", `/flareNots/${xlkfnd[0]._id}/add_user`, newFNUser);
                dispatch(setNewAddFNUser({
                    flareStarterType: flare.unionId ? "union" : "flame",
                    flareStarterId: flare.unionId ? flare.unionId : flare.userId,
                    notificationId: xlkfnd[0]._id,
                    userId: newFNUser.userId,
                    profileName: newFNUser.profileName,
                    avatar: newFNUser.avatar,
                    color: newFNUser.color,
                }))
            } catch(err) {}
        } else {
            try {
                const res = await axiosReq("POST", `/flareNots`, newLoveNot);
                dispatch(setNewFlareNot({
                    _id: res.data._id,
                    flareType: type,
                    flareId: flare._id,
                    flareStarterType: flare.unionId ? "union" : "flame",
                    flareStarterId: flare.unionId ? flare.unionId : flare.userId,
                    union: currentUser.unionName ? true : false,
                    seen: false,
                    users: [newFNUser],
                }))
            } catch(err) {}
        }
        setXLKFN(false);
        setXLKFND({});
        setXLKFNFH(false);
    };

    const disableHandler = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
    }
    

    return (
        <div className="flareLoveButton">
            <i
                className={`
                    flareLoveButtonPNGIcon
                    ${type} 
                    PNG_ICON_LOVE${isFlameLoved || isUnionLoved ? "D_LGT" : ""} 
                `}  
                style={loveBtnStyle}
                alt="love/loved" 
                onClick={
                    flagged ||
                    isFlameLiked || 
                    isUnionLiked || 
                    flare.unionId === currentUser._id || 
                    flare.userId === currentUser._id 
                        ? disableHandler 
                        : loveHandler
                }  
                onMouseOver={() => popup(true)}
                onMouseLeave={() => popup(false)} 
            />
            <span 
                className={`flareLoveButtonCounter ${type}`} 
            >
                {lovesCount}
            </span>
        </div>
    )
}

export default FlareLoveButton;