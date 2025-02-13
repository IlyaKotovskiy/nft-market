import { Layout } from './components/Layout'
import { AppRouter } from './router'

export const App: React.FC = (): React.JSX.Element => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  )
}
