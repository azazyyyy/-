import Mock from 'mockjs'

Mock.mock('/api/banner', 'get', {
  code: 0,
  msg: '',
  data: [
    {
      id: '1',
      midImg:
        'https://img2.baidu.com/it/u=3298396217,1147288724&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      bigImg:
        'https://img2.baidu.com/it/u=3298396217,1147288724&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      title: '凛冬将至',
      description: '人唯有恐惧的时候方能勇敢'
    },
    {
      id: '2',
      midImg:
        'https://img0.baidu.com/it/u=632881762,1240672979&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625',
      bigImg:
        'https://img0.baidu.com/it/u=632881762,1240672979&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=625',
      title: '血火同源',
      description: '如果我回头，一切都完了'
    },
    {
      id: '3',
      midImg:
        'https://img1.baidu.com/it/u=1822199198,939339446&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666',
      bigImg:
        'https://img1.baidu.com/it/u=1822199198,939339446&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666',
      title: '听我怒吼',
      description: '兰尼斯特有债必偿'
    }
  ]
})
