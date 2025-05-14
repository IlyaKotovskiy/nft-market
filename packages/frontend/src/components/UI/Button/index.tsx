import s from './Button.module.scss';
import { memo } from 'react';
import { IButton, TTypeButton } from '@/types/button';
import ExploreIcon from '@/icons/explore_icon.svg?react';
import ConnectIcon from '@/icons/connect_wallet_icon.svg?react';

export const Button: React.FC<IButton> = memo(({ title, theme, size, btnType, type = "button", ...otherProps }): React.JSX.Element => {
    const iconMap: Record<TTypeButton, React.JSX.Element> = {
        headerBtn: <ExploreIcon />,
        connectBtn: <ConnectIcon />
    }

    return (
        <button
            type={type}
            {...otherProps}
            className={`${s.btn} ${s[theme]} ${s[size]} ${btnType ? s[btnType] : ''}`}
        >
            {btnType && iconMap[btnType]}
            {title}
        </button>
    )
});