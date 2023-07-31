// import bcrypt from 'bcrypt'
import axios from 'axios'

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@/utils/database'
import User from '@/models/user'
import { checkUserExist } from '@/utils/sanity-server-utils'
import { sanityEssentialConfig } from '@/sanity-config'

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
      const sanityUser = await checkUserExist(session.user.email)

      // const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sanityUser[0]._id.toString()
      return session
    },
    async signIn ({ account, profile }) {
      try {
        // write new user to Mongodb
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
        const sanityUser = await checkUserExist(profile.email)
        console.log('retrieve user from sanity: ' + sanityUser)
        if (!sanityUser[0]) {
          console.log('Save user to sanity')
          const projectId = sanityEssentialConfig.projectId
          const dataset = sanityEssentialConfig.dataset
          const tokenWithWriteAccess = sanityEssentialConfig.apiToken
          const createMutations = [
            {
              create: {
                _type: 'user',
                username: profile.name.replace(' ', '').toLowerCase(),
                name: profile.name,
                email: profile.email,
                provider: account.provider
              }
            }
          ]

          await axios.post(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
            { mutations: createMutations },
            {
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${tokenWithWriteAccess}`
              }
            }
          )
        } else console.log('sanity user exists')

        return true
      } catch (error) {
        // console.log('Error checking if user exists: ', error.message)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }
