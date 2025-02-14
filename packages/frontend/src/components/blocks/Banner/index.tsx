import { Button } from '@/components/UI/Button';
import s from './Banner.module.scss';
import { Container } from '@/components/Container';
import { MediaLinks } from '@/components/MediaLinks';

export const Banner: React.FC = (): React.JSX.Element => {
    return (
        <section className={s.banner}>
            <Container>
                <div className={s.wrapper}>
                    <h2>Solana is in beta on OpenLake</h2>
                    <div className={s.btns}>
                        <Button title="Explore" theme="dark-secondary" size="large" />
                        <MediaLinks theme="transparent" />
                    </div>
                </div>
            </Container>
        </section>
    )
};