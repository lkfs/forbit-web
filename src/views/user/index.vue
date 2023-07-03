<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="User ID">
        <el-input v-model="params.userId" placeholder="User ID"></el-input>
      </el-form-item>
      <el-form-item label="Nickname">
        <el-input v-model="params.nickName" placeholder="Nickname"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="params.userName" placeholder="Email"></el-input>
      </el-form-item>
      <el-form-item label="Role">
        <el-checkbox v-model="params.roleSet_NotNull">有Role</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.stop.prevent="load(1)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="result.content" style="width: 100%">
      <el-table-column type="index" label="№" width="180" />
      <el-table-column prop="userId" label="User ID" width="180" />
      <el-table-column prop="nickName" label="Nickname">
        <template slot-scope="scope">
          <div class="nickName flex-x-start">
            <img :src="scope.row.avatar" class="avatar flex-align-center" />
            <span class="flex-align-center">{{ scope.row.nickName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Gender">
        <template slot-scope="scope">
          {{ scope.row.gender == 1 ? 'Male' : 'Female' }}
        </template>
      </el-table-column>
      <el-table-column label="handler" width="360">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="handleForbit(scope.$index, scope.row)">Forbit</el-button>
          <el-button type="primary" plain size="mini" @click="handleSetRole(scope.$index, scope.row)">Set Role</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout="prev, pager, next" :total="result.totalElements" :page-size="params.pageSize" :current-page="params.pageNumber + 1" @current-change="load" @prev-click="load" @next-click="load"></el-pagination>

    <user-set-role :dialog-visible.sync="setRoleParam.visible" :user-item="setRoleParam.userItem" />

    <user-forbid :dialog-visible.sync="forbitParam.visible" :user-item="forbitParam.userItem" />
  </div>
</template>

<script>
import userSetRole from './components/userSetRole.vue';
import userForbid from './components/userForbid.vue';
import { _userInfoQuery } from '@/api/user.js';

export default {
  components: {
    userSetRole,
    userForbid
  },
  data() {
    return {
      result: {},
      params: { pageSize: 10 },
      setRoleParam: {
        userItem: null,
        visible: false
      },
      forbitParam: {
        userItem: null,
        visible: false
      }
    };
  },
  mounted() {
    this.load(1);
  },
  methods: {
    load(pageNumber) {
      this.params.pageNumber = pageNumber - 1;
      _userInfoQuery(this.params).then(data => {
        this.result = data.result;
      });
    },
    handleSetRole(idx, row) {
      this.setRoleParam = {
        userItem: row,
        visible: true
      };
    },
    handleForbit(idx, row) {
      this.forbitParam = {
        userItem: row,
        visible: true
      };
    }
  }
};
</script>

<style scoped lang="scss">
.nickName {
  img {
    width: 30px;
    height: 30px;
    border-radius: 15px;
  }
  span {
    margin-left: 5px;
  }
}
</style>
