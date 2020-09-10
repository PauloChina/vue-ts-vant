<template>
  <div class="content">
    <cus-nav-bar :leftArrow="true"></cus-nav-bar>
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CusNavBar from '@/components/CusNavBar.vue'

@Component({ components: { CusNavBar } })
export default class About extends Vue {}
</script>
