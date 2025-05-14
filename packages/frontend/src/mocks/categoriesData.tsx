import AllNFTs from "@/icons/headerDropdown/all-nfts.svg?react";
import SolanaNFTs from "@/icons/headerDropdown/solana.svg?react";
import Art from "@/icons/headerDropdown/art.svg?react";
import Collectibles from "@/icons/headerDropdown/collectibles.svg?react";
import DomainNames from "@/icons/headerDropdown/domain-names.svg?react";
import Music from "@/icons/headerDropdown/music.svg?react";
import Photography from "@/icons/headerDropdown/photo.svg?react";
import Sports from "@/icons/headerDropdown/sports.svg?react";
import TradingCards from "@/icons/headerDropdown/cards.svg?react";
import Utility from "@/icons/headerDropdown/utility.svg?react";

export const MOCK_CATEGORIES_DATA = [
    { id: 1, title: "Art", pathToImg: "/categories/art.png" },
    { id: 2, title: "Sports", pathToImg: "/categories/sports.png" },
    { id: 3, title: "Collectibles", pathToImg: "/categories/collectibles.png" },
    { id: 4, title: "Photography", pathToImg: "/categories/photography.png" },
    { id: 5, title: "Domain Name", pathToImg: "/categories/domain-name.png" },
]

export const MOCK_CATEGORIES_DROPDOWN = [
    { id: 1, name: "All NFTs", icon: AllNFTs, path: '/collections/all' },
    { id: 2, name: "Solana NFTs", icon: SolanaNFTs, path: '/collections/solana-nfts' },
    { id: 3, name: "Art", icon: Art, path: '/collections/art' },
    { id: 4, name: "Collectibles", icon: Collectibles, path: '/collections/collectibles' },
    { id: 5, name: "Domain Names", icon: DomainNames, path: '/collections/domain' },
    { id: 6, name: "Music", icon: Music, path: '/collections/music' },
    { id: 7, name: "Photography", icon: Photography, path: '/collections/photo' },
    { id: 8, name: "Sports", icon: Sports, path: '/collections/sports' },
    { id: 9, name: "Trading Cards", icon: TradingCards, path: '/collections/trading' },
    { id: 10, name: "Utility", icon: Utility, path: '/collections/utils' },
];