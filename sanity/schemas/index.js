import company from './company-schema'
import { tag, taggable } from './tag-schema'
import { topic, thread, post } from './forum-schema'
import { user } from './user-schema'
import { ratekey, usercompanyrate } from './rate-schema'
import { avatar } from './avatar-schema'
import { gametype, game } from './game-schema'
import companyGame from './company-game'
import { carousel } from './carousel-banner'
import { carouselbannerimage } from './carousel-images'
import { contacttype, contact } from './contact-schema'
export const schemaTypes = [
  company,
  user,
  avatar,
  topic,
  thread,
  post,
  ratekey,
  usercompanyrate,
  gametype,
  game,
  companyGame,
  tag,
  taggable,
  carousel,
  carouselbannerimage,
  contacttype,
  contact
]
