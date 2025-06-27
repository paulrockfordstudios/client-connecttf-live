import React, { useEffect, useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, switch2UnionAcc, switch2FlameAcc } from "../../../../Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import "./AccMenuDropdown.css";
import uAvatar from "../../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../../Assets/picBlanks/no-avatar.jpg";
import { arrowForwardIosIcon, brightness4Icon, helpIcon, settingsIcon } from '../../../../Lib/mui/icons';


function AccMenuDropdown() {

    const { user, flame, union, actAcc } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const ref = useRef();
    const accMDomNode = useRef(null);
    const accMDDRef = useRef(null);

    const [ height, setHeight ] = useState();
    const [ accMDD, setAccMDD ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        if (actAcc === "union") {
            const getHeight = () => {
                const displayHeight = ref.current.clientHeight;
                setHeight(displayHeight);
            }
        getHeight();
        }
    }, [actAcc]);

    useEffect(() => {
        let accMDDHandler = (event) => {
            //if (event.path[0] !== accMDDRef || !accMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setAccMDD(false);
          }
        };
        if (accMDD) {
            document.body.addEventListener("click", accMDDHandler);
            return () => {
                document.body.removeEventListener("click", accMDDHandler);
            };
        }
      }, [accMDD]);


    const handleSignOut = () => {
        window.location.reload();
        dispatch(reset());
        dispatch(logout()); 
        //navigate("/login");
    };

    const switchAccHandler = () => {
        window.location.reload();
        user.unionName
            ? dispatch(switch2FlameAcc())
            : dispatch(switch2UnionAcc())
        setAccMDD(false);
    };



    return (
        <>
            {user.unionName ?
                (
                    <div className="accMenuDDContainer">    
                        <img 
                            className={`topbarProfilePic union ${flame.energy}`} 
                            src={user.unionProfilePicture ? PS + user.unionProfilePicture : uAvatar} 
                            onError={e => {e.currentTarget.src = uAvatar}} 
                            alt="union-avatar"
                            onClick={() => setAccMDD(!accMDD)}
                        />            
                        <div className={`tbAMDropDown union ${accMDD ? "open" : ""}`} ref={accMDomNode}>
                            <div className="tbProfilePicDropdown union">
                                <div className="tbProfilePicDropdownContainer" style={{height: `${height}px`}}>
                                    <div 
                                        className={`
                                            tbProfilePicDropdownBackgroundTheme 
                                            HIGHER_BACKGROUND
                                            ${user.spectrum}
                                        `} 
                                        style={{height: `${height}px`}} 
                                    />
                                    <div className={`tbProfilePicDropdown-container union BOX_SHADOW ${user.spectrum} ${accMDD ? "open" : ""}`} ref={ref}>
                                        <div className="dropdownUser">
                                            <img 
                                                className="dropdownProfilePic" 
                                                src={ user.unionProfilePicture 
                                                    ? PS + user.unionProfilePicture 
                                                    : uAvatar 
                                                } 
                                                onError={e => {
                                                    e.currentTarget.src = uAvatar 
                                                }} 
                                                alt="union-avatar"
                                            />
                                            <span className={`dropdownUserName ${user.spectrum}`}>
                                                {union.spectrum === "diamond"
                                                    ? <span className="tbddDiamondText">{user.unionName}</span>
                                                    : user.unionName
                                                }
                                            </span>    
                                        </div>
                                        {user.spectrum === "diamond" ? 
                                            (
                                                <>
                                                    <Link className="viewProfileLink" to={`/union-profile/unionName/${user.unionName}`}>
                                                        <button 
                                                            className={`
                                                                viewProfileBtn
                                                                HIGHER_BACKGROUND
                                                                ${colorTheme}
                                                            `} 
                                                        >    
                                                            <span className="tbddDiamondText">View Profile</span>            
                                                        </button>
                                                    </Link>
                                                </>
                                            ) : (
                                                <> 
                                                    <Link className="viewProfileLink" to={`/union-profile/unionName/${user.unionName}`}> 
                                                        <button className={`viewProfileBtn ${colorTheme}`}>   
                                                            View Profile 
                                                        </button>
                                                    </Link>
                                                </>
                                            )
                                        }
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <div 
                                                        className={`
                                                            tbProfileDropdownHrDiamond
                                                            HIGHER_BACKGROUND
                                                            ${colorTheme}
                                                        `} 
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        <ul className="tbProfilePicDropdownMenuItems">
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" onClick={switchAccHandler}>
                                                    <span>
                                                        Switch to 
                                                        <b className={`tbMenuAcc flame ${flame.energy}`}>
                                                            {flame.energy === "masculine" ? " DM " : " DF "}
                                                        </b>
                                                        Account
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <div 
                                                        className={`
                                                            tbProfileDropdownHrDiamond
                                                            HIGHER_BACKGROUND
                                                            ${colorTheme}
                                                        `} 
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        <ul className="tbProfilePicDropdownMenuItems">
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem">
                                                    <div className="tbProfilePicMenuIcon">{settingsIcon}</div>
                                                    Settings & Privacy
                                                </div>
                                                <div className="tbProfilePicMenuIcon">{arrowForwardIosIcon}</div>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <div className="tbProfilePicMenuIcon">{helpIcon}</div>
                                                    Help & Support
                                                </div>
                                                <div className="tbProfilePicMenuIcon">{arrowForwardIosIcon}</div>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <div className="tbProfilePicMenuIcon">{brightness4Icon}</div>
                                                    Display & Accessibility
                                                </div>
                                                <div className="tbProfilePicMenuIcon">{arrowForwardIosIcon}</div>
                                            </li>
                                        </ul>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <div 
                                                        className={`
                                                            tbProfileDropdownHrDiamond
                                                            HIGHER_BACKGROUND
                                                            ${colorTheme}
                                                        `} 
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        <ul className="tbProfilePicDropdownMenuItems" >
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <span>About <b className="tbMenuConnect">Connect</b><b className="tbMenuTF">TF</b></span>
                                                </div>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    <span><b className="tbMenuConnect">C</b><b className="tbMenuTF">TF</b>wiki</span>
                                                </div>
                                            </li>
                                            <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                                <div className="tbPPMenuItem" >
                                                    Terms of Use
                                                </div>
                                            </li>
                                        </ul>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <div 
                                                        className={`
                                                            tbProfileDropdownHrDiamond
                                                            HIGHER_BACKGROUND
                                                            ${colorTheme}
                                                        `} 
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`tbProfileDropdownHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                        {user.spectrum === "diamond" ? 
                                            (
                                                <>
                                                    <button 
                                                        className={`
                                                            signOutBtn
                                                            HIGHER_BACKGROUND
                                                            ${colorTheme}
                                                        `} 
                                                        onClick={handleSignOut}
                                                    >
                                                        <span className="tbddDiamondText">Sign Out</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <>  
                                                    <button className={`signOutBtn ${user.spectrum}`} onClick={handleSignOut}>Sign Out</button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="accMenuDDContainer">
                        {union &&
                            <div 
                                className={`
                                    accMenuProfilePicRing
                                    HIGHER_BACKGROUND 
                                    ${union?.spectrum ? union?.spectrum : "gray"}
                                `} 
                            />
                        }   
                        <img 
                            className={`topbarProfilePic flame ${union ? "secondary" : "primary"} ${union?.spectrum ? union?.spectrum : "gray"}`}
                            src={user.profilePicture ? PS + user.profilePicture : fAvatar} 
                            onError={e => {e.currentTarget.src = fAvatar}} 
                            alt="flame-avatar"
                            ref={accMDDRef}
                            onClick={() => setAccMDD(!accMDD)}
                        /> 
                        <div className={`tbAMDropDown flame ${accMDD ? "open" : ""}`} ref={accMDomNode}>
                            <div className="tbProfilePicDropdown flame">
                                <div className={`tbProfilePicDropdown-container flame BOX_SHADOW ${user.energy} ${accMDD ? "open" : ""}`} ref={ref}>
                                    <div className="dropdownUser">
                                        <img 
                                            className="dropdownProfilePic" 
                                            src={ user.profilePicture 
                                                ? PS + user.profilePicture 
                                                : fAvatar 
                                            }
                                            onError={e => {
                                                e.currentTarget.src = fAvatar 
                                            }} 
                                            alt="flame-avatar"
                                        />
                                        <span className={`dropdownUserName ${user.energy}`}>{user.userName}</span>
                                    </div>
                                    <Link className="viewProfileLink" to={`/flame-profile/userName/${user.userName}`}>  
                                        <button className={`viewProfileBtn ${user.energy}`}>
                                            View Profile
                                        </button>  
                                    </Link>                
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    {user.unionAccount &&
                                        <>
                                            <ul className="tbProfilePicDropdownMenuItems">
                                                <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                                    <div className="tbPPMenuItem" onClick={switchAccHandler}>
                                                        <span>Switch to <b className={`tbMenuAcc flame ${union?.spectrum}`}>Union</b> Account</span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <hr className={`tbProfileDropdownHr ${user.energy}`} />
                                        </>
                                    }
                                    <ul className="tbProfilePicDropdownMenuItems">
                                        <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                            <div className="tbPPMenuItem">
                                                <div className="tbProfilePicMenuIcon">{settingsIcon}</div>
                                                    Settings & Privacy
                                                </div>
                                            <div className="tbProfilePicMenuIcon">{arrowForwardIosIcon}</div>
                                        </li>
                                        <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                            <div className="tbPPMenuItem" >
                                                <div className="tbProfilePicMenuIcon">{helpIcon}</div>
                                                Help & Support
                                                </div>
                                            <div className="tbProfilePicMenuIcon">{arrowForwardIosIcon}</div>
                                        </li>
                                        <li className={`tbProfilePicMenuItem ${user.energy}`}>
                                            <div className="tbPPMenuItem" >
                                                <div className="tbProfilePicMenuIcon">{brightness4Icon}</div>
                                                    Display & Accessibility
                                                </div>
                                            <div className="tbProfilePicMenuIcon">{arrowForwardIosIcon}</div>
                                        </li>
                                    </ul>
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    <ul className="tbProfilePicDropdownMenuItems" >
                                        <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                            <Link className="tbPPMenuItem" to="/aboutctf" target="_blank">
                                                <span>About <b className="tbMenuConnect">Connect</b><b className="tbMenuTF">TF</b></span>
                                            </Link>
                                        </li>
                                        <li className={`tbProfilePicMenuItem ${user.spectrum}`}>
                                            <Link className="tbPPMenuItem" to="ctfwiki" target="_blank">
                                                <span><b className="tbMenuConnect">C</b><b className="tbMenuTF">TF</b>wiki</span>
                                            </Link>
                                        </li>
                                    </ul>
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    <ul className="tbProfilePicDropdownMenuItems" >
                                        <li className={`tbProfilePicMenuItem finePrint ${user.spectrum}`}>
                                            <Link className="tbPPMenuItem" to="/advertising" target="_blank">
                                                Advertising
                                            </Link>
                                        </li>
                                        <li className={`tbProfilePicMenuItem finePrint ${user.spectrum}`}>
                                            <Link className="tbPPMenuItem" to="/privacy_policy" target="_blank">
                                                Privacy Policy
                                            </Link>
                                        </li>
                                        <li className={`tbProfilePicMenuItem finePrint ${user.spectrum}`}>
                                            <Link className="tbPPMenuItem" to="/terms_of_use" target="_blank">
                                                Terms of Use
                                            </Link>
                                        </li>
                                    </ul>
                                    <hr className={`tbProfileDropdownHr ${user.energy}`}/>
                                    <button className={`signOutBtn ${user.energy}`} onClick={handleSignOut}>
                                        Sign Out
                                    </button> 
                                </div>    
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
};

export default AccMenuDropdown;