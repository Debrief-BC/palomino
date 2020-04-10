<template>
  <div id="app" v-loading.fullscreen.lock="fullscreenLoading">
    <el-form class="demo-ruleForm">
      You need register on blockchain, if you don't have DBF you can ask admin for get.
      <br />
      <br />
      <b style="font-size:20px">You Had : {{balance}} need 0.001</b>
      <el-form-item label="Address">{{address}}</el-form-item>
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
  name: "Register",
  data() {
    return {
      nickname: "",
      balance: "...",
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
      Debrief.register(this.privateKey, this.publicKey, this.nickname)
        .then(hash => {
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
        })
        .catch(err => {
          this.fullscreenLoading = false;
          if (
            err.message ==
            "Returned error: insufficient funds for gas * price + value"
          ) {
            this.$alert("Insufficient funds, ask admin to get some", "Error", {
              confirmButtonText: "Done"
            });
          } else {
            this.$alert("Try again", "Error", {
              confirmButtonText: "Done"
            });
          }
        });
    }
  },
  mounted() {
    var vm = this;
    Debrief.getBalance(this.address).then(balance => {
      vm.balance = balance;
    });
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