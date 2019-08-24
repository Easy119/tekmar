<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="新闻标题">
              <span>{{ props.row.news_title }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.publist_time }}</span>
            </el-form-item>
            <el-form-item label="新闻描述">
              <p class="news_des">{{ props.row.desc }}</p>
            </el-form-item>
            <el-form-item label="新闻图片" class="img_list">
              <img :src="props.row.news_img" class="new_img" />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="新闻 ID" prop="id"></el-table-column>
      <el-table-column label="新闻标题" prop="news_title"></el-table-column>
      <el-table-column label="发布时间" prop="publist_time"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import api from '../util/env'
import axios from 'axios'
export default {
  data() {
    return {
      tableData: []
    };
  },
  created(){
    axios.get(`${api.dev_url}news/title/list`).then(res =>{
      if(res.data.flag) {
        this.tableData = res.data.msg
      }
    })
  },
  methods: {
    handleEdit(row) {
      this.$router.push({path:'/home/detail',query:{id:row}})
    },
    handleDelete(row) {
      console.log(row)
    }
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.news_des {
  word-break: normal;
  white-space: pre-warp;
  word-wrap: break-word;
  line-height: 40px;
}
.img_list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.new_img {
  width: 150px;
  height: 150px;
}
</style>
