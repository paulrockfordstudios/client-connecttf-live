import React from 'react';
import "./RainbowSpectrum.css";


function RainbowSpectrum() {

    return (
        <div className="rainbowSpectrumContainer">
            <h5 clssName="rainbowSpectrumTitle">Rainbow Spectrum</h5>
            <div className="rainbowSpectrumBody">
                <i 
                    className="rainbowSpectrumIcon PNG_ICON_SPECTRUM rainbow" 
                    alt="rainbow-spectrum-icon" 
                />
                <div className="rainbowSpectrumDescription">
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

export default RainbowSpectrum;