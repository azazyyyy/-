import request from './requite'

export async function getbanner() {
  return await request.get('/api/banner')
}
getbanner().then(r => {})
