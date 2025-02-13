import { Footer } from '../blocks/Footer';
import { Header } from '../blocks/Header';
import { ILayoutProps } from '../../types/layout';

export const Layout: React.FC<ILayoutProps> = ({ children }): React.JSX.Element => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
};