'use client'
import { useState } from 'react'
import RatingForm from './rating-form'
import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

import DetailHearts from './hears_details'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75'
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47'
  }
})

const MinimizeRating = ({ overall, company }) => {
  const [ratingFormState, setRatingFormState] = useState([false])

  return (
    <div className='border-l-1 w-fit p-1'>
      <div className='flex flex-col justify-start items-star'>
        <div className='text-sm font-extrabold'>Overall Rating</div>
        <div className='flex justify-start items-center'>
          <span className='text-sm font-extralight'>3,559 Ratings</span>
        </div>
      </div>

      <StyledRating
        name='customized-color'
        defaultValue={overall.mark}
        precision={0.5}
        icon={<FavoriteIcon fontSize='inherit' />}
        emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
        size='small'
        onChange={(event, value) => {
          // console.log('onchange rating' + value)
          setRatingFormState([true, value])
        }}
      />

      <DetailHearts label='5 Stars' percentage={50} />
      <DetailHearts label='4 Stars' percentage={30} />
      <DetailHearts label='3 Stars' percentage={10} />
      <DetailHearts label='2 Stars' percentage={15} />
      <DetailHearts label='1 Stars' percentage={5} />

      <div>
        {ratingFormState[0] ? (
          <div className='w-1/2 absolute bottom-0 left-0 right-0 m-auto '>
            <RatingForm
              company={company}
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
