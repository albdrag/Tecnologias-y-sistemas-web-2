import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import NavBar from "./components/navBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Acercade from "./pages/acercade";
import Variables from "./pages/variables";
import Funciones from "./pages/funciones";
import Modulos from "./pages/modulos";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/acercade" element={<Acercade />} />
      <Route path="/variables" element={<Variables />} />
      <Route path="/funciones" element={<Funciones />} />
      <Route path="/modulos" element={<Modulos />} />
    </Routes>
  </BrowserRouter>
);


