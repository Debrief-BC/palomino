<template>
  <div id="app" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form class="demo-ruleForm">
      <el-form-item label="Nickname">
        <el-input v-model="nickname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Debrief from "../debrief";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      nickname: "",
      fullscreenLoading: false
    };
  },
  computed: mapState({
    address: state => state.user.address,
    privateKey: state => state.user.privateKey,
    publicKey: state => state.user.publicKey
  }),
  methods: {
    ...mapActions("user", ["update"]),
    register: function() {
      var vm = this;
      if (!this.nickname) {
        return;
      }
      this.fullscreenLoading = true;
      Debrief.register(this.privateKey, this.publicKey, this.nickname);

      var interval = setInterval(function() {
        Debrief.getUserInfo(vm.address).then(userInfo => {
          if (userInfo) {
            clearInterval(interval);
            vm.update().then(() => {
              vm.$router.replace({ path: "/sign" });
            });
          }
        });
      }, 5000);
    }
  }
};
</script>


<style lang="less" scoped>
#app {
  margin: 300px auto;
  width: 800px;

  overflow: hidden;
  border-radius: 3px;
}
</style>