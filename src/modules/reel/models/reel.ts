import { model } from '@medusajs/framework/utils'

const Reel = model.define('reel', {
  id: model.id().primaryKey(),
  video_url: model.text(),
  title: model.text(),
  location: model.text(),
})

export default Reel
