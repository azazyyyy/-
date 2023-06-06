<template>
  <div v-loading="loading" class="home-container" ref="container" @wheel="handlwheel">
    <ul class=" carousel-container" :style="{marginTop}" @transitionend="handleTransitionEnd">
      <li v-for="item in data" :key="item.id">
        <nimiHome :itemImg="item"></nimiHome>
      </li>
    </ul>
    <div v-show="index >= 1" class="icon icon-top" @click="switchTo(index-1)">
      <Icon type="arrowUp"></Icon>
    </div>
    <div v-show="index<data.length -1" class="icon icon-bottom" @click="switchTo(index+1)">
      <Icon type="arrowDown"></Icon>
    </div>
    <ul class="indicator">
      <li :class="{active: item.id===index}" v-for="(item, i) in data" :key="item.id" @click="switchTo(i)"></li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';

.carousel-container {
  width: 100%;
  height: 100%;
  transition: 0.3s;
  li {
    width: 100%;
    height: 100%;
  }
}
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
ul {
  margin: 0;
  list-style: none;
  padding: 0;
}
.icon {
  .self-center();
  font-size: 30px;
  @gap: 25px;
  color: @gray;
  cursor: pointer;
  transform: translateX(-50%);
  &.icon-top {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-bottom {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;

  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }

  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  li {
    width: 7px;
    height: 7px;
    background: @words;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-bottom: 10px;
    cursor: pointer;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>


<script>

import { getbanner } from '../../api/banner';
import banner from '../../store/banner';
import nimiHome from './nimiHome.vue';
import Icon from '@/components/Icon'
// import fetchDate from '@/mixins/fetchData.js'
import { mapState } from 'vuex';


export default {
  // mixins: [fetchDate([])],
  components: {
    nimiHome,
    Icon
  },
  data() {
    return {
      // isLoading: true,
      // banners: [],
      index: 0,
      containerHeight: 0,
      iswheel: false
    };
  },
  created() {
    this.$store.dispatch("banner/fetchBanner")
  },
  mounted() {

    this.containerHeight = this.$refs.container.clientHeight
    window.addEventListener("resize", this.handleResize)
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize)
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + 'px'
    },
    ...mapState("banner", ['loading', 'data'])
  },
  methods: {
    switchTo(i) {
      this.index = i
    },
    async fetchData() {
      return await getbanner()
    },
    handlwheel(e) {
      if (this.iswheel) {
        return
      }
      if (e.deltaY > 20 && this.index < this.data.length - 1) {
        this.iswheel = true

        this.index++
      }
      if (e.deltaY < -20 && this.index > 0) {
        this.iswheel = true
        this.index--

      }

    },
    handleTransitionEnd() {
      this.iswheel = false
    },
    handleResize() {

      this.containerHeight = this.$refs.container.clientHeight
    }
  }
}
</script>