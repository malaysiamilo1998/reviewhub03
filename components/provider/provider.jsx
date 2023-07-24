'use client'
import { SessionProvider } from 'next-auth/react'
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <div>{children}</div>
    </SessionProvider>
  )
}

export default Provider
