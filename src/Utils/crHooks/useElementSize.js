import { useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer'

function useElementSize(ref) {

    const [dimensions, setDimensions] = useState();

    useLayoutEffect(() => {
        setDimensions(ref?.current?.getBoundingClientRect());
    }, [ref]);

    useResizeObserver(ref, (entry) => setDimensions(entry.contentRect));

    return dimensions;
};

export default useElementSize;