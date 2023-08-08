'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { editorRecommend, ads } from '@/utils/editor-utils'
import Image from 'next/image'
import Link from 'next/link'
import { RiAdvertisementFill } from 'react-icons/ri'
import { PortableText } from '@portabletext/react'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { Carousel } from 'primereact/carousel'
import {
  NewsHorizontalTemplate,
  NewsVerticalTemplate
} from '@/components/editor-carousel/news-horizontal-template'
import { urlFor } from '@/utils/sanity'

const Page = () => {
  const [newsSection, setNewsSection] = useState([])
  const [adsContent, setAdsContent] = useState([])

  useEffect(() => {
    ;(async () => {
      const loadedNewsSection = await editorRecommend()
      const allAds = await ads()
      setNewsSection(loadedNewsSection)
      setAdsContent(allAds)
    })()
  }, [])
  return (
    <div className='w-full ' id='recommend'>
      {adsContent != undefined ? (
        <div className='lg:hidden'>
          {adsContent.map(ads => {
            if (ads.place == 'place-2')
              return (
                <div className='mb-2 relative'>
                  <span className='absolute top-0 right-0 text-white'>
                    <RiAdvertisementFill size='30' />
                  </span>
                  <Link href={`${ads.url}`}>
                    <img
                      src={urlFor(ads.banner).width(641).height(65).url()}
                      className='w-full'
                      alt={ads.title}
                    />
                  </Link>
                </div>
              )
            else {
              return <></>
            }
          })}
        </div>
      ) : (
        <></>
      )}
      {newsSection.map(section => {
        return (
          <div className=''>
            <p className='orange_gradient text-4xl font-extrabold my-5'>
              {section.title}
            </p>
            <div>
              {section.layout !== undefined &&
              section.layout == 'layout-2' &&
              section.medlayout != undefined ? (
                <div>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                    {section.medlayout != 'undefined' &&
                      section.medlayout.map(lay => (
                        <div className='relative'>
                          {lay.ads ? (
                            <p className='flex items-center absolute top-0 right-0 text-white text-sm bg-black bg-opacity-30 px-1 rounded-sm'>
                              <RiAdvertisementFill /> [sponsor]
                            </p>
                          ) : (
                            <></>
                          )}

                          <Image
                            src={urlFor(lay.image).width(306).height(256).url()}
                            width='306'
                            height='256'
                            alt='pic'
                          />
                          <p>{lay.newstitle}</p>
                        </div>
                      ))}

                    <div className=''>
                      {section.layout !== undefined &&
                      section.layout == 'layout-2' &&
                      section.smlayout1 != undefined ? (
                        <div>
                          {section.smlayout1.map(lay => (
                            <div
                              className='flex  mb-3 p-3 rounded-lg bg-gray-200 relative'
                              style={{ height: '' }}
                            >
                              {lay.ads ? (
                                <p className='absolute flex items-center top-0 right-0 text-white text-sm bg-black bg-opacity-30 px-1 rounded-sm'>
                                  <RiAdvertisementFill /> [sponsor]
                                </p>
                              ) : (
                                <p className='absolute top-0 right-0 text-white'>
                                  -
                                </p>
                              )}

                              <div className='mr-3'>
                                <Image
                                  src={urlFor(lay.image)
                                    .width(104)
                                    .height(84)
                                    .url()}
                                  width={104}
                                  height={84}
                                  className='object-contain'
                                />
                              </div>
                              <p className='w-1/2 h-12 overflow-hidden'>
                                {lay.newstitle}...
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className=''>
                      {section.layout !== undefined &&
                      section.layout == 'layout-2' &&
                      section.smlayout22 != undefined ? (
                        <div>
                          {section.smlayout22.map(lay => (
                            <div
                              className='flex  mb-3 p-3 rounded-lg bg-gray-200 relative'
                              style={{ height: '' }}
                            >
                              {lay.ads ? (
                                <p className='absolute flex items-center top-0 right-0 text-white text-sm bg-black bg-opacity-30 px-1 rounded-sm'>
                                  <RiAdvertisementFill /> [sponsor]
                                </p>
                              ) : (
                                <p className='absolute top-0 right-0 text-white'>
                                  -
                                </p>
                              )}

                              <div className='mr-3'>
                                <Image
                                  src={urlFor(lay.image)
                                    .width(104)
                                    .height(84)
                                    .url()}
                                  width={104}
                                  height={84}
                                  className='object-contain'
                                />
                              </div>
                              <p className='w-1/2 h-12 overflow-hidden'>
                                {lay.newstitle}...
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div></div>
                  {adsContent !== undefined ? (
                    <div>
                      {adsContent.map(ads => {
                        if (ads.place == 'place-3') {
                          return (
                            <div className='relative'>
                              <span className='absolute text-white top-0 right-0'>
                                <RiAdvertisementFill size='35' />
                              </span>
                              <Link href={ads.url}>
                                <img
                                  src={urlFor(ads.banner)
                                    .width(641)
                                    .height(85)
                                    .url()}
                                  className='w-full'
                                />
                              </Link>
                            </div>
                          )
                        } else {
                          ;<></>
                        }
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div></div>
              )}
              {section.layout !== undefined &&
              section.layout == 'layout-1' &&
              section.lglayout != undefined ? (
                <div>
                  {section.lglayout != undefined ? (
                    <div>
                      <div
                        className='grid grid-1 lg:grid-cols-2  gap-2'
                        id='carouselinside'
                      >
                        <div>
                          <Carousel
                            autoplayInterval={2000}
                            value={section.lglayout}
                            numVisible={1}
                            numScroll={1}
                            //   orientation='vertical'
                            //   verticalViewPortHeight='auto'
                            verticalViewPortWidth='628px'
                            verticalViewPortHeight='320px'
                            showNavigators={false}
                            itemTemplate={NewsHorizontalTemplate}
                          />
                          <div className='flex-col justify-center items-start'>
                            {section.smlayout1 != undefined ? (
                              <div>
                                {section.smlayout1.map(lay => {
                                  return (
                                    <div
                                      className='flex  mb-3 p-3 rounded-lg bg-gray-200 relative'
                                      style={{ height: '118px' }}
                                    >
                                      {lay.ads ? (
                                        <p className='absolute flex items-center top-0 right-0 text-white text-sm bg-black bg-opacity-30 px-1 rounded-sm'>
                                          <RiAdvertisementFill /> [sponsor]
                                        </p>
                                      ) : (
                                        <p className='absolute top-0 right-0 text-white'>
                                          -
                                        </p>
                                      )}

                                      <div className='mr-3'>
                                        <Image
                                          src={urlFor(lay.image)
                                            .width(200)
                                            .height(94)
                                            .url()}
                                          width={200}
                                          height={94}
                                          className='object-contain'
                                        />
                                      </div>
                                      <p className='w-1/2 h-15 overflow-hidden'>
                                        {lay.newstitle}
                                      </p>
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        <div className='w-full'>
                          <div className='flex justify-between gap-1'>
                            <div style={{ width: '326px' }}>
                              <div>
                                <Carousel
                                  autoplayInterval={5000}
                                  value={section.medlayout}
                                  numVisible={1}
                                  numScroll={1}
                                  showNavigators={false}
                                  itemTemplate={NewsVerticalTemplate}
                                />
                                {section.smlayout2 !== undefined ? (
                                  <div>
                                    {section.smlayout2.map(lay => {
                                      return (
                                        <div
                                          className='flex  mb-3 p-3 rounded-lg bg-gray-200 relative'
                                          style={{ height: '118px' }}
                                        >
                                          {lay.ads ? (
                                            <p className='absolute flex items-center top-0 right-0 text-white text-sm bg-black bg-opacity-30 px-1 rounded-sm'>
                                              <RiAdvertisementFill /> [sponsor]
                                            </p>
                                          ) : (
                                            <p className='absolute top-0 right-0 text-white'></p>
                                          )}
                                          <div className='mr-3'>
                                            <Image
                                              src={urlFor(lay.image)
                                                .width(200)
                                                .height(94)
                                                .url()}
                                              width={200}
                                              height={94}
                                              className='object-contain'
                                            />
                                          </div>
                                          <p className='w-1/2 h-12 overflow-hidden'>
                                            {lay.newstitle}...
                                          </p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className='hidden text-center grow  rounded-lg relative lg:flex flex-col items-center'>
                              {/* <span className=' flex items-center absolute top-0 right-0 bg-black bg-opacity-30 text-sm text-white z-50'>
                                <RiAdvertisementFill /> sponsor
                              </span> */}
                              {adsContent != undefined ? (
                                <div>
                                  {adsContent.map(ads => {
                                    if (ads.place == 'place-2')
                                      return (
                                        <div className='mb-2 relative'>
                                          <span className='absolute top-0 right-0 text-white'>
                                            <RiAdvertisementFill size='30' />
                                          </span>
                                          <Link href={`${ads.url}`}>
                                            <Image
                                              src={urlFor(ads.image)
                                                .width(160)
                                                .height(160)
                                                .url()}
                                              width='160'
                                              height='160'
                                              alt={ads.title}
                                            />
                                          </Link>
                                        </div>
                                      )
                                    else {
                                      return <></>
                                    }
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div></div>
                  {adsContent !== undefined ? (
                    <div>
                      {adsContent.map(ads => {
                        if (ads.place == 'place-3') {
                          return (
                            <div className='relative'>
                              <span className='absolute text-white top-0 right-0'>
                                <RiAdvertisementFill size='35' />
                              </span>
                              <Link href={ads.url}>
                                <img
                                  src={urlFor(ads.banner)
                                    .width(641)
                                    .height(85)
                                    .url()}
                                  className='w-full'
                                />
                              </Link>
                            </div>
                          )
                        } else {
                          ;<></>
                        }
                      })}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div>
              {section.smlayout != undefined ? (
                <div>{section.smlayout != undefined ? <div></div> : <></>}</div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Page
