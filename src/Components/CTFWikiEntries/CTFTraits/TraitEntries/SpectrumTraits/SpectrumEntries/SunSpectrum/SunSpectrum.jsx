import React from 'react';
import "./SunSpectrum.jsx";


function SunSpectrum() {

    return (
        <div className="sunSpectrumContainer">
            <h5 clssName="sunSpectrumTitle">Sun Spectrum</h5>
            <div className="sunSpectrumBody">
                <i 
                    className="sunSpectrumIcon PNG_ICON_SPECTRUM sun" 
                    alt="sun-spectrum-icon" 
                />
                <div className="sunSpectrumDescription">
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

export default SunSpectrum;