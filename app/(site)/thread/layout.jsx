'use client'
// import { useState, useEffect } from 'react'
import { AllCompanies } from '@/components/companies/companies'
import Topic from '@/components/topic/topic'
import { useParams } from 'next/navigation'

export default function DiscussionLayout ({ children }) {
  return (
    <>
      {/* <div className='w-full flex lg:justify-end justify-center'> */}
      <div className='w-full grid grid-cols-6 '>
        <div className='col-span-2'>
          <Topic />
        </div>

        <div className='col-span-4 flex flex-col items-center'>
          <AllCompanies />
          {children}
        </div>
      </div>
    </>
  )
}
