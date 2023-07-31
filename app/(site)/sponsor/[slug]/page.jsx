'use client'
import Link from 'next/link'
// import RateHearts from '@/components/rating/rating'
import CompanyDetails from '@/components/companies/company-details'

import Image from 'next/image'
import { useState, useEffect } from 'react'
//Move to component folder
import { useSession } from 'next-auth/react'
import { client, urlFor } from '@/utils/sanity'

const getOneSponsor = async slug => {
  const sponsor =
    await client.fetch(`*[_type=="company" && slug.current == '${slug}']{
   _id,
   _createdAt,
   name,
   url,
   contact[]{
    value, 
    "type": type->title, 
    "channel_logo": type->image.asset->url, 
   }, 
   backupurls[], 
   desc, 
   games[]->{
    _id, 
    gamename, 
    "gametype": gametype->gametype, 
    "image": image.asset->url
   },  
  
   "logo": image.asset->url, 
   "logoAlt": image.asset->alt, 
   "banner": banner.asset->url,
   "slug": slug.current,
   "bannerAlt": banner.asset->alt,
  }`)
  return sponsor
}

const getRatingCriteria = async () => {
  const ratingCriteria = await client.fetch(`*[_type=="rateKey"]{
   _id,
   _createdAt,
   criteria,
   "image": image.asset->url, 
   "imageAlt": image.asset->alt
  }`)
  return ratingCriteria
}

const SponsorPage = ({ params }) => {
  const slug = params.slug
  const [sponsor, setSponsor] = useState({})
  const [rateCriteria, setRateCriteria] = useState([])
  const { data: session } = useSession()
  useEffect(() => {
    ;(async () => {
      const sponsorData = await getOneSponsor(slug)
      console.log(sponsorData)
      setSponsor(sponsorData)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const rateCriteriaData = await getRatingCriteria()
      // console.log(sponsorData)
      setRateCriteria(rateCriteriaData)
    })()
  }, [])
  return (
    <div className='w-full'>
      {sponsor[0] && sponsor[0].banner ? (
        <img
          className='rounded-lg'
          // className='w-full'
          src={sponsor[0].banner}
          alt={sponsor.bannerAlt}
        />
      ) : (
        <></>
      )}

      <div className='shadow-2xl rounded-lg mt-10 p-3'>
        <h2 className='text-lg font-bold'>Asorted game:</h2>
        <div className='grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-3'>
          {sponsor[0] && sponsor[0].games ? (
            sponsor[0].games.map(game => {
              return (
                <div key={game._id} className='flex justify-between'>
                  <Image
                    src={urlFor(game.image)
                      .width(150)
                      .height(150)
                      .fit('crop')
                      .crop('entropy')
                      .url()}
                    width={75}
                    height={75}
                  />
                  <div className='p-3'>
                    <div className='font-bold text-md'>{game.gametype}</div>
                    <div className='text-sm'>{game.gamename}</div>
                  </div>
                </div>
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* <RateHearts company_slug={slug} rateCriteria={rateCriteria} /> */}
      <div className='p-3 shadow-2xl mt-10 rounded-lg py-3'>
        <CompanyDetails company={sponsor[0] ? sponsor[0] : []} />
      </div>
    </div>
  )
}

export default SponsorPage
