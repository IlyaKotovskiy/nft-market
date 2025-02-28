import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from '@/router/routes'
import { Layout } from './components/Layout'
import { PreLoader } from '@/components/PreLoader'
import { useState, useEffect } from 'react';

export const App: React.FC = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const handlePreLoaderComplete = () => {
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <>
      <PreLoader isVisible={isLoading} onComplete={handlePreLoaderComplete} />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </>
  );
};
