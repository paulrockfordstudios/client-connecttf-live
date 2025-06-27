import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
import "./Footer.css";
import { lngSelectOpen } from '../../../Redux/AuthSlice';
import { copyrightIcon, lngRoundedIcon } from '../../../Lib/mui/icons';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function Footer() {

    const dispatch = useDispatch();

    const {t} = useTranslation(['common']);

    
    return (
        <footer className="footer-container">
            <div className="footerContainer">
                <div className="footerBackground"/>
                <div className="footerForground">
                    <nav className="footerTopicsContainer">
                        <ul className="footerTopicsList">
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink" 
                                    to="/aboutctf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <span style={{marginRight: "0.25rem" /*4px*/}}>
                                        <Trans i18nKey={"words.about"} ns={"common"} components={componentClasses}/>
                                    </span>
                                    <span className="cp-fg-cs saturated static bright masculine fontBold"><b>Connect</b></span>
                                    <span className="cp-fg-cs saturated static bright feminine fontBold"><b>TF</b></span>   
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink" 
                                    to="/ctfwiki" 
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                >
                                    <span className="cp-fg-cs saturated static bright masculine fontBold"><b>C</b></span>
                                    <span className="cp-fg-cs saturated static bright feminine fontBold"><b>TF</b></span>
                                    <Trans i18nKey={"words.wiki"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink"  
                                    to="" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                >
                                    <span className="cp-fg-cs saturated static bright masculine fontBold"><b>C</b></span>
                                    <span className="cp-fg-cs saturated static bright feminine fontBold"><b>TF</b></span>
                                    <Trans i18nKey={"words.faqs"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                        </ul>
                        <ul className="footerTopicsList">
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink"  
                                    to="/terms_of_use" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"phrases.terms_of_use"} ns={"common"} components={componentClasses}/>   
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink" 
                                    to="/privacy_policy" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"phrases.privacy_policy"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink"  
                                    to="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"words.cookies"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                        </ul>
                        <ul className="footerTopicsList">
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink"  
                                    to="/advertising" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"words.advertising"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink"  
                                    to="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"words.newsLetter"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink"  
                                    to="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"words.contact"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                        </ul>
                        <ul className="footerTopicsList">
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink" 
                                    to="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"words.accessibility"} ns={"common"} components={componentClasses}/>  
                                </Link>
                            </li>
                            <li className="footerTopicsListItem">
                                <button 
                                    className="footerTopicsListItemLink" 
                                    aria-label={t("common:words.languages")} 
                                    onClick={() => dispatch(lngSelectOpen())} 
                                >
                                    <Trans i18nKey={"words.languages"} ns={"common"} components={componentClasses}/>
                                    <div className="footerTopicsListItemIcon">{lngRoundedIcon}</div>
                                </button>
                            </li>
                            <li className="footerTopicsListItem">
                                <Link 
                                    className="footerTopicsListItemLink" 
                                    to="" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Trans i18nKey={"words.account"} ns={"common"} components={componentClasses}/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="footerCopyright">
                        <Trans i18nKey={"words.copyright"} ns={"common"} components={componentClasses}/>
                        <div className="footerCopyrightIcon">{copyrightIcon}</div>
                        <Trans i18nKey={"words.year"} ns={"common"} components={componentClasses}/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;