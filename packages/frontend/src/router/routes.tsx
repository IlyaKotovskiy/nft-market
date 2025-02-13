import { Route, Routes } from "@/router"
import { HomePage } from "@/pages/HomePage"

export const AppRoutes: React.FC = (): React.JSX.Element => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
        </Routes>
    )
}