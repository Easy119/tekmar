<template>
  <div class="content">
    <el-row class="tac">
      <el-col :span="4" class="tabber">
        <el-menu
          default-active="list"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="list">
            <i class="el-icon-menu"></i>
            <span slot="title">新闻列表</span>
          </el-menu-item>
          <el-menu-item index="detail">
            <i class="el-icon-setting"></i>
            <span slot="title">新闻编辑</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="routerView">
        <div class="crumbber">
          <bread-crumb></bread-crumb>
        </div>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import breadCrumb from '../components/breadcrumb'
export default {
  components: {
    breadCrumb
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  .tac {
    flex: 1;
  }
  .routerView {
    flex: 1;
    .crumbber {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 25px;
    }
  }
}
.tabber {
  height: 100%;
  background-color: rgb(84, 92, 100);
  border: none;
}
.routerView {
  height: calc(100% - 60px);
}
</style>
