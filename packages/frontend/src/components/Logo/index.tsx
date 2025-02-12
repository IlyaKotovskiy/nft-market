import s from './Logo.module.scss';
import LogoIcon from '../../icons/logo.svg?react';

export const Logo: React.FC = (): React.JSX.Element => {
    return (
        <a className={s.logo}>
            <LogoIcon />
            <p className={s.logoText}>OpenLake</p>
        </a>
    )
}