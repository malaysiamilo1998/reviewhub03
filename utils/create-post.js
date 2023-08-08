import { sanityEssentialConfig } from '@/sanity-config'

import axios from 'axios'
import { createClient } from 'next-sanity'

const projectId = sanityEssentialConfig.projectId
const dataset = sanityEssentialConfig.dataset
const tokenWithWriteAccess = sanityEssentialConfig.apiToken

const client = createClient(sanityEssentialConfig)

export const createPost = (slug, handlerRef) => {}

export const getSingleTopicRef = async slug => {
  let _topicRef = null
  const refBySlug = await client.fetch(
    `*[_type=="topic" && slug.current == '${slug}' ]{_id}`
  )

  return refBySlug
}

export const getSigleLevelTopics = async currentSlug => {
  const topics =
    await client.fetch(`*[_type=="topic" && references(${currentSlug})]{
       _id, 
       _createdAt, 
       title, 
       "slug": slug.current, 
       "image": image.asset->url, 
       "imgAlt": image.asset->alt, 
      }`)
  return topics
}

export const getTopics = async currentSlug => {
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
