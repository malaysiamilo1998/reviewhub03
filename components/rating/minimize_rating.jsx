'use client'
import { useState, useEffect } from 'react'
import RatingForm from './rating-form'
import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { calOverAllRating } from '@/utils/rating-comment'

import DetailHearts from './hears_details'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75'
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47'
  }
})

const MinimizeRating = ({ company }) => {
  const companyId = company
  const [ratingFormState, setRatingFormState] = useState([false])
  const [overallRatingAVG, setOverallRatingAVG] = useState([])
  // console.log(`useEffect =>${companyId}`)
  useEffect(() => {
    ;(async () => {
      console.log(`useEffect =>=>${companyId}`)
      const overallRatingAverage = await calOverAllRating(company)
      console.log('result' + overallRatingAverage)
      setOverallRatingAVG(overallRatingAverage)
    })()
  }, [companyId])

  return (
    <div className='border-l-1 w-fit p-1'>
      <div className='flex flex-col justify-start items-star'>
        <div className='text-sm font-extrabold'>Overall Rating</div>
        <div className='flex justify-start items-center'>
          <span className='text-sm font-extralight'>
            {overallRatingAVG != undefined ? overallRatingAVG[7] : 0} Ratings
          </span>
        </div>
      </div>

      <StyledRating
        name='customized-color'
        defaultValue={overallRatingAVG != undefined ? overallRatingAVG[0] : 0}
        value={
          overallRatingAVG != undefined ? Math.round(overallRatingAVG[0]) : 0
        }
        precision={0.5}
        icon={<FavoriteIcon fontSize='inherit' />}
        emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
        size='small'
        onChange={(event, value) => {
          // console.log('onchange rating' + value)
          setRatingFormState([true, value])
        }}
      />

      <DetailHearts
        label='5 Stars'
        percentage={
          overallRatingAVG != undefined
            ? Math.round((overallRatingAVG[8] / overallRatingAVG[13]) * 100)
            : 0
        }
      />
      <DetailHearts
        label='4 Stars'
        percentage={
          overallRatingAVG != undefined
            ? Math.round((overallRatingAVG[9] / overallRatingAVG[13]) * 100)
            : 0
        }
      />
      <DetailHearts
        label='3 Stars'
        percentage={
          overallRatingAVG != undefined
            ? Math.round((overallRatingAVG[10] / overallRatingAVG[13]) * 100)
            : 0
        }
      />
      <DetailHearts
        label='2 Stars'
        percentage={
          overallRatingAVG != undefined
            ? Math.round((overallRatingAVG[11] / overallRatingAVG[13]) * 100)
            : 0
        }
      />
      <DetailHearts
        label='1 Stars'
        percentage={
          overallRatingAVG != undefined
            ? Math.round((overallRatingAVG[12] / overallRatingAVG[13]) * 100)
            : 0
        }
      />

      <div>
        {ratingFormState[0] ? (
          <div className='w-1/2 absolute bottom-0 left-0 right-0 m-auto '>
            <RatingForm
              company={company}
              overallRatingAVG={overallRatingAVG}
              hideHandler={setRatingFormState}
              value={ratingFormState[1]}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default MinimizeRating
