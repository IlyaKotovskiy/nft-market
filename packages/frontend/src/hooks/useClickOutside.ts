import { useEffect, useCallback } from "react";

export const useClickOutside = (
    ref: React.RefObject<HTMLElement>,
    callback: () => void,
    isActive: boolean
) => {
    const memoizedCallback = useCallback(callback, []);

    useEffect(() => {
        if (!isActive) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                memoizedCallback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [memoizedCallback, ref, isActive]);
};