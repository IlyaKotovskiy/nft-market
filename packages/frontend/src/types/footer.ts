export enum QueryParam {
    ALL_NFTS = "all-nfts",
    SOLANA_NFTS = "solana-nfts",
    ART = "art",
    COLLECTIBLES = "collectibles",
    DOMAIN_NAMES = "domain-names",
    MUSIC = "music",
    PHOTOGRAPHY = "photography",
    SPORTS = "sports",
    TRADING_CARDS = "trading-cards",
    UTILITY = "utility",
    VIRTUAL_WORLDS = "virtual-worlds",
    PROFILE = "profile",
    FAVOURITES = "favourites",
    WATCHLIST = "watch-list",
    MY_COLLECTIONS = "my-collections",
    SETTINGS = "settings",
    HELP_CENTER = "help-center",
    PLATFORM_STATUS = "platform-status",
    PARTNERS = "partners",
    GAS_FREE_MARKETPLACE = "gas-free-marketplace",
    TAXES = "taxes",
    BLOG = "blog",
    DOCS = "docs",
    NEWSLETTER = "newsletter",
    ABOUT = "about",
    CAREERS = "careers",
    VENTURES = "ventures",
    GRANTS = "grants"
}

export interface IChapterRoute {
    label: string
    queryParam: QueryParam
}

export interface IFooterRoute {
    id: number
    chapter: { label: string, path: string }
    routes: IChapterRoute[]
}