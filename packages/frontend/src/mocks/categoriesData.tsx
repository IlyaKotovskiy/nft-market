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
import VirtualWorlds from "@/icons/headerDropdown/worlds.svg?react";

export const MOCK_CATEGORIES_DATA = [
    { id: 1, title: "Art", pathToImg: "/categories/art.png" },
    { id: 2, title: "Sports", pathToImg: "/categories/sports.png" },
    { id: 3, title: "Collectibles", pathToImg: "/categories/collectibles.png" },
    { id: 4, title: "Photography", pathToImg: "/categories/photography.png" },
    { id: 5, title: "Domain Name", pathToImg: "/categories/domain-name.png" },
]

export const MOCK_CATEGORIES_DROPDOWN = [
    { id: 1, name: "All NFTs", icon: AllNFTs },
    { id: 2, name: "Solana NFTs", icon: SolanaNFTs },
    { id: 3, name: "Art", icon: Art },
    { id: 4, name: "Collectibles", icon: Collectibles },
    { id: 5, name: "Domain Names", icon: DomainNames },
    { id: 6, name: "Music", icon: Music },
    { id: 7, name: "Photography", icon: Photography },
    { id: 8, name: "Sports", icon: Sports },
    { id: 9, name: "Trading Cards", icon: TradingCards },
    { id: 10, name: "Utility", icon: Utility },
    { id: 11, name: "Virtual Worlds", icon: VirtualWorlds },
];