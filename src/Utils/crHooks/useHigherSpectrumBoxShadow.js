import React, { useEffect, useState } from "react";

const useHigherSpectrumBoxShadow = (el, setHeight) => {

    const [ ce, setCE ] = useState(true);

    const higherSpectrumBoxShadow = () => {
        if (!el) return;
        let prevValue = JSON.stringify(el.getBoundingClientRect());
        const handle = setInterval(() => {
            let nextValue = JSON.stringify(el.getBoundingClientRect());
            if (nextValue === prevValue) {
                clearInterval(handle);
                setHeight(el.getBoundingClientRect().height);
            } else {
                prevValue = nextValue;   
            }
        }, 1000);
    }

    useEffect (() => {
        document.body.addEventListener("click", higherSpectrumBoxShadow);
        return () => {
            document.body.removeEventListener("click", higherSpectrumBoxShadow);
        }     
    }, []);

}

export default useHigherSpectrumBoxShadow;