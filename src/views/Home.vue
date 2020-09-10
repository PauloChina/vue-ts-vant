<template>
  <div>
    <cus-nav-bar :leftArrow="false">
    </cus-nav-bar>
    <div class="content">
      <van-button type="primary" @click="goAbout">关于</van-button>
      <div style="height: 900px;padding-top:20px;">滚动时标题栏吸顶效果</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  goAbout() {
    this.$router.push('About')
  }
}
</script>
