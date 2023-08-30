import { sanityEssentialConfig } from '@/sanity-config'

import axios from 'axios'
import { createClient } from 'next-sanity'

import { Schema } from '@sanity/schema'
import { htmlToBlocks, getBlockContentFeatures } from '@sanity/block-tools'
import { thread } from '@/sanity/schemas/forum-schema'

const projectId = sanityEssentialConfig.projectId
const dataset = sanityEssentialConfig.dataset
const tokenWithWriteAccess = sanityEssentialConfig.apiToken

const client = createClient(sanityEssentialConfig)

export const createPost = async (
  { topicRef, subject, quillContent },
  session
) => {
  const threadSchema = Schema.compile({
    name: 'root',
    types: [thread]
  })

  const blockContentType = threadSchema
    .get('thread')
    .fields.find(field => field.name === 'content').type

  const blocks = htmlToBlocks(quillContent, blockContentType)

  // console.log('check html content')
  // console.log(quillContent)
  // console.log('check block content')
  // console.log(blocks)
  // return

  const Mutations = [
    {
      create: {
        _type: 'thread',
        title: subject,
        user: {
          _ref: session.user.id,
          _type: 'reference'
        },
        topic: {
          _ref: topicRef,
          _type: 'reference'
        },
        content: blocks
      }
    }
  ]
  const createThreadResponse = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    { mutations: Mutations },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`
      }
    }
  )
}

export const getPostsByThreadId = async threadRef => {
  const posts =
    await client.fetch(`*[_type=="threadcomment" && references("${threadRef}")]{
      _id, 
    comment, 
    "threadId": thread->_id, 
    "author_avatar": user->avatar, 
    "author": user->username, 
    "author_id": user->_id
  }`)

  return posts
}

export const getThreadById = async threadRef => {
  const posts = await client.fetch(`*[_type=="thread" && _id=="${threadRef}"]{
      title, 
      desc, 
      content, 
      "posts": *[_type=="post" && references(^._id)]{
        _id, 
        content, 
        "author_username": author->username, 
        "author_id": author->_id, 
        "createdAt": author->createdAt, 
      }}`)

  return posts
}

export const getThreads = async slugString => {
  let threads
  if (slugString == '') {
    threads = await client.fetch(
      `*[_type=="thread"] | order(_createdAt desc){_id,title,  "author_id": author->_id, "author": author->name, "author_avatar": author->avatar, _createdAt, desc, content }`
    )
  } else {
    threads = await client.fetch(
      `*[_type=="thread" && topic._ref in *[_type=="topic" && slug.current=="${slugString}"]._id] | order(_createdAt desc){_id,title,  "author_id": author->_id, "author": author->name, "author_avatar": author->avatar, _createdAt, desc, content}`
    )
  }

  return threads
}

export const getSingleTopicRef = async slug => {
  let _topicRef = null
  const refBySlug = await client.fetch(
    `*[_type=="topic" && topic.slug.current == '${slug}' ]{_id}`
  )

  return refBySlug
}

export const getSigleLevelTopics = async currentSlug => {
  const topics =
    await client.fetch(`*[_type=="topic" && parentTopic._ref=${currentSlug}]{
       _id, 
       _createdAt, 
       title, 
       "slug": slug.current, 
       "image": image.asset->url, 
       "imgAlt": image.asset->alt, 
      }`)
  return topics
}

// export const centerMainTopic = async () => {

// }

export const getTopicsToplevelLight = async currentSlug => {
  let levelTopics
  if (currentSlug == '') {
    levelTopics =
      await client.fetch(`*[_type=="topic" && parentTopic._ref==null]{
        _id,  
        _createdAt,
        title, 
      "slug": slug.current }`)
  } else {
    levelTopics =
      await client.fetch(`*[_type=="topic" && slug.current=="${currentSlug}"]{
      _id,  
      _createdAt,
      title, 
    "slug": slug.current, 
    "subtopics": *[
      _type == "topic" &&
      references(^._id)
    ]{
      _id,
     _createdAt,
     title,
     "slug": slug.current,
     "image": image.asset->url,
     "imgAlt": image.asset->alt,
    }
   }`)
  }

  console.log('level topic ' + currentSlug)
  console.log(levelTopics)
  return levelTopics
}
export const getTopics = async currentSlug => {
  // const currentTopicID = await client.fetch(
  //   `*[_type=="topic" && slug.current=="${currentSlug}"]{_id}`
  // )
  // let parentRef
  // if (currentTopicID.length > 0 && currentTopicID[0]._id) {
  //   parentRef = currentTopicID[0]._id
  // } else {
  //   parentRef = null
  // }

  const topics =
    await client.fetch(`*[_type=="topic" && parentTopic._ref==null]{
       _id,
       _createdAt,
       title,

       "subtopics": *[
        _type == "topic" &&
        references(^._id)
      ]{
        _id,
       _createdAt,
       title,
       "slug": slug.current,
       "image": image.asset->url,
       "imgAlt": image.asset->alt,
      },

       "slug": slug.current,
       "image": image.asset->url,
       "imgAlt": image.asset->alt,
      }`)

  return topics
}
