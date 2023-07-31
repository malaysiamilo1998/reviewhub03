import { createClient } from 'next-sanity'
import { sanityEssentialConfig } from '@/sanity-config'

export const sanityServerClient = createClient(sanityEssentialConfig)

export const checkUserExist = async email => {
  const user =
    await sanityServerClient.fetch(`*[_type=="user" && email == '${email}']{
      _id,
     }`)
  return user
}
