import s from './Dropdown.module.scss';
import { Children, cloneElement, isValidElement, ReactNode, useRef } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from '@/hooks/useClickOutside';
import { useToggle } from '@/hooks/useToggle';

export interface IDropdownProps {
    trigger: ReactNode | ((isOpen: boolean) => ReactNode);
    children: ReactNode;
    wrapperClassName?: string;
    menuClassName?: string;
    closeOnItemClick?: boolean | ((itemId: string) => boolean);
}

export const Dropdown: React.FC<IDropdownProps> = ({
    trigger,
    children,
    wrapperClassName = '',
    menuClassName = '',
    closeOnItemClick = true,
}): React.JSX.Element => {
    const [isOpen, toggleDropdown] = useToggle(false);
    const dropdownRef = useRef(null);

    useClickOutside(dropdownRef, () => toggleDropdown(), isOpen);

    const handleChildClick = (e: React.MouseEvent, childOnClick?: () => void) => {
        childOnClick?.();

        if (closeOnItemClick) {
            toggleDropdown()
        }
    };

    const enhancedChildren = Children.map(children, (child) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child, {
            onClick: (e: React.MouseEvent) => {
                handleChildClick(e, child.props.onClick);
            },
        });
    });

    return (
        <div className={`${s.dropdownWrapper} ${wrapperClassName}`} ref={dropdownRef}>
            {typeof trigger === 'function'
                ? (trigger(isOpen))
                : (<div onClick={toggleDropdown}>{trigger}</div>)
            }

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        className={`${s.dropdownMenu} ${menuClassName}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        {enhancedChildren}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
};