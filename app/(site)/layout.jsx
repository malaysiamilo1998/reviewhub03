import '@/styles/globals.css'
import Nav from '@/components/nav/page'
import Footer from '@/components/footer/footer'
import Provider from '@/components/provider/provider'
import {
  HomePageCommertialLeft,
  HomePageCommertialRight
} from '@/components/commercial/commercial-static'

export const metadata = {
  title: 'Review hub',
  description: 'Your trusted forum'
}
export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col h-screen justify-between'>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            <div className='flex justify-between w-full'>
              {/* <HomePageCommertialLeft /> */}
              {children}
              {/* <HomePageCommertialRight /> */}
            </div>
          </main>
        </Provider>
        <Footer />
      </body>
    </html>
  )
}
