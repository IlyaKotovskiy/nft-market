import s from './Header.module.scss';
import SearchIcon from '@/icons/search.svg?react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/Container';
import { Modal } from '@/components/UI/Modal';
import { navRoutes } from '@/constants/header';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import { EIP6963ProviderDetail } from '@/types/web3.providers';
import { useSyncProviders } from '@/hooks/useSyncProviders';
import { formatAddress } from '@/utils';
import { p } from 'framer-motion/client';

export const Header: React.FC = (): React.JSX.Element => {
    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
    const [userAccount, setUserAccount] = useState<string>("")
    const providers = useSyncProviders()
    const { isOpen, openModal, closeModal } = useModal();

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
            })

            setSelectedWallet(providerWithInfo)
            setUserAccount(accounts?.[0])
            closeModal()
        } catch (error) {
            console.error(error)
        }
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
                    <Button title={userAccount ? formatAddress(userAccount) : "Connect"} theme="dark" size="small" type="connectBtn" onClick={openModal} />
                    <Modal
                        isOpen={isOpen}
                        onClose={closeModal}
                        title="Connect Wallet"
                    >
                        <div>
                            <p className={s.modalDescription}>To work with the NFT marketplace, <br /> connect your wallet</p>
                            <hr className={s.modalBorder} />
                            <div className={s.providers}>
                                {providers
                                    ? providers.map((provider: EIP6963ProviderDetail) => (
                                    <button className={s.provider} key={provider.info.uuid} onClick={() => handleConnect(provider)}>
                                        <img src={provider.info.icon} alt={provider.info.name} />
                                        {provider.info.name}
                                    </button>))
                                    : <p>You don't have any downloaded wallets.</p>
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
            </Container>
        </header>
    )
}