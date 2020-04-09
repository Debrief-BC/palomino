<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted: function() {
    this.$socket.emit("logout");
  }
};
</script>

<style>
body,
html {
  height: 100%;
  overflow: hidden;
}
body {
  background: #f5f5f5 url("./assets/bg.jpg") no-repeat center;
  background-size: cover;
}
ul {
  list-style: none;
}
body,
ul {
  margin: 0;
  padding: 0;
}
</style>
