import { Route, Routes } from "react-router-dom"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { CollectionPage } from "@/pages/CollectionPage"
import { AdminPage } from "@/pages/AdminPage"
import { CreateNFTPage } from "@/pages/CreateNFTPage"

export const AppRoutes: React.FC = (): React.JSX.Element => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/collections/:category' element={<CollectionPage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/create-nft' element={<CreateNFTPage />} />

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}