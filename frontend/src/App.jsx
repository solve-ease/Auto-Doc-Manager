import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { createGlobalStyle } from 'styled-components'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { updateAbilityFor } from './utils/defineAbility'
import { checkToken } from './utils/checkTokens'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'

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
  const [ability, setAbility] = useState(null)
  const [defaultSize, setDefaultSize] = useState(16)
  const [lang, setLang] = useState('en')
  const [user, setUser] = useState({ role: null }) // Replace with actual user data
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkToken()
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error checking token:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    setAbility(updateAbilityFor(user))
  }, [user])
  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <BrowserRouter>
      <GlobalStyle defaultSize={defaultSize} />
      <Navbar
        lang={lang}
        setLang={setLang}
        setDefaultSize={setDefaultSize}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
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
          path='/about'
          element={
            <>
              <AboutPage />
            </>
          }
        />
        <Route
          path='/services'
          element={
            <>
              <ServicesPage />
            </>
          }
        />
        <Route
          path='/contact'
          element={
            <>
              <ContactPage />
            </>
          }
        />
        <Route
          path='/dashboard'
          element={
            isAuthenticated ? (
              <Dashboard
                user={user}
                setUser={setUser}
                ability={ability}
                setAbility={setAbility}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/login'
          element={
            <>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </>
          }
        />
        <Route
          path='/register'
          element={
            <>
              <Register
                setUser={setUser}
                setIsAuthenticated={setIsAuthenticated}
              />
            </>
          }
        />
      </Routes>
      <Footer />
      <ScrollToTop />
    </BrowserRouter>
  )
}

export default App
