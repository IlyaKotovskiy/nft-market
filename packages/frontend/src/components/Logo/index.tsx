import s from './Logo.module.scss';
import LogoIcon from '../../icons/logo.svg?react';

export const Logo = () => {
    return (
        <a className={s.logo}>
            <LogoIcon />
            <p className={s.logoText}>OpenLake</p>
        </a>
    )
}