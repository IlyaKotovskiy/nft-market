import s from './Categories.module.scss';
import { Container } from '@/components/Container';
import { Slider } from '@/components/Slider';
import { MOCK_CATEGORIES_DATA } from '@/mocks/categoriesData';

export const Categories: React.FC = (): React.JSX.Element => {
    return (
        <section className={s.section}>
            <Container>
                <h2 className="section-title">Browse <span>by category</span></h2>
                <Slider>
                    {MOCK_CATEGORIES_DATA.map(({ id, title, pathToImg }) => (
                        <div key={id} className={s.categoryItem}>
                            <img src={pathToImg} alt={title} />
                            <h4>{title}</h4>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>
    )
};