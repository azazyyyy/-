import requite from './requite'

export async function getMessages(page = 1, limit = 10) {
  return await requite.get('/api/message', {
    params: {
      page,
      limit
    }
  })
}

export async function postMessage(msgInfo) {
  return await requite.post('/api/message', msgInfo)
}
