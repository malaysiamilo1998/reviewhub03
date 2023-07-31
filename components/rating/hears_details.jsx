import { styled } from '@mui/material/styles'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorSecondary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#ff5722' : '#ff5722'
  }
}))

const DetailHearts = ({ label, percentage }) => (
  <div className='flex justify-start items-center '>
    <span className='text-sm'>{label}</span>
    <BorderLinearProgress
      className='m-1 min-w-[100px]'
      color='secondary'
      variant='determinate'
      value={percentage}
    />
    <span className='text-sm'>{`${percentage}%`}</span>
  </div>
)

export default DetailHearts
