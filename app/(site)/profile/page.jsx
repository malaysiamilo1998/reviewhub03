'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@/components/profile'

const MyProfile = () => {
  const handleEdit = () => {}
  const handleDelete = async () => {}
  return (
    <Profile
      name=''
      desc=''
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
