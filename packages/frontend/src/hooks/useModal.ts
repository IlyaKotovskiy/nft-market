import { IUseModal } from "@/types/modal";
import { useCallback, useState } from "react"

export const useModal = (): IUseModal => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return { isOpen, openModal, closeModal };
}