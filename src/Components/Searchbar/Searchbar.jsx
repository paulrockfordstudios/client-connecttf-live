import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import "./Searchbar.css";
import { axiosInstance } from '../../Utils/axiosConfig';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import { searchIcon } from '../../Lib/mui/icons';


function Searchbar() {

    const { user, screenMode } = useSelector((state) => state.auth);

    const sbDomNode = useRef(null);
    const focusRef = useRef();

    const PS = process.env.PHOTO_STORAGE;

    const [ sbDD, setSbDD ] = useState(false);
    const [ searchWidth, setSearchWidth ] = useState(false);
    const [ searchHeight, setSearchHeight ] = useState(false);
    const [ searchbarWidth, setSearchbarWidth ] = useState();
    const [ query, setQuery ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ flames, setFlames ] = useState([]);
    const [ unions, setUnions ] = useState([]);
    const [ searchHover, setSearchHover ] = useState(false);
    const [ searchActive, setSearchActive ] = useState(false);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        let sbHandler = (event) => {
            if (!sbDomNode.current.contains(event.target)) {
                setQuery("")
                setSearchHeight(false);
                setSearchWidth(false);
            }
        };
        if (searchWidth) {
            document.body.addEventListener("click", sbHandler);
            return () => {
                document.body.removeEventListener("click", sbHandler);
            };
        }
    }, [searchWidth]);


    useEffect(() => {
        const controller = new AbortController();
        setSearchHeight(false)
        setLoading(true)
        setError(false);
        if (query.length > 0) {
            setSearchHeight(true);
            axiosInstance({
                method: "GET",
                url: "/users/search",
                params: {q: query},
                signal: controller.signal,
            }).then(res => {
                setFlames(res.data
                    .filter((f) => f._id !== user._id)
                    .filter((f) => !user.flameBlockers.includes(f._id))
                    .filter((f) => f.isAnonymous !== true)
                    .map((f) => ({
                        _id: f._id, 
                        userName: f.userName, 
                        profileName: f.profileName, 
                        profilePicture: f.profilePicture, 
                        energy: f.energy
                    }))
                    .slice(0,3)
                )
                setLoading(false);
            }).catch(e => {
                if(e === "AbortError") return;
                setError(true);
            })
            return () => {controller.abort()}
        }
      }, [query])

    useEffect(() => {
        const controller = new AbortController();
        setSearchHeight(false)
        setLoading(true)
        setError(false);
        if (query.length > 0) {
            setSearchHeight(true);
            axiosInstance({
                method: "GET",
                url: "/unions/search",
                params: {q: query},
                signal: controller.signal,
            }).then(res => {
                setUnions(res.data
                    .filter((u) => u._id !== user._id)
                    .filter((u) => !user.unionBlockers.includes(u._id))
                    .filter((u) => u.isAnonymous !== true)
                    .map((u) => ({
                        _id: u._id, 
                        unionName: u.unionName, 
                        profileName: u.profileName, 
                        unionProfilePicture: u.unionProfilePicture, 
                        spectrum: u.spectrum
                    }))
                    .slice(0,3)
                )
                setLoading(false);
            }).catch(e => {
                if(e === "AbortError") return;
                setError(true);
            })
            return () => {controller.abort()}
        }
    }, [query])


    function handleSearch(e) {
      setQuery(e.target.value)
    }

    function searchbarClose() {
      setQuery("");
        setSearchHeight(false);
      setSearchWidth(false);
    }

    function handleFocusRef() {
        focusRef.current.focus();
    }



    return (
        <div className={`searchbarContainer ${searchWidth ? "open" : "close"}`} ref={sbDomNode}>
            <div 
                className={`
                    searchbarDropDownBackgroundTheme 
                    HIGHER_BACKGROUND
                    ${user.spectrum} 
                    ${searchHeight ? "down" : "up"}
                `} 
            />
            <div 
                className={`
                    searchbarDropDown 
                    BOX_SHADOW 
                    ${searchHeight ? "down" : "up"} 
                    ${user.unionName ? user.spectrum : user.energy}
                `}
            >
                <div className="sbDDSearchNames">
                    <div className="sbDDSearchFlames">                                        
                        {loading ?
                            ( <></> ) : (
                                <>
                                    <div className="sbDDSearchFlamesTitle">
                                        <span>Flame Search Results</span>
                                        <hr 
                                            className={`
                                                sbDDSFHr
                                                BACKGROUND_BRIGHT
                                                flame 
                                                ${colorTheme}
                                            `}
                                        />
                                    </div>
                                    {flames.map((flame) => (
                                        <Link key={flame._id} className="sbDDSearchNameLink" to={`/flame-profile/userName/${flame.userName}`} onClick={searchbarClose}>    
                                            <div className={`sbDDSearchNameProfilePic-container ${flame.energy ? flame.energy : "gray"}`} >
                                                <img 
                                                    className="sbDDSearchNameProfilePic" 
                                                    src={flame.profilePicture ? PS + flame.profilePicture : fAvatar}
                                                    onError={e => {e.currentTarget.src = fAvatar}} 
                                                    alt="" 
                                                />
                                                <i 
                                                    className={`
                                                        sbDDSearchNameEnergy 
                                                        flame
                                                        PNG_ICON_ENERGY 
                                                        ${flame.energy}
                                                    `}
                                                    alt="profile-link-icon" 
                                                />
                                                <span className="sbDDSearchNameText" type="name">{flame.profileName}</span>
                                            </div>     
                                        </Link>
                                    ))}
                                    <Link className={`sbDDSearchFlameShowAllLink ${user?.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`}>
                                        {
                                            user.unionName && user.spectrum === "rainbow" ||
                                            user.unionName && user.spectrum === "silver" ||
                                            user.unionName && user.spectrum === "gold" ||
                                            user.unionName && user.spectrum === "platinum" ||
                                            user.unionName && user.spectrum === "diamond" 
                                                ? <i 
                                                    className={`
                                                        sbDDSearchFlameShowAllLinkBtnPNG
                                                        PNG_ICON_SEARCH
                                                        ${colorTheme}
                                                    `} 
                                                    alt="search-icon"
                                                />
                                                : <div className="searchIcon">{searchIcon}</div>
                                        }
                                        <span>Show All Flame Results</span>
                                    </Link>
                                    <div className="sbDDSearchFlamesTitle">
                                        <span>Union Search Results</span>
                                        <hr 
                                            className={`
                                                sbDDSFHr
                                                BACKGROUND_BRIGHT 
                                                union
                                                ${colorTheme}
                                            `}
                                        />
                                    </div>
                                    {unions.map((union) => (
                                        <Link key={union._id} className="sbDDSearchNameLink" to={`/union-profile/unionName/${union.unionName}`} onClick={searchbarClose}>    
                                            <div className={`sbDDSearchNameProfilePic-container ${union.spectrum ? union.spectrum : "gray"}`} >
                                                <img 
                                                    className="sbDDSearchNameProfilePic" 
                                                    src={union.unionProfilePicture ? PS + union.unionProfilePicture : uAvatar} 
                                                    onError={e => {e.currentTarget.src = uAvatar}}
                                                    alt="" 
                                                />
                                                <i 
                                                    className={`
                                                        sbDDSearchNameEnergy 
                                                        union
                                                        PNG_ICON_SPECTRUM 
                                                        ${union.spectrum}
                                                    `}
                                                    alt="profile-link-icon" 
                                                />
                                                <span className="sbDDSearchNameText" type="name">{union.profileName}</span>
                                            </div>     
                                        </Link>
                                    ))}
                                    <Link className={`sbDDSearchFlameShowAllLink union ${user?.unionName ? user.spectrum ? user.spectrum : "gray" : user.energy ? user.energy : "gray"}`}>
                                        {
                                            user.unionName && user.spectrum === "rainbow" ||
                                            user.unionName && user.spectrum === "silver" ||
                                            user.unionName && user.spectrum === "gold" ||
                                            user.unionName && user.spectrum === "platinum" ||
                                            user.unionName && user.spectrum === "diamond" 
                                                ? <i 
                                                    className={`
                                                        sbDDSearchFlameShowAllLinkBtnPNG
                                                        PNG_ICON_SEARCH
                                                        ${colorTheme}
                                                    `} 
                                                    alt="search-icon"
                                                />
                                                : <div className="searchIcon">{searchIcon}</div>
                                        }
                                        <span>Show All Union Results</span>
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
            {user.unionName ?
                (
                    <>
                        {searchWidth ?
                            (
                                <>
                                    
                                    <div 
                                        className={`
                                            searchbarHigherSpectrumBackground
                                            HIGHER_BACKGROUND 
                                            ${colorTheme}
                                        `} 
                                    />
                                    <div 
                                        className={`
                                            searchbarFadeBackground
                                            BACKGROUND_SCREEN
                                            FADE_SHADOW
                                            ${screenMode ? "dark" : "light"} 
                                            open
                                        `} 
                                    />
                                </>
                            ) : (
                                <>
                                    {user.spectrum === "rainbow" || 
                                     user.spectrum === "silver" || 
                                     user.spectrum === "gold" || 
                                     user.spectrum === "platinum" || 
                                     user.spectrum === "diamond" ?
                                        (
                                            <div 
                                                className={
                                                    `searchbarBackgroundTheme 
                                                    HIGHER_BACKGROUND
                                                    ${colorTheme} 
                                                    ${searchWidth ? "open" : "close"}`
                                                } 
                                            />
                                        ) : (null)
                                    }
                                </>
                            )
                        }
                        {user.spectrum === "diamond" ?
                            (
                                <>
                                    <div 
                                        className={`
                                            searchbar 
                                            ${!searchWidth && searchHover ? "HIGHER_BACKGROUND" : ""}
                                            ${searchWidth ? "INNER_BOX_SHADOW" : " BOX_SHADOW"}
                                            ${colorTheme} 
                                            ${searchWidth ? "open" : "close"}
                                            ${!searchWidth && searchHover ? searchActive ? "drk lgt" : "lgt" : ""}
                                        `}
                                        onMouseEnter={() => setSearchHover(true)} 
                                        onMouseLeave={() => setSearchHover(false)}
                                        onMouseDown={() => setSearchActive(true)} 
                                        onMouseUp={() => setSearchActive(false)}
                                        onClick={() => setSearchWidth(true)}
                                    >                          
                                        {searchWidth && query.length === 0 && 
                                            <label>
                                                <span style={{marginLeft: "17px", color: "#aeb4b7"}}>Search</span>
                                                <span style={{marginLeft: "5px", color: "#4a76fd", opacity: "0.6"}}>Connect</span>
                                                <span style={{color: "#e639af", opacity: "0.6"}}>TF</span>
                                            </label>
                                        }
                                        <input 
                                            ref={focusRef}
                                            className={`searchInput ${searchWidth ? "open" : "close"}`}
                                            type="text" 
                                            //placeholder="Search ConnectTF" 
                                            aria-label="search"
                                            onChange={handleSearch}
                                            value={query}      
                                        /> 
                                        {searchWidth ?
                                            (
                                                <button 
                                                    className={`searchbarBtn open ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onMouseEnter={() => setSearchHover(true)} 
                                                    onMouseLeave={() => setSearchHover(false)}
                                                    onMouseDown={() => setSearchActive(true)} 
                                                    onMouseUp={() => setSearchActive(false)}
                                                >
                                                    {   
                                                        user.spectrum === "rainbow" ||
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" ||
                                                        user.spectrum === "platinum" ||
                                                        user.spectrum === "diamond" 
                                                            ? <i 
                                                                className={`
                                                                    searchBtnPNG
                                                                    PNG_ICON_SEARCH_BTN
                                                                    ${colorTheme}
                                                                    ${searchActive ? "act" : searchHover ? "hov" : ""}
                                                                    open
                                                                `}  
                                                                alt="search-btn" 
                                                            />
                                                            : <div className="searchIcon">{searchIcon}</div>
                                                    }
                                                </button>
                                            ) : (
                                                <button 
                                                    className={`searchbarBtn close ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onClick={handleFocusRef}
                                                >    
                                                    {   
                                                        user.spectrum === "rainbow" || 
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" || 
                                                        user.spectrum === "platinum" || 
                                                        user.spectrum === "diamond"
                                                            ? <i 
                                                                className={`
                                                                    searchBtnPNG
                                                                    PNG_ICON_SEARCH${searchActive ? "_DRK" : ""}
                                                                    ${colorTheme} 
                                                                    close
                                                                `}  
                                                                alt="search-icon" 
                                                            />
                                                            : <div className="searchIcon">{searchIcon}</div>
                                                    }                                          
                                                </button>
                                            )
                                        }
                                    </div>
                                </>
                            ) : (
                                <>   
                                    <div 
                                        className={
                                            `searchbar 
                                            ${searchWidth ? "INNER_BOX_SHADOW open" : " BOX_SHADOW close"}
                                            flame 
                                            ${user.spectrum ? user.spectrum : "gray"}`
                                        }
                                        onMouseEnter={() => setSearchHover(true)} 
                                        onMouseLeave={() => setSearchHover(false)}
                                        onClick={() => setSearchWidth(true)}
                                    >                          
                                        {searchWidth && query.length === 0 && 
                                            <label>
                                                <span style={{marginLeft: "17px", color: "#aeb4b7"}}>Search</span>
                                                <span style={{marginLeft: "5px", color: "#4a76fd", opacity: "0.6"}}>Connect</span>
                                                <span style={{color: "#e639af", opacity: "0.6"}}>TF</span>
                                            </label>
                                        }
                                        <input 
                                            ref={focusRef}
                                            className={`searchInput ${searchWidth ? "open" : "close"}`}
                                            type="text" 
                                            //placeholder="Search ConnectTF" 
                                            aria-label="search"
                                            onChange={handleSearch}
                                            value={query}      
                                        /> 
                                        {searchWidth ?
                                            (
                                                <button 
                                                    className={`searchbarBtn open ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onMouseEnter={() => setSearchHover(true)} 
                                                    onMouseLeave={() => setSearchHover(false)}
                                                    onMouseDown={() => setSearchActive(true)} 
                                                    onMouseUp={() => setSearchActive(false)}
                                                >
                                                    {   
                                                        user.spectrum === "rainbow" ||
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" ||
                                                        user.spectrum === "platinum" ||
                                                        user.spectrum === "diamond" 
                                                            ? <i 
                                                                className={`
                                                                    searchBtnPNG
                                                                    PNG_ICON_SEARCH_BTN
                                                                    ${colorTheme}
                                                                    ${searchActive ? "act" : searchHover ? "hov" : ""}
                                                                    open
                                                                `}  
                                                                alt="search-btn" 
                                                            />
                                                            : <Search className="searchIcon" />
                                                    }
                                                </button>
                                            ) : (
                                                <button 
                                                    className={`searchbarBtn close ${user.spectrum}`} 
                                                    aria-label="submit search"
                                                    onClick={handleFocusRef}
                                                >    
                                                    {   
                                                        user.spectrum === "rainbow" || 
                                                        user.spectrum === "silver" ||
                                                        user.spectrum === "gold" || 
                                                        user.spectrum === "platinum" || 
                                                        user.spectrum === "diamond"
                                                            ? <i 
                                                                className={`
                                                                    searchBtnPNG
                                                                    PNG_ICON_SEARCH${searchActive ? "_DRK" : ""}
                                                                    ${colorTheme} 
                                                                    close
                                                                `}  
                                                                alt="search-icon" 
                                                            />
                                                            : <Search className="searchIcon" />
                                                    }                                          
                                                </button>
                                            )
                                        }
                                    </div>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div className="searchbarHSBackgroundWhite" />
                        <div 
                            className={
                                `searchbar 
                                ${searchWidth ? "INNER_BOX_SHADOW open" : " BOX_SHADOW close"}
                                flame 
                                ${user.energy ? user.energy : "gray"}`
                            }
                            onMouseEnter={() => setSearchHover(true)} 
                            onMouseLeave={() => setSearchHover(false)}
                            onClick={() => setSearchWidth(true)}
                        >                          
                            {searchWidth && query.length === 0 && 
                                <label>
                                    <span style={{marginLeft: "17px", color: "#aeb4b7"}}>Search</span>
                                    <span style={{marginLeft: "5px", color: "#4a76fd", opacity: "0.6"}}>Connect</span>
                                    <span style={{color: "#e639af", opacity: "0.6"}}>TF</span>
                                </label>
                            }
                            <input 
                                ref={focusRef}
                                className={`searchInput ${searchWidth ? "open" : "close"}`}
                                type="text" 
                                //placeholder="Search ConnectTF" 
                                aria-label="search"
                                onChange={handleSearch}
                                value={query} 
                                //ref={searchInput}     
                            />
                            <button 
                                className={
                                    `searchbarBtn 
                                    ${searchWidth ? "open" : "close"} 
                                    ${user.energy ? user.energy : "gray"}`
                                } 
                                aria-label="submit search"
                                onClick={handleFocusRef}
                            >
                                <div className="searchIcon">{searchIcon}</div>
                            </button>
                        </div>
                    </>
                )                                  
            }                                                              
        </div>
    )
}

export default Searchbar;