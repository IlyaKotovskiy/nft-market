import { Provider } from "mobx-react";
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from '@/router/routes'
import { Layout } from './components/Layout'
import { Slide, ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usersStore } from "./stores/usersStore";

const toastOptions: ToastContainerProps = {
  position: "top-center",
  autoClose: 2500,
  limit: 5,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
  transition: Slide,
  className: "custom-toast"
};

const stores = {
  usersStore,
}

export const App: React.FC = (): React.JSX.Element => {
  return (
    <Provider {...stores}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>

      <ToastContainer {...toastOptions} />
    </Provider>
  );
};
