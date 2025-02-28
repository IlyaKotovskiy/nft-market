import { useState } from "react"

export const useToggle = (initState: boolean = false) => {
    const [toggle, setToggle] = useState<boolean>(initState);

    const toggler = () => {
        setToggle(prev => !prev)
    }

    return [toggle, toggler] as const;
}