import { useEffect } from 'react'

const useEventListener = (event, listener, useCapture) => {
    useEffect(() => {
        if (listener) {
        listener()
        window.addEventListener(event, listener, useCapture)

        return () => window.removeEventListener(event, listener, useCapture)
        }

        return () => {}
    }, [event, listener, useCapture])
};

export default useEventListener;