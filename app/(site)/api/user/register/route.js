import axios from 'axios'
import { connectToDB } from '@/utils/database'
import { NextResponse } from 'next/server'
import {
  checkUserExist,
  checkUserExistByUsername
} from '@/utils/sanity-server-utils'
import bcrypt from 'bcrypt'
import User from '@/models/user'
import { sanityEssentialConfig } from '@/sanity-config'
export const GET = async request => {
  return NextResponse.json({ my: 'data' })
}

export const POST = async request => {
  var userExistCheck = true
  const saltRounds = 10
  const body = await request.json() //
  const { username, email, mobile, password } = body
  console.log(body)
  const hash = bcrypt.hashSync(password, saltRounds)
  await connectToDB()
  const userExist = await User.findOne({ email: email })
  const userExistByUsername = await User.findOne({ username: username })

  if (!userExist && !userExistByUsername) {
    userExistCheck = false
    User.create({
      email: email,
      username: username.replace(' ', '').toLowerCase(),
      provider: 'website',
      mobile: mobile,
      password: hash
    })
  }

  await (async () => {
    const checkUserExistByEmail = await checkUserExist(email)
    const UserExistByUsername = await checkUserExistByUsername(username)
    console.log('check user')
    console.log(checkUserExistByEmail)
    console.log(UserExistByUsername)

    if (!checkUserExistByEmail[0] && !UserExistByUsername[0]) {
      const projectId = sanityEssentialConfig.projectId
      const dataset = sanityEssentialConfig.dataset
      const tokenWithWriteAccess = sanityEssentialConfig.apiToken
      const createMutations = [
        {
          create: {
            _type: 'user',
            username: username.replace(' ', '').toLowerCase(),
            name: username,
            email: email,
            phone: mobile,
            provider: 'website',
            password: hash
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
    } else {
      console.log('user exists ...')
    }
  })()

  if (!userExistCheck) return NextResponse.json({ registerStatus: true })
  else return NextResponse.json({ registerStatus: false })

  // try {
  //   bcrypt.hash(password, saltRounds, async (err, hash) => {
  //     // insert member into mongo
  //     await (async hash => {
  //       await connectToDB()
  //       const userExist = await User.findOne({ email: email })
  //       const userExistByUsername = await User.findOne({ username: username })
  //       if (!userExist && !userExistByUsername) {
  //         userExistCheck = false
  //         User.create({
  //           email: email,
  //           username: username.replace(' ', '').toLowerCase(),
  //           provider: 'website',
  //           mobile: mobile,
  //           password: hash
  //         })
  //       }
  //     })(hash)
  //     // insert member into
  //     await (async () => {
  //       const checkUserExistByEmail = await checkUserExist(email)
  //       const UserExistByUsername = await checkUserExistByUsername(username)
  //       console.log('check user')
  //       console.log(checkUserExistByEmail)
  //       console.log(UserExistByUsername)

  //       if (!checkUserExistByEmail[0] && !UserExistByUsername[0]) {
  //         const projectId = sanityEssentialConfig.projectId
  //         const dataset = sanityEssentialConfig.dataset
  //         const tokenWithWriteAccess = sanityEssentialConfig.apiToken
  //         const createMutations = [
  //           {
  //             create: {
  //               _type: 'user',
  //               username: username.replace(' ', '').toLowerCase(),
  //               name: username,
  //               email: email,
  //               phone: mobile,
  //               provider: 'website',
  //               password: hash
  //             }
  //           }
  //         ]

  //         await axios.post(
  //           `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
  //           { mutations: createMutations },
  //           {
  //             headers: {
  //               'Content-type': 'application/json',
  //               Authorization: `Bearer ${tokenWithWriteAccess}`
  //             }
  //           }
  //         )
  //       } else {
  //         console.log('user exists ...')
  //       }
  //     })()
  //   })
  // } catch (err) {
  //   console.log(err)
  // }
  if (!userExistCheck) return NextResponse.json({ registerStatus: true })
  else return NextResponse.json({ registerStatus: false })
}
