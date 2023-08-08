'use client'
import { useState, useEffect } from 'react'
import { client, urlFor } from '@/utils/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { FcLikePlaceholder } from 'react-icons/fc'
import { VscLink } from 'react-icons/vsc'
export const getCompanies = async () => {
  const companies = await client.fetch(`*[_type=="company"]{
   _id, 
   _createdAt, 
   name, 
   url, 
   "slug": slug.current, 
   "image": image.asset->url, 
   "imgAlt": image.asset->alt, 
  }`)
  return companies
}

export const AllCompanies = () => {
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    ;(async () => {
      const companies = await getCompanies()
      setCompanies(companies)
    })()
  }, [])
  //   return <div></div>

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 border-2 border-inherit rounded-lg p-3'>
      {companies.map(company => {
        const stars = []
        for (let i = 0; i < 5; i++) {
          stars.push(<FcLikePlaceholder key={i} />)
        }
        return (
          <div key={company._id} className='flex-start'>
            <Link href={`\\sponsor\\${company.slug}`}>
              <Image
                className=''
                src={urlFor(company.image)
                  .width(250)
                  .height(250)
                  .fit('crop')
                  .crop('entropy')
                  .url()}
                alt={company.imgAlt}
                width={70}
                height={70}
              />
            </Link>
            <div className='flex flex-col flex-start px-3'>
              <div className='text-left text-sm font-semibold'>
                {/*  */}
                {company.name}
              </div>
              <Link
                href={company.url ? company.url : ''}
                className='flex justify-between text-sm'
              >
                official site <VscLink />
              </Link>
              <div className='flex justify-between text-sm'>{stars}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
