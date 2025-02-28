import s from './Dropdown.module.scss';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Button } from '../Button';
import { useClickOutside } from '@/hooks/useClickOutside';
import { MOCK_CATEGORIES_DROPDOWN } from '@/mocks/categoriesData';


export const Dropdown: React.FC = (): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    }

    useClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div className={s.dropdownWrapper} ref={dropdownRef}>
            <Button title="Explore" theme="yellow" size="small" type="headerBtn" onClick={toggleDropdown} />
            
            <AnimatePresence mode="wait">
                { isOpen && (
                    <motion.ul
                        className={s.dropdownMenu}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        {MOCK_CATEGORIES_DROPDOWN.map(category => (
                            <li key={category.id} className={s.dropdownItem}>
                                <category.icon className={s.icon} />
                                {category.name}
                            </li>
                        ))}
                    </motion.ul>
                ) }
            </AnimatePresence>
        </div>
    )
};