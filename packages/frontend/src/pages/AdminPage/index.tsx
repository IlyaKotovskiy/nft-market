/* eslint-disable react-hooks/exhaustive-deps */
import s from './AdminPage.module.scss';
import { Container } from '@/components/Container';
import { NFTForm } from '@/components/UI/NFTForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { usersStore } from '@/stores/usersStore';
import { PreLoader } from '@/components/PreLoader';

export const AdminPage: React.FC = observer((): React.JSX.Element => {
    const navigate = useNavigate();
    const { curUser: user, users, isLoading } = usersStore;

    const checkAuthAndFetchData = async () => {
        const walletAddress = localStorage.getItem('wallet_address');

        if (!walletAddress) {
            navigate('/404');
            return;
        }

        try {
            await usersStore.fetchCurUser(walletAddress);

            if (!usersStore.curUser || usersStore.curUser.role !== 'admin') {
                navigate('/404');
                return;
            }

            await usersStore.fetchUsers();
        } catch (error) {
            console.error('Admin page error:', error);
            navigate('/404');
        }
    }

    useEffect(() => {
        checkAuthAndFetchData();
    }, []);

    if (!user || user.role !== 'admin') {
        return <PreLoader isVisible={isLoading} />;
    }

    return (
        <>
            <PreLoader isVisible={isLoading} />
            
            <section className={s.section}>
                <Container>
                    <h1 className={s.title}>Приветсвтую, {user.username || 'администрулькин'}! 👋</h1>
                    <h2>Небольшая статистика</h2>
                    <p>Количество пользователей: {users.length}</p>
                    <h2 className={s.subTitle}>Создать NFT</h2>
                    <NFTForm ownerId={user.id} />
                </Container>
            </section>
        </>
    )
});