import s from './Container.module.scss';
import { IContainerProps } from '../../types/container';

export const Container: React.FC<IContainerProps> = ({ children }): React.JSX.Element => {
    return <div className={s.container}>{children}</div>;
}
