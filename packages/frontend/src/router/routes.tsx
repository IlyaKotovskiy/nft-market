import { Route, Routes } from "@/router"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export const AppRoutes: React.FC = (): React.JSX.Element => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />

            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}