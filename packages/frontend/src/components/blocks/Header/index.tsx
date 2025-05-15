import s from './Header.module.scss';
import SearchIcon from '@/icons/search.svg?react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/UI/Button';
import { Container } from '@/components/Container';
import { Modal } from '@/components/UI/Modal';
import { navRoutes } from '@/constants/header';
import { useModal } from '@/hooks/useModal';
import { useEffect, useState } from 'react';
import { EIP6963ProviderDetail } from '@/types/web3.providers';
import { useSyncProviders } from '@/hooks/useSyncProviders';
import { formatAddress } from '@/utils';
import { Dropdown } from '@/components/UI/Dropdown';
import { authUser } from '@/api/authUser';
import { MOCK_CATEGORIES_DROPDOWN } from '@/mocks/categoriesData';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { VscDebugDisconnect } from "react-icons/vsc";
import { RiNftFill } from "react-icons/ri";
import ConnectIcon from '@/icons/connect_wallet_icon.svg?react';
import { toast } from 'react-toastify';
import { Form } from '@/components/UI/Form';
import { updateUser } from '@/api/updateUser';
import { usersStore } from '@/stores/usersStore';
import { observer } from 'mobx-react';

export const Header: React.FC = observer((): React.JSX.Element => {
    const storageWallet = localStorage.getItem('wallet_address');
    const { curUser, curUserWallet, setUserWallet, updateCurUserFields } = usersStore;

    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
    const providers = useSyncProviders();
    const { isOpen, openModal, closeModal } = useModal();
    const [modalType, setModalType] = useState<string>("");

    const formFields = [
        {
            id: 1,
            name: "username",
            label: "Имя пользователя",
            type: "text",
            rules: { required: "Имя пользователя обязательно" },
        },
        {
            id: 2,
            name: "email",
            label: "Почта пользователя",
            type: "email",
            rules: { required: "Почта обязательна" },
        }
    ];

    const modalTitleVariables = {
        wallet: 'Connect Wallet',
        username: 'Change Your Profile',
        disconnect: 'Wallet Disconnect'
    }

    const handleConnectWallet = async (providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = await providerWithInfo.provider.request({
                method: "eth_requestAccounts"
            });

            setSelectedWallet(providerWithInfo);

            setUserWallet(accounts[0]);
            localStorage.setItem('wallet_address', accounts[0]);
            const response = await authUser(accounts[0]);

            toast.success(response.message);

            closeModal();
        } catch (error) {
            console.error(error);
        }
    }

    const handleDisconnectWalet = () => {
        setUserWallet("");
        setSelectedWallet(null);

        localStorage.removeItem('wallet_address');

        closeModal();
        toast.success("Wallet disconnected!");
    }

    const handleCopyWalletAddress = async () => {
        try {
            await navigator.clipboard.writeText(curUserWallet);
            toast.success('Wallet address copied!');
        } catch (error) {
            console.error('Failed to copy wallet address:', error);
        }
    }

    const fetchUserData = async (wallet_address: string) => {
        try {
            await usersStore.fetchCurUser(wallet_address);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    const handleButtonClick = (type: string) => {
        setModalType(type);
        if (type !== 'wallet' || !curUserWallet) openModal();
    };

    const onSubmit = async (data: { email?: string, username?: string }) => {
        await toast.promise(updateUser(curUser.id, data.username, data.email), { pending: "Данные отправляются", success: "Данные пользователя изменены!", error: "Что-то пошло не так" });
        updateCurUserFields(data);
    }

    useEffect(() => {
        if (storageWallet) {
            setUserWallet(storageWallet);
            fetchUserData(storageWallet);
        }
    }, [storageWallet]);

    return (
        <header>
            <Container>
                <div className={s.wrapper}>
                    <Logo />
                    <Dropdown
                        trigger={<Button title="Explore" theme="yellow" size="small" btnType="headerBtn" />}
                        menuClassName={s.dropdownMenuExplore}
                    >
                        {MOCK_CATEGORIES_DROPDOWN.map(category => (
                            <Link key={category.id} to={category.path} className={s.dropdownItemExplore}>
                                <category.icon className={s.icon} />
                                {category.name}
                            </Link>
                        ))}
                    </Dropdown>
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
                    <Dropdown
                        trigger={<Button title={curUserWallet ? formatAddress(curUserWallet) : "Connect"} theme="dark" size="small" btnType="connectBtn" onClick={() => handleButtonClick('wallet')} />}
                        wrapperClassName={s.dropdownWrapperWallet}
                        menuClassName={s.dropdawnMenuWallet}
                    >
                        {curUserWallet &&
                            <div className={s.walletDropdawn}>
                                <div className={s.dropdownItemWallet} onClick={handleCopyWalletAddress}>
                                    <ConnectIcon />
                                    Copy wallet address
                                </div>
                                <div className={s.dropdownItemWallet} onClick={() => handleButtonClick('username')}>
                                    <FaRegUserCircle />
                                    Profile
                                </div>
                                {curUser?.role === 'admin' && <Link to={'/create-nft'} className={s.dropdownItemWallet}>
                                    <RiNftFill />
                                    Create NFT
                                </Link>}
                                {curUser?.role === 'admin' && <Link to={'/admin'} className={s.dropdownItemWallet}>
                                    <TbDeviceIpadMinus />
                                    Admin page
                                </Link>}
                                <div className={s.dropdownItemWallet} onClick={() => handleButtonClick('disconnect')}>
                                    <VscDebugDisconnect />
                                    Disconnect
                                </div>
                            </div>
                        }
                    </Dropdown>
                    <Modal
                        isOpen={isOpen}
                        onClose={closeModal}
                        title={modalTitleVariables[modalType]}
                    >
                        {modalType === 'wallet'
                            ? (
                                <div>
                                    <p className={s.modalDescription}>To work with the NFT marketplace, <br /> connect your wallet</p>
                                    <hr className={s.modalBorder} />
                                    <div className={s.providers}>
                                        {providers
                                            ? providers.map((provider: EIP6963ProviderDetail) => (
                                                <button className={s.provider} key={provider.info.uuid} onClick={() => handleConnectWallet(provider)}>
                                                    <img src={provider.info.icon} alt={provider.info.name} />
                                                    {provider.info.name}
                                                </button>))
                                            : <p>You don't have any downloaded wallets.</p>
                                        }
                                    </div>
                                </div>
                            )
                            : modalType === 'username'
                            ? (
                                <Form
                                    labelTheme='var(--color-navy-medium)'
                                    fields={formFields}
                                    btnText='Change'
                                    btnType='submit'
                                    onSubmit={onSubmit}
                                    defaultValues={{ username: curUser?.username, email: curUser?.email }}
                                />
                            )
                            : modalType === 'disconnect'
                            && (<div>
                                <p className={s.modalDescription}>Are you sure you want to log out of your wallet?</p>
                                <div className={s.modalDisconnectWrap}>
                                    <Button title='Yes, get out' theme='yellow' size='small' onClick={handleDisconnectWalet} />
                                    <Button title='No, stay' theme='dark-secondary' size='small' onClick={closeModal} />
                                </div>
                            </div>
                            )
                        }
                    </Modal>
                </div>
            </Container>
        </header>
    )
});