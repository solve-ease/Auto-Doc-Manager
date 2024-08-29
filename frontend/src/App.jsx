import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import UploadDoc from './pages/UploadDoc'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
function App() {
  const [lang, setLang] = useState('en')
  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <UploadDoc />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
