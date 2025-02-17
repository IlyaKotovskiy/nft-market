import s from './Drops.module.scss';
import { Slider } from '@/components/Slider';
import { Container } from '@/components/Container';
import { MOCK_DROPS_DATA } from '@/mocks/dropsData';
import TonIcon from '@/icons/ton.svg?react';

export const Drops: React.FC = (): React.JSX.Element => {
    return (
        <section className={s.section}>
            <Container>
                <h2 className="section-title">Notable <span>drops</span></h2>
                <Slider>
                    {MOCK_DROPS_DATA.map(drop => (
                        <div key={drop.id} className={s.drop}>
                            <img src={drop.pathToImg} alt={drop.title} />
                            <h4>{drop.title}</h4>
                            <p><TonIcon /> Floor Price: {drop.floorPrice}</p>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    )
};