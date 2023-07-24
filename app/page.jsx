import Feed from '@/components/feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-Powered reviews</span>
      </h1>
      <p className='desc text-center'>
        South-east Asia most trusted gaming website review forum!
      </p>
      <Feed />
    </section>
  )
}
export default Home
