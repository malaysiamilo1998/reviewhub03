'use client'
// import { useState, useEffect } from 'react'
import { AllCompanies } from '@/components/companies/companies'
import Topic from '@/components/topic/topic'

export default function DiscussionLayout ({ children }) {
  return (
    <>
      <div className='w-full flex lg:justify-end justify-center'>
        <Topic />
        <div className='flex flex-col items-center'>
          <AllCompanies />
          {children}
        </div>
      </div>
    </>
  )
}
