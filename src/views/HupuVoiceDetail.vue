<template>
  <div>
    <cus-nav-bar></cus-nav-bar>
    <div class="p-10">
      <div class="t-20 t-bold">{{title}}</div>
      <div class="flex m-t-10 m-b-10" style="color: #999999;">
        <div class="flex1">{{time}}</div>
        <div>来自&nbsp;{{from}}</div>
      </div>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell } from 'vant'
Vue.use(Cell)

@Component
export default class HupuDetail extends Vue {
  title = ''
  content = ''
  from = ''
  time = ''

  created() {
    if (this.$route.query && this.$route.query.id) {
      this.getHtml(this.$route.query.id as string)
    }
  }
  getHtml(id: string) {
    this.$http.get(this.$api.hupuVoiceDetail, { id }).then((r: any) => {
      this.title = r.title
      this.content = r.content
      this.from = r.from
      this.time = r.time
    })
  }
}
</script>
<style lang="scss" scoped>
::v-deep .artical-importantPic {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
}
::v-deep img {
  width: 100%;
}
</style>