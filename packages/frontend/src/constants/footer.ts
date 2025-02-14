import { IFooterRoute, QueryParam } from "@/types/footer";

export const footRoutes: IFooterRoute[] = [
    {
        id: 1,
        chapter: { label: "Marketplace", path: "/marketplace" },
        routes: [
            { label: "All NFTs", queryParam: QueryParam.ALL_NFTS },
            { label: "Solana NFTs", queryParam: QueryParam.SOLANA_NFTS },
            { label: "Art", queryParam: QueryParam.ART },
            { label: "Collectibles", queryParam: QueryParam.COLLECTIBLES },
            { label: "Domain Names", queryParam: QueryParam.DOMAIN_NAMES },
            { label: "Music", queryParam: QueryParam.MUSIC },
            { label: "Photography", queryParam: QueryParam.PHOTOGRAPHY },
            { label: "Sports", queryParam: QueryParam.SPORTS },
            { label: "Trading cards", queryParam: QueryParam.TRADING_CARDS },
            { label: "Utility", queryParam: QueryParam.UTILITY },
            { label: "Virtual Worlds", queryParam: QueryParam.VIRTUAL_WORLDS }
        ]
    },
    {
        id: 2,
        chapter: { label: "My Account", path: "/my-acc" },
        routes: [
            { label: "Profile", queryParam: QueryParam.PROFILE },
            { label: "Favourites", queryParam: QueryParam.FAVOURITES },
            { label: "Watchlist", queryParam: QueryParam.WATCHLIST },
            { label: "My Collections", queryParam: QueryParam.MY_COLLECTIONS },
            { label: "Settings", queryParam: QueryParam.SETTINGS },
        ]
    },
    {
        id: 3,
        chapter: { label: "Resources", path: "/resources" },
        routes: [
            { label: "Help Center", queryParam: QueryParam.HELP_CENTER },
            { label: "Platform Status", queryParam: QueryParam.PLATFORM_STATUS },
            { label: "Partners", queryParam: QueryParam.PARTNERS },
            { label: "Gas-Free Marketplace", queryParam: QueryParam.GAS_FREE_MARKETPLACE },
            { label: "Taxes", queryParam: QueryParam.TAXES },
            { label: "Blog", queryParam: QueryParam.BLOG },
            { label: "Docs", queryParam: QueryParam.DOCS },
            { label: "Newsletter", queryParam: QueryParam.NEWSLETTER },
        ]
    },
    {
        id: 4,
        chapter: { label: "Company", path: "/company" },
        routes: [
            { label: "About", queryParam: QueryParam.ABOUT },
            { label: "Careers", queryParam: QueryParam.CAREERS },
            { label: "Ventures", queryParam: QueryParam.VENTURES },
            { label: "Grants", queryParam: QueryParam.GRANTS },
        ]
    }
];