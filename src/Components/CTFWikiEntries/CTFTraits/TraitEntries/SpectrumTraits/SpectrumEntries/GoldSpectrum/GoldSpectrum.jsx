import React from 'react';
import "./GoldSpectrum.css";


function GoldSpectrum() {

    return (
        <div className="goldSpectrumContainer">
            <h5 clssName="goldSpectrumTitle">Gold Spectrum</h5>
            <div className="goldSpectrumBody">
                <i 
                    className="goldSpectrumIcon PNG_ICON_SPECTRUM gold" 
                    alt="gold-spectrum-icon" 
                />
                <div className="goldSpectrumDescription">
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

export default GoldSpectrum;