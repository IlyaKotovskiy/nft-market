import s from './NotFoundPage.module.scss';
import { Container } from '@/components/Container';
import { Button } from '@/components/UI/Button';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '@/constants/routes';
import NotFoundIcon from "@/icons/404.svg?react";

export const NotFoundPage: React.FC = (): React.JSX.Element => {
    const navigate = useNavigate();

    return (
        <section className={s.notFound}>
            <Container>
                <div className={s.wrapper}>
                    <NotFoundIcon />
                    <div className={s.descr}>
                        <h1>Oooops... Page not found :(</h1>
                        <p>It looks like you've wandered into the wrong place.</p>
                        <div className={s.btns}>
                            <Button title="Go back" theme="yellow-secondary" size="large" onClick={() => navigate(-1)} />
                            <Button title="Go home" theme="yellow" size="large" onClick={() => navigate(ROUTES.HOME)} />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
};