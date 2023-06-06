import request from './requite'

/**
 * 获取博客列表数据
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
  return await request.get('/api/blog', {
    params: {
      page,
      limit,
      categoryid
    }
  })
}

/**
 * 获取博客分类
 */
export async function getBlogCategories() {
  return await request.get('/api/blogtype')
}

export async function getBlog(id) {
  return await request.get('/api/blog/${id}')
}
export async function Postcomment(commentInfo) {
  return await request.post('/api/comment', commentInfo)
}
export async function getcomment(page = 1, limit = 10, blogid) {
  return await request.get('/api/comment', {
    params: {
      page,
      limit,
      blogid
    }
  })
}
