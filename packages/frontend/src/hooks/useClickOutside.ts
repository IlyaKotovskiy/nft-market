import { useEffect, useCallback } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    const memoizedCallback = useCallback(callback, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                memoizedCallback();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [memoizedCallback, ref]);
};