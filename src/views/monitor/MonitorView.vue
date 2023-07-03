<template>
  <div class="video flex-x-between">
    <agora :uid="uid" :channel="channel" :token="token">
      <agora-audio-receiver />
      <agora-video-receiver>
        <div class="player"></div>
      </agora-video-receiver>
    </agora>
  </div>
</template>

<script>
// refer: https://webdemo.agora.io/agora_rtc_vue_doc/guide/introduction.html
export default {
  props: {
    channel: { type: String, default: '' },
    token: { type: String, default: '' }
  },
  data() {
    return {
      uid: 10000
    };
  },
  mounted() {
    /* console.log(this.appid, this.channel, this.token);
    this.$eventBus.$on('monitor.start', () => {
      debugger;
      this.show = true;
      // this.$refs.ar.leave();
      // this.$refs.ar.start();
    }); */
  },
  methods: {
    /* start() {
      this.$refs.ar.start();
    }*/
  }
};
</script>
<style lang="scss" scoped>
.video {
  .player {
    width: 180px;
    height: 320px;
    margin: 5px;
    border: 1px solid blue;
  }
}
</style>
