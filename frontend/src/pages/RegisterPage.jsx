import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api.js'
import Button from '../components/Button.jsx'
import Input from '../components/RegisterInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.username) newErrors.username = 'Username is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.password2) {
      newErrors.password2 = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const { password2, ...registrationData } = formData

        registrationData.password2 = registrationData.password
        // delete registrationData.password

        console.log('Registration data : ')
        console.log(registrationData)

        const response = await register(registrationData)
        const { access_token, refresh_token } = response.tokens
        // Store JWT tokens in localStorage
        console.log('My tokens : ')
        console.log(access_token, refresh_token)

        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)

        // Registration successful, redirect to the dashboard or login page
        navigate('/dashboard')
      } catch (error) {
        // Handle registration errors
        setErrors({ general: error.message })
      }
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create an account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          {errors.general && <p className='text-red-500'>{errors.general}</p>}
          <div className='rounded-md shadow-sm -space-y-px'>
            <Input
              type='email'
              name='email'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            <Input
              type='text'
              name='username'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
              error={errors.username}
            />
            <Input
              type='text'
              name='firstName'
              placeholder='First name'
              value={formData.firstName}
              onChange={handleChange}
              required
              error={errors.firstName}
            />
            <Input
              type='text'
              name='lastName'
              placeholder='Last name'
              value={formData.lastName}
              onChange={handleChange}
              required
              error={errors.lastName}
            />
            <PasswordInput
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
              error={errors.password}
            />
            <PasswordInput
              name='password2'
              placeholder='Confirm password'
              value={formData.password2}
              onChange={handleChange}
              required
              error={errors.password2}
            />
          </div>

          <div>
            <Button
              type='submit'
              className='bg-blue-600 text-white hover:bg-blue-700'
            >
              Register
            </Button>
          </div>
        </form>

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-small text-blue-600 hover:text-blue-500'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
