import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './AuthService';
import { LOCATION_CHANGE } from 'react-router-redux';
import { colorTheme } from '../Utils/styling/colorTheme';
import { higherOrder } from '../Utils/styling/higherOrder';


// Get user and/or union from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const flame = JSON.parse(localStorage.getItem("flame"));
const union = JSON.parse(localStorage.getItem("union"));
// Get mentions from localStorage
const mentions = JSON.parse(localStorage.getItem("mentions"));
// Get birthdays from localStorage
const birthdays = JSON.parse(localStorage.getItem("birthdays"));
// Window orientation from localStorage
const winOrientation = JSON.parse(localStorage.getItem("winOrientation"));
// Window width from localStorage
const winWidth = JSON.parse(localStorage.getItem("winWidth"));
// Window height from localStorage
const winHeight = JSON.parse(localStorage.getItem("winHeight"));
// Conversation container remaining open or closed from localStorage
const convBox = JSON.parse(localStorage.getItem("convBox"));
// Get flame conversation 1, open and/or up from localStorage
const conv1 = localStorage.getItem("conv1") !== "undefined" ? JSON.parse(localStorage.getItem("conv1")) : null;
const c1Up = localStorage.getItem("c1Up") !== "undefined" ? JSON.parse(localStorage.getItem("c1Up")) : null;
const c1Open = localStorage.getItem("c1Open") !== "undefined" ? JSON.parse(localStorage.getItem("c1Open")) : null;
// Get flame conversation 2, open and/or up from localStorage
const conv2 = localStorage.getItem("conv2") !== "undefined" ? JSON.parse(localStorage.getItem("conv2")) : null;
const c2Up = localStorage.getItem("c2Up") !== "undefined" ? JSON.parse(localStorage.getItem("c2Up")) : null;
const c2Open = localStorage.getItem("c2Open") !== "undefined" ? JSON.parse(localStorage.getItem("c2Open")) : null;
// Get flame conversation 3, open and/or up from localStorage
const conv3 = localStorage.getItem("conv3") !== "undefined" ? JSON.parse(localStorage.getItem("conv3")) : null;
const c3Up = localStorage.getItem("c3Up") !== "undefined" ? JSON.parse(localStorage.getItem("c3Up")) : null;
const c3Open = localStorage.getItem("c3Open") !== "undefined" ? JSON.parse(localStorage.getItem("c3Open")) : null;

const sender = user 
    ? {
        id: user.unionName ? union._id : user._id,
        userName: user.unionName ? user.unionName : user.userName,
        type: user.unionName ? "union" : "flame",
        avatar: user.unionName ? user.unionProfilePicture : user.profilePicture,
        color: user.unionName ? user.spectrum : user.energy,
        link: user.unionName ? `/union-profile/unionName/${user.unionName}` : `/flame-profile/userName/${user.userName}`,
      } 
    : null;


const initialState = {
    user: user ? user : null,
    flame: flame ? flame : null,
    union: union ? union : null,

    sender: sender ? sender : null,

    lngObj: null,

    mentions: mentions ? mentions : null,

    birthdays: birthdays ? birthdays : null,

    winOrientation: winOrientation ? winOrientation : null,
    winWidth: winWidth ? winWidth : null,
    winHeight: winHeight ? winHeight : null,

    convBox: convBox ? convBox : false,

    conv1: conv1 ? conv1 : null,
    c1Up: c1Up ? c1Up : null,
    c1Open: c1Open ? c1Open : null,

    conv2: conv2 ? conv2 : null,
    c2Up: c2Up ? c2Up : null,
    c2Open: c2Open ? c2Open : null,

    conv3: conv3 ? conv3 : null,
    c3Up: c3Up ? c3Up : null,
    c3Open: c3Open ? c3Open : null,

    flagData: null,

    folMDD: false,
    gpsMDD: false,
    tfMDD: false,
    chatMDD: false,
    lpMDD: false,
    notMDD: false,

    access: false, // open/close access portal
    register: false, // open/close register portal
    lngSelect: false, // open/close LanguageSelect portal

    // Create Flare Popups
    cPost: false,
    cQN: false,
    cComment: null,
    cAnswer: null,
    cReply: null,
    cReview: null,
    cReport: null,
    cShare: null,

    onlineFlames: [],
    onlineUnions: [],

    newPost: null,
    newQuestion: null,
    newComment: null,
    newAnswer: null,
    newReply: null,
    newReview: null,
    newShare: null,

    editedPost: null,
    editedQN: null,
    editedCom: null,
    editedAns: null,
    editedReply: null,
    edtiedRev: null,
    editedShare: null,

    newMsg: null,
    newArrFlameMsg: null,
    newArrUnionMsg: null,

    newLikeMsg: null,
    newUnlikeMsg: null,
    arrLikeMsg: null,
    arrUnlikeMsg: null,

    newLoveMsg: null,
    newUnloveMsg: null,
    arrLoveMsg: null,
    arrUnloveMsg: null,

    newFlareNot: null,
    arrFlareNot: null,
    newAddFNUser: null,
    arrAddFNUser: null,

    newUserNot: null,
    arrUserNot: null,
    newAddUNUser: null,
    arrAddUNUser: null,

    newMessageNot: null,
    arrMessageNot: null,
    newAddMessage: null,
    arrAddMessage: null,

    newMsgDoteNot: null,
    arrMsgDoteNot: null,

    cdpAvatar: false,
    cdpBackground: false,

    ctfdpp: false,
    toupp: false,
    blpp: false,
    suspp: false,
    pAEditor: false,
    pBEditor: false,
    deleteFlare: null,
    editFlare: null,
    flagFlare: null,
    reportFlare: false,
    fBOptions: false,
    tfcPos: false,
    tfcAck: false,
    tfaReq: false,
    tfaCong: false,
    fiiEdit: false,
    giiEdit: false,
    uiiEdit: false,
    faiEdit: false,
    gaiEdit: false,
    fsEdit: false,
    usEdit: false,

    keyHov: "",

    bsrDrkMode: false,

    actAcc: user ? user.unionName ? "union" : "flame" : "flame",
    screen: "dark", //user? user.darkMode ? "dark" : "light" : "light",
    fontSize: null,
    PS: process.env.PHOTO_STORAGE,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",

    cp: user ? { color: colorTheme(user), screen: user.darkMode ? "dark" : "light", higherSpectrum: higherOrder(user)} : null,

};

// Register user
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message ) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout User
export const logout = createAsyncThunk("auth/logout", async () => {
    return authService.logout();
})


// Switch user to flame user
export const switch2FlameAcc = createAsyncThunk("auth/switch2FlameAcc", async () => {
    try {
        localStorage.setItem("user", JSON.stringify(flame))
    } catch (err) {
        console.log(err)
    }
})


// Switch user to union user
export const switch2UnionAcc = createAsyncThunk("auth/switch2UnionAcc", async () => {
    try {
        localStorage.setItem("user", JSON.stringify(union))
    } catch (err) {
        console.log(err)
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
       
    reducers: {
        updateStart: ( state ) => {
            state.isLoading = true;
        },
        updateSuccess: ( state, action ) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        updateError: ( state ) => {
            state.isError = true;
            state.isLoading = false;
        },
        reset: ( state ) => {
            state.user = null;
            state.flame = null;
            state.union = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "flame";
        },


        newProfileName: ( state, action ) => {
            state.user.profileName = action.payload;
        },

        newAbout: ( state, action ) => {
            state.user.about = action.payload;
        },
        newHereFor: ( state, action ) => {
            state.user.hereFor = action.payload;
        },


        newFlameAvatar: ( state, action ) => {
            state.user.profilePicture = action.payload;
        },
        newUnionAvatar: ( state, action ) => {
            state.user.unionProfilePicture = action.payload;
        },
        newBackgroundPic: ( state, action ) => {
            state.user.backgroundPicture = action.payload;
        },

        setLngObj: ( state, action ) => {
            state.lngObj = action.payload;
        },

        mentionList: ( state, action ) => {
            state.mentions = action.payload;
        },

        birthdayList: ( state, action ) => {
            state.birthdays = action.payload;
        },

        setWinOrientation: ( state, action ) => {
            state.winOrientation = action.payload;
        },
        setWinWidth: ( state, action ) => {
            state.winWidth = action.payload;
        },
        setWinHeight: ( state, action ) => {
            state.winHeight = action.payload;
        },

        flameFollowing: ( state, action ) => {
            state.user.flameFollowing = [...state.user.flameFollowing, action.payload];
        }, 
        flameUnfollowing: ( state, action ) => {
            state.user.flameFollowing = state.user.flameFollowing.filter((fFollowing) => fFollowing !== action.payload);
        },
        unionFollowing: ( state, action ) => {
            state.user.unionFollowing = [...state.user.unionFollowing, action.payload];
        }, 
        unionUnfollowing: ( state, action ) => {
            state.user.unionFollowing = state.user.unionFollowing.filter((uFollowing) => uFollowing !== action.payload);
        },

        flameRequestFollow: ( state, action ) => {
            state.user.flameFollowRequesting = [...state.user.flameFollowRequesting, action.payload];
        }, 
        flameUnrequestFollow: ( state, action ) => {
            state.user.flameFollowRequesting = state.user.flameFollowRequesting.filter((fFollowRequesting) => fFollowRequesting !== action.payload);
        },
        unionRequestFollow: ( state, action ) => {
            state.user.unionFollowRequesting = [...state.user.unionFollowRequesting, action.payload];
        }, 
        unionUnrequestFollow: ( state, action ) => {
            state.user.unionFollowRequesting = state.user.unionFollowRequesting.filter((uFollowRequesting) => uFollowRequesting !== action.payload);
        },

        flameFollower: ( state, action ) => {
            state.user.flameFollowers = [...state.user.flameFollowers, action.payload];
        }, 
        unionFollower: ( state, action ) => {
            state.user.unionFollowers = [...state.user.unionFollowers, action.payload];
        }, 
       


        flameBlock: ( state, action ) => {
            state.user.flameBlocking = [...state.user.flameBlocking, action.payload];
        }, 
        flameUnBlock: ( state, action ) => {
            state.user.flameBlocking = state.user.flameBlocking.filter((fBlocking) => fBlocking !== action.payload);
        },
        unionBlock: ( state, action ) => {
            state.user.unionBlocking = [...state.user.unionBlocking, action.payload];
        }, 
        unionUnBlock: ( state, action ) => {
            state.user.unionBlocking = state.user.unionBlocking.filter((uBlocking) => uBlocking !== action.payload);
        },

        flameSubscribing: ( state, action ) => {
            state.user.flameSubscribing = [...state.user.flameSubscribing, action.payload];
        }, 
        flameUnsubscribing: ( state, action ) => {
            state.user.flameSubscribing = state.user.flameSubscribing.filter((fSubscribing) => fSubscribing !== action.payload);
        },
        unionSubscribing: ( state, action ) => {
            state.user.unionSubscribing = [...state.user.unionSubscribing, action.payload];
        }, 
        unionUnsubscribing: ( state, action ) => {
            state.user.unionSubscribing = state.user.unionSubscribing.filter((uSubscribing) => uSubscribing !== action.payload);
        },

        flameRequestSubscribe: ( state, action ) => {
            state.user.flameSubscribeRequesting = [...state.user.flameSubscribeRequesting, action.payload];
        }, 
        flameUnrequestSubscribe: ( state, action ) => {
            state.user.flameSubscribeRequesting = state.user.flameSubscribeRequesting.filter((fSubscribeRequesting) => fSubscribeRequesting !== action.payload);
        },
        unionRequestSubscribe: ( state, action ) => {
            state.user.unionSubscribeRequesting = [...state.user.unionSubscribeRequesting, action.payload];
        }, 
        unionUnrequestSubscribe: ( state, action ) => {
            state.user.unionSubscribeRequesting = state.user.unionSubscribeRequesting.filter((uSubscribeRequesting) => uSubscribeRequesting !== action.payload);
        },

        flameSubscriber: ( state, action ) => {
            state.user.flameSubscribers = [...state.user.flameSubscribers, action.payload];
        }, 
        unionSubscriber: ( state, action ) => {
            state.user.unionSubscribers = [...state.user.unionSubscribers, action.payload];
        }, 

        audienceDefault: ( state, action ) => {
            state.user.defaultAudience = action.payload;
        },
        feedDefault: ( state, action ) => {
            state.user.defaultFeed = action.payload;
        },

        cvBxOpen: ( state ) => {
            state.convBox = true;
        },
        cvBxClose: ( state ) => {
            state.convBox = false;
        },

        userMessenger: ( state, action ) => {
            state.user.messenger = action.payload;
        },

        userConv1: ( state, action ) => {
            state.user.conversation1 = action.payload;
        },
        userConv2: ( state, action ) => {
            state.user.conversation2 = action.payload;
        },
        userConv3: ( state, action ) => {
            state.user.conversation3 = action.payload;
        },

        setCv1: ( state, action ) => {
            state.conv1 = action.payload;
        },
        cv1Open: ( state ) => {
            state.c1Open = true;
        },
        cv1Close: ( state ) => {
            state.c1Open = false;
        },
        cv1Up: ( state ) => {
            state.c1Up = true;
        },
        cv1Down: ( state ) => {
            state.c1Up = false;
        },

        setCv2: ( state, action ) => {
            state.conv2 = action.payload;
        },
        cv2Open: ( state ) => {
            state.c2Open = true;
        },
        cv2Close: ( state ) => {
            state.c2Open = false;
        },
        cv2Up: ( state ) => {
            state.c2Up = true;
        },
        cv2Down: ( state ) => {
            state.c2Up = false;
        },

        setCv3: ( state, action ) => {
            state.conv3 = action.payload;
        },
        cv3Open: ( state ) => {
            state.c3Open = true;
        },
        cv3Close: ( state ) => {
            state.c3Open = false;
        },
        cv3Up: ( state ) => {
            state.c3Up = true;
        },
        cv3Down: ( state ) => {
            state.c3Up = false;
        },

        flagAct: ( state, action ) => {
            state.flagData = action.payload;
        },

        folMDDOpen: ( state ) => {
            state.folMDD = true;
        },
        folMDDClose: ( state ) => {
            state.folMDD = false;
        },
        gpsMDDOpen: ( state ) => {
            state.gpsMDD = true;
        },
        gpsMDDClose: ( state ) => {
            state.gpsMDD = false;
        },
        tfMDDOpen: ( state ) => {
            state.tfMDD = true;
        },
        tfMDDClose: ( state ) => {
            state.tfMDD = false;
        },
        chatMDDOpen: ( state ) => {
            state.chatMDD = true;
        },
        chatMDDClose: ( state ) => {
            state.chatMDD = false;
        },
        lpMDDOpen: ( state ) => {
            state.lpMDD = true;
        },
        lpMDDClose: ( state ) => {
            state.lpMDD = false;
        },
        notMDDOpen: ( state ) => {
            state.notMDD = true;
        },
        notMDDClose: ( state ) => {
            state.notMDD = false;
        },

        cPOpen: ( state ) => {
            state.cPost = true;
        }, 
        cPClose: ( state ) => {
            state.cPost = false;
        }, 
        cQNOpen: ( state ) => {
            state.cQN = true;
        }, 
        cQNClose: ( state ) => {
            state.cQN = false;
        },
        cCOpen: ( state, action ) => {
            state.cComment = action.payload;
        }, 
        cCClose: ( state ) => {
            state.cComment = null;
        }, 
        cAOpen: ( state, action ) => {
            state.cAnswer = action.payload;
        }, 
        cAClose: ( state ) => {
            state.cAnswer = null;
        },
        cReplyOpen: ( state, action ) => {
            state.cReply = action.payload;
        }, 
        cReplyClose: ( state ) => {
            state.cReply = null;
        }, 
        cReviewOpen: ( state, action ) => {
            state.cReview = action.payload;
        }, 
        cReviewClose: ( state ) => {
            state.cReview = null;
        },
        cReportOpen: ( state, action ) => {
            state.cReport = action.payload;
        }, 
        cReportClose: ( state ) => {
            state.cReport = null;
        },
        cSOpen: ( state, action ) => {
            state.cShare = action.payload;
        }, 
        cSClose: ( state ) => {
            state.cShare = null;
        },

        setOnlineFlames: ( state, action ) => {
            state.onlineFlames = action.payload;
        },
        setOnlineUnions: ( state, action ) => {
            state.onlineUnions = action.payload;
        },

        setNewPost: ( state, action ) => {
            state.newPost = action.payload;
        },
        setNewQuestion: ( state, action ) => {
            state.newQuestion = action.payload;
        },
        setNewComment: ( state, action ) => {
            state.newComment = action.payload;
        },
        setNewAnswer: ( state, action ) => {
            state.newAnswer = action.payload;
        },
        setNewReply: ( state, action ) => {
            state.newReply = action.payload;
        },
        setNewReview: ( state, action ) => {
            state.newReview = action.payload;
        },
        setNewShare: ( state, action ) => {
            state.newShare = action.payload;
        },

        setEditedPost: ( state, action ) => {
            state.editedPost = action.payload;
        },
        setEditedQN: ( state, action ) => {
            state.editedQN = action.payload;
        },
        setEditedCom: ( state, action ) => {
            state.editedCom = action.payload;
        },
        setEditedAns: ( state, action ) => {
            state.editedAns = action.payload;
        },
        setEditedReply: ( state, action ) => {
            state.editedReply = action.payload;
        },
        setEditedRev: ( state, action ) => {
            state.editedRev = action.payload;
        },
        setEditedShare: ( state, action ) => {
            state.editedShare = action.payload;
        },

        setNewMsg: ( state, action ) => {
            state.newMsg = action.payload;
        },
        setNewArrFlameMsg: ( state, action ) => {
            state.newArrFlameMsg = action.payload;
        },
        setNewArrUnionMsg: ( state, action ) => {
            state.newArrUnionMsg = action.payload;
        },

        // Message Like/Unlike
        setNewLikeMsg: ( state, action ) => {
            state.newLikeMsg = action.payload;
        },
        setNewUnlikeMsg: ( state, action ) => {
            state.newUnlikeMsg = action.payload;
        },
        setArrLikeMsg: ( state, action ) => {
            state.arrLikeMsg = action.payload;
        },
        setArrUnlikeMsg: ( state, action ) => {
            state.arrUnlikeMsg = action.payload;
        },

        // Message Love/Unlove
        setNewLoveMsg: ( state, action ) => {
            state.newLoveMsg = action.payload;
        },
        setNewUnloveMsg: ( state, action ) => {
            state.newUnloveMsg = action.payload;
        },
        setArrLoveMsg: ( state, action ) => {
            state.arrLoveMsg = action.payload;
        },
        setArrUnloveMsg: ( state, action ) => {
            state.arrUnloveMsg = action.payload;
        },

        // FLARE NOTIFICATIONS
        setNewFlareNot: ( state, action ) => {
            state.newFlareNot = action.payload;
        },
        setArrFlareNot: ( state, action ) => {
            state.arrFlareNot = action.payload;
        },
        setNewAddFNUser: ( state, action ) => {
            state.newAddFNUser = action.payload;
        },
        setArrAddFNUser: ( state, action ) => {
            state.arrAddFNUser = action.payload;
        },

        // USER NOTIFICATIONS
        setNewUserNot: ( state, action ) => {
            state.newUserNot = action.payload;
        },
        setArrUserNot: ( state, action ) => {
            state.arrUserNot = action.payload;
        },
        setNewAddUNUser: ( state, action ) => {
            state.newAddUNUser = action.payload;
        },
        setArrAddUNUser: ( state, action ) => {
            state.arrAddUNUser = action.payload;
        },

        // MESSAGE NOTIFICATIONS
        setNewMessageNot: ( state, action ) => {
            state.newMessageNot = action.payload;
        },
        setArrMessageNot: ( state, action ) => {
            state.arrMessageNot = action.payload;
        },
        setNewAddMessage: ( state, action ) => {
            state.newAddMessage = action.payload;
        },
        setArrAddMessage: ( state, action ) => {
            state.arrAddMessage = action.payload;
        },

        // MESSAGE DOTE NOTIFICATIONS
        setNewMsgDoteNot: ( state, action ) => {
            state.newMsgDoteNot = action.payload;
        },
        setArrMsgDoteNot: ( state, action ) => {
            state.arrMsgDoteNot = action.payload;
        },

        accessOpen: ( state ) => {
            state.access = true;
        },
        accessClose: ( state ) => {
            state.access = false;
        },
        registerOpen: ( state ) => {
            state.register = true;
        },
        registerClose: ( state ) => {
            state.register = false;
        },
        lngSelectOpen: ( state ) => {
            state.lngSelect = true;
        },
        lngSelectClose: ( state ) => {
            state.lngSelect = false;
        },

        cdpAvatarOpen: ( state ) => {
            state.cdpAvatar = true;
        },
        cdpAvatarClose: ( state ) => {
            state.cdpAvatar = false;
        },
        cdpBackgroundOpen: ( state ) => {
            state.cdpBackground = true;
        },
        cdpBackgroundClose: ( state ) => {
            state.cdpBackground = false;
        },

        ctfdOpen: ( state ) => {
            state.ctfdpp = true;
        },
        ctfdClose: ( state ) => {
            state.ctfdpp = false;
        }, 
        touOpen: ( state ) => {
            state.toupp = true;
        }, 
        touClose: ( state ) => {
            state.toupp = false;
        }, 
        blOpen: ( state ) => {
            state.blpp = true;
        }, 
        blClose: ( state ) => {
            state.blpp = false;
        }, 
        susOpen: ( state ) => {
            state.suspp = true;
        }, 
        susClose: ( state ) => {
            state.suspp = false;
        }, 
        pAEOpen: ( state ) => {
            state.pAEditor = true;
        }, 
        pBEOpen: ( state ) => {
            state.pBEditor = true;
        }, 
        pAEClose: ( state ) => {
            state.pAEditor = false;
        }, 
        pBEClose: ( state ) => {
            state.pBEditor = false;
        }, 
        dFOpen: ( state, action ) => {
            state.deleteFlare = action.payload;
        },
        dFClose: ( state ) => {
            state.deleteFlare = null;
        },
        eFOpen: ( state, action ) => {
            state.editFlare = action.payload;
        },
        eFClose: ( state ) => {
            state.editFlare = null;
        },
        fFOpen: ( state, action ) => {
            state.flagFlare = action.payload;
        },
        fFClose: ( state ) => {
            state.flagFlare = null;
        },
        rFOpen: ( state ) => {
            state.reportFlare = true;
        },
        rFClose: ( state ) => {
            state.reportFlare = false;
        },
        fBOOpen: ( state ) => {
            state.fBOptions = true;
        },
        fBOClose: ( state ) => {
            state.fBOptions = false;
        },
        tfcpOpen: ( state ) => {
            state.tfcPos = true;
        },
        tfcpClose: ( state ) => {
            state.tfcPos = false;
        },
        tfcaOpen: ( state ) => {
            state.tfcAck = true;
        },
        tfcaClose: ( state ) => {
            state.tfcAck = false;
        },
        tfarOpen: ( state ) => {
            state.tfaReq = true;
        },
        tfarClose: ( state ) => {
            state.tfaReq = false;
        },
        tfacOpen: ( state ) => {
            state.tfaCong = true;
        },
        tfacClose: ( state ) => {
            state.tfaCong = false;
        },
        fiiepOpen: ( state ) => {
            state.fiiEdit = true;
        },
        fiiepClose: ( state ) => {
            state.fiiEdit = false;
        },
        giiepOpen: ( state ) => {
            state.giiEdit = true;
        },
        giiepClose: ( state ) => {
            state.giiEdit = false;
        },
        uiiepOpen: ( state ) => {
            state.uiiEdit = true;
        },
        uiiepClose: ( state ) => {
            state.uiiEdit = false;
        },
        faiepOpen: ( state ) => {
            state.faiEdit = true;
        },
        faiepClose: ( state ) => {
            state.faiEdit = false;
        },
        gaiepOpen: ( state ) => {
            state.gaiEdit = true;
        },
        gaiepClose: ( state ) => {
            state.gaiEdit = false;
        },
        fsepOpen: ( state ) => {
            state.fsEdit = true;
        },
        fsepClose: ( state ) => {
            state.fsEdit = false;
        },
        usepOpen: ( state ) => {
            state.usEdit = true;
        },
        usepClose: ( state ) => {
            state.usEdit = false;
        },

        setKeyHov: ( state, action ) => {
            state.keyHov = action.payload;
        },

        setBsrDrkMode: ( state, action ) => {
            state.bsrDrkMode = action.payload;
        },

        setFontSize: ( state, action ) => {
            state.fontSize = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.flame = action.payload;
                state.union = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.flame = null;
                state.union = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.flame;
                state.flame = action.payload.flame;
                state.union = action.payload.union;
                state.actAcc = "flame"
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.flame = null;
                state.union = null;
               
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.flame = null;
                state.union = null;
                state.actAcc = "flame";
            })
            .addCase(switch2UnionAcc.fulfilled, (state) => {
                state.actAcc = "union";
                state.user = state.union; 
            })
            .addCase(switch2FlameAcc.fulfilled, (state) => {
                state.actAcc = "flame";
                state.user = state.flame;
            })
    }
});

export const { 
    updateStart, 
    updateSuccess, 
    updateError, 
    reset,
    
    newProfileName,
    newAbout,
    newHereFor,

    newFlameAvatar,
    newUnionAvatar,
    newBackgroundPic,

    setLngObj,

    mentionList,

    birthdayList,

    setWinOrientation,
    setWinWidth,
    setWinHeight,

    flameFollowing,
    flameUnfollowing,
    unionFollowing,
    unionUnfollowing,

    flameRequestFollow,
    flameUnrequestFollow,
    unionRequestFollow,
    unionUnrequestFollow,

    flameFollower,
    unionFollower,

    flameBlock,
    flameUnblock,
    unionBlock,
    unionUnblock,

    flameSubscribing,
    flameUnsubscribing,
    unionSubscribing,
    unionUnsubscribing,

    flameRequestSubscribe,
    flameUnrequestSubscribe,
    unionRequestSubscribe,
    unionUnrequestSubscribe,

    flameSubscriber,
    unionSubscriber,

    audienceDefault,
    feedDefault,

    accessOpen,
    accessClose,
    registerOpen,
    registerClose,
    lngSelectOpen,
    lngSelectClose,

    cvBxOpen, 
    cvBxClose,

    userMessenger,

    userConv1,
    userConv2,
    userConv3,

    setCv1, 
    cv1Open, 
    cv1Close, 
    cv1Up, 
    cv1Down,
    setCv2, 
    cv2Open, 
    cv2Close, 
    cv2Up, 
    cv2Down,
    setCv3, 
    cv3Open, 
    cv3Close, 
    cv3Up, 
    cv3Down,

    flagAct,

    folMDDOpen,
    folMDDClose,
    gpsMDDOpen,
    gpsMDDClose,
    tfMDDOpen,
    tfMDDClose,
    chatMDDOpen,
    chatMDDClose,
    lpMDDOpen,
    lpMDDClose,
    notMDDOpen,
    notMDDClose,

    cPOpen,
    cPClose,
    cQNOpen,
    cQNClose,
    cCOpen,
    cCClose,
    cAOpen,
    cAClose,
    cReplyOpen,
    cReplyClose,
    cReviewOpen,
    cReviewClose,
    cReportOpen,
    cReportClose,
    cSOpen,
    cSClose,

    setOnlineFlames,
    setOnlineUnions,

    setNewPost,
    setNewQuestion,
    setNewComment,
    setNewAnswer,
    setNewReply,
    setNewReview,
    setNewShare,

    setEditedPost,
    setEditedQN,
    setEditedCom,
    setEditedAns,
    setEditedReply,
    setEditedRev,
    setEditedShare,

    setNewMsg,
    setNewArrFlameMsg,
    setNewArrUnionMsg,

    setNewLikeMsg,
    setNewUnlikeMsg,
    setArrLikeMsg,
    setArrUnlikeMsg,

    setNewLoveMsg,
    setNewUnloveMsg,
    setArrLoveMsg,
    setArrUnloveMsg,

    setNewFlareNot,
    setArrFlareNot,
    setNewAddFNUser,
    setArrAddFNUser,

    setNewUserNot,
    setArrUserNot,
    setNewAddUNUser,
    setArrAddUNUser,

    setNewMessageNot,
    setArrMessageNot,
    setNewAddMessage,
    setArrAddMessage,

    setNewMsgDoteNot,
    setArrMsgDoteNot,
   
    cdpAvatarOpen,
    cdpAvatarClose,
    cdpBackgroundOpen,
    cdpBackgroundClose,

    ctfdOpen,
    ctfdClose,
    touOpen,
    touClose,
    blOpen,
    blClose,
    susOpen,
    susClose,
    pAEOpen,
    pBEOpen,
    pAEClose,
    pBEClose,
    dFOpen,
    dFClose,
    eFOpen,
    eFClose,
    fFOpen,
    fFClose,
    rFOpen,
    rFClose,
    fBOOpen,
    fBOClose,
    tfcpOpen,
    tfcpClose,
    tfcaOpen,
    tfcaClose,
    tfarOpen,
    tfarClose,
    tfacOpen,
    tfacClose,
    fiiepOpen,
    fiiepClose,
    giiepOpen,
    giiepClose,
    uiiepOpen,
    uiiepClose,
    faiepOpen,
    faiepClose,
    gaiepOpen,
    gaiepClose,
    fsepOpen,
    fsepClose,
    usepOpen,
    usepClose,

    setKeyHov,
    setBsrDrkMode,
    setFontSize,
 
} = authSlice.actions;
export default authSlice.reducer;