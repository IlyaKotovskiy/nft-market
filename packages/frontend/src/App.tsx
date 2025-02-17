import { BrowserRouter as Router } from '@/router'
import { AppRoutes } from '@/router/routes'
import { Layout } from './components/Layout'

export const App: React.FC = (): React.JSX.Element => {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  )
}
