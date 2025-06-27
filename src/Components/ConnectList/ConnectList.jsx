import React, { useEffect, useState, useContext} from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch } from "react-router-dom";
import { useParams } from "react-router";
import { axiosReq } from '../../Utils/axiosConfig';
import "./ConnectList.css";
import { energyIcon, spectrumIcon } from "../../Utils/icons/icons";
import ConnectListFollowBtns from '../FollowButtons/ConnectListFollowBtns/ConnectlistFollowBtns';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";


function ConnectList() {

    const { userName } = useParams();
    const { follow } = useParams();
    //const { url } = useMatch();
    //const { path } = useMatch();


    
    const { user: currentUser, flame: currentFlame, union: currentUnion,  } = useSelector((state) => state.auth);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [ unions, setUnions ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ hover, setHover ] = useState(false);
    const [ user, setUser ] = useState({});

    const PS = process.env.PHOTO_STORAGE;
    
        
    
    // Get all unions
    useEffect(() => {
        const fetchUnions = async () => {
            const res = await axiosReq("GET", "/unions/all");
            setUnions(res.data);
        }
        fetchUnions();
    }, []);
    

   
    // Get all users
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axiosReq("GET", "/users/all");
            setUsers(res.data);
        }
        fetchUsers();
    }, [userName]);


    const otherUnions = unions.filter((union) => union._id !== currentUnion?._id);
    const unblockedUnions = otherUnions.filter((union) => !currentUser.unionBlockers.includes(union._id));
    const connectUnions = unblockedUnions.filter((union) => !currentUser.unionFollowing.includes(union._id));
    const otherUsers = users.filter((user) => user._id !== currentFlame?._id);
    const unblockedUsers = otherUsers.filter((user) => !currentUser.flameBlockers.includes(user._id));
    const connectUsers = unblockedUsers.filter((user) => !currentUser.flameFollowing.includes(user._id));

    const sortedUnions = connectUnions.sort((a, b) => a.profileName > b.profileName ? 1:-1).map((union) => {

        const diamondHover = {
            backgroundImage: "url(/misc/diamond-sparkle-light.jpg)",
            
        }
            
        return (
            <> 
                {union.spectrum === "diamond" ?
                    (
                        <>
                            <li key={union._id}>  
                                <div 
                                    className={`
                                        connectUnionDiamondHover
                                        ${hover? "HIGHER_BACKGROUND" : ""}
                                        diamond
                                        lgt
                                    `} 
                                >
                                    <div  className="connectUnion" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>   
                                        <Link className="connectUnionLink" to={"/union-profile/unionName/" + union.unionName}  refresh="true">    
                                            <div className="connectUnionProfilePic-container">
                                                <img 
                                                    className="connectUnionProfilePic" 
                                                    src={union.unionProfilePicture 
                                                        ? PS + union.unionProfilePicture
                                                        : uAvatar
                                                    } 
                                                    onError={(e) => {
                                                        e.currentTarget.src = uAvatar
                                                    }}
                                                    //alt="union-avatar" 
                                                />
                                                <i 
                                                    className={`
                                                        connectProfileLinkIcon 
                                                        union 
                                                        PNG_ICON_SPECTRUM 
                                                        ${union.spectrum}
                                                    `}
                                                    //alt="enegy-icon" 
                                                />
                                                <span className="connectUnionName" type="name">{union.profileName}</span>
                                            </div>     
                                        </Link>
                                        <ConnectListFollowBtns className="clFollowBtns" union={union}/>
                                    </div>
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={`connectUnion ${union.spectrum}`} key={union._id}>        
                                <Link className="connectUnionLink" to={"/union-profile/unionName/" + union.unionName}  refresh="true">    
                                    <div className="connectUnionProfilePic-container">
                                        <img 
                                            className="connectUnionProfilePic" 
                                            src={union.unionProfilePicture 
                                                ? PS + union.unionProfilePicture
                                                : uAvatar
                                            } 
                                            onError={(e) => {
                                                e.currentTarget.src = uAvatar
                                            }}
                                            //alt="union-avatar" 
                                        />
                                        <i 
                                            className={`
                                                connectProfileLinkIcon 
                                                union 
                                                PNG_ICON_SPECTRUM 
                                                ${union.spectrum}
                                            `}
                                            //alt="enegy-icon" 
                                        />
                                        <span className="connectUnionName" type="name">{union.profileName}</span>
                                    </div>     
                                </Link>
                                <ConnectListFollowBtns className="clFollowBtns" union={union}/>
                            </li>
                        </>
                    )
                }
            </> 
        )
    });

    const sortedFlames = connectUsers.sort((a, b) => a.profileName > b.profileName ? 1:-1).map((flame) => {
        return (
            <>
                <li className={`connectFlame ${flame.isAnonymous ? "gray" : flame.energy}`} key={flame._id}>
                    <Link className="connectFlameLink" to={flame.isAnonymous ? `/flame-profile/id/${flame._id}` : `/flame-profile/userName/${flame.userName}`}>    
                        <div className="connectFlameProfilePic-container">
                            <img 
                                className="connectUnionProfilePic" 
                                src={flame.profilePicture 
                                        ? PS + flame.profilePicture
                                        : fAvatar
                                } 
                                onError={(e) => {
                                    e.currentTarget.src = fAvatar
                                }}
                                //alt="flame-avatar" 
                            />
                            <i 
                                className={`
                                    connectProfileLinkIcon 
                                    flame 
                                    PNG_ICON_ENERGY 
                                    ${flame.energy}
                                `}
                                //alt="enegy-icon" 
                            />
                            <span className="connectFlameName" type="name">{flame.isAnonymous ? "Anonymous User" : flame.profileName}</span>
                        </div>     
                    </Link>
                    <ConnectListFollowBtns className="clFollowBtns" flame={flame}/>
                </li>
            </> 
        )
    });

        
    return (
        <div className="connectList">
            <div className={`connectList-container ${currentUser.energy}`}>
                <ul className="connects">

                    {sortedUnions}
                    {sortedFlames}
                </ul>
            </div>
        </div>
    )
};

export default ConnectList;