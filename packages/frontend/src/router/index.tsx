import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter: React.FC = (): React.JSX.Element => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}