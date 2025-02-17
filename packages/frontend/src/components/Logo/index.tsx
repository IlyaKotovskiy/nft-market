import s from './Logo.module.scss';
import { ROUTES } from '@/constants/routes';
import LogoIcon from '@/icons/logo.svg?react';
import { useNavigate } from '@/router';

export const Logo: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className={s.logo} onClick={() => navigate(ROUTES.HOME)}>
            <LogoIcon />
            <p className={s.logoText}>OpenLake</p>
        </div>
    )
}