
// function for clearing a flare text editor by id.
export function clearFlareTextEditor(editorId) {
    const editor = document.getElementById(editorId)
    var element = editor.getElementsByClassName("ql-editor");
    for (let i = 0; i < element.length; i++) {
        element[i].innerHTML = "";
    }
};