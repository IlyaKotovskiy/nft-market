import s from './CollectionPage.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { Container } from '@/components/Container';
import { MOCK_CATEGORIES_DROPDOWN } from '@/mocks/categoriesData';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_COLLECTIONS } from '@/mocks/nftData';
import { CollectionCard } from '@/components/CollectionCard';

export const CollectionPage: React.FC = (): React.JSX.Element => {
    const { category = 'all' } = useParams();
    const navigate = useNavigate();
    const collections = MOCK_COLLECTIONS;
    const activeTab = MOCK_CATEGORIES_DROPDOWN.find(c => c.path === `/collections/${category}`) || MOCK_CATEGORIES_DROPDOWN[0];

    const filteredCollections = category === 'all' ? collections : collections.filter(c => c.category === category);

    const handleTabChange = (value: string) => {
        const tab = MOCK_CATEGORIES_DROPDOWN.find(t => t.id.toString() === value);
        if (tab) navigate(tab.path);
    }

    return (
        <section className={s.section}>
            <Container>
                <h1>Explore collections</h1>
                <Tabs.Root
                    value={category}
                    onValueChange={handleTabChange}
                >
                    <Tabs.List className={s.tabHeader}>
                        {MOCK_CATEGORIES_DROPDOWN.map((tab) => (
                            <Tabs.Trigger
                                key={tab.id}
                                value={tab.id.toString()}
                                className={`${s.tabBtn} ${activeTab.id === tab.id ? s.activeTab : ''}`}
                            >
                                {tab.name}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    <Tabs.Content value={category} className={s.categoriesContainer}>
                        {filteredCollections.map(collection => (
                            <CollectionCard key={collection.id} collection={collection} />
                        ))}
                    </Tabs.Content>
                </Tabs.Root>
            </Container>
        </section>
    )
};