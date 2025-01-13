import Docs from './Docs'
import IssueDoc from './IssueDoc'
import IssueDocumentForm from './UploadDoc'
import { updateAbilityFor } from '../utils/defineAbility'
import { useEffect } from 'react'
import { checkToken } from '../utils/checkTokens'
import { useNavigate } from 'react-router-dom'

function Dashboard({ user, setUser, ability, setAbility }) {
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkToken()
        console.log('userData:', userData)
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
    <div className='flex flex-col items-center justify-center'>
      <h1 className='font-large my-5 font-mid-bold'>Dashboard</h1>
      {ability && console.log(ability.can(('read', 'Document')))}
      {ability && ability.can('read', 'Document') && <Docs />}
      {ability && ability.can('create', 'Document') && <IssueDocumentForm />}
    </div>
  )
}

export default Dashboard
