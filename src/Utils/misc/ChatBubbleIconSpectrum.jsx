import React from 'react';
import { chatboIcon, qnaIcon } from '../../Lib/mui/icons';


// Changes the topbar icons according to higher spectrums
function ChatBubbleIconSpectrum({ spectrum, cn, flare }) {

    

    function getChatBubbleIconSpectrum(spectrum) {
        let chatBubbleIconSpectrum = null;
        switch (spectrum) {
            case "rainbow":
                chatBubbleIconSpectrum = (
                    <>    
                        <svg width="0em" height="0em">
                            <linearGradient id="cbRainbow-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#8a2be2" offset="0%" />
                                <stop stopColor="#30307e" offset="16.67%" />
                                <stop stopColor="#098de9" offset="33.36%" />
                                <stop stopColor="#50c878" offset="50.02%" />
                                <stop stopColor="#ffe700" offset="66.68%" />
                                <stop stopColor="#ff8303" offset="83.34%" />
                                <stop stopColor="#850014" offset="100%" />
                            </linearGradient>
                        </svg>
                        {flare === "question"
                            ? <div className={cn} style={{ fill: "url(#cbRainbow-gradient)"}}>{qnaIcon}</div>
                            : <div className={cn} style={{ fill: "url(#cbRainbow-gradient)"}}>{chatboIcon}</div>
                        }
                    </>
                );
                break;
            case "silver":
                chatBubbleIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="cbSilver-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#dadada" offset="0%"/>
                                <stop stopColor="#8e8e8e" offset="50%"/>
                                <stop stopColor="#dadada" offset="100%"/>
                            </linearGradient>
                        </svg>
                        {flare === "question" 
                            ? <div className={cn} style={{ fill: "url(#cbSilver-gradient)"}}>{qnaIcon}</div>
                            : <div className={cn} style={{ fill: "url(#cbSilver-gradient)"}}>{chatboIcon}</div>
                        }
                    </>
                );
                break;
            case "gold":
                chatBubbleIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="cbGold-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#ab781d" offset="0%"/>
                                <stop stopColor="#eed264" offset="50%"/>
                                <stop stopColor="#ab781d" offset="100%"/>
                            </linearGradient>
                        </svg>
                        {flare === "question" 
                            ? <div className={cn} style={{ fill: "url(#cbGold-gradient)"}}>{qnaIcon}</div>
                            : <div className={cn} style={{ fill: "url(#cbGold-gradient)"}}>{chatboIcon}</div>
                        }
                    </>
                );
                break;
            case "platinum":
                chatBubbleIconSpectrum = (
                    <>
                        <svg width="0em" height="0em">
                            <linearGradient id="cbPlatinum-gradient" x1="0" x2="0" y1="0" y2="1">
                                <stop stopColor="#d3e9f6" offset="0%" />
                                <stop stopColor="#6b8c95" offset="16.67%" />
                                <stop stopColor="#566167" offset="33.36%" />
                                <stop stopColor="#8e8e8e" offset="50.02%" />
                                <stop stopColor="#6d606a" offset="66.68%" />
                                <stop stopColor="#af9499" offset="83.34%" />
                                <stop stopColor="#dadada" offset="100%" />
                            </linearGradient>
                        </svg>
                        {flare === "question" 
                            ? <div className={cn} style={{ fill: "url(#cbPlatinum-gradient)"}}>{qnaIcon}</div>
                            : <div className={cn} style={{ fill: "url(#cbPlatinum-gradient)"}}>{chatboIcon}</div>
                        }
                    </>
                );
                break;
            default:
                chatBubbleIconSpectrum = (
                    <>
                        {flare === "question"
                            ? <div className={`${cn} ${spectrum}`}>{qnaIcon}</div>
                            : <div className={`${cn} ${spectrum}`}>{chatboIcon}</div>
                        }
                    </>
                );
        }
        return chatBubbleIconSpectrum;
    }
    return (
        <> 
            {getChatBubbleIconSpectrum(spectrum)}
        </>
    )
};

export default ChatBubbleIconSpectrum;