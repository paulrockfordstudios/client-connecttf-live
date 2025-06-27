import React, { useEffect, useState } from 'react';
import "quill";
import { useQuill } from 'react-quilljs';
import { useSelector } from 'react-redux';
import { formats } from "../../../../Utils/TextEditorToolbar";



import './GeneralTextEditor.css';
import { axiosReq } from '../../../../Utils/axiosConfig';
import MentionsPopup from '../../../Popups/MentionsPopup/MentionsPopup';


const GeneralTextEditor = ({ 
    editorId, 
    value, 
    setValue, 
    toolbar=false, 
    focusRef, 
    readOnly=false, 

}) => {

    const { user } = useSelector((state) => state.auth);

    const [tmpValue, setTmpValue] = useState(value ? value : "")
    const [subTmpValue, setSubTmpValue] = useState("")
    const [ quillPos, setQuillPos ] = useState(null);
    
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
        var range = quill?.getSelection(true);
        setQuillPos(range?.index)
    }, [quill]);
 
    useEffect(() => {
        if(quill && value) {
            quill.clipboard.dangerouslyPasteHTML(value);
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
        <div id={`cp-${user._id}`} className="quillTextEditorContainer" ref={focusRef}>
            <div className="quillEditor" ref={quillRef} />
            {/*tmpValue === null || tmpValue === "" || tmpValue === "<p><br></p>" 
                ? <span className="quillTextEditorPlaceholder">{ph}</span>
                : null
    */}
        </div> 
    );   
};

export default GeneralTextEditor;
