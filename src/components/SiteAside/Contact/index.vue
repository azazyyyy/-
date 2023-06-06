<template>
  <ul class="Contact-contanier">
    <li>
      <a href="">
        <div class="Icon">
          <Icon type="github" />
        </div>
        <span>{{data.githubName}}</span>
      </a>

    </li>
    <li>
      <a href="mailto:1142901394@qq.com">
        <div class="Icon">
          <Icon type="mail" />
        </div>
        <span>{{data.mail}}</span>
      </a>

    </li>
    <li>
      <a href="">
        <div class="Icon weixin">
          <Icon type="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="top">
        <img src="../../../../image/qq.jpg" alt="">
      </div>
    </li>
    <li>
      <a href="tencent://message/?Menu=yes&uin=1142901394&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45">
        <div class="Icon">
          <Icon type="qq" />
        </div>
        <span>{{data.qq}}</span>
      </a>
      <div class="top">
        <img src="../../../../image/qq.jpg" alt="">
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon"
import { mapState } from 'vuex'
export default {
  components: {
    Icon,
  },
  computed: mapState('setting', ['data'])
}
</script>

<style scoped lang="less">
@import '~@/styles/var';
.Contact-contanier {
  color: @gray;
  @itenheight: 30px;
  list-style: none;
  padding: 20px;
  margin: 0;
  li {
    height: 30px;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    // &:hover {
    //   .top {
    //     transform: scaleY(1);
    //   }
    // }
  }
  a {
    display: flex;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      color: #666;
    }
    &:hover + .top {
      transform: scaleY(1);
    }
  }
  .Icon {
    font-size: 26px;

    margin-right: 5px;
    &.weixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }
  .top {
    position: absolute;

    left: 0;
    bottom: @itenheight+5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
      object-fit: contain;
    }
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translate(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      bottom: -4px;
      background: #fff;
    }
  }
}
</style>