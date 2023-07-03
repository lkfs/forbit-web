<template>
  <el-cascader ref="cascader" :props="cascaderProps" @change="handleChange" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import { commonRegionLocationTree } from "@/api/dict";
import Cookies from "js-cookie"; // 引入mixin文件

export default {
  props: {
    index: {
      type: Number,
      default: -1,
    },
    //
    extProps: Object,
  },
  data() {
    //级联动态加载区域和地址
    let cascaderProps = {
      lazy: true,
      lazyLoad: (node, resolve) => {
        const { level } = node;
        let param;
        if (level === 0) {
          param = {
            parentId: Cookies.get("unitId"),
            parentLevel: Cookies.get("unitLevel"),
          };
        } else {
          param = {
            parentId: node.data.value.value,
            parentLevel: node.data.value.level,
          };
        }
        return this.apiCommonRegionLocationTree(param).then((list) => {
          resolve(list);
        });
      },
    };
    //合并扩展设置，例如 <addressSelector :extProps="{ checkStrictly: true }"/>
    cascaderProps = Object.assign(cascaderProps, this.extProps);
    return {
      cascaderProps,
    };
  },
  methods: {
    handleChange(selected) {
      console.log("地址选中", JSON.stringify(selected[selected.length - 1]));
      this.$emit("addressSelected", this.index, selected);
    },
    //加载区域与位置层叠树
    apiCommonRegionLocationTree(param) {
      return new Promise((resolve) => {
        commonRegionLocationTree(param).then((res) => {
          if (res.code !== 200) resolve([]);

          const list = res.result.map((item) => {
            return {
              value: item,
              label: item.label,
              leaf: item.level == 8,
            };
          });
          resolve(list);
        });
      });
    },
  },
};
</script>

<style></style>
