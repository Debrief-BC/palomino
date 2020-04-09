<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    ...mapActions("session", ["sendMessage"]),
    onKeyup(e) {
      if (e.keyCode === 13) {
        if (this.content.trim().length) {
          this.sendMessage(this.content).then(message => {
            this.$socket.emit("sendMessage", message);
          });
        }
        this.content = "";
      }
    }
  }
};
</script>

<template>
  <div class="text">
    <textarea placeholder="Press Enter To Send" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<style lang="less" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>