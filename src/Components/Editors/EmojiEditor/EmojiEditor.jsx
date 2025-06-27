import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EmojiPicker, { Emoji, EmojiStyle } from 'emoji-picker-react';
import "./EmojiEditor.css";

function EmojiEditor({ editorId, color, setEmojiBox, setEmoji}) {

    const { user } = useSelector((state) => state.auth);

    const [ nBtnAct, setNBtnAct ] = useState("");
    const [ colorTheme, setColorTheme ] = useState("");

    const emojiPicker = document.getElementById(editorId);
    const emojiEditorArr = emojiPicker?.getElementsByClassName(`EmojiPickerReact`);
    const emojiNavs = emojiPicker?.getElementsByClassName(`epr-category-nav`)
    const emojiImgs = emojiPicker?.getElementsByClassName(`epr-emoji-img`)
    const emojiNavDivs =  emojiPicker?.getElementsByClassName(`eprCatBtn`)
    const emojiBtns = emojiPicker?.getElementsByClassName(`epr-cat-btn`)

    useEffect(() => {
        setColorTheme(color);
    }, [color]);

    // Adds colorTheme background to initial emoji selection.
    useEffect(() => {
        let emojiImg = undefined;
        if (emojiImgs && colorTheme) {
            for (var i = 0; i < emojiImgs?.length; i++) {
                emojiImg = emojiImgs.item(i);
                emojiImg.classList.add(`${colorTheme}`);
            }
        }
    }, [emojiImgs, colorTheme]);

    // Function to add colorTheme background to additional emoji selections.
    const addEmojiClassHandler = () => {
        let emojiImg = undefined
        for (var i = 0; i < emojiImgs?.length; i++) {
            emojiImg = emojiImgs.item(i);
            emojiImg.classList.add(`${colorTheme}`);
        }
    }

    // Sets initial selected catagory
    useEffect(() => {
        setNBtnAct("suggested")
    }, [emojiNavDivs]);

    // When catagory is selected, sets catagory active.
    useEffect(() => {
        let emojiNavDiv = undefined;
        for (var i = 0; i < emojiNavDivs?.length; i++) {
            emojiNavDiv = emojiNavDivs.item(i);
            if (emojiNavDiv.classList.contains(nBtnAct)) {
                emojiNavDiv.classList.add("active")
            } else {
                emojiNavDiv.classList.remove("active")
            }
        }
    }, [nBtnAct]);

    // Adds close button to emoji editor
    useEffect(() => {
        let emojiCHeader = undefined;
        const emojiCHeaders = emojiPicker?.getElementsByClassName(`epr-header-overlay`);
        if (emojiPicker && colorTheme) {
            for (var j = 0; j < emojiCHeaders?.length; j++) {
                emojiCHeader = emojiCHeaders.item(j);
                const sbDiv1 = document.createElement("div");
                const sbDiv2 = document.createElement("div");
                const sbImg = document.createElement("i");
                sbDiv1.classList.add("emojiCancelBtn");
                sbImg.classList.add("emojiCancelPNGIcon");
                sbImg.classList.add("PNG_ICON_CANCEL");
                sbImg.classList.add(`${colorTheme}`);
                sbDiv2.classList.add("emojiCancelShade");
                sbImg.addEventListener("click", () => setEmojiBox(false));
                sbImg.appendChild(sbDiv2);
                sbDiv1.appendChild(sbImg);
                emojiCHeader.appendChild(sbDiv1);
            }
        }
    }, [emojiPicker, colorTheme]);

    // Adds colorTheme to search input.
    useEffect(() => {
        const emojiSearches = emojiPicker?.getElementsByClassName(`epr-search`);
        const emojiCHeaders = emojiPicker?.getElementsByClassName(`epr-header-overlay`);
        let emojiSearch = undefined;
        let emojiCHeader = undefined;
        if (emojiPicker && colorTheme) { 
            for (var i = 0; i < emojiSearches?.length; i++) {
                emojiSearch = emojiSearches.item(i);
                if (colorTheme === "rainbow" ||
                    colorTheme === "silver" ||
                    colorTheme === "gold" ||
                    colorTheme === "platinum" ||
                /**/colorTheme === "diamond") { 
                    for (var j = 0; j < emojiCHeaders?.length; j++) {
                        emojiCHeader = emojiCHeaders.item(j);
                        const sbDiv1 = document.createElement("div");
                        const sbDiv2 = document.createElement("div"); 
                        sbDiv1.classList.add("emojiSearchBackgroundTheme");
                        sbDiv1.classList.add(editorId.substring(0,2) === "cb" ? "cb" : "_")
                        sbDiv1.classList.add(`${colorTheme}`);
                        sbDiv2.classList.add("emojiSearchWhiteBackground");
                        emojiSearch.classList.add(`${colorTheme}`);
                        sbDiv1.appendChild(sbDiv2);  
                        emojiCHeader.appendChild(sbDiv1);   
                    }
                } else {
                    emojiSearch.classList.add("INNER_BOX_SHADOW");
                    emojiSearch.classList.add(`${colorTheme}`);
                }   
            }    
        }
    }, [emojiPicker, colorTheme]);

    // Handles the category button for "suggested" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-suggested")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("suggested");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("suggested"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns && colorTheme]);

    // Handles the category button for "smileys_people" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-smileys_people")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("smileys_people");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("smileys_people"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "animals_nature" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-animals_nature")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("animals_nature");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("animals_nature"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "food_drink" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-food_drink")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("food_drink");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("food_drink"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "travel_places" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-travel_places")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("travel_places");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("travel_places"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "activities" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-activities")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("activities");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("activities"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "objects" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-objects")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("objects");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("objects"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "symbols" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-symbols")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("symbols");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("symbols"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Handles the category button for "flags" category.
    useEffect(() => {
        let emojiNav = undefined
        let emojiBtn = undefined
        if (emojiBtns && colorTheme) {
            for (var i = 0; i < emojiNavs?.length; i++) {
                emojiNav = emojiNavs.item(i);
                for (var b = 0; b < emojiBtns?.length; b++) {
                    emojiBtn = emojiBtns.item(b);
                    if (emojiBtn.classList.contains("epr-icn-flags")) {
                        const ebDiv = document.createElement("div");
                        ebDiv.classList.add("eprCatBtn");
                        ebDiv.classList.add("flags");
                        ebDiv.classList.add(`${colorTheme}`);
                        ebDiv.addEventListener("click", addEmojiClassHandler);
                        ebDiv.addEventListener("click", () => setNBtnAct("flags"));
                        ebDiv.appendChild(emojiBtn);
                        emojiNav.appendChild(ebDiv);
                    }
                }
            }
        }
    }, [emojiBtns, colorTheme]);

    // Removes extra category buttons generated.
    useEffect(() => {
        const emojiPNavs = emojiPicker?.getElementsByClassName(`epr-category-nav`)
        const emojiPNavDivs = emojiPicker?.getElementsByClassName(`eprCatBtn`)
        let emojiNav = undefined
        let emojiDiv = undefined
        if (emojiPicker && colorTheme) { 
            for (var i = 0; i < emojiPNavs?.length; i++) {
                emojiNav = emojiPNavs.item(i);
                for (var b = 0; b < emojiPNavDivs?.length; b++) {
                    emojiDiv = emojiPNavDivs.item(b);
                    if (emojiDiv.innerHTML.length === 0) {
                        emojiNav.removeChild(emojiDiv)
                    }
                }
            }    
        }
    }, [emojiBtns, colorTheme])
    
    // Sets Emoji Editor with an id.
    useEffect(() => {
        let eEditor = null;
        for (var i = 0; i < emojiEditorArr?.length; i++) {
            eEditor = emojiEditorArr.item(i)
            eEditor.setAttribute("id", "postEmojiEditor")
        }
    }, [emojiEditorArr])

    // Function adds emoji into editor input
    const addEmoji = (e) => {
        setEmojiBox(false);
        setEmoji(e.emoji);
    }

    return (
        <EmojiPicker onEmojiClick={(e) => addEmoji(e)}/>
    )
}

export default EmojiEditor;