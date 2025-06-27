// This function regulates the size of higher spectrum box shadows to match its sibling element's height.

export const higherSpectrumBoxShadow = (el, setHeight) => {
    if (!el) return;
    let prevValue = JSON.stringify(el?.getBoundingClientRect());
    const handle = setInterval(() => {
        let nextValue = JSON.stringify(el?.getBoundingClientRect());
        if (nextValue === prevValue) {
            clearInterval(handle);
            setHeight(el?.getBoundingClientRect().height);
        } else {
            prevValue = nextValue;   
        }
    }, 1000);
};