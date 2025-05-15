import s from './AdminPage.module.scss';
import { Container } from '@/components/Container';
import { useEffect } from 'react';
import { usersStore } from '@/stores/usersStore';
import { PreLoader } from '@/components/PreLoader';
import { withRoleCheck } from '@/HOCs/withRoleCheck';
import { observer } from 'mobx-react-lite';

const AdminPageContent: React.FC = observer((): React.JSX.Element => {
    const { curUser, userCount, isLoading } = usersStore;

    const fetchData = async () => {
        await usersStore.fetchUsers();
    }

    useEffect(() => {
        if (userCount === 0) {
            fetchData();
        }
    }, [userCount]);

    return (
        <>
            <PreLoader isVisible={isLoading} />

            <section className={s.section}>
                <Container>
                    <h1 className={s.title}>Приветствую, {curUser?.username || 'администрулькин'}! 👋</h1>
                    <h2>Небольшая статистика</h2>
                    <p>Количество пользователей: {userCount}</p>
                </Container>
            </section>
        </>
    )
});

export const AdminPage = withRoleCheck(['admin'], AdminPageContent);