import { BrowserRouter } from '@/router';
import { AppRoutes } from './routes';

export const AppRouter: React.FC = (): React.JSX.Element => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}