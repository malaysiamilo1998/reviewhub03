import { client } from '@/utils/sanity'

const checkUserById = async _id => {
  const user = await client.fetch(`groq*[_type=="user" && _id=='${_id}']{
    
    }`)
}
