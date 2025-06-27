import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosReq } from '../../../../../Utils/axiosConfig';
import "./FlareLikeButton.css";


function FlareLikeButton({ user, flare, type, popup, setIsFLiked, setIsULiked, isFLoved, isULoved, likesCount, setLikesCount, flagged }) {

    const dispatch = useDispatch();

    const { user: currentUser, arrAddFNUser, arrFlareNot } = useSelector((state) => state.auth);

    const [ isFlameLiked, setIsFlameLiked ] = useState(false);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
    const [ flameLikes, setFlameLikes ] = useState(flare.flameLikes.length);
    const [ unionLikes, setUnionLikes ] = useState(flare.unionLikes.length);
    const [isUnLiked, setIsUnLiked] = useState(false);
    const [ xlkfn, setXLKFN ] = useState(false);
    const [ xlkfnfh, setXLKFNFH ] = useState(false);
    const [ xlkfnd, setXLKFND ] = useState({});
    const [ likeBtnStyle, setLikeBtnStyle ] = useState({});

    const typeReq = type === "reply" ? "replie" : type;

    const newFNUser = {
        userId: currentUser._id,
        profileName: currentUser.profileName,
        avatar: currentUser.unionName ? currentUser.unionProfilePicture : currentUser.profilePicture,
        color: currentUser.unionName ? currentUser.spectrum : currentUser.energy
    };

    const newLikeNot = {
        notType: "like",
        flareType: type,
        flareId: flare._id,
        flareStarterId: flare.unionId ? flare.unionId : flare.userId,
        union: currentUser.unionName ? true : false,
        users: [newFNUser]
    };

    useEffect(() => {
        setIsFlameLoved(isFLoved)
    }, [isFLoved])

    useEffect(() => {
        setIsUnionLoved(isULoved)
    }, [isULoved])

    useEffect(() => {
        setLikesCount(flameLikes + unionLikes);
    }, [flameLikes, unionLikes])

    useEffect(() => {
        if (!xlkfnfh) return;
        handleLikeNots(); 
    }, [xlkfnfh]);

    useEffect(() => {
        if (arrFlareNot?.flareId === flare._id && arrFlareNot.notType === "like") {
            if (arrFlareNot?.users[0].userId === currentUser._id) return;
            setLikesCount(likesCount + 1);
        }
    }, [arrFlareNot]);

    useEffect(() => {
        if (arrAddFNUser?.flareId === flare._id && arrAddFNUser.notType === "like") {
            if (arrAddFNUser?.userId === currentUser._id) return;
            setLikesCount(likesCount + 1);
        }
    }, [arrAddFNUser]);

    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(flare.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(flare.flameLikes.includes(currentUser._id))
    }, [currentUser._id]);

    useEffect(() => {
        setIsUnLiked(flare.unLikes?.includes(currentUser._id))   
    }, [currentUser._id]);

    useEffect(() => {
        flagged || isFlameLoved || isUnionLoved || flare.unionId === currentUser._id || flare.userId === currentUser._id 
            ? setLikeBtnStyle({opacity: "30%"})
            : setLikeBtnStyle({opacity: "100%"})
    }, [isFlameLoved, isUnionLoved, flare, currentUser, flagged]);

    const likeHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();  
        if (currentUser.unionName) {
            if (isUnionLiked === false && isUnLiked === false && currentUser._id !== user._id) {
                try {
                    const existingLikeNot = await axiosReq("GET", `/flareNots/${type}/${flare._id}/${true}/${false}`);
                    setXLKFN(existingLikeNot.data.exists);
                    setXLKFND(existingLikeNot.data.lfn);
                    setXLKFNFH(true);
                } catch(err) {} 
            }
            try {
                axiosReq("PUT", `/${typeReq}s/${flare._id}/unionLike`, {unionId: currentUser._id});
            } catch(err) {}    
            setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
            if (isUnionLiked) {setIsUnLiked(true)}
            setIsUnionLiked(!isUnionLiked);
            setIsULiked(!isUnionLiked);
        } else {
            if (isFlameLiked === false && isUnLiked === false && currentUser._id !== user._id) {
                try {
                    const existingLikeNot = await axiosReq("GET", `/flareNots/${type}/${flare._id}/${false}/${false}`);
                    setXLKFN(existingLikeNot.data.exists);
                    setXLKFND(existingLikeNot.data.lfn);
                    setXLKFNFH(true);
                } catch(err) {} 
            }
            try {
                axiosReq("PUT", `/${typeReq}s/${flare._id}/flameLike`, {userId: currentUser._id});
            } catch(err) {}   
            setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
            if (isFlameLiked) {setIsUnLiked(true)}
            setIsFlameLiked(!isFlameLiked);
            setIsFLiked(!isFlameLiked);
        }           
    };

    const handleLikeNots = async () => {
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
                const res = await axiosReq("POST", `/flareNots`, newLikeNot);
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
        <div className="flareLikeButton">
            <i
                className={`
                    flareLikeButtonPNGIcon
                    ${type} 
                    PNG_ICON_LIKE${isFlameLiked || isUnionLiked ? "D_LGT" : ""} 
                `}  
                style={likeBtnStyle}
                alt="like/liked" 
                onClick={
                    flagged ||
                    isFlameLoved || 
                    isUnionLoved || 
                    flare.unionId === currentUser._id || 
                    flare.userId === currentUser._id 
                        ? disableHandler 
                        : likeHandler
                } 
                onMouseOver={() => popup(true)}
                onMouseLeave={() => popup(false)} 
            />
            <span 
                className={`flareLikeButtonCounter ${type}`} 
            >
                {likesCount}
            </span>
        </div>
    )
}

export default FlareLikeButton;