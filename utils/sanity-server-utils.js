import { createClient } from 'next-sanity'
import { sanityEssentialConfig } from '@/sanity-config'

export const sanityServerClient = createClient(sanityEssentialConfig)

export const checkUserExist = async email => {
  const user =
    await sanityServerClient.fetch(`*[_type=="user" && email == '${email}']{
      _id,
      "avatar": avatar.asset->url, 
      "default_avatar": rank->image.asset->url, 
     }`)
  return user
}

export const checkUserExistByUsername = async username => {
  const user =
    await sanityServerClient.fetch(`*[_type=="user" && username == '${username}']{
      _id,
     }`)
  return user
}
