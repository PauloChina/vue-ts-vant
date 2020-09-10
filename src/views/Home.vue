<template>
  <div>
    <cus-nav-bar :leftArrow="false"></cus-nav-bar>
    <div class="content">
      <van-button type="primary" @click="goAbout">关于</van-button>
      <div style="height: 900px;"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Grid, GridItem } from 'vant'

@Component
export default class Home extends Vue {
  goAbout() {
    this.$router.push('About')
  }
}
</script>
