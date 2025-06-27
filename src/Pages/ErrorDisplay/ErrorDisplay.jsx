import React from 'react';
import "./ErrorDisplay.css";

function ErrorDisplay({ error, resetErrorBoundary }) {

    console.log('Error occured', error);

    return (
        <div>
            <p className='error-msg'>
                Something went wrong. Try clicking the refresh page button to reload the
                application.{' '}
            </p>
            <button className='btn' onClick={resetErrorBoundary}>
                Refresh page
            </button>
        </div>
    )
};

export default ErrorDisplay;