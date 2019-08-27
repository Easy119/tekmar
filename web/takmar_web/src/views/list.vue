<template>
  <div class="list">
    <div class="add_news">
      <el-button type="primary" @click="toRouter">新增文章</el-button>
    </div>
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
              <p class="news_des">{{ props.row.des }}</p>
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
    this.init()
  },
  methods: {
    init(){
  axios.get(`${api.dev_url}news/title/list`).then(res =>{
      if(res.data.flag) {
        this.tableData = res.data.msg.map(item =>{
          item.news_img = api.dev_url + item.news_img;
          return item
        })
      }
    })
    },
    handleEdit(row) {
      this.$router.push({path:'/home/detail',query:{id:row}})
    },
    handleDelete(id) {
      console.log(id)
      axios.get(`${api.dev_url}news/delete?id=${id}`).then(res =>{
        console.log(res)
      if(res.data.msg == 'ok') {
        this.$message({
              message: "文章删除成功！",
              type: "success"
          });
          this.init()
      } else {
         this.$message.error('系统异常')
      }
    })
    },
    toRouter(){
      this.$router.push({path:'/home/detail'})
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
.list {
  width:100%;
  padding:0 40px;
  box-sizing: border-box;
}
.news_des {
  word-break: normal;
  white-space: pre-warp;
  word-wrap: break-word;
  line-height: 40px;
}
.add_news {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
