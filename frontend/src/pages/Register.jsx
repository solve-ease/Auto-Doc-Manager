import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api.js'
import Button from '../components/Button.jsx'
import Input from '../components/RegisterInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import avatartIcon from '../assets/img/avatar_icon.png'
import PropTypes from 'prop-types'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    password2: '',
    verifyWith: 'Aadhar',
    verificationNumber: '',
    otp: '',
    address: '',
    image: ''
  })
  useEffect(() => {
    console.log(formData.image)
  }, [formData.image])
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  //flag for slide animation other things were not working
  const [flag, setFlag] = useState(true)
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

  const handleStepInc = () => {
    setCurrentStep((prev) => prev + 1)
    setFlag(false)
    setTimeout(() => {
      setFlag(true)
    }, 50)
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
    if (!formData.verificationNumber)
      newErrors.verificationNumber = 'Verification number is required'
    if (!formData.otp) newErrors.otp = 'OTP is required'
    if (!formData.address) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const { password2, ...registrationData } = formData
        registrationData.password2 = registrationData.password
        console.log('Registration data:', registrationData)
        const response = await register(registrationData)
        const { access_token, refresh_token } = response.tokens
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('refreshToken', refresh_token)
        navigate('/dashboard')
      } catch (error) {
        setErrors({ general: error.message })
      }
    }
  }

  return (
    <div className='flex-grow flex items-center py-12'>
      <div className='flex flex-col md:flex-row'>
        {/* Left side */}
        <div className='bg-blue-500 text-white h-[70vh] w-[50vw] p-8 flex flex-col justify-center items-center rounded-r-2xl'>
          <h2 className='text-3xl font-bold mb-4'>Hi User!</h2>
          <p className='mb-8 text-center'>
            Sign Up for better and complete access
          </p>
          <div className='relative w-48 h-48 rounded-full bg-[#e9e9e9] flex items-center justify-center'>
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt='User Avatar'
                className='rounded-full object-cover w-full h-full'
              />
            ) : (
              <span className='material-symbols-outlined rounded-full object-cover text-[8rem] text-black font-light'>
                person
              </span>
            )}
            <ImageInput setFormData={setFormData} />
          </div>
        </div>

        {/* Right side */}
        <div className='py-8 px-20 overflow-hidden relative'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {currentStep === 1 && (
              <div
                className={`transition-transform duration-500 ${
                  currentStep === 1 ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <h2 className='text-5xl font-bold mb-8'>
                  Welcome to <span className='text-blue-500'>DockChecker</span>
                </h2>
                <Input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />
                <PasswordInput
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />
                <Button
                  onClick={() => {
                    handleStepInc()
                  }}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Verify Email
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 2 && flag ? 1 : 0,
                  transform:
                    currentStep === 2 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
              >
                <h2 className='text-5xl mb-8'>Choose a Role</h2>
                <div className='flex gap-10 flex-wrap justify-center'>
                  <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center h-[25vh] w-[15vw] '>
                    <span className='material-symbols-outlined text-6xl'>
                      apartment
                    </span>
                    <div className='text-md mb-2'>Issuing Authority</div>
                  </div>
                  <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center'>
                    <span className='material-symbols-outlined text-6xl'>
                      apartment
                    </span>
                    <div className='text-md mb-2'>Verifying Authority</div>
                  </div>
                  <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center'>
                    <span className='material-symbols-outlined text-6xl'>
                      apartment
                    </span>
                    <div className='text-md mb-2'>User</div>
                  </div>
                </div>
                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} />
                  <Button
                    onClick={() => {
                      handleStepInc()
                    }}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Create
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 3 && flag ? 1 : 0,
                  transform:
                    currentStep === 3 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
              >
                <div>
                  <label
                    htmlFor='verifyWith'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Verify with
                  </label>
                  <select
                    id='verifyWith'
                    name='verifyWith'
                    value={formData.verifyWith}
                    onChange={handleChange}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
                  >
                    <option>Aadhar</option>
                    <option>Mobile number</option>
                    <option>PAN card</option>
                    <option>Ration Card</option>
                  </select>
                </div>
                <Input
                  type='text'
                  name='verificationNumber'
                  placeholder='Your verification number'
                  value={formData.verificationNumber}
                  onChange={handleChange}
                  required
                  error={errors.verificationNumber}
                />
                <Input
                  type='text'
                  name='otp'
                  placeholder='One time Password'
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  error={errors.otp}
                />
                <Input
                  type='text'
                  name='address'
                  placeholder='Your current address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                  error={errors.address}
                />
                <div className='flex items-center'>
                  <input
                    id='terms'
                    name='terms'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                    required
                  />
                  <label
                    htmlFor='terms'
                    className='ml-2 block text-sm text-gray-900'
                  >
                    I agree with all the terms and conditions of DockChecker
                  </label>
                </div>
                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} />
                  <Button
                    onClick={() => {
                      handleStepInc()
                    }}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Create
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

const PrevBtn = ({ setStep }) => {
  return (
    <Button
      onClick={() => {
        setStep((prev) => prev - 1)
      }}
      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
    >
      Prev
    </Button>
  )
}

const ImageInput = ({ setFormData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [flag, setFlag] = useState(false)
  const menuRef = useRef(null)
  const menuBtnRef = useRef(null)
  const inputRef = useRef(null)
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuBtnRef.current.contains(event.target)
    ) {
      handleMenuClose()
    }
  }
  const handleMenuClose = () => {
    setFlag(false)
    setTimeout(() => {
      setIsOpen(false)
    }, 50)
  }
  const handleMenuOpen = () => {
    setIsOpen(true)
    setTimeout(() => {
      setFlag(true)
    }, 50)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file
      }))
      inputRef.current.value = null // Reset the input value
    }
  }
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside)
    } else {
      window.removeEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='absolute bottom-2 right-0'>
      <div className='bg-white rounded-full p-2 shadow-lg flex flex-col items-center justify-center'>
        <button
          ref={menuBtnRef}
          className='text-blue-500 hover:text-blue-700'
          onClick={() => {
            handleMenuOpen()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        </button>
      </div>
      <div
        ref={menuRef}
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col bg-white text-black rounded-md absolute top-0 w-[14vw] border border-black overflow-hidden`}
        style={{
          transition: 'all 300ms',
          height: isOpen && flag ? '360%' : '100%',
          opacity: isOpen && flag ? 1 : 0.1,
          transform: isOpen && flag ? 'translateY(0)' : 'translateY(-10%)'
        }}
      >
        <span className='flex items-center gap-2 relative p-3 hover:bg-blue-200'>
          <span className='material-symbols-outlined'>image</span>
          <p>Upload image</p>
          <input
            ref={inputRef}
            type='file'
            className='absolute top-0 left-0 height-[100%] opacity-[0]'
            onChange={(e) => {
              handleImageChange(e)
            }}
          />
        </span>
        <span
          className='flex items-center gap-2 p-3 hover:bg-blue-200'
          onClick={() => {
            setFormData((prevData) => {
              return {
                ...prevData,
                image: null
              }
            })
          }}
        >
          <span className='material-symbols-outlined'>delete</span>
          <p>Delete</p>
        </span>
        <span className='flex items-center gap-2 p-3 hover:bg-blue-200'>
          <img src={avatartIcon} alt='avatar' className='h-[25px]' />
          <p>Choose Avatar</p>
        </span>
      </div>
    </div>
  )
}

export default Register

ImageInput.propTypes = {
  setFormData: PropTypes.func.isRequired
}
PrevBtn.propTypes = {
  setStep: PropTypes.func.isRequired
}
