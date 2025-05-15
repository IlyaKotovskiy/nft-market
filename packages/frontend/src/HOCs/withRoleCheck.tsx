import { PreLoader } from "@/components/PreLoader";
import { usersStore } from "@/stores/usersStore";
import { observer } from "mobx-react-lite"
import { ComponentType, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const withRoleCheck = (allowedRoles: string[], Component: ComponentType) => {
    return observer(() => {
        const navigate = useNavigate();
        const { curUser, isLoading } = usersStore;

        useEffect(() => {
            const walletAddress = localStorage.getItem('wallet_address');

            if (!walletAddress) {
                navigate('/404');
                return;
            }

            if (!curUser || !allowedRoles.includes(curUser.role)) {
                navigate('/404');
            }
        }, [curUser, navigate]);

        if (isLoading) return <PreLoader isVisible={true} />

        return <Component />
    });
};