import s from './Header.module.scss';
import SearchIcon from '@/icons/search.svg?react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/Container';
import { Modal } from '@/components/Modal';
import { useModal } from '@/hooks/useModal';

export const Header: React.FC = (): React.JSX.Element => {
    const { isOpen, openModal, closeModal } = useModal();

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
                    <Button title={'Connect'} theme="dark" size="small" type="connectBtn" onClick={openModal} />
                    <Modal
                        isOpen={isOpen}
                        onClose={closeModal}
                        title="Подключение кошелька"
                    >
                        <p>Для работы с NFT-маркетплейсом подключите кошелек</p>
                    </Modal>
                </div>
            </Container>
        </header>
    )
}