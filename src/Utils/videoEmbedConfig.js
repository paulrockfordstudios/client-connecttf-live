// extracts the video id from video URL.
export const getVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
};

// Converts video URL to embed URL.
export const convert2Iframe = (url) => {
    const videoId = getVideoId(url);
    const iframeMarkup = `<iframe src="//www.youtube.com/embed/` 
        + videoId + '" frameborder="0" allowfullscreen></iframe>';
    return iframeMarkup;
};