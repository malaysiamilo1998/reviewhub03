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

export const RateFormHeart = ({ label, handler, heartCount }) => {
  console.log('heart count=>' + heartCount.rating)
  return (
    <div className='flex justify-between px-5 py-2 mb-3 border-2 shadow-2xl'>
      <div className='text-sm font-extrabold'>{label}</div>

      <div>
        <StyledRating
          className='flex justify-between'
          name='customized-color'
          defaultValue={heartCount.rating}
          precision={0.5}
          size='small'
          onChange={(event, val) => {
            handler(val)
          }}
          icon={<FavoriteIcon fontSize='inherit' />}
          emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
        />
      </div>
    </div>
  )
}
