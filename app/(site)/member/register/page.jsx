'use client'
import axios from 'axios'
import Select from 'react-select'
import { useState, useRef } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useForm, useController } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

// import Tiptap from '@/components/editor/tip-tap'
// import QuillEditor from '@/components/editor/quil'

//
import ReactLoading from 'react-loading'
const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' }
]
const RegistrerForm = () => {
  const [registerFormOrResult, setRegisterFormOrResult] = useState({})
  const [showLoadingState, setShowLoadingState] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(true)
  const quillRef = useRef()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm()

  const { field } = useController({ name: 'gender', control })

  const registerFormSubmit = async (data, event) => {
    // getContents

    event.preventDefault()
    setShowLoadingState(true)
    console.log('execute submit')
    const newUserData = { ...data, gender: field.value }

    try {
      const response = await axios.post('/api/user/register', newUserData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.data.registerStatus) {
        console.log(
          'check create user status : ' + response.data.registerStatus
        )
        if (response.data.registerStatus) {
          console.log('redirect ... ')
          setShowRegisterForm(false)
          // redirect('/auth/sign-in')
        } else {
        }
      } else {
      }
    } catch (error) {
      return false
    }

    // setRegisterUser(data)
  }

  const handlerSelectChange = option => {
    field.onChange(option.value)
  }

  return (
    <>
      {/* <Tiptap /> */}
      {/* <QuillEditor quillRef={quillRef} /> */}
      <div className='w-full p-2'>
        {showRegisterForm ? (
          <>
            <p className='p-2 text-center text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-100  to-red-800'>
              Register a free account
            </p>
            <form
              noValidate
              onSubmit={handleSubmit(registerFormSubmit)}
              className='border-2 rounded-lg p-2 m-2'
            >
              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <label htmlFor='' className='flex justify-start items-center'>
                  Username
                </label>
                <div className='p-2 md:col-span-2'>
                  <input
                    className='register_form_input'
                    type=''
                    fullWidth
                    {...register('username', {
                      required: 'Username is compulsory',
                      pattern: {
                        value:
                          /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i,
                        message:
                          'Invalid Username, only A-Z, a-z, 0-9, -, _ are acceptable'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='username'
                    render={({ message }) => (
                      <p className='text-red-700 text-sm m-1'>{message}</p>
                    )}
                  />
                </div>
                <div className='flex sm:justify-end md:justify-start items-center'>
                  <p className='text-md font-extralight'>Required</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <label
                  htmlFor=''
                  className='grow-0 flex justify-start items-center'
                >
                  Email
                </label>
                <div className='p-2 md:col-span-2'>
                  <input
                    className=' register_form_input'
                    type=''
                    fullWidth
                    {...register('email', {
                      required: 'Email is compulsory',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='email'
                    render={({ message }) => (
                      <p className='text-red-700 text-sm m-1'>{message}</p>
                    )}
                  />
                </div>
                <div className='flex sm:justify-end md:justify-start items-center'>
                  <p className='text-md font-extralight'>Required</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <label
                  htmlFor=''
                  className='grow-0 flex justify-start items-center'
                >
                  Password
                </label>
                <div className='p-2 md:col-span-2'>
                  <input
                    className='register_form_input'
                    type='password'
                    fullWidth
                    {...register('password', {
                      required: 'Password is compulsory'
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='password'
                    render={({ message }) => (
                      <p className='text-red-700 text-sm m-1'>{message}</p>
                    )}
                  />
                </div>
                <div className='flex sm:justify-end md:justify-start items-center'>
                  <p className='text-md font-extralight'>Required</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <label
                  htmlFor=''
                  className='grow-0 flex justify-start items-center'
                >
                  Confirm Password
                </label>
                <div className='p-2 md:col-span-2'>
                  <input
                    className=' register_form_input'
                    type='password'
                    fullWidth
                    {...register('confirm_password', {
                      required: 'Password confirmatino is compulsory',
                      validate: val => {
                        if (watch('password') != val) {
                          return 'Your passwords do no match'
                        }
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='confirm_password'
                    render={({ message }) => (
                      <p className='text-red-700 text-sm m-1'>{message}</p>
                    )}
                  />
                </div>
                <div className='flex sm:justify-end md:justify-start items-center'>
                  <p className='text-md font-extralight'>Required</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <label
                  htmlFor=''
                  className='grow-0 flex justify-start items-center'
                >
                  Mobile
                </label>
                <div className='p-2 md:col-span-2'>
                  <input
                    className=' register_form_input'
                    type=''
                    fullWidth
                    {...register('mobile', {
                      required: 'Phone number is compulsoty'
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name='mobile'
                    render={({ message }) => (
                      <p className='text-red-700 text-sm m-1'>{message}</p>
                    )}
                  />
                </div>
                <div className='flex sm:justify-end md:justify-start items-center'>
                  <p className='text-md font-extralight'>Required</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <label
                  htmlFor=''
                  className='grow-0 flex justify-start items-center'
                >
                  Gender
                </label>
                <div className='p-2 md:col-span-2'>
                  <Select
                    value={genderOptions.find(
                      option => option.value == field.value
                    )}
                    label='Gender'
                    onChange={handlerSelectChange}
                    options={genderOptions}
                  ></Select>
                </div>
                <div className='flex justify-start items-center'>
                  <p className='text-sm font-extralight'>optional</p>
                </div>
              </div>

              <div className='grid sm:grid-cols-2 md:grid-cols-4 border-b-2 pb-2 mb-2'>
                <div></div>
                <div className='p-2 md:col-span-2'>
                  <div className='flex justify-start'>
                    <button
                      onClick={() => {
                        console.log(quillRef.current.editor.getContents())
                      }}
                      className='border-2 hover:border-0 border-red-300 text-sm rounded-lg p-2 m-2 font-extralight hover:bg-red-300 hover:text-lg'
                      type='submit'
                    >
                      Register
                    </button>
                    {showLoadingState ? (
                      <ReactLoading color={`#000000`} height={20} width={55} />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div></div>
              </div>
            </form>
          </>
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <p className='text-center text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-200  to-red-800 m-5'>
              Register successfully!
            </p>
            <Link
              href='/api/auth/signin'
              className='red_btn rounded-lg p-3 m-3'
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

const RegisterBtn = () => {
  const [btnState, setBtnState] = useState(true)
  return btnState ? (
    <button
      onClick={event => {
        setBtnState(false)
      }}
      className='border-2 hover:border-0 border-red-300 text-sm rounded-lg p-2 m-2 font-extralight hover:bg-red-300 hover:text-lg'
      type='submit'
    >
      Register
    </button>
  ) : (
    <button
      className='border-2 hover:border-0 border-red-300 text-sm rounded-lg p-2 m-2 font-extralight hover:bg-red-300 hover:text-lg'
      disabled
    >
      Register
    </button>
  )
}

export default RegistrerForm
