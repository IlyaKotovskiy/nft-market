import s from './Header.module.scss';
import SearchIcon from '../../../icons/search.svg?react';
import { Logo } from "../../Logo"
import { Button } from "../../UI/Button"
import { Container } from '../../Container';

export const Header: React.FC = (): React.JSX.Element => {
    const navRoutes = {
        stats: '/stats',
        resources: '/resources',
        create: '/create'
    }

    return (
        <header>
            <Container>
                <div className={s.wrapper}>
                    <Logo />
                    <Button title="Explore" theme="yellow" size="small" type="headerBtn" />
                    <form className={s.form}>
                        <input type="text" name="search" placeholder="Search" autoComplete="off" />
                        <button type="submit">
                            <SearchIcon />
                        </button>
                    </form>
                    <nav>
                        {Object.entries(navRoutes).map(([label, path]) => (
                            <a key={label} href={path}>{label.toUpperCase()}</a>
                        ))}
                    </nav>
                    <Button title="Connect" theme="dark" size="small" type="connectBtn" />
                </div>
            </Container>
        </header>
    )
}