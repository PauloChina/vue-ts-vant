<template>
  <div>
    <cus-nav-bar :leftArrow="false" :border="false"></cus-nav-bar>
    <div>
      <van-grid :column-num="3">
        <van-grid-item v-for="(item,i) in apps" :key="i" @click="goApp(item)">
          <template #icon>
            <div class="app-icon">
              <van-image class="img" :src="item.imgUrl" fit="contain" />
            </div>
          </template>
          <template #text>
            <div class="app-title">{{item.title}}</div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Grid, GridItem } from 'vant'
Vue.use(Grid)
Vue.use(GridItem)

@Component
export default class Home extends Vue {
  private apps: Array<unknown> = [
    { title: '知乎', imgUrl: 'https://static.zhihu.com/heifetz/assets/apple-touch-icon-120.b3e6278d.png' },
    {
      title: '虎扑足球',
      imgUrl: 'https://w1.hoopchina.com.cn/channel/website/static/images/soccer-logo.png',
      routeName: 'Hupu',
    },
  ]
  goApp(i: any) {
    if (i.routeName) {
      this.$router.push({ name: i.routeName })
    } else {
      alert(i.title)
    }
  }
}
</script>
<style>
.app-icon {
  height: 65px;
  width: 34%;
  margin-left: 33%;
}
.app-icon .img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.app-title {
  margin-top: 8px;
  font-size: 14px;
}
</style>
