import requite from './requite'

export async function getsetting() {
  return await requite.get('/api/setting')
}
