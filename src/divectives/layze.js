import eventbus from '@/Evenbus'
import { debunce } from '@/utils'
import defaultGif from '@/assets/default.gif'
let images = []

function setImage(img) {
  img.dom.src = defaultGif

  const clientHeight = document.documentElement.clientHeight
  const rect = img.dom.getBoundingClientRect()
  const height = rect.height || 150
  if (rect.top >= -height && rect.top <= clientHeight) {
    img.dom.src = img.src
    images = images.filter(i => i !== img)
  }
}
function setImages() {
  for (const img of images) {
    // 处理该图片
    setImage(img)
  }
}
function handleScroll() {
  setImages()
}
// setInterval(() => {

// }, 2000)
eventbus.$on('mainScroll', debunce(handleScroll, 50))
export default {
  inserted(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value
    }
    images.push(img)
    // 立即处理它
    setImage(img)
  },
  unbind(el) {
    images = images.filter(img => img.dom !== el)
  }
}
