import { model } from '@medusajs/framework/utils'

const FloatingReel = model.define('floating_reel', {
  id: model.id().primaryKey(),
  video_url: model.text(),
  title: model.text(),
  location: model.text(),
})

export default FloatingReel
