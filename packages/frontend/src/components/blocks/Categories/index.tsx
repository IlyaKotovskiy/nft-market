import s from './Categories.module.scss';
import { Container } from '@/components/Container';
import { MOCK_CATEGORIES_DATA } from '@/mocks/categoriesData';

export const Categories: React.FC = (): React.JSX.Element => {
    return (
        <section className={s.section}>
            <Container>
                <h2 className={s.title}>Browse <span>by category</span></h2>
                <div className={s.categories}>
                    {MOCK_CATEGORIES_DATA.map(({ id, title, pathToImg }) => (
                        <div key={id} className={s.categoryItem}>
                            <img src={pathToImg} alt={title} />
                            <h4>{title}</h4>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
};