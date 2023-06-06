import requite from './requite'

export async function getProjects() {
  return await requite.get('/api/project')
}
