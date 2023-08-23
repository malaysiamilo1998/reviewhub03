import company from './company-schema'
import { tag, taggable } from './tag-schema'
import { topic, thread, post } from './forum-schema'
import { user } from './user-schema'
import { ratekey, usercompanyrate, usercomment } from './rate-schema'
import { avatar } from './avatar-schema'
import { gametype, game } from './game-schema'
import companyGame from './company-game'
import { carousel } from './carousel-banner'
import { carouselbannerimage } from './carousel-images'
import { contacttype, contact } from './contact-schema'
import { ads } from './ads-schema'
import { threadcomment, userthreadlike } from './thread-comment-like-schema'
import {
  newssection,
  news,
  newssectioncategory
} from './editor-recomment-schema'
export const schemaTypes = [
  newssection,
  ads,
  news,
  newssectioncategory,
  company,
  user,
  avatar,
  topic,
  thread,
  threadcomment,
  userthreadlike,
  post,
  ratekey,
  usercompanyrate,
  usercomment,
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
