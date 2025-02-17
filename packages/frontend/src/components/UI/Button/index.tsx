import s from './Button.module.scss';
import { memo } from 'react';
import { IButton, TTypeButton } from '@/types/button';
import ExploreIcon from '@/icons/explore_icon.svg?react';
import ConnectIcon from '@/icons/connect_wallet_icon.svg?react';

export const Button: React.FC<IButton> = memo(({ title, theme, size, type, ...otherProps }): React.JSX.Element => {
    const iconMap: Record<TTypeButton, React.JSX.Element> = {
        headerBtn: <ExploreIcon />,
        connectBtn: <ConnectIcon />
    }

    return (
        <button
            type="button"
            {...otherProps}
            className={`${s.btn} ${s[theme]} ${s[size]} ${type && s[type]}`}
        >
            {type && iconMap[type]}
            {title}
        </button>
    )
});