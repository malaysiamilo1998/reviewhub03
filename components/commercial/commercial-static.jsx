import LongBannerLeft from '@/public/assets/images/longbannerholderleft.png'
import LongBannerRight from '@/public/assets/images/longbannerholderright.png'
import Image from 'next/image'
export const HomePageCommertialLeft = () => (
  <div className='h-full overflow-hidden'>
    <Image src={LongBannerLeft} width='150' height='800' />
  </div>
)
export const HomePageCommertialRight = () => (
  <div className='h-full overflow-hidden'>
    <Image src={LongBannerRight} width='150' height='800' />
  </div>
)
