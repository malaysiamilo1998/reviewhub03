import Image from 'next/image'
import Link from 'next/link'
import { VscLink } from 'react-icons/vsc'
import { PortableText } from '@portabletext/react'
import MinimizeRating from '@/components/rating/minimize_rating'
// import RateHearts from '@/components/rating/rating'
import { Box } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'
import config from '@/sanity.config'
import { companyComments, companyCommentsDetails } from '@/utils/rating-comment'
// import { Tag } from 'primereact/tag'
// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { Carousel } from 'primereact/carousel'
import {
  ProductTemplate,
  ProductTemplateDetails
} from '@/components/comments/vertical-prouduct-template'
import { useState, useEffect } from 'react'

const myPortableTextComponents = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />
    }
  }
}

const SanityImage = ({ asset }) => {
  const imageProps = useNextSanityImage(config, asset)

  if (!imageProps) return null

  return (
    <Image
      className='border-1 rounded-lg mt-10'
      {...imageProps}
      layout='responsive'
      sizes='(max-width: 800px) 100vw, 800px'
    />
  )
}

const CompanyDetails = ({ company }) => {
  const [comments, setComments] = useState([])
  const [detailComments, setDetailComments] = useState([])
  console.log('#==>' + company._id)
  useEffect(() => {
    console.log('===>' + company._id)
    ;(async () => {
      console.log('====>' + company._id)
      const [comments, commentDetails] = await companyComments(company._id)
      setComments(comments)
      setDetailComments(commentDetails)
    })()
  }, [company])
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ]
  return (
    <>
      <div className='flex justify-start relative'>
        <div className='flex justify-start '>
          {company.logo ? (
            <div className='hidden sm:block'>
              <Image
                // className='object-cover'
                src={company.logo}
                width={150}
                height={150}
              />
            </div>
          ) : (
            <></>
          )}
          {company.contact ? (
            <div className=' '>
              {company.contact.map(con => {
                return (
                  <div key={company.contact}>
                    <div className='flex justify-start p-3 items-center border-2 rounded-lg m-1'>
                      <Image src={con.channel_logo} width={30} height={30} />
                      <span className='pl-1 text-sm'>{con.value}</span>
                    </div>
                  </div>
                )
              })}{' '}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='hidden sm:flex'>
          <MinimizeRating company={company._id} />
        </div>

        {company.backupurls ? (
          <div className='pl-2'>
            {/* <span className='text-sm font-extrabold'>Backup Urls</span> */}
            {company.backupurls.map(url => {
              return (
                <div
                  key={url}
                  className='flex justify-start items-center p-3 border-2 rounded-lg m-1'
                >
                  <Link href={url} className='font-extralight pl-1 text-sm'>
                    Backup Url
                  </Link>
                  <VscLink size='' />
                  <Box width={20} height={30}></Box>
                </div>
              )
            })}
          </div>
        ) : (
          <></>
        )}
        {/* {comments !== undefined ? (
          <div className=''>
            <Carousel
              autoplayInterval={2000}
              value={comments}
              numVisible={1}
              numScroll={1}
              orientation='vertical'
              verticalViewPortHeight='150px'
              itemTemplate={ProductTemplate}
            />
          </div>
        ) : (
          <></>
        )} */}
      </div>

      <div className='p-5 shawdow-lg border-2 rounded-3xl'>
        <PortableText
          value={company.desc}
          components={myPortableTextComponents}
        />
      </div>

      {detailComments !== undefined ? (
        <div className='grid lg:grid-cols-2 grid-cols-1'>
          <Carousel
            autoplayInterval={2000}
            value={detailComments}
            numVisible={5}
            numScroll={5}
            orientation='vertical'
            verticalViewPortHeight='auto'
            itemTemplate={ProductTemplateDetails}
          />
          <div className=''></div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
export default CompanyDetails
