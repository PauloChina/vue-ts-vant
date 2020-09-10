<template>
  <div class="content">
    <cus-nav-bar>
      <template #right>
        <van-icon size="28" name="user-circle-o" />
      </template>
    </cus-nav-bar>
    <h3>This is an about page</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class About extends Vue {}
</script>
