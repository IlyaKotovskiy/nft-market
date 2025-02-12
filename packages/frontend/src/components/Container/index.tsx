import { ReactNode } from 'react';
import s from './Container.module.scss';

interface IContainerProps {
    children: ReactNode
}

export const Container: React.FC<IContainerProps> = ({ children }) => {
    return <div className={s.container}>{children}</div>;
}
