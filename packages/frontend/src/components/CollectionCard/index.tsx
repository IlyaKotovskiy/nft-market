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
    logo: string;
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
            <img src={collection.logo} alt={collection.name} className={s.banner} />
            {/* <img src={collection.logo} alt='' /> */}
            <div className={s.descr}>
                <p>{collection.name}</p>
            </div>
        </div>
    )
};