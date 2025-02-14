import s from './MediaLinks.module.scss';
import { IMediaLinksProps } from '@/types/mediaLinks';
import { mediaLinks } from '@/constants/mediaLinks';
import TelegramIcon from '@/icons/footer/tg.svg?react';
import DiscordIcon from '@/icons/footer/ds.svg?react';
import TwitterIcon from '@/icons/footer/tw.svg?react';
import InstagramIcon from '@/icons/footer/inst.svg?react';

export const MediaLinks: React.FC<IMediaLinksProps> = ({ theme }): React.JSX.Element => {
    const iconsMap: Record<string, React.JSX.Element> = {
        telegram: <TelegramIcon />,
        discord: <DiscordIcon />,
        twitter: <TwitterIcon />,
        instagram: <InstagramIcon />
    }

    return (
        <div className={s.links}>
            {mediaLinks.map(link => (
                <a key={link.id} href={link.path} className={`${s.link} ${s[`theme-${theme}`]}`}>
                    {iconsMap[link.name]}
                </a>
            ))}
        </div>
    )
};