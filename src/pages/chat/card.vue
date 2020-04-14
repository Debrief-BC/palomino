<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    nickname: state => state.user.nickname,
    avatar: state => state.user.avatar
  })
};
</script>

<template>
  <div class="card">
    <header>
      <div v-html="avatar" class="avatar" :alt="nickname"></div>
      <p class="name">{{ nickname }}</p>
    </header>
  </div>
</template>

<style scoped lang="less">
.card {
  padding: 12px;
  border-bottom: solid 1px #24272c;

  .avatar,
  .name {
    vertical-align: middle;
    display: inline-block;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
  .name {
    margin: 4px 0px 0px 4px;
    font-size: 20px;
  }
}
</style>