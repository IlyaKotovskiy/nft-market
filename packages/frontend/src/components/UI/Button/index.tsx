import s from './Button.module.scss';
import ExploreIcon from '../../../icons/explore_icon.svg?react';
import ConnectIcon from '../../../icons/connect_wallet_icon.svg?react';
import { JSX } from 'react';

type TThemeButton = "yellow" | "dark";
type TSizeButton = "small" | "large";
type TTypeButton = "headerBtn" | "connectBtn";

interface IButton {
    title: string
    theme: TThemeButton
    size: TSizeButton
    type?: TTypeButton
    onClick?: () => void
}

export const Button = ({ title, theme, size, type, ...otherProps } :IButton) => {
    const iconMap: Record<TTypeButton, JSX.Element> = {
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
}