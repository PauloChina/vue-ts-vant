<template>
  <van-sticky>
    <van-nav-bar :title="title || $route.meta.title" :left-text="leftText" :right-text="rightText"
      :left-arrow="leftArrow" :fixed="fixed" :placeholder="placeholder" :border="border" :z-index="zIndex"
      @click-left="clickLeft" @click-right="clickRight">
      <template #left>
        <slot name="left"></slot>
      </template>
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </van-sticky>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Sticky, NavBar } from 'vant'
Vue.use(NavBar)
Vue.use(Sticky)

@Component
export default class CusNavBar extends Vue {
  @Prop() public title?: string
  @Prop() public leftText?: string
  @Prop() public rightText?: string
  @Prop({ default: true }) public leftArrow?: boolean
  @Prop({ default: true }) public border?: boolean
  @Prop({ default: false }) public fixed?: boolean
  @Prop({ default: false }) public placeholder?: boolean
  @Prop({ default: 1 }) public zIndex?: number | string

  clickLeft(): void {
    if (this.$listeners['click-left']) {
      this.$emit('click-left')
    } else {
      this.$router.go(-1)
    }
  }
  clickRight(): void {
    this.$emit('click-right')
  }
}
</script>