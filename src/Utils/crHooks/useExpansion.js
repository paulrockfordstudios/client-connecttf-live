import React, { useEffect, useState } from 'react';

function useExpansion() {

    const [ isExpanding, setIsExpanding ] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsExpanding(false);
          }, 325);
          return () => clearTimeout(timeoutId); 
    }, []);
  
    return isExpanding;
}

export default useExpansion;