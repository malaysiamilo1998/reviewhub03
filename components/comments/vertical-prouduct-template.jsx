import Image from 'next/image'

import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75'
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47'
  }
})

export const ProductTemplateDetails = item => (
  <div
    className='
    w-full
    h-full
    border-2
    flex
    justify-start
    items-start
    rounded-lg
    p-3 m-3'
  >
    <Image
      src={
        item.avatar !== null
          ? item.avatar
          : item.default_avatar == null
          ? ''
          : item.default_avatar
      }
      width={37}
      height={37}
      alt='profile avatar'
    />
    <div className='px-5'>
      <div className='border-b-2'>
        <p>
          <span className='text-sm font-extrabold'>{item.username}</span> -{' '}
          <span className='font-extralight'>
            {new Date(item._createdAt).toLocaleDateString()}
          </span>
        </p>
        <div className='flex justify-start items-center'>
          <span>overall -</span>
          <StyledRating
            aria-role='img'
            name='customized-color'
            value={item.overallrating}
            precision={0.5}
            icon={<FavoriteIcon fontSize='inherit' />}
            emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
            size='small'
          />
          <span> - {Math.round(item.overallrating)}</span>
        </div>

        <p>{item.comment != undefined ? item.comment : ''}</p>
      </div>
      <div className='mx-5'>
        {item.details != undefined ? (
          item.details.map(rate => (
            <div className='grid grid-cols-2 border-b-2 rounded-lg my-2'>
              <div className='text-sm mx-3'>{rate.rate_type}</div>
              <div className='flex items-center'>
                <StyledRating
                  name='customized-color'
                  value={rate.rating}
                  precision={0.5}
                  icon={<FavoriteIcon fontSize='inherit' />}
                  emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
                  size='small'
                />
                <span> - {Math.round(rate.rating)}</span>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  </div>
)

export const ProductTemplate = item => (
  <div className='w-full h-full border-2 flex justify-center items-center rounded-lg px-1'>
    <div>
      <StyledRating
        name='customized-color'
        value={item.overallrating}
        precision={0.5}
        icon={<FavoriteIcon fontSize='inherit' />}
        emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
        size='small'
      />
      <div className='flex justify-start'>
        <Image
          src={item.avatar == null ? '' : item.avatar}
          width={37}
          height={37}
          alt='Profile picture'
          className='rounded-full'
        />
        <div>
          <p className='text-lg px-3'>{item.comment}</p>
          <p className='text-sm px-3'>By {item.username}</p>
        </div>
      </div>
    </div>
  </div>
)
