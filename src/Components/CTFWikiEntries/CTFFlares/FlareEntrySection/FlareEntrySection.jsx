import React from 'react';
import "./FlareEntrySection.css";
import BlogFlares from '../FlareEntries/BlogFlares/BlogFlares';
import PostFlares from '../FlareEntries/PostFlares/PostFlares';
import QuestionFlares from '../FlareEntries/QuestionFlares/QuestionFlares';
import AnswerFlares from '../FlareEntries/AnswerFlares/AnswerFlares';
import CommentFlares from '../FlareEntries/CommentFlares/CommentFlares';
import ReviewFlares from '../FlareEntries/ReviewFlares/ReviewFlares';
import ReplyFlares from '../FlareEntries/ReplyFlares/ReplyFlares';


function FlareEntrySection() {

  return (
    <div className='FlareEntrySection'>
        <h3 className='FlareEntrySectionTitle'>Flares</h3>
        <div className='FlareEntrySectionBody'>
            <div className='FlareEntrySectionBodyDescription'>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting 
                    industry. Lorem Ipsum has been the industry's standard dummy 
                    text ever since the 1500s, when an unknown printer took a galley 
                    of type and scrambled it to make a type specimen book. It has 
                    survived not only five centuries, but also the leap into electronic 
                    typesetting, remaining essentially unchanged. It was popularised in 
                    the 1960s with the release of Letraset sheets containing Lorem 
                    Ipsum passages, and more recently with desktop publishing 
                    software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className='FlareEntrySectionBodyEntries'>
                <div className='FlareEntrySectionBodyEntryGroup'>
                    <h4 className='FlareEntrySectionEntryGroupTitle'>Primary Flares</h4>
                    <div className='FlareEntrySectionEntryGroupBody'>
                        <div className='FlareEntrySectionEntryGroupBodyDescription'>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting 
                                industry. Lorem Ipsum has been the industry's standard dummy 
                                text ever since the 1500s, when an unknown printer took a galley 
                                of type and scrambled it to make a type specimen book. It has 
                                survived not only five centuries, but also the leap into electronic 
                                typesetting, remaining essentially unchanged. It was popularised in 
                                the 1960s with the release of Letraset sheets containing Lorem 
                                Ipsum passages, and more recently with desktop publishing 
                                software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                        <ul className='FlareEntrySectionBodyEntryGroupEntries'>
                            <li className='FlareEntrySectionBodyEntry'>
                                <BlogFlares/>
                            </li>
                            <li className='FlareEntrySectionBodyEntry'>
                                <PostFlares/>
                            </li>
                            <li className='FlareEntrySectionBodyEntry'>
                                <QuestionFlares/>
                            </li>
                        </ul>
                    </div>
                    <div className='FlareEntrySectionBodyEntryGroup'>
                        <h4 className='FlareEntrySectionEntryGroupTitle'>Secondary Flares</h4>
                        <div className='FlareEntrySectionEntryGroupBody'>
                            <div className='FlareEntrySectionEntryGroupBodyDescription'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting 
                                    industry. Lorem Ipsum has been the industry's standard dummy 
                                    text ever since the 1500s, when an unknown printer took a galley 
                                    of type and scrambled it to make a type specimen book. It has 
                                    survived not only five centuries, but also the leap into electronic 
                                    typesetting, remaining essentially unchanged. It was popularised in 
                                    the 1960s with the release of Letraset sheets containing Lorem 
                                    Ipsum passages, and more recently with desktop publishing 
                                    software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </div>
                            <ul className='FlareEntrySectionBodyEntryGroupEntries'>
                                <li className='FlareEntrySectionBodyEntry'>
                                    <AnswerFlares/>
                                </li>
                                <li className='FlareEntrySectionBodyEntry'>
                                    <CommentFlares/>
                                </li>
                                <li className='FlareEntrySectionBodyEntry'>
                                    <ReviewFlares/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='FlareEntrySectionBodyEntryGroup'>
                        <h4 className='FlareEntrySectionEntryGroupTitle'>Tertiary Flares</h4>
                        <div className='FlareEntrySectionEntryGroupBody'>
                            <div className='FlareEntrySectionEntryGroupBodyDescription'>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting 
                                    industry. Lorem Ipsum has been the industry's standard dummy 
                                    text ever since the 1500s, when an unknown printer took a galley 
                                    of type and scrambled it to make a type specimen book. It has 
                                    survived not only five centuries, but also the leap into electronic 
                                    typesetting, remaining essentially unchanged. It was popularised in 
                                    the 1960s with the release of Letraset sheets containing Lorem 
                                    Ipsum passages, and more recently with desktop publishing 
                                    software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </div>
                            <ul className='FlareEntrySectionBodyEntryGroupEntries'>
                                <li className='FlareEntrySectionBodyEntry'>
                                    <ReplyFlares/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default FlareEntrySection;