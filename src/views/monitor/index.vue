<template>
  <div>
    <el-alert v-if="showSocketHint" :title="showSocketTitle" :type="showSocketType" center show-icon></el-alert>
    <div class="flex-x-between">
      <div class="flex-grow-1">
        <el-card v-for="room in roomList" :key="room.billId">
          <div class="flex-x-between">
            <p style="font-weight: bolder">Channel Name:</p>
            <p style="margin-left: 5px" class="flex-grow-1">{{ room.billId }}</p>
            <el-button type="primary" plain @click="roomExit(room.billId)">强制关房</el-button>
          </div>
          <div class="flex-y-center" @click="showAgora(room.billId)">
            <!--主播-->
            <el-card class="flex-grow-1">
              <div class="flex-x-start">
                <img :src="room.anchor.avatar" class="avatar" />
                <div class="userInfo flex-grow-1">
                  <p>{{ room.anchor.nickName }}</p>
                  <p>ID:{{ room.anchor.userId }}</p>
                </div>
                <div>
                  <el-button type="primary" plain>禁3天</el-button>
                  <el-button type="primary" plain>禁7天</el-button>
                </div>
              </div>
            </el-card>

            <!--用户-->
            <el-card class="flex-grow-1">
              <div class="flex-x-start">
                <img :src="room.customer.avatar" class="avatar" />
                <div class="userInfo flex-grow-1">
                  <p>{{ room.customer.nickName }}</p>
                  <p>ID:{{ room.customer.userId }}</p>
                </div>
                <div>
                  <el-button type="primary" plain>禁3天</el-button>
                  <el-button type="primary" plain>禁7天</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>
      <div class="flex-grow-3">
        <monitor-view v-if="agora.show" ref="monitor" :channel="agora.channel" :token="agora.token" />
      </div>
    </div>
  </div>
</template>

<script>
import monitorView from './MonitorView.vue';
import { _adminRtcToken, _adminRoomExit } from '@/api/user';

import { mapGetters } from 'vuex';
import io from 'socket.io-client';
export default {
  components: {
    monitorView
  },
  data() {
    return {
      roomList: [],
      agora: {
        show: false,
        channel: '',
        token: ''
      },
      curBillId: '',
      showSocketHint: false,
      showSocketType: 'error',
      showSocketTitle: ''
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    initWebSocket() {
      let socketIoServer = process.env.VUE_APP_SOCKET_IO;
      // socketIoServer = prompt('socker.io url?', socketIoServer);
      let socket = io(socketIoServer + '/live-room', {
        path: '/socket.io.im',
        timeout: 10000,
        reconnectionDelayMax: 10000,
        query: {
          token: this.token
        }
      });
      socket.on('connect', () => {
        console.log('connect success,', 'socketId =', socket.id);
        this.showSocketHint = true;
        this.showSocketType = 'success';
        this.showSocketTitle = 'socke.io connection success';
      });
      socket.on('connect_error', error => {
        console.log('socket.io connect error', error);
        this.showSocketHint = true;
        this.showSocketType = 'error';
        this.showSocketTitle = 'socke.io connection failure';
      });
      socket.on('token_expired', error => {
        console.log('socket.io token_expired', error);
        this.$store
          .dispatch('user/logout', this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || '/' });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
        // this.$router.push({ path: '/login', query: { redirect: '/monitor' } });
      });
      socket.on('room.start', data => {
        console.log('+++++++++++++收到room.start通知', data);
        let billId = data.billId;
        let found = false;
        this.roomList.forEach((item, idx) => {
          if (item.billId === billId) {
            found = true;
          }
        });
        if (!found) {
          this.roomList.unshift(data);
          if (this.roomList.length === 1) {
            this.showAgora(data.billId);
          }
        }
      });
      socket.on('room.end', data => {
        console.log('+++++++++++++收到room.end通知', data);
        let billId = data.billId;
        let rmIdx = -1;
        this.roomList.forEach((item, idx) => {
          if (item.billId === billId) {
            rmIdx = idx;
          }
        });
        if (rmIdx >= 0) {
          this.roomList.splice(rmIdx);
        }
      });
    },
    showAgora(billId) {
      if (billId === this.curBillId) return;
      this.agora.show = false;
      _adminRtcToken({ billId: billId })
        .then(data => {
          if (data.code === 200) {
            this.agora.show = true;
            this.agora.channel = billId;
            this.agora.token = data.result;
            this.curBillId = billId;
            // this.$eventBus.$emit('monitor.start');
          } else {
            alert('request fail, code =', data.code);
          }
        })
        .catch(error => {
          alert(error);
        });
    },
    roomExit(billId) {
      _adminRoomExit({ billId: billId })
        .then(data => {
          if (data.code === 200) {
            this.agora.show = false;
            console.log('room exit, billid :', billId);
          } else {
            alert('room exit fail, code =', data.code);
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar {
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 10px;
}
.userInfo {
  padding-left: 10px;
}
</style>
