'use client'
// import { useState, useEffect } from 'react'
import { AllCompanies } from '@/components/companies/companies'
import Topic from '@/components/topic/topic'
import { useParams } from 'next/navigation'

export default function DiscussionLayout ({ children }) {
  return (
    <>
      {/* <div className='w-full flex lg:justify-end justify-center'> */}
      <div className='w-full grid grid-cols-7'>
        <div className='col-span-2'>
          <Topic />
        </div>
        <div className='col-span-5'>
          <AllCompanies />
          {children}
        </div>
      </div>
    </>
  )
}
