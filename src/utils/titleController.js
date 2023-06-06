let Routertitle = ''
let sitetitle = ''

function settitle() {
  if (!Routertitle && !sitetitle) {
    document.title = 'loading...'
  } else if (Routertitle && !sitetitle) {
    document.title = Routertitle
  } else if (!Routertitle && sitetitle) {
    document.title = sitetitle
  } else {
    document.title = `${Routertitle}-${sitetitle}`
  }
}

export default {
  //设置路由标题
  setRouterTitle(title) {
    Routertitle = title
    settitle()
  },
  //设置网站标题
  setSiteTitle(title) {
    sitetitle = title
  }
}
