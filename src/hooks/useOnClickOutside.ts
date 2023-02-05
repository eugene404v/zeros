import { RefObject, useCallback, useEffect } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
    const callHandlerIfEventTargetOutside = useCallback(
        (e: MouseEvent | TouchEvent) => {
            if (ref.current && e.target instanceof Node && ref.current.contains(e.target)) {
                return;
            }
            handler();
        },
        [handler, ref.current],
    );

    useEffect(() => {
        document.addEventListener('mousedown', callHandlerIfEventTargetOutside);
        document.addEventListener('touchstart', callHandlerIfEventTargetOutside);

        return () => {
            document.removeEventListener('mousedown', callHandlerIfEventTargetOutside);
            document.removeEventListener('touchstart', callHandlerIfEventTargetOutside);
        };
    }, [ref, callHandlerIfEventTargetOutside]);
};

export default useOnClickOutside;
