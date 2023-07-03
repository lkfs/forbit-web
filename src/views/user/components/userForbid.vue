<template>
  <div>
    <el-dialog v-if="dialogVisible" :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="dialog">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">User ID :</span>
            <span class="field">{{ userItem.userId }}</span>
            <span class="title">Nickname:</span>
            <span class="field">{{ userItem.nickName }}</span>
          </div>
          <div class="flex-y-start block">
            <div class="block-item">
              <el-radio v-model="userItem.status" label="1">Unforbit</el-radio>
            </div>
            <div class="block-item">
              <el-radio v-model="userItem.status" label="7">Forbit util date</el-radio>
              <el-date-picker v-if="userItem.status == 7" v-model="userItem.forbidEndDate" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="block-item">
              <el-radio v-model="userItem.status" label="9">Forbit permanent</el-radio>
            </div>
          </div>
        </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="handleClose">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { _userForbidSave } from '@/api/user.js';

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userItem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      roleList: [],
      role: ''
    };
  },
  computed: {
    title() {
      return 'Forbit User';
    }
  },
  watch: {
    dialogVisible(val, old) {
      if (val) {
        // this.load();
      }
    }
  },
  methods: {
    // 保存封禁
    handleSave() {
      this.loading = true;

      let self = this;
      let params = {
        userId: self.userItem.userId,
        status: self.userItem.status,
        forbidEndDate: self.userItem.forbidEndDate
      };

      _userForbidSave(params)
        .then(res => {
          this.loading = false;
          this.$message.success('保存成功');
          this.handleClose();
        })
        .catch(err => {
          this.loading = false;
          this.$message.error('保存失败:' + err);
        });
    },
    handleClose() {
      this.$emit('update:dialogVisible', false);
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  font-weight: bold !important;
  margin-right: 5px;
}

.field {
  margin-right: 20px;
}

.checkbox {
  font-size: 120%;
  margin: 10px 0;
}
.block {
  .block-item {
    margin-bottom: 20px;
  }
}
</style>
