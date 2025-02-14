import s from './Footer.module.scss';
import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/UI/Button';
import { footRoutes } from '@/constants/footer';
import FormIcon from '@/icons/footer/email.svg?react';
import { MediaLinks } from '@/components/MediaLinks';

export const Footer: React.FC = (): React.JSX.Element => {
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
                        <MediaLinks theme="dark" />
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