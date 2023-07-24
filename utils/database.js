// 'use client'
import mongoose from 'mongoose'
// import { isCustomErrorPage } from 'next/dist/build/utils'

let isconnected = false

export const connectToDB = async () => {
  console.log('mongodb connection...')
  mongoose.set('strictQuery', true)
  if (isconnected) {
    console.log('MongoDB is already connected.')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'reviewhub',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    isconnected = true
    console.log('yeah! MongoDB is connected.')
  } catch (error) {
    console.log('connection exception!')
    console.log(error)
  }
}
