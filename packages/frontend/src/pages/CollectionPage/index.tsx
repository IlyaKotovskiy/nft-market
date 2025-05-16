import s from './CollectionPage.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { Container } from '@/components/Container';
import { MOCK_CATEGORIES_DROPDOWN } from '@/mocks/categoriesData';
import { useNavigate, useParams } from 'react-router-dom';
import { CollectionCard } from '@/components/CollectionCard';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { nftStore } from '@/stores/nftStore';
import SkeletonCollectionCard from './SkeletonCollectionCard';

export const CollectionPage: React.FC = observer((): React.JSX.Element => {
    const { category = 'all' } = useParams();
    const { nfts: collections } = nftStore;
    const navigate = useNavigate();
    const activeTab = MOCK_CATEGORIES_DROPDOWN.find(c => c.path === `/collections/${category}`) || MOCK_CATEGORIES_DROPDOWN[0];

    const filteredCollections = category === 'all' ? collections : collections.filter(c => c.category === category);

    const handleTabChange = (value: string) => {
        const tab = MOCK_CATEGORIES_DROPDOWN.find(t => t.id.toString() === value);
        if (tab) navigate(tab.path);
    }

    useEffect(() => {
        nftStore.fetchNfts();
    }, []);

    return (
        <section className={s.section}>
            <Container>
                <h1>Explore NFTs</h1>
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
                        {nftStore.isLoading
                            ? Array.from({ length: 16 }).map((_, i) => <SkeletonCollectionCard key={i} />)
                            : filteredCollections.map(collection => (
                                <CollectionCard key={collection.id} collection={collection} />
                            ))}
                    </Tabs.Content>
                </Tabs.Root>
            </Container>
        </section>
    )
});