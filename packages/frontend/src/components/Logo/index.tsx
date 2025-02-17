import s from './Logo.module.scss';
import LogoIcon from '@/icons/logo.svg?react';
import { useNavigate } from '@/router';

export const Logo: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();
    
    return (
        <div className={s.logo} onClick={() => navigate('/')}>
            <LogoIcon />
            <p className={s.logoText}>OpenLake</p>
        </div>
    )
}