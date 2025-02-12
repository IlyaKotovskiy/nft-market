import s from './Footer.module.scss';
import { Container } from '../../Container';
import { Logo } from '../../Logo';
import { Button } from '../../UI/Button';
import FormIcon from '../../../icons/footer/email.svg?react';
import TelegramIcon from '../../../icons/footer/tg.svg?react';
import DiscordIcon from '../../../icons/footer/ds.svg?react';
import TwitterIcon from '../../../icons/footer/tw.svg?react';
import InstagramIcon from '../../../icons/footer/inst.svg?react';

enum QueryParam {
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

interface IFooterLink {
    id: number,
    icon: React.JSX.Element,
    path: string
}

interface IChapterRoute {
    label: string
    queryParam: QueryParam
}

interface IFooterRoute {
    id: number
    chapter: { label: string, path: string }
    routes: IChapterRoute[]
}

export const Footer: React.FC = (): React.JSX.Element => {
    const links: IFooterLink[] = [
        { id: 1, icon: <TelegramIcon />, path: '/' },
        { id: 2, icon: <DiscordIcon />, path: '/' },
        { id: 3, icon: <TwitterIcon />, path: '/' },
        { id: 4, icon: <InstagramIcon />, path: '/' },
    ]

    const footRoutes: IFooterRoute[] = [
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
                { label: "", queryParam: QueryParam.GRANTS },
            ]
        }
    ];

    return (
        <footer>
            <Container>
                <div className={s.wrapper}>
                    <div className={s.leftSide}>
                        <div className={s.logo}>
                            <Logo />
                        </div>
                        <div className={s.stayForm}>
                            <h4>Stay in the loop</h4>
                            <p>Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.</p>
                            <form className={s.form}>
                                <label>
                                    <FormIcon />
                                    <input type="text" name="email" placeholder="Enter email address" />
                                </label>
                                <Button theme="yellow" title="Send" size="large" />
                            </form>
                        </div>
                        <div className={s.links}>
                            {links.map(link => (
                                <a key={link.id} href={link.path} className={s.link}>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className={s.rightSide}>
                        {footRoutes.map(section => (
                            <div key={section.id} className={s.chapter}>
                                <h4>{section.chapter.label}</h4>
                                <ul className={s.chapterList}>
                                    {section.routes.map(route => (
                                        <li key={route.label}>
                                            <a href={`${section.chapter.path}?category=${route.queryParam}`}>
                                                {route.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.legal}>
                    <p>©{new Date().getFullYear()} Ozone Networks, Inc</p>
                    <div className={s.legalLinks}>
                        <p>Privacy Police</p>
                        <p>Terms Of Service</p>
                    </div>
                </div>
            </Container>
        </footer>
    )
};