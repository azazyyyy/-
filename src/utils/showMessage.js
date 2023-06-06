import getCommponentRootDom from './getCommponentRootDom'
import Icon from '@/components/Icon'
import styles from './showMessage.module.less'
/**
 * 弹出信息
 * @param {String} content 消息内容
 * @param {String} type 消息类型
 * @param {Number} duration 多久消失
 * @param {HTMLElement} container 哪个容器内显示
 */
export default function(option = {}) {
  const content = option.content || ''
  const type = option.type || 'info'
  const duration = option.duration || 2000
  const container = option.container || document.body
  const div = document.createElement('div')
  const icondom = getCommponentRootDom(Icon, { type })
  div.innerHTML = `<span class="${styles.icon}">${icondom.outerHTML}</span><div>${content}</div>`
  const typeclassname = styles[`message-${type}`]
  div.className = `${styles.message} ${typeclassname}`

  if (option.container) {
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative'
    }
  }

  container.appendChild(div)
  div.clientHeight
  div.style.opacity = 1
  div.style.transform = 'translate(-50%,-50%)'

  setTimeout(() => {
    div.style.opacity = 0
    div.style.transform = 'translate(-50%,-50%) translateY(-25px)'
    div.addEventListener(
      'transitionend',
      function() {
        div.remove
        option.callback && option.callback()
      },
      { once: true }
    )
  }, duration)
}
