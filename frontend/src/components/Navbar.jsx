import styled from 'styled-components'
import PropTypes from 'prop-types'
import Logo from '../assets/img/logo.png'
import indianFlag from '../assets/img/indian-flag.png'

const GoiNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #232323;
  color: white;
  padding: 0.2rem;
`
const GoiLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const GoiImg = styled.img`
  height: 20px;
`
const GoiText = styled.p`
  text-decoration: line-through;
`
const GoiOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`
const SkipBtn = styled.button``
const FontSmallBtn = styled.button``
const FontLargeBtn = styled.button``
const FontResetBtn = styled.button``
const ThemeBtn = styled.span`
  cursor: pointer;
`
const LangBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
`
const CurrentLang = styled.span``

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 2rem;
`
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const NavLogo = styled.img`
  height: 2.5rem;
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const NavLink = styled.a`
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`
const AuthLinks = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  gap: 5px;
`
const LoginBtn = styled.button``

const RegisterBtn = styled.button``

const Navbar = ({ lang, setLang }) => {
  return (
    <>
      <GoiNavbar>
        <GoiLogo>
          <GoiImg src={indianFlag} alt='national Amblem' />
          <GoiText>Government of India</GoiText>
        </GoiLogo>
        <GoiOptions>
          <SkipBtn>Skip to main content</SkipBtn> |
          <FontSmallBtn>A-</FontSmallBtn>
          <FontResetBtn>A</FontResetBtn>
          <FontLargeBtn>A+</FontLargeBtn> |
          <ThemeBtn className='material-symbols-outlined'>light_mode</ThemeBtn>{' '}
          |
          <LangBtn>
            <span className='material-symbols-outlined'>translate</span>
            <CurrentLang>{lang}</CurrentLang>
          </LangBtn>
        </GoiOptions>
      </GoiNavbar>
      <Nav>
        <LogoDiv>
          <NavLogo src={Logo} />
          <span className='font-bold'>
            AutoDoc <div>Verifier</div>
          </span>
        </LogoDiv>
        <NavLinks>
          <NavLink href='#home'>Home</NavLink>
          <NavLink href='#about'>About</NavLink>
          <NavLink href='#services'>Services</NavLink>
          <NavLink href='#contact'>Contact</NavLink>
        </NavLinks>
        <AuthLinks>
          <RegisterBtn className='btn'>Register</RegisterBtn>|
          <LoginBtn className='btn-outlined'>Login</LoginBtn>
        </AuthLinks>
      </Nav>
    </>
  )
}

Navbar.propTypes = {
  lang: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired
}
export default Navbar
