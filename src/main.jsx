import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import './index.css'
import App from './App.jsx'
import Toaster from "./Utils/toaster.jsx";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <>
      <Toaster />
      <App />
    </>
  </Provider>
)
