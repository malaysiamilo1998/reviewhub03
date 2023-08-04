'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)
  const { data: session } = useSession()
  useEffect(() => {
    ;(async () => {
      const response = await getProviders()
      setProviders(response)
    })()
  }, [])

  const setMobileDropDownMenu = () => setToggleDropDown(prev => !prev)

  // const isUserLoggedIn = true
  return (
    <nav className='flex-between mb-16 pt-3 w-full'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          className='object-contain'
          width={30}
          height={30}
          alt='site logo'
        />
        <p className='logo_text'>Review Hub</p>
      </Link>
      {/* {screen >= sm will show} */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='' href='/discussion'>
              Discussion
            </Link>
            <Link className='black_btn' href='/create-prmpt/'>
              create post
            </Link>
            <button onClick={signOut} className='outline_btn'>
              Sign out
            </button>
            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt='Profile picture'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            <Link className='p-1 m-1' href='/member/register'>
              Sign up
            </Link>
            <Link className='p-1 m-1' href='/api/auth/signin'>
              Login
            </Link>
            {/* <button className='red_btn' onClick={() => signIn()}>
              Login
            </button> */}
            {/* {providers &&
              Object.values(providers).map(provider => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    // className='black_btn'
                    // onClick={() => signIn(provider.id)}
                    className='p-1 m-1'
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </button>
                )
              })} */}
          </>
        )}
      </div>
      {/* {screen <=} */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt='Profile picture'
              className='rounded-full'
              onClick={setMobileDropDownMenu}
            />

            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  create post
                </Link>
                <button
                  type='buttom'
                  className='black_btn mt-5 w-full'
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut()
                  }}
                >
                  Signout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => {
                return (
                  <button
                    type='button'
                    key={provider.name}
                    className='black_btn'
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </button>
                )
              })}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
