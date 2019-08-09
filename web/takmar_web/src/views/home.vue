<template>
  <div class="content">
    <el-row class="tac">
      <el-col :span="4" class="tabber">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
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
