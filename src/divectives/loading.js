import styles from './loading.module.less'
import imgSrc from '@/assets/loading.svg'

function getLoadingImage(el) {
  return el.querySelector('img[data-loadingname=loading]')
}

function createLoadingImg() {
  const img = document.createElement('img')
  img.dataset.loadingname = 'loading'
  img.src = imgSrc
  img.className = styles.loading
  return img
}

export default function(el, binding) {
  const curimg = getLoadingImage(el)
  if (binding.value) {
    if (!curimg) {
      const img = createLoadingImg()
      el.appendChild(img)
    }
  } else {
    if (curimg) {
      curimg.remove()
    }
  }
}
