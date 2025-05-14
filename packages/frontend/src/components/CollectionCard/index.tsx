import s from './CollectionCard.module.scss';

// Copied
type NFT = {
    id: string;
    name: string;
    description: string;
    image: string;
    attributes: {
        trait_type: string;
        value: string;
    }[];
};

// Copied
type NFTCollection = {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    banner: string;
    nfts: NFT[];
    createdAt: Date;
};

interface ICollectionCardProps {
    collection: NFTCollection
}

export const CollectionCard: React.FC<ICollectionCardProps> = ({ collection }): React.JSX.Element => {
    return (
        <div className={s.card}>
            <img src={collection.image} alt={collection.name} className={s.banner} />
            <div className={s.descr}>
                <p>NFT name: {collection.name}</p>
            </div>
        </div>
    )
};