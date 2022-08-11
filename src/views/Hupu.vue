<template>
  <div>
    <cus-nav-bar :leftArrow="false"></cus-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="热点">
        <van-pull-refresh v-model="news.refreshing" @refresh="onNewsRefresh">
          <van-list v-model="news.loading" :finished="news.finished" :error.sync="news.error" finished-text="没有更多了"
            @load="onNewsLoad">
            <van-cell v-for="item in news.list" :key="item.id" @click="goNewsDetail(item)">
              <template #title>
                <div class="flex align-center">
                  <div class="flex-col flex1">
                    <div class="cell-title">{{item.title}}</div>
                    <div class="cell-label">
                      <div class="inline-block">
                        <van-icon name="chat-o" /><span>&nbsp;{{item.replies}}</span>
                      </div>
                      <div class="inline-block m-l-10">
                        <span>来自&nbsp;{{item.topic.name}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="cell-img" v-if="item.cover">
                    <van-image :radius="5" fit="cover" lazy-load :src="item.cover" />
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="新闻">
        <van-pull-refresh v-model="voices.refreshing" @refresh="onVoicesRefresh">
          <van-list v-model="voices.loading" :finished="voices.finished" :error.sync="voices.error"
            finished-text="没有更多了" @load="onVoicesLoad">
            <van-cell v-for="item in voices.list" :key="item.id" @click="goVoicesDetail(item)">
              <template #title>
                <div class="cell-title">{{item.title}}</div>
                <div class="cell-label flex">
                  <div class="flex1">
                    <span>来自&nbsp;{{item.username}}</span>
                    <span class="m-l-10">{{item.time}}</span>
                  </div>
                  <div>
                    <span>
                      <van-icon name="award-o" />&nbsp;{{item.recommendNum}}
                    </span>
                    <span class="m-l-10">
                      <van-icon name="chat-o" />&nbsp;{{item.replies}}
                    </span>
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="话题">
        <van-pull-refresh v-model="topics.refreshing" @refresh="onTopicsRefresh">
          <van-list v-model="topics.loading" :finished="topics.finished" :error.sync="topics.error"
            finished-text="没有更多了" @load="onTopicsLoad">
            <van-cell v-for="item in topics.list" :key="item.id" @click="goTopicsDetail(item)">
              <template #title>
                <div class="cell-title">{{item.title}}</div>
                <div class="cell-label flex">
                  <div class="flex1">
                    <span>来自&nbsp;{{item.username}}</span>
                    <span class="m-l-10">{{item.time}}</span>
                  </div>
                  <div>
                    <span>
                      <van-icon name="award-o" />&nbsp;{{item.recommendNum}}
                    </span>
                    <span class="m-l-10">
                      <van-icon name="chat-o" />&nbsp;{{item.replies}}
                    </span>
                  </div>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tab, Tabs, Cell, List, PullRefresh } from 'vant'

Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
Vue.use(PullRefresh)

@Component
export default class Hupu extends Vue {
  active = 0
  news = {
    page: 1,
    loading: false,
    refreshing: false,
    finished: false,
    error: false,
    list: [],
  }
  onNewsLoad() {
    setTimeout(() => {
      if (this.news.refreshing) {
        this.news.list = []
        this.news.page = 1
        this.news.finished = false
        this.news.refreshing = false
      }
      this.$http
        .get(this.$api.hupuSummary, { p: this.news.page })
        .then((r: any) => {
          this.news.loading = false
          if (r.length > 0) {
            this.news.list = r
          }
          this.news.finished = true
        })
        .catch(() => {
          this.news.loading = false
          this.news.error = true
        })
    }, 500)
  }
  onNewsRefresh() {
    this.news.finished = false
    this.onNewsLoad()
  }
  goNewsDetail(v: any) {
    if (v.tid) {
      this.$router.push({
        name: 'HupuDetail',
        query: { id: v.tid },
      })
    }
  }
  voices = {
    page: 1,
    loading: false,
    refreshing: false,
    finished: false,
    error: false,
    list: [],
  }
  onVoicesLoad() {
    setTimeout(() => {
      if (this.voices.refreshing) {
        this.voices.list = []
        this.voices.page = 1
        this.voices.finished = false
        this.voices.refreshing = false
      }
      this.$http
        .get(this.$api.hupuVoices, { p: this.voices.page })
        .then((r: any) => {
          this.voices.loading = false
          if (r.data && r.data.topicThreads && r.data.topicThreads.length > 0) {
            this.voices.page++
            this.voices.list = this.voices.list.concat(r.data.topicThreads)
          } else {
            this.voices.finished = true
          }
        })
        .catch(() => {
          this.voices.error = true
        })
    }, 500)
  }
  onVoicesRefresh() {
    this.voices.refreshing = true
    this.onVoicesLoad()
  }
  goVoicesDetail(v: any) {
    if (v.tid) {
      this.$router.push({
        name: 'HupuDetail',
        query: { id: v.tid },
      })
    }
  }
  topics = {
    page: 1,
    loading: false,
    refreshing: false,
    finished: false,
    error: false,
    list: [],
  }
  onTopicsLoad() {
    setTimeout(() => {
      if (this.topics.refreshing) {
        this.topics.list = []
        this.topics.page = 1
        this.topics.finished = false
        this.topics.refreshing = false
      }
      this.$http
        .get(this.$api.hupuTopics, { p: this.topics.page })
        .then((r: any) => {
          this.topics.loading = false
          if (r.data && r.data.topicThreads && r.data.topicThreads.length > 0) {
            this.topics.page++
            this.topics.list = this.topics.list.concat(r.data.topicThreads)
          } else {
            this.topics.finished = true
          }
        })
        .catch(() => {
          this.topics.error = true
        })
    }, 500)
  }
  onTopicsRefresh() {
    this.topics.refreshing = true
    this.onTopicsLoad()
  }
  goTopicsDetail(v: any) {
    if (v.tid) {
      this.$router.push({
        name: 'HupuDetail',
        query: { id: v.tid },
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cell-title {
  font-size: 14px;
  line-height: 1.2;
}
.cell-label {
  font-size: 12px;
  color: #999999;
}
.cell-img {
  max-width: 80px;
  max-height: 62px;
  margin-left: 10px;
}
::v-deep .cell-img .van-image {
  max-height: 62px;
}
</style>