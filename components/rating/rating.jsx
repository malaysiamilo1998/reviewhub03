import * as React from 'react'
import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useSession } from 'next-auth/react'
// import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75'
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47'
  }
})

const RateHearts = () => {}

// const RateHearts = ({ rateCriteria }) => {
//   const { data: session } = useSession()
//   return (
//     <div>
//       {session?.user ? (
//         <>
//           {rateCriteria.map(criteria => (
//             <div className='pt-3 ' key={criteria._id} data-id={criteria._id}>
//               <div className='border-solid border-2 rounded-lg w-fit p-3'>
//                 <div className='flex justify-between items-center pb-3 col-span-2'>
//                   <span className='font-extrabold text-md'>0.0</span>
//                   <span className='pl-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-md'>
//                     {criteria.criteria}
//                   </span>
//                 </div>
//                 <div className='flex  justify-between items-center'>
//                   <StyledRating
//                     className=''
//                     name='customized-color'
//                     defaultValue={Math.floor(Math.random() * 5)}
//                     getLabelText={value =>
//                       `${value} Heart${value !== 1 ? 's' : ''}`
//                     }
//                     onChange={(event, value) => {}}
//                     precision={0.5}
//                     icon={<FavoriteIcon fontSize='inherit' />}
//                     emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
//                   />
//                   <span className='p-3'>
//                     {Math.floor(Math.random() * 3500)} ratings
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </>
//       ) : (
//         <div>Sign in to rate</div>
//       )}
//     </div>
//   )
// }

export default RateHearts
