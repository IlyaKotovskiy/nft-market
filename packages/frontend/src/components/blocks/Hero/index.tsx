import { Button } from '@/components/UI/Button';
import s from './Hero.module.scss';
import { Container } from '@/components/Container';

export const Hero: React.FC = (): React.JSX.Element => {
    return (
        <section className={s.hero}>
            <Container>
                <div className={s.banner}>
                    <div className={s.wrapper}>
                        <h1>Discover the Exclusive NFT Collection</h1>
                        <p>Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
                        <Button title="Learn More" theme="yellow-secondary" size="large" />
                    </div>
                </div>
            </Container>
        </section>
    )
};