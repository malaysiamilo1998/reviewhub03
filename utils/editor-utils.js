import { sanityEssentialConfig } from '@/sanity-config'

import axios from 'axios'
import { createClient } from 'next-sanity'

const projectId = sanityEssentialConfig.projectId
const dataset = sanityEssentialConfig.dataset
const tokenWithWriteAccess = sanityEssentialConfig.apiToken

const client = createClient(sanityEssentialConfig)

export const ads = async () => {
  const ads = await client.fetch(`*[_type=="ads" && onoff == true]{
        title, 
       url, 
       place, 
       image,
       banner, }`)
  return ads
}

export const editorRecommend = async () => {
  const newSection =
    await client.fetch(`*[_type=="newssection"]|order(preference asc){
        _id, 
        title, 
        layout, 
        "lglayout": lglayout[]|order(_createdAt desc){_key, newstitle, image, launchAt, ads},
        "medlayout": medlayout[]|order(_createdAt desc){_key, newstitle, image, ads}, 
        "smlayout1": smlayout[0...3]|order(_createdAt desc){_key, newstitle, image, launchAt, ads},  
        "smlayout2": smlayout[3...7]|order(_createdAt desc){_key, newstitle, image, launchAt, ads},
        "smlayout22": smlayout[3...6]|order(_createdAt desc){_key, newstitle, image, launchAt, ads},
        "smlayout3": smlayout[7...10]|order(_createdAt desc){_key, newstitle, image, launchAt, ads}

    }`)
  return newSection
}
