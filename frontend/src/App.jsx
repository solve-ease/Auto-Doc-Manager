import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { createGlobalStyle } from 'styled-components'
import UploadDoc from './pages/UploadDoc'
import Navbar from './components/Navbar'
import { useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-default: ${({ defaultSize }) => defaultSize}px;
    --font-ex-large: ${({ defaultSize }) => defaultSize * 2.25}px; /* 36px */
    --font-large: ${({ defaultSize }) => defaultSize * 2}px; /* 32px */
    --font-medium: ${({ defaultSize }) => defaultSize * 1.5}px; /* 24px */
    --font-mid-medium: ${({ defaultSize }) =>
      defaultSize * 1.15}px; /* 18.4px */
    --font-small: ${({ defaultSize }) => defaultSize * 0.85}px; /* 13.6px */
    --font-ex-small: ${({ defaultSize }) => defaultSize * 0.7}px; /* 11.2px */
  }
`

function App() {
  const [defaultSize, setDefaultSize] = useState(16)
  const [lang, setLang] = useState('en')

  return (
    <BrowserRouter>
      <GlobalStyle defaultSize={defaultSize} />
      <Navbar lang={lang} setLang={setLang} setDefaultSize={setDefaultSize} />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path='/upload'
          element={
            <>
              <UploadDoc />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path='/register'
          element={
            <>
              <RegisterPage />
            </>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
