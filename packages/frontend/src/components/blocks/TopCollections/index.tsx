import s from './TopCollections.module.scss';
import { Container } from '@/components/Container';
import TonIcon from "@/icons/ton.svg?react";
import CheckMarkIcon from "@/icons/check-mark.svg?react";

const MOCK_TOP_COLLECTIONS_DATA = [
    { id: 1, username: 'Otherdeed for Other...', userAvatar: "/usersAvatars/1.png", price: { min: 3.02, max: 1893.53 }, percntg: { method: "plus", val: 8.84 }, isCheck: true},
    { id: 2, username: 'Bored Ape Yacht Club', userAvatar: "/usersAvatars/2.png", price: { min: 91, max: 1193.98 }, percntg: { method: "minus", val: 23.56 }, isCheck: true },
    { id: 3, username: 'Moonrunners Official', userAvatar: "/usersAvatars/3.png", price: { min: 3.02, max: 1004.12 }, percntg: { method: "minus", val: 26.71 }, isCheck: true },
    { id: 4, username: 'Gossamer Seed', userAvatar: "/usersAvatars/4.png", price: { min: 0.47, max: 1694.93 }, percntg: { method: "plus", val: 369.20 }, isCheck: false },
    { id: 5, username: 'Mutant Ape Yach Club', userAvatar: "/usersAvatars/5.png", price: { min: 18.1, max: 1597.15 }, percntg: { method: "minus", val: 28.55 }, isCheck: true },
    { id: 6, username: 'Cyber Galz - Galz', userAvatar: "/usersAvatars/6.png", price: { min: 0.1, max: 5447.58 }, percntg: { method: "plus", val: 45110.31 }, isCheck: true },
    { id: 7, username: 'ENS: Ethereum Name...', userAvatar: "/usersAvatars/7.png", price: { min: 0.0004, max: 1447.58 }, percntg: { method: "plus", val: 158.36 }, isCheck: true },
    { id: 8, username: 'Art Blocks Curated', userAvatar: "/usersAvatars/8.png", price: { min: null, max: 1397.66 }, percntg: { method: "plus", val: 121.06 }, isCheck: false },
    { id: 9, username: 'Moonturtlez', userAvatar: "/usersAvatars/9.png", price: { min: 0.03, max: 1396.15 }, percntg: null, isCheck: true },
]

export const TopCollections: React.FC = (): React.JSX.Element => {
    return (
        <section className={s.topCollections}>
            <Container>
                <h2 className="section-title">Top collections over <span>last 24 hours</span></h2>
                <div className={s.collections}>
                    {MOCK_TOP_COLLECTIONS_DATA.map(item => (
                        <div key={item.id} className={s.collection}>
                            <span className={s.number}>{item.id}</span>
                            <img src={item.userAvatar} alt={item.username} />
                            <div className={s.leftWrap}>
                                <h3>{item.username}</h3>
                                <span>
                                    Floor Price:
                                    <TonIcon />
                                    {item.price.min}
                                </span>
                            </div>
                            <div className={s.rightWrap}>
                                <span className={`${s.prcntg} ${s[item.percntg?.method]}`}>
                                    {item.percntg === null ? "-" : `${item.percntg.method === "minus" ? "-" : "+"}${item.percntg.val}%` }
                                </span>
                                <span className={s.vol}>
                                    <TonIcon />
                                    {item.price.max}
                                </span>
                            </div>
                            {item.isCheck &&
                                <div className={s.checkMark}>
                                    <CheckMarkIcon />
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
};