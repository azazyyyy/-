import { getsetting } from '@/api/setting'
import { setTitle } from '@/utils'

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setdata(state, payload) {
      state.data = payload
    }
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit('setLoading', true)
      const resp = await getsetting()
      ctx.commit('setdata', resp)
      ctx.commit('setLoading', false)
      if (resp.favicon) {
        let link = document.querySelector('link[ref="shortcut icon"]')
        if (link) {
          return
        }
        link = document.createElement('link')
        link.rel = 'shortcut icon'
        link.tyoe = 'images/x-icon'
        link.href = resp.favicon
        document.querySelector('head').appendChild(link)
      }

      if (resp.siteTitle) {
        setTitle.setSiteTitle(resp.siteTitle)
      }
    }
  }
}
