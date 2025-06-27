import React from 'react';
import "./SilverSpectrum.css";


function SilverSpectrum() {

    return (
        <div className="silverSpectrumContainer">
            <h5 clssName="silverSpectrumTitle">Silver Spectrum</h5>
            <div className="silverSpectrumBody">
                <i 
                    className="silverSpectrumIcon PNG_ICON_SPECTRUM silver" 
                    alt="silver-spectrum-icon" 
                />
                <div className="silverSpectrumDescription">
                    Lorem Ipsum is simply dummy text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's standard dummy 
                    text ever since the 1500s, when an unknown printer took a galley 
                    of type and scrambled it to make a type specimen book. It has 
                    survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem 
                    Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
            </div>
        </div>
    )
};

export default SilverSpectrum;