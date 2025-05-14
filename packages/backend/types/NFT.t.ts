export enum ECategory {
    SOLANA_NFTS = "solana-nfts",
    ART = "art",
    COLLECTIBLES = "collectibles",
    DOMAIN_NAME = "domain-name",
    MUSIC = "music",
    PHOTOGRAPHY = "photo",
    SPORTS = "sports",
    TRADING_CARDS = "trading-cards",
    UTILITY = "utility",
};

export interface INFT {
    id: string;
    // Блокчейн-данные
    contractAddress: string;
    tokenId: string;
    ownerId: number;               // Связь с User.id
    // Метаданные
    name: string;
    collection: string;
    category: ECategory;
    image: string;
    description?: string;
    // Технические поля
    chainId?: number;              // ID блокчейна (1 — Ethereum, 137 — Polygon и т.д.)
    royaltyPercentage?: number;    // Роялти (например, 7.5 для 7.5%)
}