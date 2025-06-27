import React from 'react';
import "./BlueSpectrum.css";


function BlueSpectrum() {

    return (
        <div className="blueSpectrumContainer">
            <h5 clssName="blueSpectrumTitle">Blue Spectrum</h5>
            <div className="blueSpectrumBody">
                <i 
                    className="blueSpectrumIcon PNG_ICON_SPECTRUM blue" 
                    alt="blue-spectrum-icon" 
                />
                <div className="blueSpectrumDescription">
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

export default BlueSpectrum;