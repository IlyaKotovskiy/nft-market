export interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export interface IUseModal {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}