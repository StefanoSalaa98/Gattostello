import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'animate.css';
import MyLayout from './layouts/MyLayout'
import HomePage from './pages/HomePage'
import ChiSiamo from './pages/ChiSiamo'
import Unisciti from './pages/Unisciti'
import AdottaUnGatto from './pages/AdottaUnGatto';
import ExOspiti from './pages/ExOspiti';
import Info from './pages/Info';
import Eventi from './pages/Eventi';
import Sostienici from './pages/Sostienici'
import ScrollToTop from './components/ScrollToTop';
import NotFoundPage from './pages/NotFondPage';
import "./css/Animations.css";

// importo il provider context globale
import { GlobalProvider } from './contexts/GlobalContext';

function App() {



  return (
    <GlobalProvider>
      <BrowserRouter>
        {/* Questo componente ricarica la nuova pagina dall'inizio */}
        <ScrollToTop />
        <Routes>

          <Route element={<MyLayout />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/chi-siamo" element={<ChiSiamo />}></Route>
            <Route path="/sostienici" element={<Sostienici />}></Route>
            <Route path="/adotta">
              <Route index element={<AdottaUnGatto />}></Route>
              <Route path=":slug" element={<Info />} />
            </Route>
            <Route path="/ex-ospiti" element={<ExOspiti />}></Route>
            <Route path="/unisciti" element={<Unisciti />}></Route>
            <Route path="/eventi" element={<Eventi />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </GlobalProvider >
  )
}

export default App
