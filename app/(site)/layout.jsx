import '@/styles/globals.css'
import Nav from '@/components/nav/page'
import Footer from '@/components/footer/footer'
import Provider from '@/components/provider/provider'

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
            {children}
          </main>
        </Provider>
        <Footer />
      </body>
    </html>
  )
}
