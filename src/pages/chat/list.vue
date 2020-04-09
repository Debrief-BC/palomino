<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: mapState({
    sessions: state => state.session.sessions,
    currentAddress: state => state.session.currentSessionAddress
  }),
  sockets: {
    messages: function(messages) {
      this.updateMessages(messages);
    }
  },
  methods: {
    ...mapActions("session", ["selectSession", "updateMessages"]),
    select: function(address) {
      this.selectSession(address).then(x => {
        this.$socket.emit("getMessages", x);
      });
    }
  }
};
</script>

<template>
  <div class="list">
    <ul>
      <li
        v-for="item in sessions"
        :key="item.address"
        :class="{ active: item.address === currentAddress }"
        @click="select(item.address)"
      >
        <p class="name">{{item.nickname}}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.list {
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  .name {
    vertical-align: middle;
    display: inline-block;
    margin: 0 0 0 15px;
  }
}
</style>