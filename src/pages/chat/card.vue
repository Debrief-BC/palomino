<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    nickname: state => state.user.nickname
  })
};
</script>

<template>
  <div class="card">
    <header>
      <p class="name">{{ nickname }}</p>
    </header>
  </div>
</template>

<style scoped lang="less">
.card {
  padding: 12px;
  border-bottom: solid 1px #24272c;

  .name {
    vertical-align: middle;
    display: inline-block;
    margin: 0px;
    font-size: 20px;
  }
}
</style>