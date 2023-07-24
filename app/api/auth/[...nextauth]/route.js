import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@/utils/database'
import User from '@/models/user'

// console.log(process.env.GOOGLE_ID + ' ==> ' + process.env.GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async session ({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    },
    async signIn ({ account, profile }) {
      if (account.provider === 'google') {
        console.log('account proverder sign in google')
      }

      try {
        await connectToDB()
        const userExist = await User.findOne({ email: profile.email })
        if (!userExist) {
          User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
            provider: account.provider
          })
        }
        return true
      } catch (error) {
        console.log('Error checking if user exists: ', error.message)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
