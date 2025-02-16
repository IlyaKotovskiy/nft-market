import s from './Modal.module.scss';
import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { IModalProps } from '@/types/modal';

export const Modal: React.FC<IModalProps> = memo(({ isOpen, onClose, title, children, footer }): React.JSX.Element => {
    const body = document.body;    

    useEffect(() => {
        if (isOpen) {
            body.style.overflow = "hidden";
        }

        return () => {
            body.style.overflow = "hidden auto";
        };
    }, [isOpen]);

    console.log("render");

    return createPortal(
        <AnimatePresence mode="wait" onExitComplete={onClose}>
            {isOpen && (
                <motion.div
                    className={s.overlay}
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    onClick={onClose}
                >
                    <motion.div
                        className={s.modal}
                        initial={{ opacity: 0, translateY: 35, scale: 0.9 }}
                        animate={{ opacity: 1, translateY: 0, scale: 1 }}
                        exit={{ opacity: 0, translateY: 35, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {title && <h2 className={s.title}>{title}</h2>}
                        <div className={s.content}>{children}</div>
                        {footer && <div className={s.footer}>{footer}</div>}
                        <button className={s.closeBtn} onClick={onClose}>
                            <span></span>
                            <span></span>
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        body
    );
});
