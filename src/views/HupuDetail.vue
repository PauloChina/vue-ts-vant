<template>
  <div>
    <cus-nav-bar></cus-nav-bar>
    <div class="p-10">
      <van-loading v-show="loading" size="24px">加载中...</van-loading>
      <div class="t-20 t-bold">{{title}}</div>
      <div v-if="user.username" class="flex align-center m-t-10">
        <van-image class="avatar" round fit="cover" :src="user.header" />
        <div class="m-l-10">{{user.username}}</div>
        <div>{{user.date}}</div>
      </div>
      <div class="detail-content m-t-10" v-html="content"></div>
      <div class="floors" v-if="lights.length > 0">
        <van-divider class="m-t-10 m-b-10" :style="{ color: '#1989fa', borderColor: '#1989fa' }">亮了</van-divider>
        <div class="floor-row" v-for="(r,i) in lights" :key="'l'+i" v-html="r"></div>
      </div>
      <div class="floors" v-if="replies.length > 0">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}">回帖</van-divider>
        <div class="floor-row" v-for="(r,i) in replies" :key="'r'+i" v-html="r"></div>
      </div>
      <div v-if="replies.length > 0 && !noMoreReplies" style="color: #bbbbbb; text-align: center; padding: 1rem;"
        @click="getMoreReplies()">加载更多回复</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cell, Loading, Divider } from 'vant'
Vue.use(Cell)
Vue.use(Loading)
Vue.use(Divider)

@Component
export default class HupuDetail extends Vue {
  title = ''
  content = ''
  replies = []
  lights = []
  user: any = {}
  loading = false
  replyPage = 1
  noMoreReplies = false

  created() {
    if (this.$route.query && this.$route.query.id) {
      this.getHtml(this.$route.query.id as string)
    }
  }
  getHtml(id: string) {
    this.loading = true
    this.$http
      .get(this.$api.hupuBbsDetail, { id })
      .then((r: any) => {
        this.loading = false
        const tmp = r.props.pageProps.thread.t_detail
        this.title = tmp.title
        this.content = tmp.content
        this.user = tmp.user
        this.getComments(id)
        setTimeout(function () {
          document.querySelectorAll('.lazy-gif>img').forEach((i) => {
            i.addEventListener('click', function (e) {
              const tmp = e.target as Element
              const url = tmp.getAttribute('data-gif')
              if (url) {
                tmp.setAttribute('src', url)
                tmp.setAttribute('data-gif', '')
              }
            })
          })
        }, 1000)
      })
      .catch(() => {
        this.loading = false
      })
  }
  getComments(id: string) {
    this.$http.get(this.$api.hupuBbsComments, { id, page: this.replyPage }).then((r: any) => {
      if (r.replies && r.replies.length > 0) {
        this.replies = this.replies.concat(r.replies)
        this.lights = this.lights.concat(r.lights)
      } else {
        this.noMoreReplies = true
      }
    })
  }
  getMoreReplies() {
    if (this.noMoreReplies) return
    this.replyPage++
    this.getComments(this.$route.query.id as string)
  }
}
</script>
<style lang="scss" scoped>
.detail-content {
  line-height: 1.6;
}
/deep/.basketballTobbs_tag {
  display: none;
}
/deep/.article-deposit-pic {
  margin: 10px 0;
  width: 100%;
}
/deep/.lazy-gif {
  position: relative;
  display: block;
  background: #c4c4c4;
}
/deep/.lazy-gif .article-deposit-pic {
  margin: 0;
  max-width: 350px;
}
/deep/.van-cell {
  padding-right: 0;
  padding-left: 0;
}
/deep/.gif-icon {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 0;
  bottom: 0;
  background: url(https://w3.hoopchina.com.cn/images/m/gif-sign.png) center / 100% no-repeat;
}
/deep/ video {
  max-width: 100%;
}
.avatar {
  width: 36px;
  height: 36px;
}
.floors .floor-row {
  padding: 0.6rem 0;
  border-bottom: 1px solid #e4e4e4;
}
.floors .floor-row:last-child {
  border-bottom: none;
}
/deep/.floor_box {
  font-size: 13px;
  width: 100%;
}
/deep/.user,
/deep/.floor_box .right.f666,
/deep/.floor_box .case .f999,
/deep/.floor_box .liangShare {
  display: none;
}
/deep/.floor_box .author {
  margin-bottom: 5px;
}
/deep/.floor_box .author .left .u {
  margin-right: 14px;
}
/deep/.floor_box .author .left .f444 {
  float: right;
}
/deep/.floor_box .case p {
  line-height: 1.6;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
/deep/.floor_box .case img {
  max-width: 100%;
}
/deep/.floor_box .case {
  line-height: 1.6;
  table-layout: fixed;
  width: 100%;
}
/deep/.floor_box .case td br {
  display: none;
}
/deep/.floor_box .case blockquote {
  margin: 0.3rem 0.5rem;
  padding: 0.3rem 0.5rem;
  background: #f4f4f4;
}
/deep/.van-loading {
  text-align: center;
}
/deep/.van-divider {
  margin: 4px 0;
}
</style>