import { useState, useEffect, useRef } from 'react';

function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timeoutId = null;
    if (delay !== null) {
      timeoutId = setTimeout(() => callbackRef.current(), delay);
    }

    return () => clearTimeout(timeoutId);
  }, [delay]);
};

export default useTimeout;