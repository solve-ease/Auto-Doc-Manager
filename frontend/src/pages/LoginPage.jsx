import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api.js'
import Button from '../components/Button.jsx'
import Input from '../components/InputForm.jsx'
import PasswordInput from '../components/PasswordInput.jsx'

const LoginPage = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(formData)
      if (response.ok) {
        const data = await response.json()
        const { accessToken, refreshToken } = data
        // Store the tokens in localStorage
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        // Redirect to dashboard or home page
        setIsAuthenticated(true)
        navigate('/dashboard')
      } else {
        alert('Login failed')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Log in to your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {error && <p className='text-red-500'>{error}</p>}
          <div className='rounded-md shadow-sm -space-y-px'>
            <Input
              type='email'
              name='email'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <PasswordInput
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Button
              type='submit'
              className='bg-blue-600 text-white hover:bg-blue-700'
            >
              Log in
            </Button>
          </div>
        </form>

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>
            Don&apos;t have an account?{' '}
            <Link
              to='/register'
              className='font-small text-blue-600 hover:text-blue-500'
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
