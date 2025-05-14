import s from './PreLoader.module.scss';
import { PreLoaderProps } from '@/types/preloader';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LogoIcon from "@/icons/logo.svg?react";

export const PreLoader: React.FC<PreLoaderProps> = ({ isVisible, animationDuration = 0.8 }) => {
    return createPortal(
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    className={s.layout}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: animationDuration, ease: "easeInOut" }}
                >
                    <motion.span
                        className={s.loader}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: animationDuration, ease: "easeInOut" }}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: animationDuration, ease: "easeInOut" }}
                    >
                        <LogoIcon />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};