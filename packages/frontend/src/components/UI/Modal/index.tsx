import s from './Modal.module.scss';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IModalProps } from '@/types/modal';

export const Modal: React.FC<IModalProps> = ({ isOpen, onClose, title, children, footer }): React.JSX.Element => {
    const [isVisible, setIsVisible] = useState<boolean>(isOpen);
    const body: HTMLElement = document.body;    

    const handleClose = () => {
        setIsVisible(false)
        body.style.overflow = "hidden auto";
    }

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            body.style.overflow = "hidden";
        }
    }, [isOpen]);

    return createPortal(
        <AnimatePresence
            mode="wait"
            onExitComplete={onClose}
        >
            { isVisible && (
                <motion.div
                    className={s.overlay}
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    onClick={handleClose}
                >
                    <motion.div
                        className={s.modal}
                        initial={{ opacity: 0, translateY: 35, scale: .9 }}
                        animate={{ opacity: 1, translateY: 0, scale: 1 }}
                        exit={{ opacity: 0, translateY: 35, scale: .9 }}
                        transition={{ duration: .2, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        { title && <h2 className={s.title}>{ title }</h2> }
                        <div className={s.contanet}>{ children }</div>
                        { footer && <div className={s.footer}>{ footer }</div> }
                        <button className={s.closeBtn} onClick={handleClose}>
                            <span></span>
                            <span></span>
                        </button>
                    </motion.div>
                </motion.div>
            ) }
        </AnimatePresence>,
        body
    )
};