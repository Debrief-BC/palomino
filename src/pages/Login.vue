<template>
  <div id="app">
    <input type="file" id="file" style="display: none;" @change="loadTextFromFile" />
    <el-form class="demo-ruleForm">
      <div v-if="showSelectOrGen">
        <el-form-item>
          <el-button type="primary" @click="openFileSelect">Select Keystore File</el-button>
          <el-button type="primary" @click="isGen=true">Generare a Keystore File</el-button>
          <br />For use this application, you need a version 3 eth keystore.
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="Password">
          <el-input v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item v-if="isGen">
          <el-button type="primary" @click="generare">Generare</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="unlock">Unlock</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

import Wallet from "ethereumjs-wallet";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      json: "",
      isGen: false,
      password: ""
    };
  },
  computed: {
    showSelectOrGen: function() {
      return !this.json && !this.isGen;
    }
  },
  methods: {
    ...mapActions("user", ["login"]),
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.json = e.target.result);
      reader.readAsText(file);
    },
    openFileSelect: function() {
      document.getElementById("file").click();
    },
    unlock: function() {
      var wallet;
      var vm = this;
      try {
        wallet = Wallet.fromV3(this.json, this.password);
        this.login({
          address: wallet.getAddressString(),
          privateKey: wallet.getPrivateKeyString(),
          publicKey: wallet.getPublicKeyString()
        }).then(() => {
          this.password = "";
          this.json = "";
          vm.$router.replace({ path: "/sign" });
        });
      } catch (e) {
        console.log(e);
        this.password = "";
        if (e.message == "Not a V3 wallet") {
          this.json = "";
          this.$alert("Not a V3 Keystore", "Error", {
            confirmButtonText: "Done"
          });
        } else {
          this.$alert("Error password", "Error", {
            confirmButtonText: "Done"
          });
        }
      }
    },
    generare: function() {
      if (!this.password) {
        return;
      }
      var wallet = Wallet.generate();
      download(
        wallet.getAddressString() + ".json",
        JSON.stringify(wallet.toV3(this.password))
      );
      var vm = this;
      this.$alert(
        "Your Address:" + wallet.getAddressString(),
        "Ask admin to get some DBF",
        {
          confirmButtonText: "Done",
          callback: action => {
            vm.login({
              address: wallet.getAddressString(),
              privateKey: wallet.getPrivateKeyString(),
              publicKey: wallet.getPublicKeyString()
            }).then(() => {
              vm.password = "";
              vm.json = "";
              vm.$router.replace({ path: "/sign" });
            });
          }
        }
      );
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