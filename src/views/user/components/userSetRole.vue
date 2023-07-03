<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" class="dialog" v-if="dialogVisible">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">User ID :</span>
            <span class="field">{{ userItem.userId }}</span>
            <span class="title">Nickname:</span>
            <span class="field">{{ userItem.nickName }}</span>
          </div>
          <el-checkbox-group v-model="userItem.roleSet" class="flex-y-start">
            <el-checkbox v-for="item in roleList" :key="item.role" :label="item.role"></el-checkbox>
          </el-checkbox-group>
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
import { _adminSystemRoleList, _adminSystemRoleSave } from '@/api/system.js';

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
      return 'User Set Role';
    }
  },
  watch: {
    dialogVisible(val, old) {
      if (val) {
        this.load();
      }
    }
  },
  methods: {
    selectAll(state) {
      if (state) {
        this.rightSelectedList = this.rightTotalList.map(it => {
          return it.rightId;
        });
      } else {
        this.rightCheckedList = [];
      }
    },
    // 加载角色列表
    load() {
      let self = this;
      _adminSystemRoleList({}).then(data => {
        console.log('接口请求成功，' + data.result);
        self.roleList = data.result;
        self.roleList = self.roleList.map(role => {
          let selected = role === self.userItem.role;
          return {
            selected: selected,
            role: role
          };
        });
      });
    },
    // 保存角色设置
    handleSave() {
      this.loading = true;

      let self = this;
      let params = {
        userId: self.userItem.userId,
        roleSet: self.userItem.roleSet
      };

      _adminSystemRoleSave(params)
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

<style>
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
</style>
