import Docs from './Docs'
import IssueDoc from './IssueDoc'
import IssueDocumentForm from './UploadDoc'
import { updateAbilityFor } from '../utils/defineAbility'
import { useEffect } from 'react'
import { checkToken } from '../utils/checkTokens'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from '../components/AdminDashboard'

function Dashboard({ user, setUser, ability, setAbility, showAlert }) {
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkToken()
        if (userData) {
          setUser(userData)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error checking token:', error)
        navigate('/login')
      }
    }

    fetchUserData()
  }, [])
  useEffect(() => {
    setAbility(updateAbilityFor(user))
    if (ability) {
      console.log('Updated abilities:', ability.rules)
    }
  }, [user])
  return (
    <>
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'user' && <Docs />}
      {user.role === 'issuer' && <IssueDocumentForm showAlert={showAlert} />}
      {user.role === 'verifier' && <h1>Dashboard in creation</h1>}
    </>
  )
}

export default Dashboard
