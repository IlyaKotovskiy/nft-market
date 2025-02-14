import s from './Sponsors.module.scss';
import WetransferIcon from "@/icons/sponsors/wetransfer.svg?react";
import PentagramIcon from "@/icons/sponsors/pentagram.svg?react";
import WalmartIcon from "@/icons/sponsors/walmart.svg?react";
import SlackIcon from "@/icons/sponsors/slack.svg?react";
import BuzzfeedIcon from "@/icons/sponsors/buzzfeed.svg?react";
import DogneshutIcon from "@/icons/sponsors/dognes-hut.svg?react";
import { Container } from '@/components/Container';
import { sponsorsData } from '@/mocks/sponsorsData';

export const Sponsors: React.FC = (): React.JSX.Element => {
    const sponsorsMap: Record<string, React.JSX.Element> = {
        wetransfer: <WetransferIcon />,
        pentagram: <PentagramIcon />,
        walmart: <WalmartIcon />,
        slack: <SlackIcon />,
        buzzfeed: <BuzzfeedIcon />,
        dogneshut: <DogneshutIcon />,
    }

    return (
        <section className={s.section}>
            <Container>
                <div className={s.sponsors}>
                    {sponsorsData.map(sponsor => (
                        <div key={sponsor.id}>
                            {sponsorsMap[sponsor.name]}
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
};