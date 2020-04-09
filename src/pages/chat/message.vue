<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("session", { session: "currentSession" })
  },
  filters: {
    time(timestamps) {
      var date = new Date(timestamps * 1000);
      return date.getHours() + ":" + date.getMinutes();
    }
  },
  directives: {
    "scroll-bottom"(el) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  }
};
</script>

<template>
  <div class="message" v-if="session" v-scroll-bottom="session.messages">
    <ul>
      <li v-for="item in session.messages" :key="item.id">
        <p class="time">
          <span>{{item.timestamps | time}}</span>
        </p>
        <div class="main" :class="{ self: item.self }">
          <div class="text">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.message {
  padding: 10px 15px;
  overflow-y: scroll;

  li {
    margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }

  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: ~"calc(100% - 40px)";
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .text {
      background-color: #b2e281;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>