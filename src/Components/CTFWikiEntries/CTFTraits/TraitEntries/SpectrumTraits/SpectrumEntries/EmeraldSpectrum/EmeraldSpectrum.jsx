import React from 'react';
import "./EmeraldSpectrum.css";


function EmeraldSpectrum() {

    return (
        <div className="emeraldSpectrumContainer">
            <h5 clssName="emeraldSpectrumTitle">Emerald Spectrum</h5>
            <div className="emeraldSpectrumBody">
                <i 
                    className="emeraldSpectrumIcon PNG_ICON_SPECTRUM emerald" 
                    alt="emerald-spectrum-icon" 
                />
                <div className="emeraldSpectrumDescription">
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

export default EmeraldSpectrum;