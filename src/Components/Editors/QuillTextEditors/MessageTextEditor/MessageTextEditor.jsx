import React, { useEffect, useState } from 'react';
import "quill";
import { useQuill } from 'react-quilljs';
import { useSelector } from 'react-redux';
import { formats } from "../../../../Utils/TextEditorToolbar";
import './MessageTextEditor.css';
import { axiosReq } from '../../../../Utils/axiosConfig';
import MentionsPopup from '../../../Popups/MentionsPopup/MentionsPopup';
import { setNewMsg } from "../../../../Redux/AuthSlice";


const MessageTextEditor = ({ 
    editorId, 
    value, 
    setValue, 
    toolbar=false, 
    focusRef, 
    readOnly=false, 
    ph, 
    emoji, 
    setEmoji,
    mentionBox,
    setMentionBox,
    mentionSuggestions,
    setMentionSuggestions, 
    mentionPic, 
    setMentionPic, 
    disabled,
}) => {

    const { user, mentions } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [tmpValue, setTmpValue] = useState(value ? value : "")
    const [subTmpValue, setSubTmpValue] = useState("")
    const [mentionArr, setMentionArr] = useState(mentions);
    //const [ mentionBox, setMentionBox ] = useState(false);
    //const [ mentionSuggestions, setMentionSuggestions ] = useState([]) 
    const [ query, setQuery ] = useState("");
    const [ queryLength, setQueryLength ] = useState(0)
    const [ classSet, setClassSet ] = useState(false);
    const [ carPos, setCarPos ] = useState(null);
    const [ keyCnt, setKeyCnt ] = useState(0);
    const [ quillPos, setQuillPos ] = useState(null);
    const [ linkElem2, setLinkElem2 ] = useState(null);
    const [ mention, setMention ] = useState({})
    const [ linkCheck, setLinkCheck ] = useState(false);
    const [ mArr, setMArr ] = useState([]);

   const editorDiv = document.getElementById(editorId);
   const linkElems = editorDiv?.getElementsByTagName('a');

   

   const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        [{ align: [] }],

        [{ list: 'ordered'}, { list: 'bullet' }],
        [{ indent: '-1'}, { indent: '+1' }],

        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['link', 'image', 'video', "emoji"],
        [
            { color: [ 
                "#4a76fd", "#d8e1fe", "#c3cbe5", "#3453b2", 
                "#e639af", "#fde1ef", "#e4cbd8", "#a1287b", 
                "#850014", "#d4a6ad", "#be959b", "#5d000e",
                "#ff8303", "#ffdab3", "#e6c5a1", "#b35c02",
                "#ffe700", "#fff9bf", "#e6e1ac", "#b3a200",
                "#50c878", "#caeed6", "#b6d7c1", "#388c54",
                "#098de9", "#cee8fb", "#bad1e2", "#0663a4",
                "#30307e", "#babad4", "#a8a8bf", "#222258",
                "#8a2be2", "#dcbff6", "#c6acde", "#611e9f",
                "#aeb4b7", "#e4e6e7", "#cecfd0", "#7a7e80",
                "#00000",  "#fff",
            ] }, 
            { background: [
                "#4a76fd", "#d8e1fe", "#c3cbe5", "#3453b2", 
                "#e639af", "#fde1ef", "#e4cbd8", "#a1287b", 
                "#850014", "#d4a6ad", "#be959b", "#5d000e",
                "#ff8303", "#ffdab3", "#e6c5a1", "#b35c02",
                "#ffe700", "#fff9bf", "#e6e1ac", "#b3a200",
                "#50c878", "#caeed6", "#b6d7c1", "#388c54",
                "#098de9", "#cee8fb", "#bad1e2", "#0663a4",
                "#30307e", "#babad4", "#a8a8bf", "#222258",
                "#8a2be2", "#dcbff6", "#c6acde", "#611e9f",
                "#aeb4b7", "#e4e6e7", "#cecfd0", "#7a7e80",
                "#fff", "transparent",
            ] }
        ],
        ['clean'],    
    ];

    const modules = { 
        toolbar: toolbar ? {
            container: toolbarOptions,
        } : null,
    };

   const { quill, quillRef } = useQuill({readOnly, formats, modules});
 
    useEffect(() => {
        if(tmpValue) {
            setValue(tmpValue);
        }
    }, [tmpValue]);

    useEffect(() => {
            setQueryLength(query.length + 1);
    }, [query]);
    
    useEffect(() => {
        var range = quill?.getSelection(true);
        setQuillPos(range?.index)
    }, [quill])

    useEffect(() => {
        setKeyCnt(0)
    }, [carPos])

    useEffect(() => {
        if (keyCnt === -1) {
            setMentionBox(false);
            setCarPos(null);
        }
    }, [keyCnt]);

    const handleCarPos = event => {
        if(event.key !== '@') return;
        var range = quill?.getSelection(true);
        setCarPos(range?.index);
        setQuery("");
    };

    const handleKeyCnt = event => {
        if (!mentionBox) return;
        event.key === "Backspace"
            ? setKeyCnt(keyCnt - 1)
            : setKeyCnt(keyCnt + 1)
    };

    useEffect(() => {
        editorDiv?.addEventListener('keydown', handleCarPos);
        return () => {
            editorDiv?.removeEventListener('keydown', handleCarPos);
        };
    });

    useEffect(() => {
        editorDiv?.addEventListener('keydown', handleKeyCnt);
        return () => {
            editorDiv?.removeEventListener('keydown', handleKeyCnt);
        };
    });

    
    useEffect(() => {
        if (carPos !== null) {
            setQuery(subTmpValue.substring(carPos + 1, carPos + keyCnt + 1)) 
            setMentionBox(true)
       }
    }, [subTmpValue]);
    

    useEffect(() => {
        if (query.length > 0) {
            const fnMentions = mentions.filter((m) => m.profileName[0].toLowerCase() === query[0].toLowerCase());
            setMentionSuggestions(fnMentions.filter((m) => m.profileName.toLowerCase().includes(query.toLowerCase())));
        } else {
            setMentionSuggestions([]);
        }
    }, [query]);


    useEffect(() => {
        setMentionArr(mentions.filter((obj) => !tmpValue.includes(obj.id)));
    }, [tmpValue])
   


    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async function() {
            const file = input.files[0];
            const data = new FormData();
            const fileName = Date.now() + file.name;            
            data.append("name", fileName);
            data.append("file", file);
            const res = await axiosReq("POST", "/upload", data);
            const range = quill.getSelection();
            const link = `${PF + res.data.name}`;
            quill.insertEmbed(range.index, 'image', `${PF + fileName}`); 
        }
    };
    
    useEffect(() => {
        if(quill && value) {
            quill.clipboard.dangerouslyPasteHTML(value);
        }
    }, [quill]);

    function addLink(quill, index, text, url) {
        quill.insertText(index, text, 'user');
        quill.setSelection(index, text.length);
        quill.theme.tooltip.edit('link', url);
        quill.theme.tooltip.save();
      }

    useEffect(() => {
        if(quill && emoji) {
            var caretPosition = quill.getSelection(true);
            quill.insertText(caretPosition, emoji)
            setEmoji("");
        }
    }, [quill, emoji]);


    
    useEffect(() => {
        if(mentionPic) {
            setCarPos(null);
            setMention(mentionPic);
            setMArr([...mArr, mentionPic])
            const mText = `@${mentionPic.profileName}`;
            const mlink = mentionPic.link
            var range = quill?.getSelection(true);
            const caretPosition = range.index - (keyCnt + 1);
            quill?.deleteText(caretPosition, queryLength)
            quill?.insertText(caretPosition, mText, {'link': mlink})
            setLinkCheck(true)
            setKeyCnt(0);
            setMentionBox(false);  
        }
    }, [mentionPic]);

    useEffect(() => {
        if (linkCheck) {
            let linkElem = null;
            for (let i = 0; i < linkElems?.length; i++) {
                linkElem = linkElems.item(i);
                setLinkElem2(linkElem);
                if (linkElem.innerText[0] !== "@") {
                    linkElem.parentNode.removeChild(linkElem); 
                }   
            }
            setClassSet(true);
        }  
    }, [linkCheck])
       
    useEffect(() => {
        if (classSet) {
            let linkElem = null;
            let mElem = null;
            for (let i = 0; i < linkElems?.length; i++) {
                linkElem = linkElems.item(i);
                for (let m = 0; m < mArr?.length; m++) {
                    mElem = mArr[m];
                    setLinkElem2(linkElem);
                    if (mElem.link === linkElem?.getAttribute('href') && 
                     linkElem.innerText === `@${mElem.profileName}`) {
                        linkElem.classList.remove(...linkElem.classList)
                        linkElem.classList.add('mentionLink');                    
                        linkElem.classList.add(`${mElem.color}`); 
                    }
                }
            }
            setMentionPic(null);
            setQuery("");
            setMentionBox(false);
            setLinkCheck(false)
            setClassSet(false);
        }
    }, [classSet, mArr]);


    useEffect(() => {
        if (quill && toolbar) {
            quill.getModule('toolbar').addHandler('image', () => {imageHandler()});   
        }
    }, [quill]);

    useEffect(() => {
        if (quill) {  
            quill.on('text-change', () => {
                setTmpValue(quill.root.innerHTML);
                setSubTmpValue(quill.root.innerText)
            });
        }
    }, [quill]);
    
    return (
        <>
            <div id={`cp-${user._id}`} className="quillTextEditorContainer" ref={focusRef}>
                {!disabled && <div className="quillEditor" ref={quillRef} />}
                {tmpValue === null || tmpValue === "" || tmpValue === "<p><br></p>" 
                    ? <span className="quillTextEditorPlaceholder">{ph}</span>
                    : null
                }
            </div> 
        </>
    );
    
};

export default MessageTextEditor;
