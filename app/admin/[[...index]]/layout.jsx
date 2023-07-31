import '@/styles/globals.css'
import Nav from '@/components/nav/page'
import Provider from '@/components/provider/provider'
export const metadata = {
  title: 'Review hub',
  description: 'Your trusted forum'
}
export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
