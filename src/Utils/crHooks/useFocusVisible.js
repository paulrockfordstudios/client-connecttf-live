import { useEffect, useState } from 'react';

function useFocusVisible(ref) {
 
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const checkFocus = () => {
      setIsFocused(document.activeElement === ref?.current && ref?.current?.matches(':focus-visible'));
    };

    //Check focus initially and on every focus/blur event
    checkFocus();
    document.addEventListener('focusin', checkFocus);
    document.addEventListener('focusout', checkFocus);

    // Clean up the event listeners
    return () => {
      document.removeEventListener('focusin', checkFocus);
      document.removeEventListener('focusout', checkFocus);
    };
  }, [ref]);

  return isFocused;
};

export default useFocusVisible;